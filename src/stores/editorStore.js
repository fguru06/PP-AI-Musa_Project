import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useEditorStore = defineStore('editor', () => {
  // Current project/slide
  const projectId = ref(null)
  const currentSlideId = ref(null)
  const selectedElementIds = ref([])
  const hoveredElementId = ref(null)

  // Tool state
  const activeTool = ref('select') // 'select' | 'text' | 'heading' | 'image' | 'shape' | 'button' | 'hotspot' | 'video' | 'audio' | 'quiz' | 'chart'
  const activeShape = ref('rectangle') // for shape tool
  const rightPanelTab = ref('properties') // 'properties' | 'layers' | 'ai' | 'theme'
  const leftPanelTab = ref('slides') // 'slides' | 'blocks'
  const propertiesPanelSection = ref('')
  const aiPanelMode = ref('generate')

  // UI state
  const isFullscreen = ref(false)
  const showGrid = ref(false)
  const snapToGrid = ref(true)
  const gridSize = ref(20)
  const showRulers = ref(false)
  const zoomLevel = ref(1)
  const isSaving = ref(false)
  const showExportModal = ref(false)
  const showInteractionEditor = ref(false)
  const interactionElementId = ref(null)
  const showThemeManager = ref(false)
  const showAIPanel = ref(false)
  const showSlidePanel = ref(true)

  // Clipboard
  const clipboard = ref(null)

  // History (undo/redo)
  const history = ref([])
  const historyIndex = ref(-1)
  const MAX_HISTORY = 20

  // Drag state (managed by canvas)
  const isDragging = ref(false)
  const isResizing = ref(false)
  const resizeHandle = ref(null)

  // Canvas scroll/pan
  const panX = ref(0)
  const panY = ref(0)

  const selectedElementId = computed(() =>
    selectedElementIds.value.length === 1 ? selectedElementIds.value[0] : null
  )

  const hasSelection = computed(() => selectedElementIds.value.length > 0)
  const multiSelection = computed(() => selectedElementIds.value.length > 1)

  function setProject(id) {
    projectId.value = id
    selectedElementIds.value = []
    history.value = []
    historyIndex.value = -1
    zoomLevel.value = 1
  }

  function setCurrentSlide(id) {
    currentSlideId.value = id
    selectedElementIds.value = []
  }

  function selectElement(id, append = false) {
    if (append && id) {
      if (selectedElementIds.value.includes(id)) {
        selectedElementIds.value = selectedElementIds.value.filter(i => i !== id)
      } else {
        selectedElementIds.value = [...selectedElementIds.value, id]
      }
    } else {
      selectedElementIds.value = id ? [id] : []
    }
  }
  
  function setSelection(ids) {
    selectedElementIds.value = ids
  }

  function clearSelection() {
    selectedElementIds.value = []
  }

  function setActiveTool(tool) {
    activeTool.value = tool
    if (tool !== 'select') {
      selectedElementIds.value = []
    }
  }

  function setRightPanel(tab) {
    rightPanelTab.value = tab
  }

  function openLeftPanel(tab = 'slides') {
    leftPanelTab.value = tab
    showSlidePanel.value = true
  }

  function focusPropertiesSection(section = 'geometry') {
    rightPanelTab.value = 'properties'
    propertiesPanelSection.value = section
  }

  function openAIPanel(mode = 'generate') {
    showAIPanel.value = true
    rightPanelTab.value = 'ai'
    aiPanelMode.value = mode
  }

  function setZoom(level) {
    zoomLevel.value = Math.max(0.25, Math.min(3, level))
  }

  function zoomIn() { setZoom(zoomLevel.value + 0.1) }
  function zoomOut() { setZoom(zoomLevel.value - 0.1) }
  function zoomReset() { setZoom(1) }

  function toggleGrid() { showGrid.value = !showGrid.value }
  function toggleSnap() { snapToGrid.value = !snapToGrid.value }
  function toggleSlidePanel(tab = leftPanelTab.value || 'slides') {
    if (showSlidePanel.value && leftPanelTab.value === tab) {
      showSlidePanel.value = false
      return
    }

    leftPanelTab.value = tab
    showSlidePanel.value = true
  }

  function pushHistory(snapshot) {
    // Trim future
    if (historyIndex.value < history.value.length - 1) {
      history.value.splice(historyIndex.value + 1)
    }
    history.value.push(JSON.parse(JSON.stringify(snapshot)))
    if (history.value.length > MAX_HISTORY) {
      history.value.shift()
    }
    historyIndex.value = history.value.length - 1
  }

  function canUndo() { return historyIndex.value > 0 }
  function canRedo() { return historyIndex.value < history.value.length - 1 }

  function undo() {
    if (canUndo()) {
      historyIndex.value--
      return JSON.parse(JSON.stringify(history.value[historyIndex.value]))
    }
    return null
  }

  function redo() {
    if (canRedo()) {
      historyIndex.value++
      return JSON.parse(JSON.stringify(history.value[historyIndex.value]))
    }
    return null
  }

  function setClipboard(element) {
    clipboard.value = JSON.parse(JSON.stringify(element))
  }

  return {
    projectId, currentSlideId, selectedElementIds, selectedElementId,
    hoveredElementId, activeTool, activeShape, rightPanelTab, leftPanelTab,
    propertiesPanelSection, aiPanelMode,
    isFullscreen, showGrid, snapToGrid, gridSize, showRulers,
    zoomLevel, isSaving, showExportModal, showInteractionEditor,
    interactionElementId, showThemeManager, showAIPanel,
    showSlidePanel,
    clipboard, isDragging, isResizing, resizeHandle, panX, panY,
    hasSelection, multiSelection,
    setProject, setCurrentSlide, selectElement, setSelection, clearSelection,
    setActiveTool, setRightPanel, openLeftPanel, focusPropertiesSection, openAIPanel, setZoom, zoomIn, zoomOut, zoomReset,
    toggleGrid, toggleSnap, toggleSlidePanel, pushHistory, canUndo, canRedo, undo, redo,
    setClipboard,
  }
})
