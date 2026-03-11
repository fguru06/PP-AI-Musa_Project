<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'
import { useAuthStore } from '@/stores/authStore'
import { useKeyboardShortcuts } from '@/composables/useDrag'
import { useDashboardAICreation } from '@/composables/useDashboardAICreation'

import SlidePanel from '@/components/editor/SlidePanel.vue'
import LayerPanel from '@/components/editor/LayerPanel.vue'
import PropertiesPanel from '@/components/editor/PropertiesPanel.vue'
import EditorToolbar from '@/components/editor/EditorToolbar.vue'
import EditorCanvas from '@/components/editor/EditorCanvas.vue'
import AIAssistant from '@/components/editor/AIAssistant.vue'
import ThemeManager from '@/components/editor/ThemeManager.vue'
import ExportModal from '@/components/editor/ExportModal.vue'
import AIProjectModal from '@/components/common/AIProjectModal.vue'
import ConfirmActionModal from '@/components/common/ConfirmActionModal.vue'
import { getProjectCanvasSize } from '@/lib/canvas'

const route = useRoute()
const router = useRouter()
const editorStore = useEditorStore()
const projectStore = useProjectStore()
const authStore = useAuthStore()

const projectId = computed(() => route.params.id)
const project = computed(() => projectStore.getProject(projectId.value))
const canvasSize = computed(() => getProjectCanvasSize(project.value))
const slides = computed(() => [...(project.value?.slides || [])].sort((a, b) => a.order - b.order))
const imageInputRef = ref(null)
const showAIProjectConfirm = ref(false)
const pendingAIMode = ref('deck')
const {
  aiStore,
  showAIModal,
  aiMode,
  aiTopic,
  aiContext,
  aiProjectName,
  aiSlideCount,
  aiQuestionCount,
  aiDifficulty,
  aiQuestionType,
  aiCreationError,
  aiSubmitting,
  aiProjectNamePlaceholder,
  aiPrimaryActionLabel,
  openAICreationModal,
  createAIProject,
} = useDashboardAICreation({
  onRequireAuth: () => router.push({ name: 'dashboard' }),
})

let isUndoing = false
let historyTimeout = null

// Watch the project state to push to history
watch(() => project.value, (newVal) => {
  if (!newVal) return
  if (isUndoing) {
    isUndoing = false // reset flag after one skipped cycle
    return
  }
  if (historyTimeout) clearTimeout(historyTimeout)
  historyTimeout = setTimeout(() => {
    editorStore.pushHistory(newVal)
  }, 600)
}, { deep: true })

// Wait for auth to be ready before evaluating if project exists
watch(
  () => authStore.isAuthReady,
  async (isReady) => {
    if (isReady) {
      if (authStore.user?.uid) {
        await projectStore.ensureRemoteProjectsLoaded()
      }
      if (!project.value) {
        router.push({ name: 'dashboard' })
        return
      }
      editorStore.setProject(projectId.value)
      if (slides.value.length > 0) {
        editorStore.setCurrentSlide(slides.value[0].id)
      }
      // Save initial state for undo
      editorStore.pushHistory(project.value)
    }
  },
  { immediate: true }
)

// Auto-save label
const saveLabel = computed(() => {
  const p = project.value
  if (!p) return ''
  const d = new Date(p.updatedAt)
  return `Saved ${d.toLocaleTimeString()}`
})

// Right panel tab component
const rightPanelContent = computed(() => {
  switch (editorStore.rightPanelTab) {
    case 'layers': return 'layers'
    case 'ai': return 'ai'
    case 'theme': return 'theme'
    default: return 'properties'
  }
})

// Keyboard shortcuts
useKeyboardShortcuts({
  undo: () => {
    if (editorStore.canUndo()) {
      const prevState = editorStore.undo()
      if (prevState) {
        isUndoing = true
        projectStore.updateProject(projectId.value, prevState)
      }
    }
  },
  redo: () => {
    if (editorStore.canRedo()) {
      const nextState = editorStore.redo()
      if (nextState) {
        isUndoing = true
        projectStore.updateProject(projectId.value, nextState)
      }
    }
  },
  delete: () => {
    if (editorStore.selectedElementId) {
      projectStore.deleteElement(editorStore.projectId, editorStore.currentSlideId, editorStore.selectedElementId)
      editorStore.clearSelection()
    }
  },
  escape: () => {
    editorStore.clearSelection()
    editorStore.setActiveTool('select')
  },
  copy: () => {
    const el = project.value?.slides?.find(s => s.id === editorStore.currentSlideId)
      ?.elements?.find(e => e.id === editorStore.selectedElementId)
    if (el) editorStore.setClipboard(el)
  },
  paste: () => {
    if (editorStore.clipboard && editorStore.currentSlideId) {
      const src = editorStore.clipboard
      projectStore.addElement(editorStore.projectId, editorStore.currentSlideId, src.type, {
        ...src,
        x: src.x + 20, y: src.y + 20,
        id: undefined,
      })
    }
  },
  duplicate: () => {
    if (editorStore.selectedElementId) {
      const copy = projectStore.duplicateElement(editorStore.projectId, editorStore.currentSlideId, editorStore.selectedElementId)
      if (copy) editorStore.selectElement(copy.id)
    }
  },
  zoomIn: () => editorStore.zoomIn(),
  zoomOut: () => editorStore.zoomOut(),
  zoomReset: () => editorStore.zoomReset(),
  toggleGrid: () => editorStore.toggleGrid(),
  nudge: (dx, dy) => {
    if (!editorStore.selectedElementId) return
    const el = project.value?.slides?.find(s => s.id === editorStore.currentSlideId)
      ?.elements?.find(e => e.id === editorStore.selectedElementId)
    if (el) projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, editorStore.selectedElementId, {
      x: el.x + dx, y: el.y + dy
    })
  },
  selectAll: () => {
    const els = project.value?.slides?.find(s => s.id === editorStore.currentSlideId)?.elements || []
    els.forEach((e, i) => editorStore.selectElement(e.id, i > 0))
  },
})

function goBack() {
  router.push({ name: 'dashboard' })
}

function preview() {
  router.push({ name: 'preview', params: { id: projectId.value }, query: { from: 'editor' } })
}

function openEditorAIProjectModal(mode = 'deck') {
  pendingAIMode.value = mode
  showAIProjectConfirm.value = true
}

function confirmOpenEditorAIProject() {
  showAIProjectConfirm.value = false
  openAICreationModal(pendingAIMode.value)
}

function addImageToCurrentSlide(src, fileName = 'Image') {
  if (!editorStore.projectId || !editorStore.currentSlideId || !src) return

  const image = new Image()
  image.onload = () => {
    const maxWidth = 420
    const maxHeight = 280
    const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1)
    const width = Math.max(120, Math.round(image.width * ratio))
    const height = Math.max(80, Math.round(image.height * ratio))
    const x = Math.max(24, Math.round((canvasSize.value.width - width) / 2))
    const y = Math.max(24, Math.round((canvasSize.value.height - height) / 2))

    const created = projectStore.addElement(editorStore.projectId, editorStore.currentSlideId, 'image', {
      x,
      y,
      width,
      height,
      content: {
        src,
        alt: fileName,
        objectFit: 'cover',
      },
    })

    if (created) {
      editorStore.selectElement(created.id)
      editorStore.setRightPanel('properties')
      editorStore.setActiveTool('select')
    }
  }
  image.src = src
}

function handleImageUpload(event) {
  const [file] = Array.from(event.target.files || [])
  if (!file || !file.type.startsWith('image/')) return

  const reader = new FileReader()
  reader.onload = () => addImageToCurrentSlide(String(reader.result || ''), file.name)
  reader.readAsDataURL(file)
  event.target.value = ''
}

function openImagePicker() {
  imageInputRef.value?.click()
}

const authoringOptions = [
  { id: 'text', label: 'Text' },
  { id: 'resources', label: 'Resources' },
  { id: 'interactive-elements', label: 'Interactive elements' },
  { id: 'interactive-questions', label: 'Interactive questions' },
  { id: 'widgets', label: 'Widgets' },
  { id: 'insert', label: 'Insert' },
  { id: 'style', label: 'Style' },
  { id: 'background', label: 'Background' },
  { id: 'pages', label: 'Pages' },
]

function handleAuthoringOption(id) {
  if (id === 'text') {
    editorStore.setActiveTool('text')
    return
  }
  if (id === 'resources') {
    editorStore.setActiveTool('image')
    return
  }
  if (id === 'interactive-elements') {
    editorStore.setActiveTool('hotspot')
    return
  }
  if (id === 'interactive-questions') {
    editorStore.setActiveTool('quiz')
    return
  }
  if (id === 'widgets') {
    editorStore.setActiveTool('shape')
    return
  }
  if (id === 'insert') {
    openImagePicker()
    return
  }
  if (id === 'style') {
    editorStore.setRightPanel('properties')
    return
  }
  if (id === 'background') {
    editorStore.clearSelection()
    editorStore.setRightPanel('properties')
    return
  }
  if (id === 'pages') {
    editorStore.toggleSlidePanel()
  }
}

function isAuthoringOptionActive(id) {
  if (id === 'text') return ['text', 'heading'].includes(editorStore.activeTool)
  if (id === 'resources') return editorStore.activeTool === 'image'
  if (id === 'interactive-elements') return ['hotspot', 'button'].includes(editorStore.activeTool)
  if (id === 'interactive-questions') return editorStore.activeTool === 'quiz'
  if (id === 'widgets') return ['shape', 'video', 'audio', 'chart'].includes(editorStore.activeTool)
  if (id === 'insert') return false
  if (id === 'style' || id === 'background') return editorStore.rightPanelTab === 'properties'
  if (id === 'pages') return editorStore.showSlidePanel
  return false
}
</script>

<template>
  <div class="editor-view" v-if="project">
    <input
      ref="imageInputRef"
      type="file"
      accept="image/*"
      class="sr-only"
      @change="handleImageUpload"
    />

    <!-- Top Bar -->
    <header class="editor-topbar">
      <div class="topbar-left">
        <button class="btn btn-ghost btn-sm back-btn" @click="goBack" data-tooltip="Return to dashboard" data-tooltip-position="bottom">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Dashboard
        </button>
        <div class="project-name-wrap">
          <input
            :value="project.name"
            class="project-name-input"
            @change="projectStore.updateProject(projectId, { name: $event.target.value })"
          />
        </div>
        <span class="save-label">{{ saveLabel }}</span>
      </div>
      <div class="topbar-center">
        <span class="slide-position" v-if="editorStore.currentSlideId">
          Slide {{ slides.findIndex(s => s.id === editorStore.currentSlideId) + 1 }} of {{ slides.length }}
        </span>
      </div>
      <div class="topbar-right">
        <button
          :class="['btn btn-ghost btn-sm', editorStore.showAIPanel && 'active-btn']"
          @click="editorStore.showAIPanel = !editorStore.showAIPanel; editorStore.setRightPanel('ai')"
          data-tooltip="Open AI assistant"
          data-tooltip-position="bottom"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          AI
        </button>
        <button class="btn btn-ghost btn-sm" @click="editorStore.showThemeManager = !editorStore.showThemeManager; editorStore.setRightPanel('theme')" data-tooltip="Open theme controls" data-tooltip-position="bottom">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
          Theme
        </button>
        <button class="btn btn-secondary btn-sm" @click="preview" data-tooltip="Preview your project" data-tooltip-position="bottom">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Preview
        </button>
        <button class="btn btn-primary btn-sm" @click="editorStore.showExportModal = true" data-tooltip="Export or publish" data-tooltip-position="bottom">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
      </div>
    </header>

    <!-- Toolbar -->
    <EditorToolbar @open-ai-project="openEditorAIProjectModal" />

    <!-- Main layout -->
    <div class="editor-body">
      <aside class="authoring-rail">
        <button
          v-for="item in authoringOptions"
          :key="item.id"
          :class="['rail-option', isAuthoringOptionActive(item.id) && 'active']"
          @click="handleAuthoringOption(item.id)"
          :data-tooltip="item.label"
          data-tooltip-position="right"
        >
          <span v-if="item.id === 'text'" class="rail-icon">T</span>
          <span v-else-if="item.id === 'resources'" class="rail-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
          </span>
          <span v-else-if="item.id === 'interactive-elements'" class="rail-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </span>
          <span v-else-if="item.id === 'interactive-questions'" class="rail-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </span>
          <span v-else-if="item.id === 'widgets'" class="rail-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </span>
          <span v-else-if="item.id === 'insert'" class="rail-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </span>
          <span v-else-if="item.id === 'style'" class="rail-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </span>
          <span v-else-if="item.id === 'background'" class="rail-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          </span>
          <span v-else-if="item.id === 'pages'" class="rail-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
          </span>
          {{ item.label }}
        </button>
      </aside>

      <!-- Left: Slides -->
      <Transition name="side-panel-slide">
        <SlidePanel v-if="editorStore.showSlidePanel" />
      </Transition>

      <!-- Center: Canvas -->
      <EditorCanvas />

      <!-- Right: Panels -->
      <aside class="right-panel">
        <!-- Panel Tab Bar -->
        <div class="panel-tabs">
          <button
            v-for="t in [
              { id: 'properties', label: 'Props', icon: '⚙' },
              { id: 'layers', label: 'Layers', icon: '◧' },
              { id: 'ai', label: 'AI', icon: '✦' },
              { id: 'theme', label: 'Theme', icon: '🎨' },
            ]"
            :key="t.id"
            :class="['panel-tab', editorStore.rightPanelTab === t.id && 'active']"
            @click="editorStore.setRightPanel(t.id)"
            :data-tooltip="`Open ${t.label}`"
            data-tooltip-position="bottom"
          >
            <span class="tab-icon">{{ t.icon }}</span>
            <span class="tab-label">{{ t.label }}</span>
          </button>
        </div>

        <!-- Panel Content -->
        <div class="panel-content">
          <Transition name="editor-panel-switch" mode="out-in">
            <div :key="rightPanelContent" class="panel-content-view">
              <PropertiesPanel v-if="editorStore.rightPanelTab === 'properties'" />
              <LayerPanel v-else-if="editorStore.rightPanelTab === 'layers'" />
              <AIAssistant v-else-if="editorStore.rightPanelTab === 'ai'" />
              <ThemeManager v-else-if="editorStore.rightPanelTab === 'theme'" />
            </div>
          </Transition>
        </div>
      </aside>
    </div>

    <!-- Export Modal -->
    <ExportModal v-if="editorStore.showExportModal" />

    <ConfirmActionModal
      v-if="showAIProjectConfirm"
      title="Create a New AI Project"
      message="Your current project stays saved. When the AI finishes, the editor will switch to the new generated project."
      confirm-label="Continue"
      @close="showAIProjectConfirm = false"
      @confirm="confirmOpenEditorAIProject"
    />

    <AIProjectModal
      v-if="showAIModal"
      :mode="aiMode"
      :topic="aiTopic"
      :context="aiContext"
      :project-name="aiProjectName"
      :slide-count="aiSlideCount"
      :question-count="aiQuestionCount"
      :difficulty="aiDifficulty"
      :question-type="aiQuestionType"
      :project-name-placeholder="aiProjectNamePlaceholder"
      :primary-action-label="aiPrimaryActionLabel"
      :creation-error="aiCreationError"
      :is-submitting="aiSubmitting"
      :is-generating="aiStore.isGenerating"
      :has-api-key="!!aiStore.apiKey"
      @close="showAIModal = false"
      @create="createAIProject"
      @update:mode="aiMode = $event"
      @update:topic="aiTopic = $event"
      @update:context="aiContext = $event"
      @update:project-name="aiProjectName = $event"
      @update:slide-count="aiSlideCount = $event"
      @update:question-count="aiQuestionCount = $event"
      @update:difficulty="aiDifficulty = $event"
      @update:question-type="aiQuestionType = $event"
    />
  </div>

  <!-- Not found -->
  <div v-else class="editor-not-found">
    <h2>Project not found</h2>
    <p>This project may have been deleted or the link is invalid.</p>
    <button class="btn btn-primary" @click="goBack">Go to Dashboard</button>
  </div>
</template>

<style scoped>
.editor-view {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, rgba(251, 191, 36, 0.14), transparent 20%),
    radial-gradient(circle at bottom right, rgba(139, 92, 246, 0.12), transparent 26%),
    linear-gradient(180deg, #f8fafc, #eef2ff 46%, #f8fafc);
}

/* Top Bar */
.editor-topbar {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
  flex-shrink: 0;
  gap: var(--space-4);
  z-index: 20;
}
.topbar-left {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex: 1;
}
.back-btn { 
  color: #0f172a; 
  font-weight: 600;
  background: rgba(255,255,255,0.92);
  border-color: rgba(148, 163, 184, 0.2);
}
.back-btn:hover { background: rgba(255,255,255,1); }
.project-name-wrap { flex: 0 1 auto; }
.project-name-input {
  background: rgba(255,255,255,0.82);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: var(--radius-full);
  color: #0f172a;
  font-size: 16px;
  font-weight: 700;
  padding: 6px 16px;
  min-width: 120px;
  max-width: 280px;
  outline: none;
  font-family: var(--font-sans);
  transition: all 0.2s ease;
  box-shadow: inset 0 1px 2px rgba(15,23,42,0.03);
}
.project-name-input:hover { border-color: rgba(91,33,182,0.16); background: rgba(255,255,255,0.96); }
.project-name-input:focus { border-color: #6c47ff; background: #fff; box-shadow: 0 0 0 3px rgba(108,71,255,0.15); }
.save-label {
  font-size: var(--text-xs);
  color: #64748b;
  font-weight: 500;
}
.topbar-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.slide-position {
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  background: rgba(255,255,255,0.82);
  padding: 6px 16px;
  border-radius: var(--radius-full);
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 6px 20px rgba(15,23,42,0.05);
}
.topbar-right {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex: 1;
  justify-content: flex-end;
}
.active-btn {
  background: linear-gradient(135deg, #6c47ff, #4f46e5) !important;
  color: #fff !important;
  box-shadow: 0 10px 24px rgba(108, 71, 255, 0.24);
}

/* Body layout */
.editor-body {
  flex: 1;
  display: flex;
  overflow: hidden;
  position: relative;
}

.authoring-rail {
  width: 90px;
  background: linear-gradient(180deg, #0f172a, #131c31);
  border-right: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-2);
  flex-shrink: 0;
  box-shadow: 8px 0 32px rgba(15,23,42,0.12);
  z-index: 10;
}

.rail-option {
  border: 1px solid transparent;
  background: transparent;
  color: rgba(255, 255, 255, 0.68);
  border-radius: 18px;
  min-height: 60px;
  padding: 12px 4px;
  font-size: 11px;
  line-height: 1.2;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-weight: 500;
}

.rail-option .rail-icon {
  display: block;
  font-size: 18px;
  font-weight: 800;
  opacity: 0.8;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.rail-option:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255,255,255,0.08);
  color: #fff;
  transform: translateY(-2px);
}

.rail-option.active {
  background: linear-gradient(180deg, rgba(139, 92, 246, 0.18), rgba(59, 130, 246, 0.1));
  border-color: rgba(196, 181, 253, 0.4);
  color: #fff;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08), 0 10px 22px rgba(76, 29, 149, 0.18);
}

.rail-option.active .rail-icon {
  opacity: 1;
  transform: scale(1.06);
}

.rail-option:hover .rail-icon {
  opacity: 1;
  transform: scale(1.1);
}

/* Right Panel */
.right-panel {
  width: var(--sidebar-right-width);
  background: rgba(255,255,255,0.74);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(148,163,184,0.18);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: -12px 0 40px rgba(15,23,42,0.06);
}
.panel-tabs {
  display: flex;
  border-bottom: 1px solid rgba(148,163,184,0.16);
  flex-shrink: 0;
  background: rgba(248,250,252,0.86);
}
.panel-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 4px;
  background: none;
  border: none;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}
.panel-tab:hover { color: #0f172a; background: rgba(255,255,255,0.6); transform: translateY(-1px); }
.panel-tab.active {
  color: #6c47ff;
  border-bottom-color: #6c47ff;
  background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,247,255,0.92));
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.9);
}
.tab-icon { font-size: 16px; line-height: 1; }
.tab-label { font-size: 11px; font-weight: 700; letter-spacing: .05em; text-transform: uppercase; }
.panel-content { flex: 1; min-height: 0; overflow: hidden; display: flex; flex-direction: column; }
.panel-content-view { min-height: 0; flex: 1; display: flex; flex-direction: column; }

.side-panel-slide-enter-active,
.side-panel-slide-leave-active {
  transition: opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.side-panel-slide-enter-from,
.side-panel-slide-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

.editor-panel-switch-enter-active,
.editor-panel-switch-leave-active {
  transition: opacity 180ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

.editor-panel-switch-enter-from,
.editor-panel-switch-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Not found */
.editor-not-found {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  color: var(--color-text-muted);
  text-align: center;
  background: linear-gradient(180deg, #f8fafc, #eef2ff);
}
.editor-not-found h2 { font-size: var(--text-2xl); color: var(--color-text); }

@media (max-width: 1180px) {
  .topbar-center {
    display: none;
  }

  .right-panel {
    width: 250px;
  }
}

@media (max-width: 980px) {
  .editor-topbar {
    height: auto;
    min-height: var(--topbar-height);
    padding-top: var(--space-2);
    padding-bottom: var(--space-2);
    flex-wrap: wrap;
  }

  .topbar-left,
  .topbar-right {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .project-name-wrap {
    flex: 1;
    min-width: 180px;
  }

  .project-name-input {
    width: 100%;
    max-width: none;
  }

  .authoring-rail {
    width: 70px;
    padding: var(--space-2) 4px;
  }

  .rail-option {
    min-height: 40px;
    font-size: 9px;
  }

  .right-panel {
    width: 220px;
  }
}

@media (max-width: 780px) {
  .editor-body {
    flex-direction: column;
  }

  .authoring-rail {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
    gap: var(--space-1);
  }

  .rail-option {
    min-width: 84px;
    min-height: 34px;
    font-size: 10px;
  }

  .right-panel {
    width: 100%;
    min-height: 220px;
    max-height: 36vh;
    border-left: none;
    border-top: 1px solid var(--color-border);
  }
}
</style>
