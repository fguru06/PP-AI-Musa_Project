<script setup>
import { computed, ref, provide, onMounted, onBeforeUnmount, watch } from 'vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'
import { formatCanvasAspectRatio, getProjectCanvasSize, matchCanvasSizePreset } from '@/lib/canvas'
import { CONTENT_BLOCK_DRAG_MIME, getContentBlockBounds } from '@/lib/blockLibrary'
import ElementWrapper from './ElementWrapper.vue'
import TextElement from './elements/TextElement.vue'
import ImageElement from './elements/ImageElement.vue'
import ShapeElement from './elements/ShapeElement.vue'
import ButtonElement from './elements/ButtonElement.vue'
import HotspotElement from './elements/HotspotElement.vue'
import VideoElement from './elements/VideoElement.vue'
import AudioElement from './elements/AudioElement.vue'
import QuizElement from './elements/QuizElement.vue'
import ChartElement from './elements/ChartElement.vue'

const editorStore = useEditorStore()
const projectStore = useProjectStore()

const canvasContainerRef = ref(null)
const canvasRef = ref(null)
const scale = ref(1)
const interactionScale = computed(() => scale.value * editorStore.zoomLevel)

// Provide scale to child elements
provide('canvasScale', interactionScale)

const project = computed(() => projectStore.getProject(editorStore.projectId))
const canvasSize = computed(() => getProjectCanvasSize(project.value))
const canvasPreset = computed(() => matchCanvasSizePreset(project.value))
const canvasWidth = computed(() => canvasSize.value.width)
const canvasHeight = computed(() => canvasSize.value.height)
const canvasAspectLabel = computed(() => formatCanvasAspectRatio(canvasWidth.value, canvasHeight.value))
const slide = computed(() => project.value?.slides?.find(s => s.id === editorStore.currentSlideId))
const slides = computed(() => [...(project.value?.slides || [])].sort((a, b) => a.order - b.order))
const currentSlideIndex = computed(() => slides.value.findIndex(s => s.id === editorStore.currentSlideId))
const projectSettings = computed(() => ({
  autoPlay: false,
  motionPresets: [],
  ...(project.value?.settings || {}),
}))
const groupMotionPresets = computed(() =>
  (Array.isArray(projectSettings.value.motionPresets) ? projectSettings.value.motionPresets : []).filter((preset) => preset.scope === 'group')
)
const selectedElements = computed(() => {
  const ids = new Set(editorStore.selectedElementIds)
  return sortedElements.value.filter((element) => ids.has(element.id))
})
const canvasGroupPresetId = ref('')
const playbackBadge = computed(() => {
  if (!slide.value) {
    return { label: 'Manual', tone: 'manual' }
  }

  if (slide.value.advanceOnMediaEnd) {
    return { label: 'Media Advance', tone: 'media' }
  }

  if (projectSettings.value.autoPlay && Number(slide.value.duration || 0) > 0) {
    return { label: `Auto ${Number(slide.value.duration).toFixed(Number(slide.value.duration) % 1 === 0 ? 0 : 1)}s`, tone: 'auto' }
  }

  return { label: 'Manual', tone: 'manual' }
})

function applyCanvasGroupPreset() {
  const preset = groupMotionPresets.value.find((item) => item.id === canvasGroupPresetId.value)
  if (!preset || !selectedElements.value.length) return

  const ordered = [...selectedElements.value].sort((a, b) => {
    if ((a.y || 0) !== (b.y || 0)) return (a.y || 0) - (b.y || 0)
    return (a.x || 0) - (b.x || 0)
  })

  ordered.forEach((element, index) => {
    if (preset.type === 'auto') {
      projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, { animations: [] })
      return
    }

    projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, {
      animations: [{
        type: preset.type,
        delay: Math.max(0, Number(preset.delay) || 0) + (index * Math.max(0, Number(preset.stepDelay) || 0)),
        duration: Math.max(0.1, Number(preset.duration) || 0.72),
      }],
    })
  })

  projectStore.updateProject(editorStore.projectId, {
    settings: {
      ...projectSettings.value,
      motionPresets: (projectSettings.value.motionPresets || []).map((item) =>
        item.id === preset.id
          ? {
              ...item,
              usageCount: Math.max(0, Number(item.usageCount || 0)) + 1,
              lastUsedAt: Date.now(),
            }
          : item
      ),
    },
  })
}

function syncCanvasPresetSelection() {
  if (!groupMotionPresets.value.length) {
    canvasGroupPresetId.value = ''
    return
  }
  if (!groupMotionPresets.value.some((preset) => preset.id === canvasGroupPresetId.value)) {
    canvasGroupPresetId.value = groupMotionPresets.value[0].id
  }
}

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
const canvasTransform = computed(() => `scale(${interactionScale.value})`)

// Fit to container
function recalcScale() {
  if (!canvasContainerRef.value) return
  const { clientWidth, clientHeight } = canvasContainerRef.value
  const scaleX = (clientWidth - 80) / canvasWidth.value
  const scaleY = (clientHeight - 80) / canvasHeight.value
  scale.value = Math.min(scaleX, scaleY, 1)
}

// Resize observer
let ro = null
onMounted(() => {
  recalcScale()
  ro = new ResizeObserver(recalcScale)
  if (canvasContainerRef.value) ro.observe(canvasContainerRef.value)
  syncCanvasPresetSelection()
})
onBeforeUnmount(() => ro?.disconnect())

watch(groupMotionPresets, () => {
  syncCanvasPresetSelection()
}, { deep: true, immediate: true })

watch(canvasSize, () => {
  recalcScale()
}, { deep: true })

// Hovered and drag states
const isDragging = ref(false)
const selectionStart = ref({ x: 0, y: 0 })
const selectionCurrent = ref({ x: 0, y: 0 })
const isSelecting = ref(false)
const isImageDragOver = ref(false)
const isBlockDragOver = ref(false)
const blockDropPreview = ref(null)
const canvasGuide = computed(() => {
  if (canvasPreset.value?.id === 'mobile') {
    return {
      tone: 'mobile',
      label: 'Mobile safe area',
      style: {
        inset: '5% 8%',
        borderRadius: '28px',
      },
    }
  }

  if (canvasPreset.value?.id === 'square') {
    return {
      tone: 'square',
      label: 'Square composition guide',
      style: {
        inset: '8%',
        borderRadius: '24px',
      },
    }
  }

  return null
})
const canvasGuideRect = computed(() => {
  if (!canvasGuide.value) return null

  if (canvasGuide.value.tone === 'mobile') {
    const x = canvasWidth.value * 0.08
    const y = canvasHeight.value * 0.05
    return {
      x,
      y,
      width: canvasWidth.value - (x * 2),
      height: canvasHeight.value - (y * 2),
    }
  }

  const inset = canvasWidth.value * 0.08
  const insetY = canvasHeight.value * 0.08
  return {
    x: inset,
    y: insetY,
    width: canvasWidth.value - (inset * 2),
    height: canvasHeight.value - (insetY * 2),
  }
})
const unsafeElementIds = computed(() => {
  if (!canvasGuideRect.value) return []
  const safe = canvasGuideRect.value
  return sortedElements.value
    .filter((element) => element.visible !== false)
    .filter((element) => {
      const left = Number(element.x || 0)
      const top = Number(element.y || 0)
      const right = left + Number(element.width || 0)
      const bottom = top + Number(element.height || 0)

      return left < safe.x || top < safe.y || right > safe.x + safe.width || bottom > safe.y + safe.height
    })
    .map((element) => element.id)
})
const unsafeSelectedCount = computed(() =>
  editorStore.selectedElementIds.filter((id) => unsafeElementIds.value.includes(id)).length
)
const unsafeElementCount = computed(() => unsafeElementIds.value.length)
const canvasGuideWarning = computed(() => {
  if (!canvasGuide.value || !unsafeElementCount.value) return null

  if (unsafeSelectedCount.value) {
    return `${unsafeSelectedCount.value} selected ${unsafeSelectedCount.value === 1 ? 'element is' : 'elements are'} outside the ${canvasGuide.value.label.toLowerCase()}.`
  }

  return `${unsafeElementCount.value} ${unsafeElementCount.value === 1 ? 'element is' : 'elements are'} outside the ${canvasGuide.value.label.toLowerCase()}.`
})

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

function hasBlockPayload(dataTransfer) {
  if (!dataTransfer) return false
  return Array.from(dataTransfer.types || []).includes(CONTENT_BLOCK_DRAG_MIME)
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getBlockDropOrigin(block, pointerX, pointerY) {
  const bounds = getContentBlockBounds(block)
  const originX = clamp(pointerX - (bounds.width / 2), 0, Math.max(0, canvasWidth.value - bounds.width))
  const originY = clamp(pointerY - (bounds.height / 2), 0, Math.max(0, canvasHeight.value - bounds.height))

  return {
    x: originX,
    y: originY,
    bounds,
  }
}

function resolveDraggedBlock(dataTransfer) {
  if (!hasBlockPayload(dataTransfer)) return null

  try {
    const raw = dataTransfer.getData(CONTENT_BLOCK_DRAG_MIME)
    const payload = raw ? JSON.parse(raw) : null
    return payload?.id ? projectStore.getContentBlocks(editorStore.projectId).find((block) => block.id === payload.id) || null : null
  } catch {
    return null
  }
}

function updateBlockDropPreview(clientX, clientY, block) {
  if (!canvasRef.value || !block) {
    blockDropPreview.value = null
    return
  }

  const rect = canvasRef.value.getBoundingClientRect()
  const pointerX = (clientX - rect.left) / interactionScale.value
  const pointerY = (clientY - rect.top) / interactionScale.value
  const origin = getBlockDropOrigin(block, pointerX, pointerY)

  blockDropPreview.value = {
    block,
    x: origin.x,
    y: origin.y,
    bounds: origin.bounds,
  }
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
      const dropX = (clientX - rect.left) / interactionScale.value
      const dropY = (clientY - rect.top) / interactionScale.value
      const maxWidth = 420
      const maxHeight = 280
      const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1)
      const width = Math.max(120, Math.round(image.width * ratio))
      const height = Math.max(80, Math.round(image.height * ratio))
      const x = Math.max(0, Math.min(canvasWidth.value - width, Math.round(dropX - width / 2)))
      const y = Math.max(0, Math.min(canvasHeight.value - height, Math.round(dropY - height / 2)))

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
  const imageDrop = hasImageFiles(event.dataTransfer)
  const blockDrop = hasBlockPayload(event.dataTransfer)
  if (!imageDrop && !blockDrop) return
  event.preventDefault()
  event.dataTransfer.dropEffect = 'copy'
  isImageDragOver.value = imageDrop
  isBlockDragOver.value = blockDrop

  if (blockDrop) {
    updateBlockDropPreview(event.clientX, event.clientY, resolveDraggedBlock(event.dataTransfer))
  }
}

function onCanvasDragLeave(event) {
  if (event.currentTarget?.contains(event.relatedTarget)) return
  isImageDragOver.value = false
  isBlockDragOver.value = false
  blockDropPreview.value = null
}

function onCanvasDropFile(event) {
  const imageDrop = hasImageFiles(event.dataTransfer)
  const blockDrop = hasBlockPayload(event.dataTransfer)
  if (!imageDrop && !blockDrop) return
  event.preventDefault()
  isImageDragOver.value = false
  isBlockDragOver.value = false
  blockDropPreview.value = null

  if (blockDrop) {
    try {
      const block = resolveDraggedBlock(event.dataTransfer)
      if (!block) return
      const rect = canvasRef.value.getBoundingClientRect()
      const pointerX = (event.clientX - rect.left) / interactionScale.value
      const pointerY = (event.clientY - rect.top) / interactionScale.value
      const origin = getBlockDropOrigin(block, pointerX, pointerY)
      const created = projectStore.insertContentBlock(editorStore.projectId, editorStore.currentSlideId, block.id, { x: origin.x, y: origin.y })
      if (created.length) {
        editorStore.setSelection(created.map((element) => element.id))
        editorStore.setActiveTool('select')
        editorStore.focusPropertiesSection('content')
      }
    } catch (error) {
      console.warn('Failed to drop block onto canvas.', error)
    }
    return
  }

  const file = Array.from(event.dataTransfer.files || []).find(item => item.type.startsWith('image/'))
  if (file) addDroppedImage(file, event.clientX, event.clientY)
}

function applySelectionLayout(action) {
  if (selectedElements.value.length < 2) return

  const elements = [...selectedElements.value].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
  const left = Math.min(...elements.map((element) => Number(element.x || 0)))
  const top = Math.min(...elements.map((element) => Number(element.y || 0)))
  const right = Math.max(...elements.map((element) => Number(element.x || 0) + Number(element.width || 0)))
  const bottom = Math.max(...elements.map((element) => Number(element.y || 0) + Number(element.height || 0)))
  const centerX = left + ((right - left) / 2)
  const centerY = top + ((bottom - top) / 2)

  if (action === 'align-left') {
    elements.forEach((element) => projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, { x: left }, { persist: false }))
  }

  if (action === 'align-center') {
    elements.forEach((element) => {
      const width = Number(element.width || 0)
      projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, { x: centerX - (width / 2) }, { persist: false })
    })
  }

  if (action === 'align-right') {
    elements.forEach((element) => {
      const width = Number(element.width || 0)
      projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, { x: right - width }, { persist: false })
    })
  }

  if (action === 'align-top') {
    elements.forEach((element) => projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, { y: top }, { persist: false }))
  }

  if (action === 'align-middle') {
    elements.forEach((element) => {
      const height = Number(element.height || 0)
      projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, { y: centerY - (height / 2) }, { persist: false })
    })
  }

  if (action === 'align-bottom') {
    elements.forEach((element) => {
      const height = Number(element.height || 0)
      projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, { y: bottom - height }, { persist: false })
    })
  }

  if (action === 'distribute-horizontal') {
    const ordered = [...elements].sort((a, b) => (a.x || 0) - (b.x || 0))
    const totalWidth = ordered.reduce((sum, element) => sum + Number(element.width || 0), 0)
    const gap = ordered.length > 1 ? ((right - left - totalWidth) / (ordered.length - 1)) : 0
    let cursor = left
    ordered.forEach((element) => {
      projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, { x: cursor }, { persist: false })
      cursor += Number(element.width || 0) + gap
    })
  }

  if (action === 'distribute-vertical') {
    const ordered = [...elements].sort((a, b) => (a.y || 0) - (b.y || 0))
    const totalHeight = ordered.reduce((sum, element) => sum + Number(element.height || 0), 0)
    const gap = ordered.length > 1 ? ((bottom - top - totalHeight) / (ordered.length - 1)) : 0
    let cursor = top
    ordered.forEach((element) => {
      projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, { y: cursor }, { persist: false })
      cursor += Number(element.height || 0) + gap
    })
  }

  projectStore.commitProject(editorStore.projectId)
}

// Click/drop to add new element or start select marquee
function onCanvasMouseDown(e) {
  const tool = editorStore.activeTool
  if (e.target !== canvasRef.value && e.target !== e.currentTarget) return

  e.preventDefault()
  e.stopPropagation()

  const rect = canvasRef.value.getBoundingClientRect()
  const startX = (e.clientX - rect.left) / interactionScale.value
  const startY = (e.clientY - rect.top) / interactionScale.value

  if (tool === 'select') {
    // Start marquee selection
    isSelecting.value = true
    selectionStart.value = { x: startX, y: startY }
    selectionCurrent.value = { x: startX, y: startY }

    const onMouseMove = (moveEvt) => {
      selectionCurrent.value = {
        x: (moveEvt.clientX - rect.left) / interactionScale.value,
        y: (moveEvt.clientY - rect.top) / interactionScale.value
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
  chart: ChartElement,
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
        :class="[
          canvasGuide && `canvas-zoom-wrapper-${canvasGuide.tone}`,
        ]"
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
            width: canvasWidth + 'px',
            height: canvasHeight + 'px',
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
          <div v-if="canvasGuide" class="canvas-device-frame" aria-hidden="true"></div>
          <div v-if="editorStore.multiSelection && groupMotionPresets.length" class="selection-preset-chip" @mousedown.stop>
            <span class="selection-preset-label">Sequence</span>
            <select v-model="canvasGroupPresetId" class="selection-preset-select">
              <option v-for="preset in groupMotionPresets" :key="preset.id" :value="preset.id">{{ preset.name }}</option>
            </select>
            <button type="button" class="selection-preset-apply" @click.stop="applyCanvasGroupPreset">Apply</button>
          </div>

          <div v-if="canvasGuideWarning" class="canvas-guide-warning" @mousedown.stop>
            <span class="canvas-guide-warning-dot"></span>
            <span>{{ canvasGuideWarning }}</span>
          </div>

          <div
            v-if="blockDropPreview"
            class="block-drop-preview"
            :style="{
              left: `${blockDropPreview.x}px`,
              top: `${blockDropPreview.y}px`,
              width: `${blockDropPreview.bounds.width}px`,
              height: `${blockDropPreview.bounds.height}px`,
            }"
          >
            <div
              v-for="(element, index) in blockDropPreview.block.elements"
              :key="`${blockDropPreview.block.id}-preview-${index}`"
              class="block-drop-preview-el"
              :class="`block-drop-preview-${element.type}`"
              :style="{
                left: `${Number(element.x || 0) - blockDropPreview.bounds.minX}px`,
                top: `${Number(element.y || 0) - blockDropPreview.bounds.minY}px`,
                width: `${Number(element.width || 0)}px`,
                height: `${Number(element.height || 0)}px`,
                borderRadius: element.type === 'shape' && element.content?.shapeType === 'circle' ? '50%' : `${Number(element.content?.borderRadius || 12)}px`,
                background: element.type === 'shape'
                  ? (element.content?.fillColor || 'rgba(108,71,255,.18)')
                  : element.type === 'button'
                    ? (element.content?.bgColor || 'rgba(108,71,255,.32)')
                    : ['text', 'heading'].includes(element.type)
                      ? 'transparent'
                      : 'rgba(148,163,184,.18)',
              }"
            >
              <template v-if="['text', 'heading'].includes(element.type)">
                <span class="block-drop-preview-line"></span>
                <span class="block-drop-preview-line short"></span>
              </template>
            </div>
          </div>

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

          <div
            v-if="canvasGuide"
            class="canvas-guide"
            :class="[
              `canvas-guide-${canvasGuide.tone}`,
              unsafeElementCount && 'canvas-guide-warning-state',
            ]"
            :style="canvasGuide.style"
            aria-hidden="true"
          >
            <span class="canvas-guide-label">{{ canvasGuide.label }} · {{ canvasAspectLabel }}</span>
          </div>

          <!-- Drop hint when tool is active -->
          <div
            v-if="editorStore.activeTool !== 'select' || isImageDragOver || isBlockDragOver"
            class="drop-hint"
          >{{ isBlockDragOver ? 'Drop block to insert it here' : isImageDragOver ? 'Drop image to insert it on this slide' : `Click anywhere to add ${editorStore.activeTool}` }}</div>
          
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
        <span>{{ canvasWidth }} × {{ canvasHeight }}px</span>
        <span>·</span>
        <span>{{ slide.elements?.length || 0 }} elements</span>
        <span>·</span>
        <span :class="['playback-badge', `playback-badge-${playbackBadge.tone}`]">{{ playbackBadge.label }}</span>
        <span v-if="editorStore.hasSelection">· {{ editorStore.selectedElementIds.length }} selected</span>
        <template v-if="editorStore.multiSelection">
          <button class="bar-btn" @click="applySelectionLayout('align-left')">Left</button>
          <button class="bar-btn" @click="applySelectionLayout('align-center')">Center</button>
          <button class="bar-btn" @click="applySelectionLayout('align-right')">Right</button>
          <button class="bar-btn" @click="applySelectionLayout('align-top')">Top</button>
          <button class="bar-btn" @click="applySelectionLayout('align-middle')">Middle</button>
          <button class="bar-btn" @click="applySelectionLayout('align-bottom')">Bottom</button>
          <button class="bar-btn" @click="applySelectionLayout('distribute-horizontal')">Space H</button>
          <button class="bar-btn" @click="applySelectionLayout('distribute-vertical')">Space V</button>
        </template>
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
  position: relative;
  will-change: transform;
  cursor: default;
}
.canvas-zoom-wrapper-mobile,
.canvas-zoom-wrapper-square {
  filter: drop-shadow(0 24px 38px rgba(15, 23, 42, 0.24));
}
.canvas-device-frame {
  position: absolute;
  inset: -18px;
  border-radius: 30px;
  border: 1px solid rgba(15, 23, 42, 0.18);
  background: linear-gradient(180deg, rgba(255,255,255,.35), rgba(255,255,255,.12));
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.12), inset 0 0 0 1px rgba(255,255,255,.28);
  pointer-events: none;
}
.canvas-zoom-wrapper-mobile .canvas-device-frame::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 24%;
  max-width: 110px;
  height: 8px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.3);
}
.slide-canvas {
  position: relative;
  box-shadow: 0 8px 40px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.05);
  border-radius: 2px;
  overflow: hidden;
  cursor: default;
}
.canvas-guide {
  position: absolute;
  border: 2px dashed rgba(255,255,255,.72);
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.1);
  pointer-events: none;
  z-index: 8;
}
.canvas-guide-warning-state {
  border-color: rgba(248, 113, 113, 0.92);
  box-shadow: inset 0 0 0 1px rgba(127, 29, 29, 0.18), 0 0 0 1px rgba(248, 113, 113, 0.22);
}
.canvas-guide-mobile {
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
}
.canvas-guide-square {
  background: linear-gradient(180deg, rgba(108,71,255,.08), rgba(108,71,255,.03));
}
.canvas-guide-label {
  position: absolute;
  top: 10px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(10, 16, 31, 0.78);
  color: rgba(255,255,255,.88);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
}
.canvas-guide-warning {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 24;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 30px;
  max-width: min(320px, calc(100% - 28px));
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(127, 29, 29, 0.88);
  border: 1px solid rgba(248, 113, 113, 0.45);
  color: #fff1f2;
  font-size: 11px;
  font-weight: 600;
  line-height: 1.35;
  box-shadow: 0 14px 28px rgba(127, 29, 29, 0.2);
}
.canvas-guide-warning-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #fca5a5;
  flex: 0 0 auto;
}
.selection-preset-chip {
  position: absolute;
  top: 14px;
  left: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(10, 16, 31, 0.92);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 14px 30px rgba(0,0,0,.24);
  z-index: 30;
}
.selection-preset-label {
  color: rgba(255,255,255,.72);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
}
.selection-preset-select {
  min-width: 150px;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  outline: none;
}
.selection-preset-select option {
  color: #111827;
}
.selection-preset-apply {
  border: 1px solid rgba(108,71,255,.35);
  background: rgba(108,71,255,.18);
  color: #f5f3ff;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}
.selection-preset-apply:hover {
  background: rgba(108,71,255,.28);
}
.block-drop-preview {
  position: absolute;
  pointer-events: none;
  z-index: 18;
  border: 2px dashed rgba(108, 71, 255, 0.48);
  background: rgba(108, 71, 255, 0.06);
  border-radius: 18px;
  box-shadow: 0 18px 44px rgba(108, 71, 255, 0.16);
}
.block-drop-preview-el {
  position: absolute;
  overflow: hidden;
  opacity: 0.72;
  border: 1px solid rgba(108, 71, 255, 0.18);
}
.block-drop-preview-text,
.block-drop-preview-heading {
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  padding: 6px 8px;
  border: none;
}
.block-drop-preview-line {
  display: block;
  height: 12px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.24);
}
.block-drop-preview-heading .block-drop-preview-line {
  height: 16px;
  background: rgba(15, 23, 42, 0.34);
}
.block-drop-preview-line.short {
  width: 68%;
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
.playback-badge {
  display: inline-flex;
  align-items: center;
  min-height: 20px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  border: 1px solid transparent;
}
.playback-badge-manual {
  color: rgba(255,255,255,.72);
  background: rgba(255,255,255,.07);
  border-color: rgba(255,255,255,.1);
}
.playback-badge-auto {
  color: #bfdbfe;
  background: rgba(37, 99, 235, .18);
  border-color: rgba(96, 165, 250, .34);
}
.playback-badge-media {
  color: #bbf7d0;
  background: rgba(22, 163, 74, .18);
  border-color: rgba(74, 222, 128, .34);
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
