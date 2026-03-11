<script setup>
import { computed, ref, watch } from 'vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'
import { CANVAS_SIZE_PRESETS, formatCanvasAspectRatio, getProjectCanvasSize, matchCanvasSizePreset, normalizeCanvasSettings } from '@/lib/canvas'
import { buildThemeChartContent, buildThemeChartPalette, paletteToText, parseChartData, parseChartPalette, serializeChartData } from '@/lib/chart'
import MotionLibraryPanel from './MotionLibraryPanel.vue'

const editorStore = useEditorStore()
const projectStore = useProjectStore()

const project = computed(() => projectStore.getProject(editorStore.projectId))
const slide = computed(() => project.value?.slides?.find(s => s.id === editorStore.currentSlideId))
const projectSettings = computed(() => ({
  autoPlay: false,
  loop: false,
  showProgress: true,
  showNavControls: true,
  allowKeyboardNav: true,
  motionPresets: [],
  ...(project.value?.settings || {}),
}))
const canvasSize = computed(() => getProjectCanvasSize(projectSettings.value))
const selectedCanvasPreset = computed(() => matchCanvasSizePreset(projectSettings.value))
const canvasAspectLabel = computed(() => formatCanvasAspectRatio(canvasSize.value.width, canvasSize.value.height))
const maintainCanvasProportions = ref(true)
const slideSettingsTab = ref('canvas')
const projectMotionPresets = computed(() => Array.isArray(projectSettings.value.motionPresets) ? projectSettings.value.motionPresets : [])
const singleMotionPresets = computed(() => projectMotionPresets.value.filter((preset) => preset.scope !== 'group'))
const groupMotionPresets = computed(() => projectMotionPresets.value.filter((preset) => preset.scope === 'group'))
const selectedElements = computed(() => {
  const ids = new Set(editorStore.selectedElementIds)
  return (slide.value?.elements || []).filter((element) => ids.has(element.id))
})
const selectedEl = computed(() =>
  editorStore.selectedElementId
    ? slide.value?.elements?.find(e => e.id === editorStore.selectedElementId)
    : null
)
const showMotionLibrary = computed(() => editorStore.multiSelection || Boolean(selectedEl.value))
const activeMotionScope = computed(() => editorStore.multiSelection ? 'group' : 'single')
const selectedAnimation = computed(() => {
  const animation = selectedEl.value?.animations?.[0]
  return {
    type: animation?.type || 'auto',
    delay: Number(animation?.delay || 0),
    duration: Number(animation?.duration || 0.64),
  }
})
const groupAnimation = computed(() => {
  const animations = selectedElements.value.map((element) => element.animations?.[0] || null)
  const firstType = animations[0]?.type || 'auto'
  const firstDuration = Number(animations[0]?.duration || 0.64)
  const sameType = animations.every((animation) => (animation?.type || 'auto') === firstType)
  const sameDuration = animations.every((animation) => Number(animation?.duration || 0.64) === firstDuration)
  return {
    type: sameType ? firstType : 'mixed',
    duration: sameDuration ? firstDuration : 0.64,
  }
})
const singlePreviewSeed = ref(0)
const groupPreviewSeed = ref(0)
const singlePresetName = ref('')
const groupPresetName = ref('')
const editingPresetId = ref('')
const presetDraftName = ref('')
const presetDraftCategory = ref('')
const presetDraftTags = ref('')
const draggingPresetId = ref('')
const dragOverPresetId = ref('')
const singlePresetCategory = ref('')
const singlePresetTags = ref('')
const groupPresetCategory = ref('')
const groupPresetTags = ref('')
const presetSearchQuery = ref('')
const presetCategoryFilter = ref('all')
const presetImportInput = ref(null)
const chartImportInput = ref(null)
const pendingImportedPresets = ref([])
const importScopeFilter = ref('all')
const importConflictMode = ref('replace')
const chartImportDraft = ref('')

// Local copy of element for editing
const local = ref({})
watch(selectedEl, (el) => {
  if (el) local.value = JSON.parse(JSON.stringify(el))
  else local.value = {}

  if (el?.type === 'chart') {
    chartImportDraft.value = ''
  }
}, { immediate: true, deep: true })

function update(patch) {
  if (!selectedEl.value) return
  projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, selectedEl.value.id, patch)
}

function updateContent(patch) {
  if (!selectedEl.value) return
  const newContent = { ...selectedEl.value.content, ...patch }
  update({ content: newContent })
}

function updateGeometry(key, rawVal) {
  const val = parseFloat(rawVal)
  if (isNaN(val)) return
  update({ [key]: val })
}

// Slide background editing
const slideLocal = ref({})
watch(slide, (s) => { if (s) slideLocal.value = { ...s } }, { immediate: true })

function updateSlide(patch) {
  if (!slide.value) return
  projectStore.updateSlide(editorStore.projectId, slide.value.id, patch)
}

function updateProjectSettings(patch) {
  if (!project.value) return
  const nextSettings = {
    ...projectSettings.value,
    ...patch,
  }
  projectStore.updateProject(editorStore.projectId, {
    settings: {
      ...nextSettings,
      ...normalizeCanvasSettings(nextSettings),
    },
  })
}

function applyCanvasPreset(preset) {
  updateProjectSettings({
    slideWidth: preset.width,
    slideHeight: preset.height,
  })
}

function updateCanvasDimension(dimension, rawValue) {
  const nextValue = Math.round(Number(rawValue) || 0)
  if (!nextValue) return

  const nextPatch = { [`slide${dimension === 'width' ? 'Width' : 'Height'}`]: nextValue }

  if (maintainCanvasProportions.value) {
    const baseWidth = canvasSize.value.width
    const baseHeight = canvasSize.value.height
    if (dimension === 'width') {
      nextPatch.slideHeight = Math.round(nextValue * (baseHeight / baseWidth))
    } else {
      nextPatch.slideWidth = Math.round(nextValue * (baseWidth / baseHeight))
    }
  }

  updateProjectSettings(nextPatch)
}

const chartThemeDefaults = computed(() => buildThemeChartContent(project.value?.theme || {}))
const chartPalettePreview = computed(() => {
  if (selectedEl.value?.type !== 'chart') return []

  const paletteSource = selectedEl.value.content?.paletteText || chartThemeDefaults.value.paletteText
  return parseChartPalette(paletteSource)
})

function normalizeChartDataText(rawText) {
  const parsed = parseChartData(rawText, { fallbackToDefault: false })
  return parsed.length ? serializeChartData(parsed) : ''
}

function applyChartImport(rawText) {
  if (selectedEl.value?.type !== 'chart') return

  const normalized = normalizeChartDataText(rawText)
  if (!normalized) return

  updateContent({ dataText: normalized })
  chartImportDraft.value = ''
}

async function importChartDataFile(event) {
  const input = event.target
  const file = input?.files?.[0]
  if (!file) return

  try {
    const content = await file.text()
    applyChartImport(content)
  } finally {
    if (input) input.value = ''
  }
}

function triggerChartImport() {
  chartImportInput.value?.click()
}

function normalizeSelectedChartData() {
  if (selectedEl.value?.type !== 'chart') return
  const normalized = normalizeChartDataText(selectedEl.value.content?.dataText || '')
  if (!normalized) return
  updateContent({ dataText: normalized })
}

function applyThemeToSelectedChart() {
  if (selectedEl.value?.type !== 'chart') return
  updateContent({
    ...chartThemeDefaults.value,
  })
}

function useAutoChartPalette() {
  if (selectedEl.value?.type !== 'chart') return
  updateContent({ paletteText: chartThemeDefaults.value.paletteText })
}

function parsePresetTags(rawTags) {
  return String(rawTags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function normalizeImportedMotionPreset(preset) {
  const scope = preset?.scope === 'group' ? 'group' : 'single'
  return {
    id: `motion-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    scope,
    name: String(preset?.name || 'Imported Preset').trim() || 'Imported Preset',
    category: String(preset?.category || '').trim(),
    tags: Array.isArray(preset?.tags) ? preset.tags.map((tag) => String(tag).trim()).filter(Boolean) : parsePresetTags(preset?.tags),
    type: String(preset?.type || 'auto'),
    delay: Math.max(0, Number(preset?.delay) || 0),
    duration: Math.max(0.1, Number(preset?.duration) || 0.72),
    stepDelay: Math.max(0, Number(preset?.stepDelay) || 0),
  }
}

const availablePresetCategories = computed(() => {
  const categories = new Set(projectMotionPresets.value.map((preset) => preset.category).filter(Boolean))
  return [...categories].sort((left, right) => left.localeCompare(right))
})
const recentMotionPresets = computed(() =>
  [...projectMotionPresets.value]
    .filter((preset) => Number(preset.usageCount || 0) > 0)
    .sort((left, right) => {
      const timeDiff = Number(right.lastUsedAt || 0) - Number(left.lastUsedAt || 0)
      if (timeDiff !== 0) return timeDiff
      return Number(right.usageCount || 0) - Number(left.usageCount || 0)
    })
    .slice(0, 6)
)
const filteredPendingImports = computed(() => {
  if (importScopeFilter.value === 'all') return pendingImportedPresets.value
  return pendingImportedPresets.value.filter((preset) => preset.scope === importScopeFilter.value)
})

function presetMatchesFilters(preset) {
  const query = presetSearchQuery.value.trim().toLowerCase()
  const categoryFilter = presetCategoryFilter.value
  const matchesCategory = categoryFilter === 'all' || (preset.category || '') === categoryFilter
  if (!matchesCategory) return false
  if (!query) return true

  return [preset.name, preset.category, ...(preset.tags || [])]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(query))
}

const filteredSingleMotionPresets = computed(() => singleMotionPresets.value.filter(presetMatchesFilters))
const filteredGroupMotionPresets = computed(() => groupMotionPresets.value.filter(presetMatchesFilters))
const recentPresetsForActiveScope = computed(() =>
  recentMotionPresets.value.filter((preset) => activeMotionScope.value === 'group' ? preset.scope === 'group' : preset.scope !== 'group')
)

function persistMotionPreset(preset) {
  const normalizedName = String(preset.name || '').trim()
  if (!normalizedName) return

  const existing = projectMotionPresets.value.findIndex((item) => item.scope === preset.scope && item.name.toLowerCase() === normalizedName.toLowerCase())
  const nextPreset = {
    ...preset,
    id: existing >= 0 ? projectMotionPresets.value[existing].id : `motion-${Date.now()}`,
    name: normalizedName,
    category: String(preset.category || '').trim(),
    tags: Array.isArray(preset.tags) ? preset.tags : parsePresetTags(preset.tags),
  }
  const nextPresets = [...projectMotionPresets.value]

  if (existing >= 0) nextPresets.splice(existing, 1, nextPreset)
  else nextPresets.push(nextPreset)

  updateProjectSettings({ motionPresets: nextPresets })
}

function updateMotionPresetById(presetId, patch) {
  const nextPresets = projectMotionPresets.value.map((preset) =>
    preset.id === presetId ? { ...preset, ...patch } : preset
  )
  updateProjectSettings({ motionPresets: nextPresets })
}

function recordMotionPresetUsage(presetId) {
  const target = projectMotionPresets.value.find((preset) => preset.id === presetId)
  if (!target) return
  updateMotionPresetById(presetId, {
    usageCount: Math.max(0, Number(target.usageCount || 0)) + 1,
    lastUsedAt: Date.now(),
  })
}

function buildUniquePresetName(scope, baseName) {
  const existingNames = projectMotionPresets.value
    .filter((preset) => preset.scope === scope)
    .map((preset) => preset.name.toLowerCase())
  const root = String(baseName || 'Preset').trim() || 'Preset'

  if (!existingNames.includes(root.toLowerCase())) return root

  let copyIndex = 2
  let candidate = `${root} Copy`
  while (existingNames.includes(candidate.toLowerCase())) {
    candidate = `${root} Copy ${copyIndex}`
    copyIndex += 1
  }
  return candidate
}

function deleteMotionPreset(presetId) {
  updateProjectSettings({ motionPresets: projectMotionPresets.value.filter((preset) => preset.id !== presetId) })
  if (editingPresetId.value === presetId) {
    editingPresetId.value = ''
    presetDraftName.value = ''
  }
}

function duplicateMotionPreset(preset) {
  persistMotionPreset({
    ...preset,
    id: undefined,
    name: buildUniquePresetName(preset.scope, preset.name),
  })
}

function startPresetRename(preset) {
  editingPresetId.value = preset.id
  presetDraftName.value = preset.name
  presetDraftCategory.value = preset.category || ''
  presetDraftTags.value = Array.isArray(preset.tags) ? preset.tags.join(', ') : ''
}

function cancelPresetRename() {
  editingPresetId.value = ''
  presetDraftName.value = ''
  presetDraftCategory.value = ''
  presetDraftTags.value = ''
}

function savePresetRename(presetId) {
  const nextName = String(presetDraftName.value || '').trim()
  if (!nextName) return
  updateMotionPresetById(presetId, {
    name: nextName,
    category: String(presetDraftCategory.value || '').trim(),
    tags: parsePresetTags(presetDraftTags.value),
  })
  cancelPresetRename()
}

function reorderScopedPresets(scope, sourceId, targetId) {
  if (!sourceId || !targetId || sourceId === targetId) return

  const scopedPresets = projectMotionPresets.value.filter((preset) => preset.scope === scope)
  const sourceIndex = scopedPresets.findIndex((preset) => preset.id === sourceId)
  const targetIndex = scopedPresets.findIndex((preset) => preset.id === targetId)
  if (sourceIndex === -1 || targetIndex === -1) return

  const reorderedScope = [...scopedPresets]
  const [movedPreset] = reorderedScope.splice(sourceIndex, 1)
  reorderedScope.splice(targetIndex, 0, movedPreset)

  const otherPresets = projectMotionPresets.value.filter((preset) => preset.scope !== scope)
  const orderedPresets = []

  projectMotionPresets.value.forEach((preset) => {
    if (preset.scope === scope) {
      if (reorderedScope.length) orderedPresets.push(reorderedScope.shift())
      return
    }
    const nextOther = otherPresets.shift()
    if (nextOther) orderedPresets.push(nextOther)
  })

  updateProjectSettings({ motionPresets: orderedPresets })
}

function onPresetDragStart(preset) {
  draggingPresetId.value = preset.id
  dragOverPresetId.value = preset.id
}

function onPresetDragEnter(preset) {
  if (!draggingPresetId.value) return
  dragOverPresetId.value = preset.id
}

function onPresetDrop(preset) {
  if (!draggingPresetId.value) return
  reorderScopedPresets(preset.scope, draggingPresetId.value, preset.id)
  draggingPresetId.value = ''
  dragOverPresetId.value = ''
}

function onPresetDragEnd() {
  draggingPresetId.value = ''
  dragOverPresetId.value = ''
}

function replaySingleMotionPreview() {
  singlePreviewSeed.value += 1
}

function replayGroupMotionPreview() {
  groupPreviewSeed.value += 1
}

// Helper for input key down to commit on enter
function commitSlide(key, val) {
  updateSlide({ [key]: val })
}

function updateSlideDuration(rawVal) {
  const value = Math.max(0, Number(rawVal) || 0)
  updateSlide({ duration: value })
}

function updateElementAnimation(patch) {
  if (!selectedEl.value) return

  const current = selectedEl.value.animations?.[0] || { type: 'auto', delay: 0, duration: 0.64 }
  const next = {
    ...current,
    ...patch,
  }

  if (next.type === 'auto') {
    update({ animations: [] })
    return
  }

  update({
    animations: [{
      type: next.type || 'none',
      delay: Math.max(0, Number(next.delay) || 0),
      duration: Math.max(0.1, Number(next.duration) || 0.64),
    }],
  })
}

const groupAnimationType = ref('stagger-in')
const groupAnimationBaseDelay = ref(0)
const groupAnimationStep = ref(0.12)
const groupAnimationDuration = ref(0.72)

watch(selectedElements, (elements) => {
  if (!elements.length) return
  groupAnimationType.value = groupAnimation.value.type === 'mixed' ? 'stagger-in' : groupAnimation.value.type
  groupAnimationDuration.value = groupAnimation.value.duration
}, { immediate: true, deep: true })

function applyAnimationSequence() {
  if (!selectedElements.value.length) return

  const ordered = [...selectedElements.value].sort((a, b) => {
    if ((a.y || 0) !== (b.y || 0)) return (a.y || 0) - (b.y || 0)
    return (a.x || 0) - (b.x || 0)
  })

  ordered.forEach((element, index) => {
    if (groupAnimationType.value === 'auto') {
      projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, { animations: [] })
      return
    }

    projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, element.id, {
      animations: [{
        type: groupAnimationType.value,
        delay: Math.max(0, Number(groupAnimationBaseDelay.value) || 0) + (index * Math.max(0, Number(groupAnimationStep.value) || 0)),
        duration: Math.max(0.1, Number(groupAnimationDuration.value) || 0.72),
      }],
    })
  })
}

function applyGroupPreset(preset) {
  groupAnimationType.value = preset.type || 'stagger-in'
  groupAnimationBaseDelay.value = Number(preset.delay || 0)
  groupAnimationStep.value = Number(preset.stepDelay || 0)
  groupAnimationDuration.value = Number(preset.duration || 0.72)
  recordMotionPresetUsage(preset.id)
  replayGroupMotionPreview()
}

function saveGroupPreset() {
  persistMotionPreset({
    scope: 'group',
    name: groupPresetName.value,
    category: groupPresetCategory.value,
    tags: parsePresetTags(groupPresetTags.value),
    type: groupAnimationType.value,
    delay: Math.max(0, Number(groupAnimationBaseDelay.value) || 0),
    stepDelay: Math.max(0, Number(groupAnimationStep.value) || 0),
    duration: Math.max(0.1, Number(groupAnimationDuration.value) || 0.72),
  })
  groupPresetName.value = ''
  groupPresetCategory.value = ''
  groupPresetTags.value = ''
}

function applySinglePreset(preset) {
  updateElementAnimation({
    type: preset.type || 'auto',
    delay: Number(preset.delay || 0),
    duration: Number(preset.duration || 0.72),
  })
  recordMotionPresetUsage(preset.id)
  replaySingleMotionPreview()
}

function saveSinglePreset() {
  persistMotionPreset({
    scope: 'single',
    name: singlePresetName.value,
    category: singlePresetCategory.value,
    tags: parsePresetTags(singlePresetTags.value),
    type: selectedAnimation.value.type,
    delay: Math.max(0, Number(selectedAnimation.value.delay) || 0),
    stepDelay: 0,
    duration: Math.max(0.1, Number(selectedAnimation.value.duration) || 0.72),
  })
  singlePresetName.value = ''
  singlePresetCategory.value = ''
  singlePresetTags.value = ''
}

function triggerPresetImport() {
  presetImportInput.value?.click()
}

async function importMotionPresets(event) {
  const input = event.target
  const file = input?.files?.[0]
  if (!file) return

  try {
    const content = await file.text()
    const parsed = JSON.parse(content)
    const rawPresets = Array.isArray(parsed) ? parsed : Array.isArray(parsed.motionPresets) ? parsed.motionPresets : []
    if (!rawPresets.length) return

    pendingImportedPresets.value = rawPresets.map((preset) => ({
      ...normalizeImportedMotionPreset(preset),
      selected: true,
      importName: String(preset?.name || 'Imported Preset').trim() || 'Imported Preset',
    }))
  } catch {
    // Keep failure silent in the panel and leave existing presets unchanged.
  } finally {
    if (input) input.value = ''
  }
}

function clearPendingImports() {
  pendingImportedPresets.value = []
}

function applyImportedPresets() {
  const selectedImports = pendingImportedPresets.value.filter((preset) => preset.selected)
  if (!selectedImports.length) return

  const mergedPresets = [...projectMotionPresets.value]
  selectedImports.forEach((preset) => {
    const existingIndex = mergedPresets.findIndex((item) => item.scope === preset.scope && item.name.toLowerCase() === preset.name.toLowerCase())
    if (existingIndex >= 0) {
      if (importConflictMode.value === 'replace') {
        mergedPresets.splice(existingIndex, 1, { ...mergedPresets[existingIndex], ...preset, id: mergedPresets[existingIndex].id })
      } else {
        mergedPresets.push({
          ...preset,
          id: `motion-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          name: buildUniquePresetName(preset.scope, preset.name),
        })
      }
      return
    }
    mergedPresets.push(preset)
  })

  updateProjectSettings({ motionPresets: mergedPresets })
  clearPendingImports()
}

function exportMotionPresets() {
  if (!projectMotionPresets.value.length) return
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    motionPresets: projectMotionPresets.value.map(({ id, ...preset }) => preset),
  }
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const baseName = String(project.value?.name || 'project').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'project'
  link.href = url
  link.download = `${baseName}-motion-presets.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const singlePreviewNodes = computed(() => [{
  id: `single-${singlePreviewSeed.value}`,
  delay: Math.max(0, Number(selectedAnimation.value.delay) || 0),
  duration: Math.max(0.1, Number(selectedAnimation.value.duration) || 0.72),
  type: selectedAnimation.value.type,
}])

const groupPreviewNodes = computed(() => Array.from({ length: Math.min(Math.max(selectedElements.value.length, 3), 5) }, (_, index) => ({
  id: `group-${groupPreviewSeed.value}-${index}`,
  delay: Math.max(0, Number(groupAnimationBaseDelay.value) || 0) + (index * Math.max(0, Number(groupAnimationStep.value) || 0)),
  duration: Math.max(0.1, Number(groupAnimationDuration.value) || 0.72),
  type: groupAnimationType.value,
})))

const elementMotionOptions = [
  { value: 'auto', label: 'Auto by element type' },
  { value: 'none', label: 'No entrance animation' },
  { value: 'fade-up', label: 'Fade Up' },
  { value: 'fade-up-strong', label: 'Fade Up Strong' },
  { value: 'fade-left', label: 'Fade Left' },
  { value: 'fade-right', label: 'Fade Right' },
  { value: 'zoom-in', label: 'Zoom In' },
  { value: 'pop-in', label: 'Pop In' },
  { value: 'soft-pop', label: 'Soft Pop' },
  { value: 'stagger-in', label: 'Stagger In' },
]
const motionPreviewOptions = [
  { value: 'auto', label: 'Auto', sampleClass: 'motion-sample-auto' },
  { value: 'none', label: 'None', sampleClass: 'motion-sample-none' },
  { value: 'fade-up', label: 'Fade Up', sampleClass: 'motion-sample-fade-up' },
  { value: 'fade-up-strong', label: 'Fade Strong', sampleClass: 'motion-sample-fade-up-strong' },
  { value: 'fade-left', label: 'Fade Left', sampleClass: 'motion-sample-fade-left' },
  { value: 'fade-right', label: 'Fade Right', sampleClass: 'motion-sample-fade-right' },
  { value: 'zoom-in', label: 'Zoom In', sampleClass: 'motion-sample-zoom-in' },
  { value: 'pop-in', label: 'Pop In', sampleClass: 'motion-sample-pop-in' },
  { value: 'soft-pop', label: 'Soft Pop', sampleClass: 'motion-sample-soft-pop' },
  { value: 'stagger-in', label: 'Stagger In', sampleClass: 'motion-sample-stagger-in' },
]

const fontFamilies = [
  'Inter, sans-serif',
  'Poppins, sans-serif',
  'Montserrat, sans-serif',
  'Roboto, sans-serif',
  'Lato, sans-serif',
  '"Open Sans", sans-serif',
  'Raleway, sans-serif',
  'Nunito, sans-serif',
  'Arial, sans-serif',
  '"Trebuchet MS", sans-serif',
  'Tahoma, sans-serif',
  'Georgia, serif',
  '"Playfair Display", serif',
  'Merriweather, serif',
  '"Times New Roman", serif',
  'Verdana, sans-serif',
  '"Courier New", monospace',
  'Pacifico, cursive',
  'Caveat, cursive',
  '"Bebas Neue", sans-serif',
]
</script>

<template>
  <div class="properties-panel">
    <input ref="presetImportInput" type="file" accept="application/json,.json" style="display:none" @change="importMotionPresets" />
    <input ref="chartImportInput" type="file" accept=".csv,.txt,text/csv,text/plain" style="display:none" @change="importChartDataFile" />
    <div class="panel-section autosave-note">
      Changes apply instantly
    </div>

    <MotionLibraryPanel
      v-if="showMotionLibrary"
      :search-query="presetSearchQuery"
      :category-filter="presetCategoryFilter"
      :available-categories="availablePresetCategories"
      :recent-presets="recentPresetsForActiveScope"
      :pending-imported-presets="pendingImportedPresets"
      :filtered-pending-imports="filteredPendingImports"
      :import-scope-filter="importScopeFilter"
      :import-conflict-mode="importConflictMode"
      @update:search-query="presetSearchQuery = $event"
      @update:category-filter="presetCategoryFilter = $event"
      @trigger-import="triggerPresetImport"
      @export-presets="exportMotionPresets"
      @apply-preset="activeMotionScope === 'group' ? applyGroupPreset($event) : applySinglePreset($event)"
      @clear-imports="clearPendingImports"
      @update:import-scope-filter="importScopeFilter = $event"
      @update:import-conflict-mode="importConflictMode = $event"
      @apply-imports="applyImportedPresets"
    />

    <template v-if="editorStore.multiSelection">
      <div class="panel-section">
        <div class="panel-title">Group Motion</div>
        <div class="field-hint">{{ selectedElements.length }} elements selected. Apply one timed sequence to the whole selection.</div>
        <div class="motion-scrubber-shell">
          <div class="motion-scrubber-header">
            <span class="motion-scrubber-title">Sequence Preview</span>
            <button type="button" class="btn btn-secondary btn-sm" @click="replayGroupMotionPreview">Replay</button>
          </div>
          <div class="motion-scrubber-stage" :key="`group-preview-${groupPreviewSeed}`">
            <span
              v-for="node in groupPreviewNodes"
              :key="node.id"
              :class="['motion-scrubber-node', `motion-preview-live-${node.type === 'auto' ? 'fade-up' : node.type}`]"
              :style="{ '--preview-delay': `${node.delay}s`, '--preview-duration': `${node.duration}s` }"
            />
          </div>
        </div>
        <div class="motion-card-grid" style="margin-top:var(--space-3)">
          <button
            v-for="option in motionPreviewOptions"
            :key="`group-${option.value}`"
            type="button"
            :class="['motion-card', groupAnimationType === option.value && 'active']"
            @click="groupAnimationType = option.value"
          >
            <span class="motion-preview">
              <span :class="['motion-preview-dot', option.sampleClass]" />
              <span v-if="option.value === 'stagger-in'" class="motion-preview-dot motion-preview-dot-secondary motion-sample-stagger-in-secondary" />
              <span v-if="option.value === 'stagger-in'" class="motion-preview-dot motion-preview-dot-tertiary motion-sample-stagger-in-tertiary" />
            </span>
            <span class="motion-card-label">{{ option.label }}</span>
          </button>
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Start Delay (seconds)</label>
            <input type="number" min="0" step="0.05" v-model="groupAnimationBaseDelay" class="input" />
          </div>
          <div class="form-group">
            <label class="form-label">Step Delay (seconds)</label>
            <input type="number" min="0" step="0.05" v-model="groupAnimationStep" class="input" />
          </div>
        </div>
        <div class="form-group" style="margin-top:var(--space-3)">
          <label class="form-label">Duration (seconds)</label>
          <input type="number" min="0.1" step="0.05" v-model="groupAnimationDuration" class="input" />
        </div>
        <div class="preset-row" style="margin-top:var(--space-3)">
          <input v-model="groupPresetName" class="input" placeholder="Save as preset, e.g. Three Card Cascade" />
          <button type="button" class="btn btn-secondary btn-sm" @click="saveGroupPreset">Save</button>
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-2)">
          <input v-model="groupPresetCategory" class="input" placeholder="Category, e.g. Sequence" />
          <input v-model="groupPresetTags" class="input" placeholder="Tags, comma separated" />
        </div>
        <div v-if="filteredGroupMotionPresets.length" class="preset-list">
          <div
            v-for="preset in filteredGroupMotionPresets"
            :key="preset.id"
            :class="['preset-item', draggingPresetId === preset.id && 'dragging', dragOverPresetId === preset.id && draggingPresetId !== preset.id && 'drag-over']"
            draggable="true"
            @dragstart="onPresetDragStart(preset)"
            @dragenter.prevent="onPresetDragEnter(preset)"
            @dragover.prevent
            @drop.prevent="onPresetDrop(preset)"
            @dragend="onPresetDragEnd"
          >
            <button
              type="button"
              class="preset-chip"
              @click="applyGroupPreset(preset)"
            >
              {{ preset.name }}
            </button>
            <span v-if="preset.category" class="preset-meta-chip">{{ preset.category }}</span>
            <span v-for="tag in preset.tags || []" :key="`${preset.id}-${tag}`" class="preset-meta-chip muted">#{{ tag }}</span>
            <button type="button" class="preset-mini-btn" @click="duplicateMotionPreset(preset)">Duplicate</button>
            <button type="button" class="preset-mini-btn" @click="startPresetRename(preset)">Rename</button>
            <button type="button" class="preset-mini-btn danger" @click="deleteMotionPreset(preset.id)">Delete</button>
            <div v-if="editingPresetId === preset.id" class="preset-row preset-edit-row">
              <input v-model="presetDraftName" class="input" />
              <input v-model="presetDraftCategory" class="input" placeholder="Category" />
              <input v-model="presetDraftTags" class="input" placeholder="Tags, comma separated" />
              <button type="button" class="btn btn-secondary btn-sm" @click="savePresetRename(preset.id)">Save</button>
              <button type="button" class="btn btn-secondary btn-sm" @click="cancelPresetRename">Cancel</button>
            </div>
          </div>
        </div>
        <div v-else-if="groupMotionPresets.length" class="field-hint">No group presets match the current search.</div>
        <button class="btn btn-primary btn-sm w-full" style="margin-top:var(--space-3)" @click="applyAnimationSequence">
          Apply Sequence to Selection
        </button>
      </div>
    </template>

    <!-- === No element selected: show slide properties === -->
    <template v-else-if="!selectedEl">
      <div class="panel-section">
        <div class="slide-settings-tabs">
          <button
            type="button"
            :class="['slide-settings-tab', slideSettingsTab === 'canvas' && 'active']"
            @click="slideSettingsTab = 'canvas'"
          >
            <svg class="slide-settings-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <rect x="3.5" y="5" width="17" height="12" rx="2"></rect>
              <path d="M8 19h8"></path>
            </svg>
            <span>Canvas</span>
          </button>
          <button
            type="button"
            :class="['slide-settings-tab', slideSettingsTab === 'transitions' && 'active']"
            @click="slideSettingsTab = 'transitions'"
          >
            <svg class="slide-settings-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M5 7h5"></path>
              <path d="M5 12h10"></path>
              <path d="M5 17h14"></path>
              <path d="M14 7l5 5-5 5"></path>
            </svg>
            <span>Transitions</span>
          </button>
          <button
            type="button"
            :class="['slide-settings-tab', slideSettingsTab === 'navigation' && 'active']"
            @click="slideSettingsTab = 'navigation'"
          >
            <svg class="slide-settings-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 4v16"></path>
              <path d="M8 8l4-4 4 4"></path>
              <path d="M16 16l-4 4-4-4"></path>
            </svg>
            <span>Navigation</span>
          </button>
        </div>
        <div v-if="slideSettingsTab === 'canvas'" class="slide-settings-pane">
          <div class="panel-title">Canvas</div>
          <div class="form-group" style="margin-bottom:var(--space-3)">
            <label class="form-label">Title</label>
            <input
              v-model="slideLocal.title"
              class="input"
              @input="commitSlide('title', slideLocal.title)"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Background</label>
            <div class="bg-type-tabs">
              <button
                v-for="t in ['color','gradient','image']" :key="t"
                :class="['bg-type-btn', (slide?.backgroundType||'color') === t && 'active']"
                @click="updateSlide({ backgroundType: t })"
              >{{ t }}</button>
            </div>
            <template v-if="(slide?.backgroundType||'color') === 'color'">
              <div class="color-row">
                <input type="color" :value="slide?.background || '#ffffff'" @input="updateSlide({ background: $event.target.value })" class="color-input-native" />
                <input :value="slide?.background || '#ffffff'" class="input" @input="updateSlide({ background: $event.target.value })" style="font-size:var(--text-xs);font-family:var(--font-mono)" />
              </div>
            </template>
            <template v-else-if="slide?.backgroundType === 'gradient'">
              <input v-model="slideLocal.backgroundGradient" class="input" placeholder="linear-gradient(135deg, #667eea, #764ba2)" @input="updateSlide({ backgroundGradient: slideLocal.backgroundGradient })" />
            </template>
            <template v-else>
              <input v-model="slideLocal.backgroundImage" class="input" placeholder="https://..." @input="updateSlide({ backgroundImage: slideLocal.backgroundImage })" />
            </template>
          </div>

          <div class="slide-settings-subsection">
            <div class="panel-title">Select Size</div>
            <div class="canvas-size-grid">
              <button
                v-for="preset in CANVAS_SIZE_PRESETS"
                :key="preset.id"
                type="button"
                :class="['canvas-size-card', selectedCanvasPreset?.id === preset.id && 'active']"
                @click="applyCanvasPreset(preset)"
              >
                <span class="canvas-size-icon-shell">
                  <span class="canvas-size-thumb" :class="`canvas-size-thumb-${preset.id}`" aria-hidden="true">
                    <span class="canvas-size-thumb-frame"></span>
                    <span class="canvas-size-thumb-safe"></span>
                    <span class="canvas-size-thumb-line canvas-size-thumb-line-top"></span>
                    <span class="canvas-size-thumb-line canvas-size-thumb-line-bottom"></span>
                  </span>
                </span>
                <span class="canvas-size-name">{{ preset.label }}</span>
                <span class="canvas-size-ratio">{{ preset.ratioLabel }}</span>
              </button>
            </div>
            <div class="canvas-custom-card">
              <div class="canvas-custom-header">
                <span>Custom</span>
                <span class="field-hint">Current ratio {{ canvasAspectLabel }}</span>
              </div>
              <div class="canvas-custom-inputs">
                <div class="form-group">
                  <label class="form-label">Width</label>
                  <div class="canvas-size-input-wrap">
                    <input
                      type="number"
                      min="320"
                      max="4096"
                      :value="canvasSize.width"
                      class="input"
                      @change="updateCanvasDimension('width', $event.target.value)"
                    />
                    <span class="canvas-size-unit">px</span>
                  </div>
                </div>
                <div class="canvas-size-separator">×</div>
                <div class="form-group">
                  <label class="form-label">Height</label>
                  <div class="canvas-size-input-wrap">
                    <input
                      type="number"
                      min="320"
                      max="4096"
                      :value="canvasSize.height"
                      class="input"
                      @change="updateCanvasDimension('height', $event.target.value)"
                    />
                    <span class="canvas-size-unit">px</span>
                  </div>
                </div>
              </div>
              <label class="check-row canvas-size-lock">
                <input type="checkbox" v-model="maintainCanvasProportions" />
                Maintain proportions
              </label>
              <div class="field-hint">Canvas size affects the editor, preview, slide thumbnails, and exported HTML package.</div>
            </div>
            <div class="canvas-size-callout">
              <svg class="canvas-size-callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 10v6"></path>
                <path d="M12 7h.01"></path>
              </svg>
              <span>Changes will be applied to all pages in the project.</span>
            </div>
          </div>

          <div class="slide-settings-subsection">
            <div class="panel-title">Slide Notes</div>
            <textarea
              v-model="slideLocal.notes"
              class="textarea"
              placeholder="Speaker notes…"
              style="min-height:80px"
              @input="commitSlide('notes', slideLocal.notes)"
            />
          </div>
        </div>

        <div v-else-if="slideSettingsTab === 'transitions'" class="slide-settings-pane">
          <div class="panel-title">Transitions</div>
          <select :value="slide?.transition || 'none'" class="select" @change="updateSlide({ transition: $event.target.value })">
            <option value="none">None</option>
            <option value="fade">Fade</option>
            <option value="slide">Slide</option>
            <option value="zoom">Zoom</option>
            <option value="flip">Flip</option>
          </select>
          <div class="form-group" style="margin-top:var(--space-3)">
            <label class="form-label">Auto-advance Duration (seconds)</label>
            <input
              type="number"
              min="0"
              step="0.5"
              :value="slide?.duration ?? 0"
              class="input"
              @change="updateSlideDuration($event.target.value)"
            />
            <div class="field-hint">Set to 0 to require manual navigation on this slide.</div>
          </div>
          <label class="check-row">
            <input type="checkbox" :checked="Boolean(slide?.advanceOnMediaEnd)" @change="updateSlide({ advanceOnMediaEnd: $event.target.checked })" />
            Advance when slide media finishes
          </label>
          <div class="field-hint">Uses the first playable audio or direct video on the slide. Embedded YouTube/Vimeo iframes cannot report completion here.</div>
        </div>

        <div v-else class="slide-settings-pane">
          <div class="panel-title">Navigation</div>
          <label class="check-row">
            <input type="checkbox" :checked="projectSettings.autoPlay" @change="updateProjectSettings({ autoPlay: $event.target.checked })" />
            Autoplay preview and exported presentation
          </label>
          <label class="check-row">
            <input type="checkbox" :checked="projectSettings.loop" @change="updateProjectSettings({ loop: $event.target.checked })" />
            Loop back to the first slide at the end
          </label>
          <label class="check-row">
            <input type="checkbox" :checked="projectSettings.showProgress" @change="updateProjectSettings({ showProgress: $event.target.checked })" />
            Show progress bar in preview
          </label>
          <label class="check-row">
            <input type="checkbox" :checked="projectSettings.showNavControls" @change="updateProjectSettings({ showNavControls: $event.target.checked })" />
            Show previous/next and dot navigation
          </label>
          <label class="check-row">
            <input type="checkbox" :checked="projectSettings.allowKeyboardNav" @change="updateProjectSettings({ allowKeyboardNav: $event.target.checked })" />
            Allow arrow keys and space bar navigation
          </label>
        </div>
      </div>
    </template>

    <!-- === Element selected === -->
    <template v-else>
      <!-- Geometry -->
      <div class="panel-section">
        <div class="panel-title">
          Position &amp; Size
          <span class="element-type-badge">{{ selectedEl.type }}</span>
        </div>
        <div class="geo-grid">
          <div class="form-group">
            <label class="form-label">X</label>
            <input type="number" :value="Math.round(selectedEl.x)" class="input" @change="updateGeometry('x', $event.target.value)" />
          </div>
          <div class="form-group">
            <label class="form-label">Y</label>
            <input type="number" :value="Math.round(selectedEl.y)" class="input" @change="updateGeometry('y', $event.target.value)" />
          </div>
          <div class="form-group">
            <label class="form-label">W</label>
            <input type="number" :value="Math.round(selectedEl.width)" class="input" @change="updateGeometry('width', $event.target.value)" />
          </div>
          <div class="form-group">
            <label class="form-label">H</label>
            <input type="number" :value="Math.round(selectedEl.height)" class="input" @change="updateGeometry('height', $event.target.value)" />
          </div>
          <div class="form-group">
            <label class="form-label">Rot °</label>
            <input type="number" :value="Math.round(selectedEl.rotation || 0)" class="input" @change="updateGeometry('rotation', $event.target.value)" />
          </div>
          <div class="form-group">
            <label class="form-label">Opacity</label>
            <input type="number" min="0" max="1" step=".05" :value="selectedEl.opacity ?? 1" class="input" @change="updateGeometry('opacity', $event.target.value)" />
          </div>
        </div>
      </div>

      <div class="panel-section">
        <div class="panel-title">Animation</div>
        <div class="motion-scrubber-shell">
          <div class="motion-scrubber-header">
            <span class="motion-scrubber-title">Live Motion Preview</span>
            <button type="button" class="btn btn-secondary btn-sm" @click="replaySingleMotionPreview">Replay</button>
          </div>
          <div class="motion-scrubber-stage motion-scrubber-stage-single" :key="`single-preview-${singlePreviewSeed}`">
            <span
              v-for="node in singlePreviewNodes"
              :key="node.id"
              :class="['motion-scrubber-node', `motion-preview-live-${node.type === 'auto' ? 'fade-up' : node.type}`]"
              :style="{ '--preview-delay': `${node.delay}s`, '--preview-duration': `${node.duration}s` }"
            />
          </div>
        </div>
        <div class="motion-card-grid">
          <button
            v-for="option in motionPreviewOptions"
            :key="option.value"
            type="button"
            :class="['motion-card', selectedAnimation.type === option.value && 'active']"
            @click="updateElementAnimation({ type: option.value })"
          >
            <span class="motion-preview">
              <span :class="['motion-preview-dot', option.sampleClass]" />
              <span v-if="option.value === 'stagger-in'" class="motion-preview-dot motion-preview-dot-secondary motion-sample-stagger-in-secondary" />
              <span v-if="option.value === 'stagger-in'" class="motion-preview-dot motion-preview-dot-tertiary motion-sample-stagger-in-tertiary" />
            </span>
            <span class="motion-card-label">{{ option.label }}</span>
          </button>
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;">
          <div class="form-group">
            <label class="form-label">Delay (seconds)</label>
            <input
              type="number"
              min="0"
              step="0.05"
              :value="selectedAnimation.delay"
              class="input"
              @change="updateElementAnimation({ delay: $event.target.value })"
            />
          </div>
          <div class="form-group">
            <label class="form-label">Duration (seconds)</label>
            <input
              type="number"
              min="0.1"
              step="0.05"
              :value="selectedAnimation.duration"
              class="input"
              @change="updateElementAnimation({ duration: $event.target.value })"
            />
          </div>
        </div>
        <div class="preset-row" style="margin-top:var(--space-3)">
          <input v-model="singlePresetName" class="input" placeholder="Save as preset, e.g. Hero Intro" />
          <button type="button" class="btn btn-secondary btn-sm" @click="saveSinglePreset">Save</button>
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-2)">
          <input v-model="singlePresetCategory" class="input" placeholder="Category, e.g. Presentation" />
          <input v-model="singlePresetTags" class="input" placeholder="Tags, comma separated" />
        </div>
        <div v-if="filteredSingleMotionPresets.length" class="preset-list">
          <div
            v-for="preset in filteredSingleMotionPresets"
            :key="preset.id"
            :class="['preset-item', draggingPresetId === preset.id && 'dragging', dragOverPresetId === preset.id && draggingPresetId !== preset.id && 'drag-over']"
            draggable="true"
            @dragstart="onPresetDragStart(preset)"
            @dragenter.prevent="onPresetDragEnter(preset)"
            @dragover.prevent
            @drop.prevent="onPresetDrop(preset)"
            @dragend="onPresetDragEnd"
          >
            <button
              type="button"
              class="preset-chip"
              @click="applySinglePreset(preset)"
            >
              {{ preset.name }}
            </button>
            <span v-if="preset.category" class="preset-meta-chip">{{ preset.category }}</span>
            <span v-for="tag in preset.tags || []" :key="`${preset.id}-${tag}`" class="preset-meta-chip muted">#{{ tag }}</span>
            <button type="button" class="preset-mini-btn" @click="duplicateMotionPreset(preset)">Duplicate</button>
            <button type="button" class="preset-mini-btn" @click="startPresetRename(preset)">Rename</button>
            <button type="button" class="preset-mini-btn danger" @click="deleteMotionPreset(preset.id)">Delete</button>
            <div v-if="editingPresetId === preset.id" class="preset-row preset-edit-row">
              <input v-model="presetDraftName" class="input" />
              <input v-model="presetDraftCategory" class="input" placeholder="Category" />
              <input v-model="presetDraftTags" class="input" placeholder="Tags, comma separated" />
              <button type="button" class="btn btn-secondary btn-sm" @click="savePresetRename(preset.id)">Save</button>
              <button type="button" class="btn btn-secondary btn-sm" @click="cancelPresetRename">Cancel</button>
            </div>
          </div>
        </div>
        <div v-else-if="singleMotionPresets.length" class="field-hint">No single-element presets match the current search.</div>
        <div class="field-hint">Use Auto to keep the preview defaults, or override with a specific entrance effect.</div>
      </div>

      <!-- TEXT / HEADING properties -->
      <div v-if="['text','heading'].includes(selectedEl.type)" class="panel-section">
        <div class="panel-title">Text</div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Content</label>
          <textarea
            :value="selectedEl.content?.text"
            class="textarea"
            style="min-height:64px"
            @input="updateContent({ text: $event.target.value })"
          />
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;">
          <div class="form-group">
            <label class="form-label">Size</label>
            <input type="number" :value="selectedEl.content?.fontSize" class="input" @change="updateContent({ fontSize: +$event.target.value })" />
          </div>
          <div class="form-group">
            <label class="form-label">Weight</label>
            <select :value="selectedEl.content?.fontWeight" class="select" @change="updateContent({ fontWeight: $event.target.value })">
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="600">Semi-bold</option>
              <option value="300">Light</option>
            </select>
          </div>
        </div>
        <div class="form-group" style="margin-top:var(--space-3)">
          <label class="form-label">Font Family</label>
          <select :value="selectedEl.content?.fontFamily" class="select" @change="updateContent({ fontFamily: $event.target.value })">
            <option v-for="f in fontFamilies" :key="f" :value="f">{{ f.split(',')[0] }}</option>
          </select>
        </div>
        <div class="form-group" style="margin-top:var(--space-3)">
          <label class="form-label">Align</label>
          <div class="align-btns">
            <button v-for="a in ['left','center','right','justify']" :key="a"
              :class="['align-btn', selectedEl.content?.textAlign === a && 'active']"
              @click="updateContent({ textAlign: a })">
              {{ a[0].toUpperCase() }}
            </button>
          </div>
        </div>
        <div class="form-group" style="margin-top:var(--space-3)">
          <label class="form-label">Style</label>
          <div class="style-btns">
            <button :class="['style-btn', selectedEl.content?.fontStyle === 'italic' && 'active']" @click="updateContent({ fontStyle: selectedEl.content?.fontStyle === 'italic' ? 'normal' : 'italic' })"><i>I</i></button>
            <button :class="['style-btn', selectedEl.content?.textDecoration === 'underline' && 'active']" @click="updateContent({ textDecoration: selectedEl.content?.textDecoration === 'underline' ? 'none' : 'underline' })"><u>U</u></button>
            <button :class="['style-btn', selectedEl.content?.textDecoration === 'line-through' && 'active']" @click="updateContent({ textDecoration: selectedEl.content?.textDecoration === 'line-through' ? 'none' : 'line-through' })"><s>S</s></button>
          </div>
        </div>
        <div class="form-group" style="margin-top:var(--space-3)">
          <label class="form-label">Color</label>
          <div class="color-row">
            <input type="color" :value="selectedEl.content?.color || '#000'" @input="updateContent({ color: $event.target.value })" class="color-input-native" />
            <input :value="selectedEl.content?.color || '#000'" class="input" @input="updateContent({ color: $event.target.value })" style="font-family:var(--font-mono);font-size:var(--text-xs)" />
          </div>
        </div>
        <div class="form-group" style="margin-top:var(--space-3)">
          <label class="form-label">Line Height</label>
          <input type="number" min=".8" max="3" step=".1" :value="selectedEl.content?.lineHeight ?? 1.5" class="input" @change="updateContent({ lineHeight: +$event.target.value })" />
        </div>

        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Case</label>
            <select :value="selectedEl.content?.textTransform || 'none'" class="select" @change="updateContent({ textTransform: $event.target.value })">
              <option value="none">Normal</option>
              <option value="uppercase">UPPERCASE</option>
              <option value="lowercase">lowercase</option>
              <option value="capitalize">Capitalize</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Letter Spacing</label>
            <input type="number" step=".2" :value="selectedEl.content?.letterSpacing ?? 0" class="input" @change="updateContent({ letterSpacing: +$event.target.value })" />
          </div>
        </div>
      </div>

      <!-- IMAGE properties -->
      <div v-if="selectedEl.type === 'image'" class="panel-section">
        <div class="panel-title">Image</div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Source URL</label>
          <input :value="selectedEl.content?.src" class="input" placeholder="https://..." @input="updateContent({ src: $event.target.value })" />
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Alt Text</label>
          <input :value="selectedEl.content?.alt" class="input" @input="updateContent({ alt: $event.target.value })" />
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Object Fit</label>
          <select :value="selectedEl.content?.objectFit || 'cover'" class="select" @change="updateContent({ objectFit: $event.target.value })">
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <option value="fill">Fill</option>
            <option value="none">None</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Border Radius</label>
          <input type="number" min="0" :value="selectedEl.content?.borderRadius || 0" class="input" @change="updateContent({ borderRadius: +$event.target.value })" />
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Border Width</label>
            <input type="number" min="0" :value="selectedEl.content?.borderWidth || 0" class="input" @change="updateContent({ borderWidth: +$event.target.value })" />
          </div>
          <div class="form-group">
            <label class="form-label">Border Color</label>
            <input type="color" :value="selectedEl.content?.borderColor || '#e2e8f0'" class="color-input-native" @input="updateContent({ borderColor: $event.target.value })" />
          </div>
        </div>
      </div>

      <!-- SHAPE properties -->
      <div v-if="selectedEl.type === 'shape'" class="panel-section">
        <div class="panel-title">Shape</div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Type</label>
          <select :value="selectedEl.content?.shapeType || 'rectangle'" class="select" @change="updateContent({ shapeType: $event.target.value })">
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="triangle">Triangle</option>
            <option value="star">Star</option>
            <option value="arrow">Arrow</option>
            <option value="diamond">Diamond</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Fill Color</label>
          <div class="color-row">
            <input type="color" :value="selectedEl.content?.fillColor || '#6c47ff'" @input="updateContent({ fillColor: $event.target.value })" class="color-input-native" />
            <input :value="selectedEl.content?.fillColor || '#6c47ff'" class="input" @input="updateContent({ fillColor: $event.target.value })" style="font-family:var(--font-mono);font-size:var(--text-xs)" />
          </div>
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Border Color</label>
          <div class="color-row">
            <input type="color" :value="selectedEl.content?.borderColor || 'transparent'" @input="updateContent({ borderColor: $event.target.value })" class="color-input-native" />
            <input :value="selectedEl.content?.borderColor || 'transparent'" class="input" @input="updateContent({ borderColor: $event.target.value })" style="font-family:var(--font-mono);font-size:var(--text-xs)" />
          </div>
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Border Width</label>
          <input type="number" min="0" :value="selectedEl.content?.borderWidth || 0" class="input" @change="updateContent({ borderWidth: +$event.target.value })" />
        </div>
        <div class="form-group">
          <label class="form-label">Corner Radius</label>
          <input type="number" min="0" :value="selectedEl.content?.borderRadius || 0" class="input" @change="updateContent({ borderRadius: +$event.target.value })" />
        </div>
        <div class="form-group" style="margin-top:var(--space-3)">
          <label class="form-label">Fill Opacity</label>
          <input type="number" min="0" max="1" step=".05" :value="selectedEl.content?.opacity ?? 1" class="input" @change="updateContent({ opacity: +$event.target.value })" />
        </div>
      </div>

      <div v-if="selectedEl.type === 'chart'" class="panel-section">
        <div class="panel-title">Chart</div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Chart Type</label>
          <select :value="selectedEl.content?.chartType || 'bar'" class="select" @change="updateContent({ chartType: $event.target.value })">
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="circle">Circle</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Title</label>
          <input :value="selectedEl.content?.title || ''" class="input" @input="updateContent({ title: $event.target.value })" />
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Data or pasted CSV/TSV</label>
          <textarea
            :value="selectedEl.content?.dataText || ''"
            class="textarea"
            style="min-height:110px"
            placeholder="Q1, 120&#10;Q2, 180&#10;Q3, 150"
            @input="updateContent({ dataText: $event.target.value })"
          />
          <div class="chart-data-actions">
            <button type="button" class="btn btn-secondary btn-sm" @click="normalizeSelectedChartData">Normalize rows</button>
            <button type="button" class="btn btn-secondary btn-sm" @click="triggerChartImport">Upload CSV</button>
          </div>
          <div class="field-hint">Use `label, value`, `label: value`, spreadsheet tab-separated rows, or a two-column CSV. Percentages and totals are calculated automatically for circle charts.</div>
        </div>
        <div class="form-group chart-import-card" style="margin-bottom:var(--space-3)">
          <label class="form-label">Paste table data</label>
          <textarea
            v-model="chartImportDraft"
            class="textarea"
            style="min-height:84px"
            placeholder="Label,Value&#10;North,42&#10;South,31"
          />
          <div class="chart-data-actions">
            <button type="button" class="btn btn-secondary btn-sm" @click="applyChartImport(chartImportDraft)">Convert pasted data</button>
          </div>
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Palette</label>
          <input
            :value="selectedEl.content?.paletteText || ''"
            class="input"
            :placeholder="chartThemeDefaults.paletteText"
            @input="updateContent({ paletteText: $event.target.value })"
          />
          <div class="chart-palette-preview">
            <span v-for="(color, index) in chartPalettePreview" :key="`chart-palette-${index}`" class="chart-palette-swatch" :style="{ background: color }"></span>
          </div>
          <div class="chart-data-actions">
            <button type="button" class="btn btn-secondary btn-sm" @click="useAutoChartPalette">Use theme palette</button>
            <button type="button" class="btn btn-secondary btn-sm" @click="applyThemeToSelectedChart">Apply theme colors</button>
          </div>
          <div class="field-hint">Separate colors with commas. Theme palette uses the project theme colors if you leave this aligned with the generated value.</div>
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-bottom:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Background</label>
            <input type="color" :value="selectedEl.content?.backgroundColor || '#ffffff'" class="color-input-native" @input="updateContent({ backgroundColor: $event.target.value })" />
          </div>
          <div class="form-group">
            <label class="form-label">Text</label>
            <input type="color" :value="selectedEl.content?.textColor || '#1a1a2e'" class="color-input-native" @input="updateContent({ textColor: $event.target.value })" />
          </div>
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-bottom:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Grid</label>
            <input type="color" :value="selectedEl.content?.gridColor || '#dbe3ef'" class="color-input-native" @input="updateContent({ gridColor: $event.target.value })" />
          </div>
          <div class="form-group">
            <label class="form-label">Border</label>
            <input type="color" :value="selectedEl.content?.borderColor || '#e2e8f0'" class="color-input-native" @input="updateContent({ borderColor: $event.target.value })" />
          </div>
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-bottom:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Border Width</label>
            <input type="number" min="0" :value="selectedEl.content?.borderWidth ?? 1" class="input" @change="updateContent({ borderWidth: +$event.target.value })" />
          </div>
          <div class="form-group" v-if="selectedEl.content?.chartType !== 'circle'">
            <label class="form-label">Max Value</label>
            <input :value="selectedEl.content?.maxValue ?? ''" class="input" placeholder="Auto" @input="updateContent({ maxValue: $event.target.value })" />
          </div>
          <div class="form-group" v-else>
            <label class="form-label">Inner Radius %</label>
            <input type="number" min="20" max="85" :value="selectedEl.content?.innerRadius ?? 62" class="input" @change="updateContent({ innerRadius: +$event.target.value })" />
          </div>
        </div>
        <div class="geo-grid" v-if="selectedEl.content?.chartType === 'line'" style="grid-template-columns:1fr 1fr;margin-bottom:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Line Width</label>
            <input type="number" min="1" max="8" :value="selectedEl.content?.strokeWidth ?? 3" class="input" @change="updateContent({ strokeWidth: +$event.target.value })" />
          </div>
          <label class="check-row" style="margin-top:20px">
            <input type="checkbox" :checked="Boolean(selectedEl.content?.showArea)" @change="updateContent({ showArea: $event.target.checked })" />
            Show area fill
          </label>
        </div>
        <label class="check-row">
          <input type="checkbox" :checked="selectedEl.content?.showLegend !== false" @change="updateContent({ showLegend: $event.target.checked })" />
          Show legend
        </label>
        <label v-if="selectedEl.content?.chartType !== 'circle'" class="check-row">
          <input type="checkbox" :checked="selectedEl.content?.showGrid !== false" @change="updateContent({ showGrid: $event.target.checked })" />
          Show grid lines
        </label>
        <label class="check-row">
          <input type="checkbox" :checked="selectedEl.content?.showValues !== false" @change="updateContent({ showValues: $event.target.checked })" />
          Show values
        </label>
      </div>

      <!-- BUTTON properties -->
      <div v-if="selectedEl.type === 'button'" class="panel-section">
        <div class="panel-title">Button</div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Label</label>
          <input :value="selectedEl.content?.label" class="input" @input="updateContent({ label: $event.target.value })" />
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Style</label>
          <select :value="selectedEl.content?.variant || 'primary'" class="select" @change="updateContent({ variant: $event.target.value })">
            <option value="primary">Primary</option>
            <option value="secondary">Secondary</option>
            <option value="outline">Outline</option>
            <option value="ghost">Ghost</option>
            <option value="danger">Danger</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Action</label>
          <select :value="selectedEl.content?.action || 'none'" class="select" @change="updateContent({ action: $event.target.value })">
            <option value="none">None</option>
            <option value="navigate">Navigate to slide</option>
            <option value="link">Open URL</option>
            <option value="submit">Submit</option>
          </select>
        </div>
        <div class="form-group" v-if="selectedEl.content?.action && selectedEl.content.action !== 'none'">
          <label class="form-label">Target (slide # or URL)</label>
          <input :value="selectedEl.content?.target" class="input" placeholder="Slide # or https://..." @input="updateContent({ target: $event.target.value })" />
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Background</label>
            <input type="color" :value="selectedEl.content?.bgColor || '#6c47ff'" class="color-input-native" @input="updateContent({ bgColor: $event.target.value })" />
          </div>
          <div class="form-group">
            <label class="form-label">Text Color</label>
            <input type="color" :value="selectedEl.content?.textColor || '#ffffff'" class="color-input-native" @input="updateContent({ textColor: $event.target.value })" />
          </div>
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Border Color</label>
            <input type="color" :value="selectedEl.content?.borderColor || '#6c47ff'" class="color-input-native" @input="updateContent({ borderColor: $event.target.value })" />
          </div>
          <div class="form-group">
            <label class="form-label">Corner Radius</label>
            <input type="number" min="0" :value="selectedEl.content?.borderRadius ?? 8" class="input" @change="updateContent({ borderRadius: +$event.target.value })" />
          </div>
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Font Size</label>
            <input type="number" min="10" :value="selectedEl.content?.fontSize ?? 15" class="input" @change="updateContent({ fontSize: +$event.target.value })" />
          </div>
          <div class="form-group">
            <label class="form-label">Weight</label>
            <select :value="String(selectedEl.content?.fontWeight ?? 600)" class="select" @change="updateContent({ fontWeight: +$event.target.value })">
              <option value="400">Normal</option>
              <option value="500">Medium</option>
              <option value="600">Semi-bold</option>
              <option value="700">Bold</option>
            </select>
          </div>
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Font Family</label>
            <select :value="selectedEl.content?.fontFamily || 'Inter, sans-serif'" class="select" @change="updateContent({ fontFamily: $event.target.value })">
              <option v-for="f in fontFamilies" :key="`btn-${f}`" :value="f">{{ f.split(',')[0] }}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Letter Spacing</label>
            <input type="number" step=".2" :value="selectedEl.content?.letterSpacing ?? 0" class="input" @change="updateContent({ letterSpacing: +$event.target.value })" />
          </div>
        </div>
      </div>

      <!-- HOTSPOT properties -->
      <div v-if="selectedEl.type === 'hotspot'" class="panel-section">
        <div class="panel-title">Hotspot</div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Icon</label>
          <select :value="selectedEl.content?.icon || '?'" class="select" @change="updateContent({ icon: $event.target.value })">
            <option value="?">? (Info)</option>
            <option value="!">! (Alert)</option>
            <option value="+">+ (Plus)</option>
            <option value="i">i (Info)</option>
            <option value="✦">✦ (Star)</option>
          </select>
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Background Color</label>
          <div class="color-row">
            <input type="color" :value="selectedEl.content?.bgColor || '#6c47ff'" @input="updateContent({ bgColor: $event.target.value })" class="color-input-native" />
            <input :value="selectedEl.content?.bgColor || '#6c47ff'" class="input" @input="updateContent({ bgColor: $event.target.value })" style="font-family:var(--font-mono);font-size:var(--text-xs)" />
          </div>
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-bottom:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Icon Color</label>
            <input type="color" :value="selectedEl.content?.iconColor || '#ffffff'" class="color-input-native" @input="updateContent({ iconColor: $event.target.value })" />
          </div>
          <div class="form-group">
            <label class="form-label">Corner Radius</label>
            <input type="number" min="0" :value="selectedEl.content?.borderRadius ?? 999" class="input" @change="updateContent({ borderRadius: +$event.target.value })" />
          </div>
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Popup Title</label>
          <input :value="selectedEl.content?.popupTitle" class="input" @input="updateContent({ popupTitle: $event.target.value })" />
        </div>
        <div class="form-group">
          <label class="form-label">Popup Content</label>
          <textarea :value="selectedEl.content?.popupContent" class="textarea" @input="updateContent({ popupContent: $event.target.value })" />
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Popup Background</label>
            <input type="color" :value="selectedEl.content?.popupBgColor || '#ffffff'" class="color-input-native" @input="updateContent({ popupBgColor: $event.target.value })" />
          </div>
          <div class="form-group">
            <label class="form-label">Popup Text</label>
            <input type="color" :value="selectedEl.content?.popupTextColor || '#1a1a2e'" class="color-input-native" @input="updateContent({ popupTextColor: $event.target.value })" />
          </div>
        </div>
      </div>

      <!-- VIDEO properties -->
      <div v-if="selectedEl.type === 'video'" class="panel-section">
        <div class="panel-title">Video</div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Video URL / Embed</label>
          <input :value="selectedEl.content?.src" class="input" placeholder="YouTube, Vimeo, or direct .mp4 URL" @input="updateContent({ src: $event.target.value })" />
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Poster Image URL</label>
          <input :value="selectedEl.content?.poster" class="input" @input="updateContent({ poster: $event.target.value })" />
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Object Fit</label>
          <select :value="selectedEl.content?.objectFit || 'cover'" class="select" @change="updateContent({ objectFit: $event.target.value })">
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <option value="fill">Fill</option>
            <option value="none">None</option>
          </select>
        </div>
        <label class="check-row">
          <input type="checkbox" :checked="selectedEl.content?.autoplay" @change="updateContent({ autoplay: $event.target.checked })" />
          Autoplay
        </label>
        <label class="check-row">
          <input type="checkbox" :checked="selectedEl.content?.controls ?? true" @change="updateContent({ controls: $event.target.checked })" />
          Show Controls
        </label>
        <label class="check-row">
          <input type="checkbox" :checked="selectedEl.content?.loop" @change="updateContent({ loop: $event.target.checked })" />
          Loop
        </label>
        <label class="check-row">
          <input type="checkbox" :checked="selectedEl.content?.muted" @change="updateContent({ muted: $event.target.checked })" />
          Muted
        </label>
      </div>

      <!-- AUDIO properties -->
      <div v-if="selectedEl.type === 'audio'" class="panel-section">
        <div class="panel-title">Audio</div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Audio URL</label>
          <input :value="selectedEl.content?.src" class="input" placeholder=".mp3 / .wav URL" @input="updateContent({ src: $event.target.value })" />
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Label</label>
          <input :value="selectedEl.content?.label" class="input" @input="updateContent({ label: $event.target.value })" />
        </div>
        <label class="check-row">
          <input type="checkbox" :checked="selectedEl.content?.autoplay" @change="updateContent({ autoplay: $event.target.checked })" />
          Autoplay
        </label>
        <label class="check-row">
          <input type="checkbox" :checked="selectedEl.content?.controls !== false" @change="updateContent({ controls: $event.target.checked })" />
          Show Controls
        </label>
        <label class="check-row">
          <input type="checkbox" :checked="selectedEl.content?.loop" @change="updateContent({ loop: $event.target.checked })" />
          Loop
        </label>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Accent Color</label>
            <input type="color" :value="selectedEl.content?.accentColor || '#6c47ff'" class="color-input-native" @input="updateContent({ accentColor: $event.target.value })" />
          </div>
          <div class="form-group">
            <label class="form-label">Text Color</label>
            <input type="color" :value="selectedEl.content?.textColor || '#555555'" class="color-input-native" @input="updateContent({ textColor: $event.target.value })" />
          </div>
        </div>
        <div class="form-group" style="margin-top:var(--space-3)">
          <label class="form-label">Background Color</label>
          <input type="color" :value="selectedEl.content?.bgColor || '#ede7ff'" class="color-input-native" @input="updateContent({ bgColor: $event.target.value })" />
        </div>
      </div>

      <!-- QUIZ properties -->
      <div v-if="selectedEl.type === 'quiz'" class="panel-section">
        <div class="panel-title">Quiz Question</div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Question</label>
          <textarea :value="selectedEl.content?.question" class="textarea" style="min-height:60px" @input="updateContent({ question: $event.target.value })" />
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Options (one per line)</label>
          <textarea
            :value="selectedEl.content?.options?.join('\n')"
            class="textarea"
            style="min-height:80px"
            @input="updateContent({ options: $event.target.value.split('\n').filter(Boolean) })"
          />
        </div>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Correct Answer Index (0-based)</label>
          <input type="number" min="0" :value="selectedEl.content?.correctIndex ?? 0" class="input" @change="updateContent({ correctIndex: +$event.target.value })" />
        </div>
        <div class="form-group">
          <label class="form-label">Explanation</label>
          <textarea :value="selectedEl.content?.explanation" class="textarea" @input="updateContent({ explanation: $event.target.value })" />
        </div>
        <div class="geo-grid" style="grid-template-columns:1fr 1fr;margin-top:var(--space-3)">
          <div class="form-group">
            <label class="form-label">Card Background</label>
            <input type="color" :value="selectedEl.content?.cardBgColor || '#ffffff'" class="color-input-native" @input="updateContent({ cardBgColor: $event.target.value })" />
          </div>
          <div class="form-group">
            <label class="form-label">Question Color</label>
            <input type="color" :value="selectedEl.content?.questionColor || '#1a1a2e'" class="color-input-native" @input="updateContent({ questionColor: $event.target.value })" />
          </div>
        </div>
        <div class="form-group" style="margin-top:var(--space-3)">
          <label class="form-label">Accent Color</label>
          <input type="color" :value="selectedEl.content?.accentColor || '#6c47ff'" class="color-input-native" @input="updateContent({ accentColor: $event.target.value })" />
        </div>
      </div>

      <!-- Actions -->
      <div class="panel-section">
        <div class="panel-title">Actions</div>
        <div class="actions-list">
          <button class="btn btn-secondary btn-sm w-full" @click="projectStore.duplicateElement(editorStore.projectId, editorStore.currentSlideId, selectedEl.id)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            Duplicate
          </button>
          <button class="btn btn-secondary btn-sm w-full" @click="editorStore.showInteractionEditor = true; editorStore.interactionElementId = selectedEl.id">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            Interactions
          </button>
          <button class="btn btn-danger btn-sm w-full" @click="projectStore.deleteElement(editorStore.projectId, editorStore.currentSlideId, selectedEl.id); editorStore.clearSelection()">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M9 6V4h6v2"/></svg>
            Delete Element
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.canvas-size-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
}
.canvas-size-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 104px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface-raised);
  color: var(--color-text);
  cursor: pointer;
  transition: border-color .18s ease, transform .18s ease, background .18s ease;
  position: relative;
  overflow: hidden;
}
.canvas-size-card::before {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(108,71,255,.2), transparent);
}
.canvas-size-card:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--color-primary) 38%, var(--color-border));
}
.canvas-size-card.active {
  border-color: color-mix(in srgb, var(--color-primary) 58%, white 0%);
  background: color-mix(in srgb, var(--color-primary) 8%, var(--color-surface-raised));
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-primary) 24%, transparent);
}
.canvas-size-icon-shell {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.canvas-size-thumb {
  position: relative;
  width: 54px;
  height: 40px;
}
.canvas-size-thumb-frame,
.canvas-size-thumb-safe,
.canvas-size-thumb-line {
  position: absolute;
  display: block;
}
.canvas-size-thumb-frame {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid currentColor;
  border-radius: 5px;
  opacity: .82;
}
.canvas-size-thumb-safe {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px dashed color-mix(in srgb, currentColor 78%, white 22%);
  border-radius: 4px;
  opacity: .55;
}
.canvas-size-thumb-line {
  left: 50%;
  height: 1px;
  transform: translateX(-50%);
  background: rgba(108,71,255,.28);
  width: 58%;
}
.canvas-size-thumb-line-top {
  top: 9px;
}
.canvas-size-thumb-line-bottom {
  bottom: 9px;
}
.canvas-size-thumb-landscape .canvas-size-thumb-frame {
  width: 34px;
  height: 20px;
}
.canvas-size-thumb-landscape .canvas-size-thumb-safe {
  width: 28px;
  height: 16px;
}
.canvas-size-thumb-mobile .canvas-size-thumb-frame {
  width: 18px;
  height: 30px;
  border-radius: 6px;
}
.canvas-size-thumb-mobile .canvas-size-thumb-frame::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
}
.canvas-size-thumb-mobile .canvas-size-thumb-safe {
  width: 14px;
  height: 24px;
  border-radius: 5px;
}
.canvas-size-thumb-infographic .canvas-size-thumb-frame {
  width: 16px;
  height: 34px;
  border-radius: 5px;
}
.canvas-size-thumb-infographic .canvas-size-thumb-safe {
  width: 12px;
  height: 26px;
}
.canvas-size-thumb-square .canvas-size-thumb-frame {
  width: 24px;
  height: 24px;
}
.canvas-size-thumb-square .canvas-size-thumb-safe {
  width: 18px;
  height: 18px;
}
.canvas-size-name {
  font-size: var(--text-sm);
  font-weight: 600;
}
.canvas-size-ratio {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}
.canvas-custom-card {
  margin-top: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface-raised);
}
.chart-data-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
.chart-import-card {
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-surface-overlay) 72%, #ffffff 28%);
  border: 1px solid var(--color-border-subtle);
}
.chart-palette-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--space-2);
}
.chart-palette-swatch {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
}
.canvas-custom-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
  font-size: var(--text-sm);
  font-weight: 600;
}
.canvas-custom-inputs {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: var(--space-3);
  align-items: end;
}
.canvas-size-input-wrap {
  position: relative;
}
.canvas-size-input-wrap .input {
  padding-right: 34px;
}
.canvas-size-unit {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}
.canvas-size-separator {
  padding-bottom: 10px;
  font-size: 20px;
  color: var(--color-text-muted);
}
.canvas-size-lock {
  margin-top: var(--space-3);
  margin-bottom: var(--space-2);
}
.canvas-size-callout {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: var(--space-3);
  padding: 12px 14px;
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, #67c3f3 16%, var(--color-surface-raised));
  color: color-mix(in srgb, var(--color-text) 82%, #0c4a6e);
  border: 1px solid color-mix(in srgb, #67c3f3 36%, var(--color-border));
  font-size: var(--text-sm);
  line-height: 1.5;
}
.canvas-size-callout-icon {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  flex: 0 0 auto;
  color: #0284c7;
}
.properties-panel {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  background: color-mix(in srgb, var(--color-surface) 92%, #10193a 8%);
}
.autosave-note {
  color: var(--color-text-muted);
  font-size: var(--text-xs);
  padding-bottom: 0;
  position: sticky;
  top: 0;
  z-index: 3;
  background: color-mix(in srgb, var(--color-surface-overlay) 65%, transparent 35%);
  border-bottom: 1px solid var(--color-border-subtle);
}
.element-type-badge {
  background: var(--color-surface-overlay);
  color: var(--color-text-dim);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: var(--radius-full);
  letter-spacing: .05em;
}
.geo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
}
.color-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-top: var(--space-1);
}
.color-input-native {
  width: 36px;
  height: 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 2px;
  cursor: pointer;
  background: var(--color-surface-overlay);
  flex-shrink: 0;
}
.align-btns, .style-btns {
  display: flex;
  gap: 4px;
}
.align-btn, .style-btn {
  flex: 1;
  padding: 5px;
  background: var(--color-surface-overlay);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: var(--text-sm);
  transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
  text-align: center;
}
.align-btn:hover, .style-btn:hover { color: var(--color-text); background: var(--color-surface-raised); }
.align-btn.active, .style-btn.active { background: var(--color-primary-light); color: var(--color-primary); border-color: rgba(108,71,255,.4); }
.check-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  cursor: pointer;
  margin-top: var(--space-2);
}
.check-row input { accent-color: var(--color-primary); width: 14px; height: 14px; }
.actions-list { display: flex; flex-direction: column; gap: var(--space-2); }
.bg-type-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: var(--space-3);
}
.bg-type-btn {
  flex: 1;
  padding: 4px;
  background: var(--color-surface-overlay);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 10px;
  font-weight: 600;
  text-transform: capitalize;
  letter-spacing: .04em;
  transition: all var(--transition-fast);
}
.bg-type-btn.active { background: var(--color-primary-light); color: var(--color-primary); border-color: rgba(108,71,255,.4); }
.field-hint {
  margin-top: var(--space-2);
  color: var(--color-text-dim);
  font-size: var(--text-xs);
  line-height: 1.5;
}
.preset-toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) auto auto;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
.preset-toolbar.compact {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
}
.import-review {
  margin-top: var(--space-3);
  padding: 12px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border-subtle);
  background: color-mix(in srgb, var(--color-surface-overlay) 80%, #091229 20%);
}
.import-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
.import-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
  color: var(--color-text);
}
.import-item input {
  accent-color: var(--color-primary);
}
.import-item-title {
  font-size: var(--text-sm);
  font-weight: 600;
}
.motion-scrubber-shell {
  margin-top: var(--space-3);
  padding: 10px;
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--color-surface-overlay) 80%, #091229 20%);
  border: 1px solid var(--color-border-subtle);
}
.motion-scrubber-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}
.motion-scrubber-title {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
  color: var(--color-text-dim);
}
.motion-scrubber-stage {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 70px;
  padding: 16px 14px;
  border-radius: var(--radius-md);
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 24%, rgba(108,71,255,.18), transparent 28%),
    linear-gradient(135deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
}
.motion-scrubber-stage::after {
  content: '';
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 14px;
  height: 3px;
  border-radius: 999px;
  background: rgba(255,255,255,.08);
}
.motion-scrubber-stage-single {
  justify-content: center;
}
.motion-scrubber-node {
  width: 42px;
  height: 24px;
  border-radius: 10px;
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  box-shadow: 0 10px 22px rgba(0,0,0,.18);
  animation-duration: var(--preview-duration, .72s);
  animation-delay: var(--preview-delay, 0s);
  animation-iteration-count: 1;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
.preset-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-2);
  align-items: center;
}
.preset-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
.preset-item {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  align-items: center;
  padding: 6px;
  border-radius: var(--radius-md);
  border: 1px dashed transparent;
  transition: border-color var(--transition-fast), background var(--transition-fast), opacity var(--transition-fast);
}
.preset-item.dragging {
  opacity: .55;
}
.preset-item.drag-over {
  border-color: rgba(108,71,255,.35);
  background: color-mix(in srgb, var(--color-primary-light) 24%, transparent 76%);
}
.preset-chip {
  border: 1px solid rgba(108,71,255,.22);
  background: color-mix(in srgb, var(--color-primary-light) 45%, var(--color-surface-overlay) 55%);
  color: var(--color-primary);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: var(--text-xs);
  font-weight: 700;
  cursor: pointer;
}
.preset-chip:hover {
  background: color-mix(in srgb, var(--color-primary-light) 60%, var(--color-surface-raised) 40%);
}
.preset-meta-chip {
  border: 1px solid rgba(255,255,255,.08);
  background: rgba(255,255,255,.05);
  color: var(--color-text);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: var(--text-xs);
}
.preset-meta-chip.muted {
  color: var(--color-text-dim);
}
.preset-mini-btn {
  border: 1px solid var(--color-border);
  background: var(--color-surface-overlay);
  color: var(--color-text-muted);
  border-radius: var(--radius-sm);
  padding: 6px 8px;
  font-size: var(--text-xs);
  cursor: pointer;
}
.preset-mini-btn:hover {
  color: var(--color-text);
  background: var(--color-surface-raised);
}
.preset-mini-btn.danger {
  color: var(--color-danger);
}
.preset-edit-row {
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr auto auto;
}
.motion-card-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
}
.motion-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 10px;
  background: var(--color-surface-overlay);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  cursor: pointer;
  transition: border-color var(--transition-fast), background var(--transition-fast), transform var(--transition-fast);
}
.motion-card:hover {
  background: var(--color-surface-raised);
  transform: translateY(-1px);
}
.motion-card.active {
  border-color: rgba(108,71,255,.42);
  background: color-mix(in srgb, var(--color-primary-light) 55%, var(--color-surface-overlay) 45%);
}
.motion-card-label {
  font-size: var(--text-xs);
  font-weight: 700;
}
.motion-preview {
  position: relative;
  width: 100%;
  height: 44px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02)),
    linear-gradient(135deg, rgba(108,71,255,.12), rgba(0,201,167,.08));
  border: 1px solid rgba(255,255,255,.08);
}
.motion-preview-dot {
  position: absolute;
  left: 10px;
  top: 12px;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background: linear-gradient(135deg, #7c3aed, #06b6d4);
  animation-duration: 1.35s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
.motion-preview-dot-secondary {
  top: 12px;
  left: 34px;
  opacity: .88;
}
.motion-preview-dot-tertiary {
  top: 12px;
  left: 58px;
  opacity: .76;
}
.motion-sample-auto,
.motion-sample-fade-up {
  animation-name: motion-sample-fade-up;
}
.motion-sample-fade-up-strong {
  animation-name: motion-sample-fade-up-strong;
}
.motion-sample-fade-left {
  animation-name: motion-sample-fade-left;
}
.motion-sample-fade-right {
  animation-name: motion-sample-fade-right;
}
.motion-sample-zoom-in {
  animation-name: motion-sample-zoom-in;
}
.motion-sample-pop-in,
.motion-sample-soft-pop {
  animation-name: motion-sample-pop-in;
}
.motion-sample-stagger-in,
.motion-sample-stagger-in-secondary,
.motion-sample-stagger-in-tertiary {
  animation-name: motion-sample-stagger-in;
}
.motion-sample-stagger-in-secondary {
  animation-delay: .12s;
}
.motion-sample-stagger-in-tertiary {
  animation-delay: .24s;
}
.motion-sample-none {
  animation: none;
  left: 50%;
  transform: translateX(-50%);
  opacity: .55;
}
.motion-preview-live-none {
  animation: none;
  opacity: .4;
}
.motion-preview-live-auto,
.motion-preview-live-fade-up {
  animation-name: motion-live-fade-up;
}
.motion-preview-live-fade-up-strong {
  animation-name: motion-live-fade-up-strong;
}
.motion-preview-live-fade-left {
  animation-name: motion-live-fade-left;
}
.motion-preview-live-fade-right {
  animation-name: motion-live-fade-right;
}
.motion-preview-live-zoom-in {
  animation-name: motion-live-zoom-in;
}
.motion-preview-live-pop-in,
.motion-preview-live-soft-pop {
  animation-name: motion-live-pop-in;
}
.motion-preview-live-stagger-in {
  animation-name: motion-live-stagger-in;
}

.slide-settings-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  margin-bottom: var(--space-4);
  padding-bottom: 2px;
  border-bottom: 1px solid var(--color-border-subtle);
}
.slide-settings-tab {
  min-height: 38px;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: color var(--transition-fast), border-color var(--transition-fast), background var(--transition-fast);
}
.slide-settings-tab-icon {
  width: 15px;
  height: 15px;
  flex: 0 0 auto;
}
.slide-settings-tab:hover {
  color: var(--color-text);
}
.slide-settings-tab.active {
  color: var(--color-text);
  border-bottom-color: var(--color-primary);
}
.slide-settings-pane {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.slide-settings-subsection {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

@keyframes motion-sample-fade-up {
  0%, 100% { opacity: .2; transform: translateY(14px); }
  35%, 70% { opacity: 1; transform: translateY(0); }
}
@keyframes motion-sample-fade-up-strong {
  0%, 100% { opacity: .15; transform: translateY(18px); filter: blur(5px); }
  35%, 70% { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes motion-sample-fade-left {
  0%, 100% { opacity: .18; transform: translateX(-18px); }
  35%, 70% { opacity: 1; transform: translateX(0); }
}
@keyframes motion-sample-fade-right {
  0%, 100% { opacity: .18; transform: translateX(18px); }
  35%, 70% { opacity: 1; transform: translateX(0); }
}
@keyframes motion-sample-zoom-in {
  0%, 100% { opacity: .16; transform: scale(.72); filter: blur(5px); }
  35%, 70% { opacity: 1; transform: scale(1); filter: blur(0); }
}
@keyframes motion-sample-pop-in {
  0%, 100% { opacity: .18; transform: scale(.78) translateY(10px); }
  45% { opacity: 1; transform: scale(1.06) translateY(0); }
  70% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes motion-sample-stagger-in {
  0%, 100% { opacity: .16; transform: translateY(12px) scale(.92); }
  35%, 70% { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes motion-live-fade-up {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes motion-live-fade-up-strong {
  from { opacity: 0; transform: translateY(24px); filter: blur(6px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}
@keyframes motion-live-fade-left {
  from { opacity: 0; transform: translateX(-24px); filter: blur(4px); }
  to { opacity: 1; transform: translateX(0); filter: blur(0); }
}
@keyframes motion-live-fade-right {
  from { opacity: 0; transform: translateX(24px); filter: blur(4px); }
  to { opacity: 1; transform: translateX(0); filter: blur(0); }
}
@keyframes motion-live-zoom-in {
  from { opacity: 0; transform: scale(.82); filter: blur(5px); }
  to { opacity: 1; transform: scale(1); filter: blur(0); }
}
@keyframes motion-live-pop-in {
  from { opacity: 0; transform: scale(.8) translateY(12px); }
  60% { opacity: 1; transform: scale(1.05) translateY(0); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes motion-live-stagger-in {
  from { opacity: 0; transform: translateY(20px) scale(.96); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

@media (max-width: 780px) {
  .geo-grid {
    grid-template-columns: 1fr;
  }
  .preset-toolbar {
    grid-template-columns: 1fr;
  }
  .preset-toolbar.compact {
    grid-template-columns: 1fr;
  }
  .preset-row {
    grid-template-columns: 1fr;
  }
  .motion-card-grid {
    grid-template-columns: 1fr;
  }
}
</style>
