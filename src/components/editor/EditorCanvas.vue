<script setup>
import { computed, ref, provide, onMounted, onBeforeUnmount } from 'vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'
import ElementWrapper from './ElementWrapper.vue'
import TextElement from './elements/TextElement.vue'
import ImageElement from './elements/ImageElement.vue'
import ShapeElement from './elements/ShapeElement.vue'
import ButtonElement from './elements/ButtonElement.vue'
import HotspotElement from './elements/HotspotElement.vue'
import VideoElement from './elements/VideoElement.vue'
import AudioElement from './elements/AudioElement.vue'
import QuizElement from './elements/QuizElement.vue'

const editorStore = useEditorStore()
const projectStore = useProjectStore()

const canvasContainerRef = ref(null)
const canvasRef = ref(null)
const scale = ref(1)

// Provide scale to child elements
provide('canvasScale', scale)

// Canvas size: 960×540 (16:9)
const CANVAS_W = 960
const CANVAS_H = 540

const project = computed(() => projectStore.getProject(editorStore.projectId))
const slide = computed(() => project.value?.slides?.find(s => s.id === editorStore.currentSlideId))
const slides = computed(() => [...(project.value?.slides || [])].sort((a, b) => a.order - b.order))
const currentSlideIndex = computed(() => slides.value.findIndex(s => s.id === editorStore.currentSlideId))

const sortedElements = computed(() =>
  [...(slide.value?.elements || [])].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
)

// Background style
const slideBackground = computed(() => {
  const s = slide.value
  if (!s) return { background: '#fff' }
  if (s.backgroundType === 'gradient' && s.backgroundGradient) {
    return { background: s.backgroundGradient }
  }
  if (s.backgroundType === 'image' && s.backgroundImage) {
    return { backgroundImage: `url(${s.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  return { background: s.background || '#fff' }
})

// Zoom-based scale
const canvasTransform = computed(() => `scale(${editorStore.zoomLevel})`)

// Fit to container
function recalcScale() {
  if (!canvasContainerRef.value) return
  const { clientWidth, clientHeight } = canvasContainerRef.value
  const scaleX = (clientWidth - 80) / CANVAS_W
  const scaleY = (clientHeight - 80) / CANVAS_H
  scale.value = Math.min(scaleX, scaleY)
}

// Resize observer
let ro = null
onMounted(() => {
  recalcScale()
  ro = new ResizeObserver(recalcScale)
  if (canvasContainerRef.value) ro.observe(canvasContainerRef.value)
})
onBeforeUnmount(() => ro?.disconnect())

// Hovered and drag states
const isDragging = ref(false)
const selectionStart = ref({ x: 0, y: 0 })
const selectionCurrent = ref({ x: 0, y: 0 })
const isSelecting = ref(false)
const isImageDragOver = ref(false)

const selectionBox = computed(() => {
  if (!isSelecting.value) return null
  const x = Math.min(selectionStart.value.x, selectionCurrent.value.x)
  const y = Math.min(selectionStart.value.y, selectionCurrent.value.y)
  const width = Math.abs(selectionCurrent.value.x - selectionStart.value.x)
  const height = Math.abs(selectionCurrent.value.y - selectionStart.value.y)
  return { x, y, width, height }
})

// Click on canvas background deselects all, or handled by mouseup if selecting
function onCanvasClick(e) {
  // Only deselect if we weren't drag-selecting
  if (!isSelecting.value && (e.target === canvasRef.value || e.target === e.currentTarget)) {
    editorStore.clearSelection()
  }
}

function hasImageFiles(dataTransfer) {
  if (!dataTransfer) return false
  return Array.from(dataTransfer.files || []).some(file => file.type.startsWith('image/'))
}

function addDroppedImage(file, clientX, clientY) {
  if (!file || !file.type.startsWith('image/')) return

  const reader = new FileReader()
  reader.onload = () => {
    const src = String(reader.result || '')
    if (!src) return

    const image = new Image()
    image.onload = () => {
      const rect = canvasRef.value.getBoundingClientRect()
      const dropX = (clientX - rect.left) / editorStore.zoomLevel
      const dropY = (clientY - rect.top) / editorStore.zoomLevel
      const maxWidth = 420
      const maxHeight = 280
      const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1)
      const width = Math.max(120, Math.round(image.width * ratio))
      const height = Math.max(80, Math.round(image.height * ratio))
      const x = Math.max(0, Math.min(CANVAS_W - width, Math.round(dropX - width / 2)))
      const y = Math.max(0, Math.min(CANVAS_H - height, Math.round(dropY - height / 2)))

      const created = projectStore.addElement(editorStore.projectId, editorStore.currentSlideId, 'image', {
        x,
        y,
        width,
        height,
        content: {
          src,
          alt: file.name,
          objectFit: 'cover',
        },
      })

      if (created) {
        editorStore.selectElement(created.id)
        editorStore.setActiveTool('select')
        editorStore.setRightPanel('properties')
      }
    }
    image.src = src
  }
  reader.readAsDataURL(file)
}

function onCanvasDragOver(event) {
  if (!hasImageFiles(event.dataTransfer)) return
  event.preventDefault()
  event.dataTransfer.dropEffect = 'copy'
  isImageDragOver.value = true
}

function onCanvasDragLeave(event) {
  if (event.currentTarget?.contains(event.relatedTarget)) return
  isImageDragOver.value = false
}

function onCanvasDropFile(event) {
  if (!hasImageFiles(event.dataTransfer)) return
  event.preventDefault()
  isImageDragOver.value = false
  const file = Array.from(event.dataTransfer.files || []).find(item => item.type.startsWith('image/'))
  if (file) addDroppedImage(file, event.clientX, event.clientY)
}

// Click/drop to add new element or start select marquee
function onCanvasMouseDown(e) {
  const tool = editorStore.activeTool
  if (e.target !== canvasRef.value && e.target !== e.currentTarget) return

  e.preventDefault()
  e.stopPropagation()

  const rect = canvasRef.value.getBoundingClientRect()
  const startX = (e.clientX - rect.left) / editorStore.zoomLevel
  const startY = (e.clientY - rect.top) / editorStore.zoomLevel

  if (tool === 'select') {
    // Start marquee selection
    isSelecting.value = true
    selectionStart.value = { x: startX, y: startY }
    selectionCurrent.value = { x: startX, y: startY }

    const onMouseMove = (moveEvt) => {
      selectionCurrent.value = {
        x: (moveEvt.clientX - rect.left) / editorStore.zoomLevel,
        y: (moveEvt.clientY - rect.top) / editorStore.zoomLevel
      }
    }

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      
      const box = selectionBox.value
      // Threshold for drag selection
      if (box && (box.width > 2 || box.height > 2)) {
        const selectedIds = sortedElements.value.filter(el => {
          const elX = el.x
          const elY = el.y
          const elW = el.width || 100 // Default if no width
          const elH = el.height || 100

          // Check intersection
          return (
            elX < box.x + box.width &&
            elX + elW > box.x &&
            elY < box.y + box.height &&
            elY + elH > box.y
          )
        }).map(el => el.id)

        if (selectedIds.length > 0) {
          editorStore.setSelection(selectedIds)
        } else {
          editorStore.clearSelection()
        }
      } else {
        editorStore.clearSelection()
      }
      
      // Delay so onCanvasClick won't immediately clear selection
      setTimeout(() => {
        isSelecting.value = false
      }, 0)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return
  }

  // Snap to grid
  const snap = (v) => editorStore.snapToGrid ? Math.round(v / editorStore.gridSize) * editorStore.gridSize : v

  const el = projectStore.addElement(editorStore.projectId, editorStore.currentSlideId, tool, {
    x: snap(startX - 75),
    y: snap(startY - 40),
  })

  if (el) {
    editorStore.selectElement(el.id)
    editorStore.setActiveTool('select')
    editorStore.setRightPanel('properties')
  }
}

// Grid rendering
const gridStyle = computed(() => {
  if (!editorStore.showGrid) return {}
  const g = editorStore.gridSize
  return {
    backgroundImage: `
      linear-gradient(to right, rgba(108,71,255,.10) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(108,71,255,.10) 1px, transparent 1px)
    `,
    backgroundSize: `${g}px ${g}px`,
  }
})

// Component map
const elementComponents = {
  text: TextElement,
  heading: TextElement,
  image: ImageElement,
  shape: ShapeElement,
  button: ButtonElement,
  hotspot: HotspotElement,
  video: VideoElement,
  audio: AudioElement,
  quiz: QuizElement,
  divider: 'div',
}

function getComponent(type) {
  return elementComponents[type] || TextElement
}

function getDividerStyle(el) {
  if (el.type !== 'divider') return {}
  return {
    borderTop: `${el.content?.thickness || 2}px solid ${el.content?.color || '#e2e8f0'}`,
    width: '100%',
    height: '100%',
  }
}

// Right-click context menu
const contextMenu = ref({ show: false, x: 0, y: 0, elId: null })

function onElementContextMenu(e, elId) {
  e.preventDefault()
  contextMenu.value = { show: true, x: e.clientX, y: e.clientY, elId }
  editorStore.selectElement(elId)
  setTimeout(() => window.addEventListener('click', closeCtx, { once: true }), 0)
}

function closeCtx() { contextMenu.value.show = false }

function ctxDuplicate() {
  if (contextMenu.value.elId) {
    const copy = projectStore.duplicateElement(editorStore.projectId, editorStore.currentSlideId, contextMenu.value.elId)
    if (copy) editorStore.selectElement(copy.id)
  }
  closeCtx()
}

function ctxDelete() {
  if (contextMenu.value.elId) {
    projectStore.deleteElement(editorStore.projectId, editorStore.currentSlideId, contextMenu.value.elId)
    editorStore.clearSelection()
  }
  closeCtx()
}

function ctxBringUp() {
  if (contextMenu.value.elId) projectStore.reorderElement(editorStore.projectId, editorStore.currentSlideId, contextMenu.value.elId, 'up')
  closeCtx()
}

function ctxSendDown() {
  if (contextMenu.value.elId) projectStore.reorderElement(editorStore.projectId, editorStore.currentSlideId, contextMenu.value.elId, 'down')
  closeCtx()
}

function addSlide() {
  const idx = currentSlideIndex.value
  const created = projectStore.addSlide(editorStore.projectId, idx)
  if (created) editorStore.setCurrentSlide(created.id)
}

function goPrevSlide() {
  const idx = currentSlideIndex.value
  if (idx > 0) editorStore.setCurrentSlide(slides.value[idx - 1].id)
}

function goNextSlide() {
  const idx = currentSlideIndex.value
  if (idx < slides.value.length - 1) editorStore.setCurrentSlide(slides.value[idx + 1].id)
}
</script>

<template>
  <div class="canvas-container" ref="canvasContainerRef">
    <!-- No slide selected or no project -->
    <div v-if="!slide" class="canvas-empty">
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="opacity:.2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
      </svg>
      <p>Select a slide to start editing</p>
    </div>

    <template v-else>
      <!-- Zoom wrapper -->
      <div
        class="canvas-zoom-wrapper"
        :style="{
          transform: canvasTransform,
          transformOrigin: 'center center',
          transition: 'transform .15s ease',
        }"
      >
        <!-- THE SLIDE CANVAS -->
        <div
          ref="canvasRef"
          class="slide-canvas"
          :style="{
            width: CANVAS_W + 'px',
            height: CANVAS_H + 'px',
            ...slideBackground,
            ...gridStyle,
          }"
          @click="onCanvasClick"
          @mousedown="onCanvasMouseDown"
          @dragover="onCanvasDragOver"
          @dragleave="onCanvasDragLeave"
          @drop="onCanvasDropFile"
          @contextmenu.prevent
        >
          <!-- Elements -->
          <ElementWrapper
            v-for="el in sortedElements"
            :key="el.id"
            :element="el"
            @contextmenu.stop="onElementContextMenu($event, el.id)"
          >
            <component
              :is="getComponent(el.type)"
              :element="el"
              :style="el.type === 'divider' ? getDividerStyle(el) : {}"
            />
          </ElementWrapper>

          <!-- Drop hint when tool is active -->
          <div
            v-if="editorStore.activeTool !== 'select' || isImageDragOver"
            class="drop-hint"
          >{{ isImageDragOver ? 'Drop image to insert it on this slide' : `Click anywhere to add ${editorStore.activeTool}` }}</div>
          
          <!-- Selection Marquee -->
          <div
            v-if="isSelecting && selectionBox"
            class="selection-marquee"
            :style="{
              left: selectionBox.x + 'px',
              top: selectionBox.y + 'px',
              width: selectionBox.width + 'px',
              height: selectionBox.height + 'px'
            }"
          ></div>
        </div>
      </div>

      <!-- Canvas info bar -->
      <div class="canvas-info-bar">
        <button class="bar-btn" @click="addSlide">Add page</button>
        <button class="bar-btn icon" @click="goPrevSlide" :disabled="currentSlideIndex <= 0">◀</button>
        <span class="slide-index">{{ currentSlideIndex + 1 }} / {{ slides.length }}</span>
        <button class="bar-btn icon" @click="goNextSlide" :disabled="currentSlideIndex >= slides.length - 1">▶</button>
        <span>{{ CANVAS_W }} × {{ CANVAS_H }}px</span>
        <span>·</span>
        <span>{{ slide.elements?.length || 0 }} elements</span>
        <span v-if="editorStore.hasSelection">· {{ editorStore.selectedElementIds.length }} selected</span>
        <button class="bar-btn ai" @click="editorStore.setRightPanel('ai')">AI</button>
      </div>
    </template>

    <!-- Context Menu -->
    <Teleport to="body">
      <div v-if="contextMenu.show" class="ctx-menu" :style="{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }">
        <button class="ctx-item" @click="ctxDuplicate">Duplicate</button>
        <button class="ctx-item" @click="ctxBringUp">Bring Forward</button>
        <button class="ctx-item" @click="ctxSendDown">Send Backward</button>
        <div class="ctx-divider" />
        <button class="ctx-item danger" @click="ctxDelete">Delete</button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.canvas-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--canvas-bg);
  overflow: hidden;
  position: relative;
}
.canvas-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  color: var(--color-text-dim);
  font-size: var(--text-sm);
}
.canvas-zoom-wrapper {
  will-change: transform;
  cursor: default;
}
.slide-canvas {
  position: relative;
  box-shadow: 0 8px 40px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.05);
  border-radius: 2px;
  overflow: hidden;
  cursor: default;
}
.canvas-info-bar {
  position: absolute;
  bottom: var(--space-3);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-text-dim);
  background: rgba(10,10,20,.6);
  backdrop-filter: blur(8px);
  border: 1px solid var(--color-border);
  padding: 4px 14px;
  border-radius: var(--radius-full);
  pointer-events: auto;
}
.bar-btn {
  border: 1px solid var(--color-border);
  background: var(--color-surface-raised);
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
  padding: 2px 8px;
  font-size: var(--text-xs);
  cursor: pointer;
}
.bar-btn:hover { color: var(--color-text); background: var(--color-surface-overlay); }
.bar-btn:disabled { opacity: .4; cursor: default; }
.bar-btn.icon { padding: 2px 6px; }
.bar-btn.ai { color: var(--color-primary); border-color: rgba(108,71,255,.35); }
.slide-index {
  min-width: 40px;
  text-align: center;
}
.drop-hint {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(108,71,255,.06);
  border: 2px dashed rgba(108,71,255,.3);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-primary);
  pointer-events: none;
  text-transform: capitalize;
}
.selection-marquee {
  position: absolute;
  background: rgba(108,71,255,.15);
  border: 1px solid rgba(108,71,255,.6);
  pointer-events: none;
  z-index: 1000;
}

/* Context Menu */
.ctx-menu {
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
  display: block; width: 100%;
  text-align: left; padding: 7px 12px;
  font-size: var(--text-sm);
  color: var(--color-text);
  background: none; border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition-fast);
}
.ctx-item:hover { background: var(--color-surface-overlay); }
.ctx-item.danger { color: var(--color-danger); }
.ctx-divider { height: 1px; background: var(--color-border-subtle); margin: var(--space-1) 0; }
</style>
