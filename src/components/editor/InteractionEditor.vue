<script setup>
import { computed } from 'vue'
import Modal from '@/components/common/Modal.vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'

const editorStore = useEditorStore()
const projectStore = useProjectStore()

const el = computed(() => {
  if (!editorStore.interactionElementId) return null
  const project = projectStore.getProject(editorStore.projectId)
  const slide = project?.slides?.find(s => s.id === editorStore.currentSlideId)
  return slide?.elements?.find(e => e.id === editorStore.interactionElementId) || null
})

const interactions = computed(() => el.value?.interactions || [])

function close() {
  editorStore.showInteractionEditor = false
  editorStore.interactionElementId = null
}

const TRIGGERS = ['click', 'hover', 'load']
const ACTIONS = ['navigate', 'openUrl', 'showPopup', 'playAudio', 'pauseVideo', 'toggleElement', 'completeActivity']
const TRIGGER_LABELS = { click: 'On Click', hover: 'On Hover', load: 'On Slide Load' }
const ACTION_LABELS = { 
  navigate: 'Go to Slide', 
  openUrl: 'Open URL', 
  showPopup: 'Show Popup', 
  playAudio: 'Play Audio', 
  pauseVideo: 'Pause Video',
  toggleElement: 'Toggle Element (ID)',
  completeActivity: 'Mark Completed'
}

function addInteraction() {
  const updated = [...interactions.value, { trigger: 'click', action: 'navigate', value: '' }]
  projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, editorStore.interactionElementId, {
    interactions: updated
  })
}

function applyPreset(presetName) {
  let newInteraction = null;
  if (presetName === 'next_slide') {
    newInteraction = { trigger: 'click', action: 'navigate', value: 'next' }
  } else if (presetName === 'prev_slide') {
    newInteraction = { trigger: 'click', action: 'navigate', value: 'prev' }
  } else if (presetName === 'show_info') {
    newInteraction = { trigger: 'click', action: 'showPopup', value: 'More info about this...' }
  } else if (presetName === 'learn_complete') {
    newInteraction = { trigger: 'click', action: 'completeActivity', value: '' }
  }

  if (newInteraction) {
    const updated = [...interactions.value, newInteraction]
    projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, editorStore.interactionElementId, {
      interactions: updated
    })
  }
}

function updateInteraction(idx, patch) {
  const updated = interactions.value.map((it, i) => i === idx ? { ...it, ...patch } : it)
  projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, editorStore.interactionElementId, {
    interactions: updated
  })
}

function removeInteraction(idx) {
  const updated = interactions.value.filter((_, i) => i !== idx)
  projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, editorStore.interactionElementId, {
    interactions: updated
  })
}
</script>

<template>
  <Modal title="Interaction Editor" size="md" @close="close">
    <div class="interaction-editor">
      <div v-if="!el" class="empty-state">No element selected.</div>
      <template v-else>
        <p class="hint">Add interactions to <strong>{{ el.type }}</strong> elements. They activate in Preview mode.</p>

        <div class="presets-row">
          <span class="presets-label">Presets:</span>
          <button class="btn btn-sm btn-secondary" @click="applyPreset('prev_slide')">Prev Slide</button>
          <button class="btn btn-sm btn-secondary" @click="applyPreset('next_slide')">Next Slide</button>
          <button class="btn btn-sm btn-secondary" @click="applyPreset('show_info')">Info Popup</button>
          <button class="btn btn-sm btn-secondary" @click="applyPreset('learn_complete')">Complete Action</button>
        </div>
        <hr class="divider" />

        <div v-for="(it, idx) in interactions" :key="idx" class="interaction-row">
          <div class="form-group">
            <label class="form-label">Trigger</label>
            <select class="select" :value="it.trigger" @change="updateInteraction(idx, { trigger: $event.target.value })">
              <option v-for="t in TRIGGERS" :key="t" :value="t">{{ TRIGGER_LABELS[t] }}</option>
            </select>
          </div>
          <span class="arrow">→</span>
          <div class="form-group">
            <label class="form-label">Action</label>
            <select class="select" :value="it.action" @change="updateInteraction(idx, { action: $event.target.value })">
              <option v-for="a in ACTIONS" :key="a" :value="a">{{ ACTION_LABELS[a] }}</option>
            </select>
          </div>
          <div class="form-group value-group">
            <label class="form-label">Value</label>
            <input class="input" :value="it.value" :placeholder="it.action === 'navigate' ? 'Slide number' : it.action === 'openUrl' ? 'https://...' : 'Content'" @input="updateInteraction(idx, { value: $event.target.value })" />
          </div>
          <button class="btn btn-ghost btn-icon remove-btn" @click="removeInteraction(idx)">✕</button>
        </div>

        <button class="btn btn-ghost add-btn" @click="addInteraction">
          + Add Interaction
        </button>
      </template>
    </div>

    <template #footer>
      <button class="btn btn-primary" @click="close">Done</button>
    </template>
  </Modal>
</template>

<style scoped>
.interaction-editor {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.hint {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  margin: 0;
}
.empty-state {
  color: var(--color-text-muted);
  text-align: center;
  padding: var(--space-8);
}
.presets-row {
  display: flex;
  gap: var(--space-2);
  align-items: center;
  flex-wrap: wrap;
}
.presets-label {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  font-weight: 500;
  margin-right: 4px;
}
.divider {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: var(--space-2) 0;
}
.interaction-row {
  display: flex;
  align-items: flex-end;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--color-surface-overlay);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
}
.arrow {
  font-size: 18px;
  color: var(--color-text-muted);
  padding-bottom: 6px;
  flex-shrink: 0;
}
.value-group { flex: 1; }
.remove-btn {
  color: var(--color-text-muted);
  flex-shrink: 0;
  padding-bottom: 0;
  margin-bottom: 0;
}
.remove-btn:hover { color: var(--color-danger); }
.add-btn {
  align-self: flex-start;
  color: var(--color-primary);
}
</style>
