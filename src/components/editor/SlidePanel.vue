<script setup>
import { computed, ref } from 'vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'
import { getProjectCanvasSize } from '@/lib/canvas'
import { buildChartModel } from '@/lib/chart'

const editorStore = useEditorStore()
const projectStore = useProjectStore()

const project = computed(() => projectStore.getProject(editorStore.projectId))
const canvasSize = computed(() => getProjectCanvasSize(project.value))
const slides = computed(() => project.value?.slides?.slice().sort((a, b) => a.order - b.order) || [])

const contextMenu = ref({ show: false, x: 0, y: 0, slideId: null })

function selectSlide(id) {
  editorStore.setCurrentSlide(id)
}

function addSlide() {
  const idx = slides.value.findIndex(s => s.id === editorStore.currentSlideId)
  const slide = projectStore.addSlide(editorStore.projectId, idx)
  if (slide) editorStore.setCurrentSlide(slide.id)
}

function deleteSlideById(id) {
  const idx = slides.value.findIndex(s => s.id === id)
  projectStore.deleteSlide(editorStore.projectId, id)
  const remaining = project.value?.slides || []
  if (remaining.length > 0) {
    const sorted = remaining.slice().sort((a, b) => a.order - b.order)
    const newIdx = Math.min(idx, sorted.length - 1)
    editorStore.setCurrentSlide(sorted[newIdx]?.id)
  }
}

function onContextMenu(e, slideId) {
  e.preventDefault()
  contextMenu.value = { show: true, x: e.clientX, y: e.clientY, slideId }
  setTimeout(() => window.addEventListener('click', closeMenu, { once: true }), 0)
}

function closeMenu() {
  contextMenu.value.show = false
}

function menuDuplicate() {
  const newSlide = projectStore.duplicateSlide(editorStore.projectId, contextMenu.value.slideId)
  if (newSlide) editorStore.setCurrentSlide(newSlide.id)
  closeMenu()
}

function menuDelete() {
  deleteSlideById(contextMenu.value.slideId)
  closeMenu()
}

function onDeleteSlideClick(e, slideId) {
  e.stopPropagation()
  deleteSlideById(slideId)
}

function menuMoveUp() {
  const idx = slides.value.findIndex(s => s.id === contextMenu.value.slideId)
  if (idx > 0) projectStore.reorderSlides(editorStore.projectId, idx, idx - 1)
  closeMenu()
}

function menuMoveDown() {
  const idx = slides.value.findIndex(s => s.id === contextMenu.value.slideId)
  if (idx < slides.value.length - 1) projectStore.reorderSlides(editorStore.projectId, idx, idx + 1)
  closeMenu()
}

// Drag to reorder
let dragFromIndex = -1

function onDragStart(e, idx) {
  dragFromIndex = idx
  e.dataTransfer.effectAllowed = 'move'
}

function onDrop(e, idx) {
  e.preventDefault()
  if (dragFromIndex !== -1 && dragFromIndex !== idx) {
    projectStore.reorderSlides(editorStore.projectId, dragFromIndex, idx)
  }
  dragFromIndex = -1
}

function getBgStyle(slide) {
  if (slide.backgroundType === 'gradient' && slide.backgroundGradient) {
    return { background: slide.backgroundGradient }
  }
  if (slide.backgroundType === 'image' && slide.backgroundImage) {
    return { backgroundImage: `url(${slide.backgroundImage})`, backgroundSize: 'cover' }
  }
  return { background: slide.background || '#fff' }
}

function getMiniFrameStyle(el) {
  return {
    left: (el.x / canvasSize.value.width * 100) + '%',
    top: (el.y / canvasSize.value.height * 100) + '%',
    width: (el.width / canvasSize.value.width * 100) + '%',
    height: (el.height / canvasSize.value.height * 100) + '%',
  }
}

function getMiniElementStyle(el) {
  return {
    background: el.type === 'shape' ? el.content?.fillColor : (el.type === 'button' ? 'var(--color-primary)' : 'rgba(0,0,0,.1)'),
    borderRadius: el.type === 'shape' && el.content?.shapeType === 'circle' ? '50%' : undefined,
  }
}

function getMiniChartModel(el) {
  return buildChartModel(el.content || {}, el.width || 420, el.height || 280, project.value?.theme || {})
}
</script>

<template>
  <div class="slide-panel">
    <div class="slide-panel-header">
      <span class="panel-section-title">Slides</span>
      <span class="slide-count">{{ slides.length }}</span>
      <button class="btn btn-icon add-slide-btn" @click="addSlide" data-tooltip="Add slide" aria-label="Add slide">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
      </button>
    </div>

    <div class="slides-list">
      <div
        v-for="(slide, idx) in slides" :key="slide.id"
        :class="['slide-thumb-item', editorStore.currentSlideId === slide.id && 'active']"
        draggable="true"
        @click="selectSlide(slide.id)"
        @contextmenu="onContextMenu($event, slide.id)"
        @dragstart="onDragStart($event, idx)"
        @dragover.prevent
        @drop="onDrop($event, idx)"
      >
        <div class="slide-number">{{ idx + 1 }}</div>
        <div class="slide-thumb" :style="getBgStyle(slide)">
          <!-- Mini element previews -->
          <div
            v-for="el in slide.elements.slice(0, 6)"
            :key="el.id"
            class="mini-element-frame"
            :style="getMiniFrameStyle(el)"
          >
            <svg v-if="el.type === 'chart'" class="mini-chart-svg" :viewBox="`0 0 ${el.width || 420} ${el.height || 280}`" preserveAspectRatio="none">
              <template v-if="getMiniChartModel(el).type === 'bar'">
                <rect
                  v-for="bar in getMiniChartModel(el).cartesian.bars"
                  :key="`mini-bar-${bar.id}`"
                  :x="bar.x"
                  :y="bar.y"
                  :width="bar.width"
                  :height="bar.height"
                  :fill="bar.color"
                  rx="6"
                />
              </template>
              <template v-else-if="getMiniChartModel(el).type === 'line'">
                <path
                  :d="getMiniChartModel(el).cartesian.linePath"
                  :stroke="getMiniChartModel(el).cartesian.points[0]?.color || '#6c47ff'"
                  stroke-width="10"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </template>
              <template v-else>
                <path
                  v-for="slice in getMiniChartModel(el).circle.slices"
                  :key="`mini-slice-${slice.id}`"
                  :d="slice.path"
                  :fill="slice.color"
                />
              </template>
            </svg>
            <div
              v-else
              class="mini-element"
              :style="getMiniElementStyle(el)"
            />
          </div>
        </div>
        <div class="slide-footer">
          <div class="slide-title">{{ slide.title || `Slide ${idx + 1}` }}</div>
          <button
            v-if="slides.length > 1"
            class="slide-delete-btn"
            title="Delete slide"
            aria-label="Delete slide"
            @click="onDeleteSlideClick($event, slide.id)"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6"/>
              <path d="M9 6V4h6v2"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <button class="add-slide-bottom" @click="addSlide">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
      Add Slide
    </button>

    <!-- Context Menu -->
    <Teleport to="body">
      <div
        v-if="contextMenu.show"
        class="context-menu"
        :style="{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }"
      >
        <button class="ctx-item" @click="menuDuplicate">Duplicate</button>
        <button class="ctx-item" @click="menuMoveUp">Move Up</button>
        <button class="ctx-item" @click="menuMoveDown">Move Down</button>
        <div class="ctx-divider" />
        <button class="ctx-item danger" @click="menuDelete">Delete Slide</button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.slide-panel {
  width: var(--slide-panel-width);
  background: color-mix(in srgb, var(--color-surface) 90%, #0d1532 10%);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}
.slide-panel-header {
  display: flex;
  align-items: center;
  padding: var(--space-3) var(--space-3);
  border-bottom: 1px solid var(--color-border-subtle);
  flex-shrink: 0;
  gap: var(--space-2);
  background: color-mix(in srgb, var(--color-surface-overlay) 60%, transparent 40%);
  backdrop-filter: blur(6px);
}
.panel-section-title {
  font-size: var(--text-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .07em;
  color: var(--color-text-muted);
  flex: 1;
}
.slide-count {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  min-width: 24px;
  text-align: center;
  background: var(--color-surface-overlay);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: 2px 8px;
}
.add-slide-btn { color: var(--color-text-muted); }
.slides-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-2);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.slide-thumb-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px;
  border-radius: var(--radius-lg);
  cursor: pointer;
  border: 1px solid transparent;
  transition: background var(--transition-fast), border-color var(--transition-fast), transform var(--transition-fast), box-shadow var(--transition-fast);
  position: relative;
}
.slide-thumb-item:hover {
  background: color-mix(in srgb, var(--color-surface-overlay) 75%, #ffffff 25%);
  border-color: var(--color-border);
  transform: translateY(-1px);
}
.slide-thumb-item.active {
  border-color: color-mix(in srgb, var(--color-primary) 55%, var(--color-border));
  background: color-mix(in srgb, var(--color-primary-light) 24%, var(--color-surface-overlay));
  box-shadow: var(--shadow-sm);
}
.slide-number {
  font-size: var(--text-xs);
  color: var(--color-text-dim);
  text-align: center;
  line-height: 1;
}
.slide-thumb {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  position: relative;
}
.mini-element {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  border-radius: 2px;
}
.mini-element-frame {
  position: absolute;
  overflow: hidden;
  border-radius: 3px;
}
.mini-chart-svg {
  width: 100%;
  height: 100%;
  display: block;
}
.slide-title {
  font-size: 11px;
  color: var(--color-text-muted);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}
.slide-footer {
  display: flex;
  align-items: center;
  gap: 4px;
}
.slide-delete-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-dim);
  cursor: pointer;
  opacity: 0;
  transition: opacity var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
}
.slide-thumb-item:hover .slide-delete-btn,
.slide-thumb-item.active .slide-delete-btn {
  opacity: 1;
}
.slide-delete-btn:hover {
  color: var(--color-danger);
  background: var(--color-surface-overlay);
}
.add-slide-bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background: none;
  border: none;
  border-top: 1px solid var(--color-border-subtle);
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: var(--text-sm);
  transition: color var(--transition-fast), background var(--transition-fast);
  flex-shrink: 0;
}
.add-slide-bottom:hover {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary-light) 16%, var(--color-surface-overlay));
}

/* Context Menu */
.context-menu {
  position: fixed;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-1);
  min-width: 160px;
  z-index: 9999;
}
.ctx-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 7px 12px;
  font-size: var(--text-sm);
  color: var(--color-text);
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.ctx-item:hover { background: var(--color-surface-overlay); }
.ctx-item.danger { color: var(--color-danger); }
.ctx-divider { height: 1px; background: var(--color-border-subtle); margin: var(--space-1) 0; }

@media (max-width: 780px) {
  .slide-panel {
    width: 100%;
    max-height: 34vh;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }

  .slides-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--space-2);
  }
}
</style>
