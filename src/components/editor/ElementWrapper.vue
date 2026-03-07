<script setup>
import { computed, ref, inject } from 'vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'

const props = defineProps({
  element: { type: Object, required: true },
})

const editorStore = useEditorStore()
const projectStore = useProjectStore()

// Injected from EditorCanvas
const canvasScale = inject('canvasScale', ref(1))
const projectId = computed(() => editorStore.projectId)
const slideId = computed(() => editorStore.currentSlideId)

const isSelected = computed(() => editorStore.selectedElementIds.includes(props.element.id))
const isLocked = computed(() => props.element.locked)
const isVisible = computed(() => props.element.visible !== false)

// Drag state
let isDragging = false
let startMouseX = 0, startMouseY = 0
// Store initial positions of all dragged elements
let startPositions = new Map()

function onMouseDown(e) {
  if (isLocked.value) return
  if (e.target.classList.contains('resize-handle')) return

  // Selection logic for dragging multiple items
  const isMultiModifier = e.ctrlKey || e.metaKey || e.shiftKey
  if (!isSelected.value) {
    editorStore.selectElement(props.element.id, isMultiModifier)
  } else if (isMultiModifier) {
    editorStore.selectElement(props.element.id, true)
  }
  editorStore.setActiveTool('select')

  isDragging = false
  startMouseX = e.clientX
  startMouseY = e.clientY
  
  // Record initial positions for all currently selected elements
  startPositions.clear()
  const slide = projectStore.getProject(projectId.value)?.slides.find(s => s.id === slideId.value)
  if (slide) {
    editorStore.selectedElementIds.forEach(id => {
      const el = slide.elements.find(e => e.id === id)
      if (el && !el.locked) {
        startPositions.set(id, { x: el.x, y: el.y })
      }
    })
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
  e.stopPropagation()
}

function onMouseMove(e) {
  const dx = (e.clientX - startMouseX) / canvasScale.value
  const dy = (e.clientY - startMouseY) / canvasScale.value
  if (!isDragging && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) isDragging = true
  if (!isDragging) return

  startPositions.forEach((startPos, id) => {
    let newX = startPos.x + dx
    let newY = startPos.y + dy
    if (editorStore.snapToGrid && editorStore.gridSize) {
      const g = editorStore.gridSize
      newX = Math.round(newX / g) * g
      newY = Math.round(newY / g) * g
    }
    projectStore.updateElement(projectId.value, slideId.value, id, { x: newX, y: newY })
  })
}

function onMouseUp(e) {
  if (!isDragging) {
    const isMultiModifier = e.ctrlKey || e.metaKey || e.shiftKey
    if (!isMultiModifier && editorStore.selectedElementIds.length > 1) {
      editorStore.selectElement(props.element.id, false)
    }
  }

  isDragging = false
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
}

// Resize
const HANDLES = ['n','ne','e','se','s','sw','w','nw']
let resizing = false
let resizeHandle = ''
let rsStartX = 0, rsStartY = 0
let rsW = 0, rsH = 0, rsX = 0, rsY = 0

function onResizeStart(e, handle) {
  if (isLocked.value) return
  e.stopPropagation()
  e.preventDefault()
  resizing = true
  resizeHandle = handle
  rsStartX = e.clientX
  rsStartY = e.clientY
  rsW = props.element.width
  rsH = props.element.height
  rsX = props.element.x
  rsY = props.element.y
  window.addEventListener('mousemove', onResizeMove)
  window.addEventListener('mouseup', onResizeEnd)
}

function onResizeMove(e) {
  if (!resizing) return
  const scale = canvasScale.value
  const dx = (e.clientX - rsStartX) / scale
  const dy = (e.clientY - rsStartY) / scale
  const MIN = 20
  let nx = rsX, ny = rsY, nw = rsW, nh = rsH

  if (resizeHandle.includes('e')) nw = Math.max(MIN, rsW + dx)
  if (resizeHandle.includes('s')) nh = Math.max(MIN, rsH + dy)
  if (resizeHandle.includes('w')) { const w = Math.max(MIN, rsW - dx); nx = rsX + (rsW - w); nw = w }
  if (resizeHandle.includes('n')) { const h = Math.max(MIN, rsH - dy); ny = rsY + (rsH - h); nh = h }

  if (editorStore.snapToGrid && editorStore.gridSize) {
    const g = editorStore.gridSize
    nw = Math.round(nw / g) * g; nh = Math.round(nh / g) * g
    nx = Math.round(nx / g) * g; ny = Math.round(ny / g) * g
  }
  projectStore.updateElement(projectId.value, slideId.value, props.element.id, { x: nx, y: ny, width: nw, height: nh })
}

function onResizeEnd() {
  resizing = false
  window.removeEventListener('mousemove', onResizeMove)
  window.removeEventListener('mouseup', onResizeEnd)
}

// Double-click to edit text
function onDblClick() {
  if (['text', 'heading'].includes(props.element.type)) {
    editorStore.setRightPanel('properties')
  }
}

const wrapperStyle = computed(() => ({
  position: 'absolute',
  left: `${props.element.x}px`,
  top: `${props.element.y}px`,
  width: `${props.element.width}px`,
  height: `${props.element.height}px`,
  transform: `rotate(${props.element.rotation || 0}deg)`,
  opacity: props.element.opacity ?? 1,
  zIndex: props.element.zIndex || 1,
  cursor: isLocked.value ? 'not-allowed' : 'move',
  visibility: isVisible.value ? 'visible' : 'hidden',
  userSelect: 'none',
}))

function getCursor(handle) {
  const map = { n: 'n-resize', ne: 'ne-resize', e: 'e-resize', se: 'se-resize', s: 's-resize', sw: 'sw-resize', w: 'w-resize', nw: 'nw-resize' }
  return map[handle] || 'auto'
}
</script>

<template>
  <div
    :class="['element-wrapper', isSelected && 'selected', isLocked && 'locked']"
    :style="wrapperStyle"
    @mousedown="onMouseDown"
    @dblclick="onDblClick"
  >
    <slot />

    <!-- Selection border + handles -->
    <template v-if="isSelected && !isLocked">
      <div class="selection-border" />
      <div
        v-for="h in HANDLES"
        :key="h"
        :class="['resize-handle', `handle-${h}`]"
        :style="{ cursor: getCursor(h) }"
        @mousedown.stop="onResizeStart($event, h)"
      />
    </template>

    <!-- Locked indicator -->
    <div v-if="isSelected && isLocked" class="selection-border locked-border" />
  </div>
</template>

<style scoped>
.element-wrapper {
  position: absolute;
  transform-origin: center center;
}
.selection-border {
  position: absolute;
  inset: -2px;
  border: 2px solid var(--color-primary);
  border-radius: 2px;
  pointer-events: none;
  z-index: 100;
}
.locked-border { border-color: var(--color-text-muted); border-style: dashed; }

.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border: 2px solid var(--color-primary);
  border-radius: 2px;
  z-index: 101;
}
/* Position each handle */
.handle-n  { top: -6px; left: 50%; transform: translateX(-50%); }
.handle-ne { top: -6px; right: -6px; }
.handle-e  { top: 50%; right: -6px; transform: translateY(-50%); }
.handle-se { bottom: -6px; right: -6px; }
.handle-s  { bottom: -6px; left: 50%; transform: translateX(-50%); }
.handle-sw { bottom: -6px; left: -6px; }
.handle-w  { top: 50%; left: -6px; transform: translateY(-50%); }
.handle-nw { top: -6px; left: -6px; }
</style>
