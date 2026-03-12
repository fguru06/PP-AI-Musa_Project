<script setup>
import { computed, ref } from 'vue'
import Modal from '@/components/common/Modal.vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'
import { CONTENT_BLOCK_DRAG_MIME } from '@/lib/blockLibrary'

const editorStore = useEditorStore()
const projectStore = useProjectStore()

const searchQuery = ref('')
const activeCategory = ref('all')
const customBlockName = ref('')
const customBlockCategory = ref('Custom')
const showBindingModal = ref(false)
const pendingInsertBlock = ref(null)
const pendingBindingValues = ref({})

const project = computed(() => projectStore.getProject(editorStore.projectId))
const slide = computed(() => project.value?.slides?.find((item) => item.id === editorStore.currentSlideId))
const allBlocks = computed(() => projectStore.getContentBlocks(editorStore.projectId))
const categories = computed(() => {
  const unique = new Set(['all'])
  allBlocks.value.forEach((block) => unique.add(block.category || 'Custom'))
  return Array.from(unique)
})
const selectedElements = computed(() => {
  const ids = new Set(editorStore.selectedElementIds)
  return (slide.value?.elements || []).filter((element) => ids.has(element.id))
})
const pendingBindings = computed(() => Array.isArray(pendingInsertBlock.value?.bindings) ? pendingInsertBlock.value.bindings : [])
const filteredBlocks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return allBlocks.value.filter((block) => {
    const categoryMatch = activeCategory.value === 'all' || (block.category || 'Custom') === activeCategory.value
    if (!categoryMatch) return false
    if (!query) return true

    const haystack = [
      block.name,
      block.description,
      block.category,
      ...(block.tags || []),
    ].join(' ').toLowerCase()

    return haystack.includes(query)
  })
})

function getBlockBounds(block) {
  const elements = Array.isArray(block?.elements) ? block.elements : []
  if (!elements.length) {
    return { minX: 0, minY: 0, width: 1, height: 1 }
  }

  const minX = Math.min(...elements.map((element) => Number(element.x || 0)))
  const minY = Math.min(...elements.map((element) => Number(element.y || 0)))
  const maxX = Math.max(...elements.map((element) => Number(element.x || 0) + Number(element.width || 0)))
  const maxY = Math.max(...elements.map((element) => Number(element.y || 0) + Number(element.height || 0)))

  return {
    minX,
    minY,
    width: Math.max(1, maxX - minX),
    height: Math.max(1, maxY - minY),
  }
}

function getThumbFrameStyle(block, element) {
  const bounds = getBlockBounds(block)
  return {
    left: `${((Number(element.x || 0) - bounds.minX) / bounds.width) * 100}%`,
    top: `${((Number(element.y || 0) - bounds.minY) / bounds.height) * 100}%`,
    width: `${(Number(element.width || 0) / bounds.width) * 100}%`,
    height: `${(Number(element.height || 0) / bounds.height) * 100}%`,
  }
}

function getThumbElementStyle(element) {
  if (element.type === 'shape') {
    return {
      background: element.content?.fillColor || '#cbd5e1',
      borderRadius: element.content?.shapeType === 'circle' ? '50%' : `${Number(element.content?.borderRadius || 10)}px`,
      border: `${Math.max(0, Number(element.content?.borderWidth || 0))}px solid ${element.content?.borderColor || 'transparent'}`,
    }
  }

  if (element.type === 'button') {
    return {
      background: element.content?.bgColor || '#6c47ff',
      borderRadius: `${Number(element.content?.borderRadius || 10)}px`,
    }
  }

  if (element.type === 'image' || element.type === 'video') {
    return {
      background: 'linear-gradient(135deg, rgba(14,165,233,.25), rgba(108,71,255,.25))',
      borderRadius: '14px',
    }
  }

  if (element.type === 'text' || element.type === 'heading') {
    return {
      background: 'transparent',
      borderRadius: '0',
    }
  }

  return {
    background: 'rgba(148, 163, 184, 0.25)',
    borderRadius: '12px',
  }
}

function getTextLineStyle(element, lineIndex) {
  const lineCount = element.type === 'heading' ? 2 : 3
  const compactHeight = Math.max(18, 100 / (lineCount + 1.25))
  return {
    width: `${lineIndex === lineCount - 1 ? 72 : 100}%`,
    height: `${element.type === 'heading' ? compactHeight : compactHeight - 2}%`,
  }
}

function handleInsertedBlock(created) {
  if (created.length) {
    editorStore.setSelection(created.map((element) => element.id))
    editorStore.focusPropertiesSection('content')
    editorStore.setActiveTool('select')
  }
}

function hasBindings(block) {
  return Array.isArray(block?.bindings) && block.bindings.length > 0
}

function closeBindingModal() {
  showBindingModal.value = false
  pendingInsertBlock.value = null
  pendingBindingValues.value = {}
}

function insertBlock(block, bindingValues = null) {
  const created = projectStore.insertContentBlock(editorStore.projectId, editorStore.currentSlideId, block.id, bindingValues ? { bindingValues } : {})
  handleInsertedBlock(created)
}

function startInsertBlock(block) {
  if (!hasBindings(block)) {
    insertBlock(block)
    return
  }

  pendingInsertBlock.value = block
  pendingBindingValues.value = Object.fromEntries(
    block.bindings.map((binding) => [binding.id, binding.defaultValue || ''])
  )
  showBindingModal.value = true
}

function confirmInsertWithBindings() {
  if (!pendingInsertBlock.value) return
  insertBlock(pendingInsertBlock.value, { ...pendingBindingValues.value })
  closeBindingModal()
}

function saveSelectionAsBlock() {
  const name = customBlockName.value.trim()
  if (!name || !selectedElements.value.length) return

  const block = projectStore.saveSelectionAsContentBlock(
    editorStore.projectId,
    editorStore.currentSlideId,
    selectedElements.value.map((element) => element.id),
    {
      name,
      category: customBlockCategory.value.trim() || 'Custom',
      accent: project.value?.theme?.primaryColor || '#6c47ff',
    }
  )

  if (block) {
    customBlockName.value = ''
    activeCategory.value = 'Custom'
  }
}

function removeCustomBlock(blockId) {
  projectStore.deleteContentBlock(editorStore.projectId, blockId)
}

function onBlockDragStart(event, block) {
  if (!event.dataTransfer) return

  event.dataTransfer.effectAllowed = 'copy'
  event.dataTransfer.setData(CONTENT_BLOCK_DRAG_MIME, JSON.stringify({ id: block.id }))
  event.dataTransfer.setData('text/plain', block.name)
}
</script>

<template>
  <div class="blocks-panel">
    <div class="blocks-panel-header">
      <div>
        <div class="panel-section-title">Blocks</div>
        <div class="blocks-panel-subtitle">Drop in reusable sections for faster slide building.</div>
      </div>
    </div>

    <div class="blocks-toolbar">
      <input v-model="searchQuery" class="input blocks-search" placeholder="Search blocks" />
      <div class="blocks-categories">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          :class="['blocks-category-chip', activeCategory === category && 'active']"
          @click="activeCategory = category"
        >
          {{ category === 'all' ? 'All' : category }}
        </button>
      </div>
    </div>

    <div class="blocks-panel-body">
      <div class="blocks-save-card">
        <div class="blocks-save-title">Save Selection</div>
        <div class="field-hint">Turn the current selection into a reusable block for this project. Text and button labels become editable placeholders.</div>
        <input v-model="customBlockName" class="input" placeholder="e.g. Product intro banner" />
        <input v-model="customBlockCategory" class="input" placeholder="Category" />
        <button
          type="button"
          class="btn btn-primary btn-sm w-full"
          :disabled="!selectedElements.length || !customBlockName.trim()"
          @click="saveSelectionAsBlock"
        >
          Save {{ selectedElements.length ? `${selectedElements.length} item${selectedElements.length > 1 ? 's' : ''}` : 'selection' }} as block
        </button>
      </div>

      <div class="blocks-list">
        <div
          v-for="block in filteredBlocks"
          :key="block.id"
          class="block-card"
          draggable="true"
          @dragstart="onBlockDragStart($event, block)"
        >
          <div class="block-thumb" :style="{ '--block-accent': block.accent || '#6c47ff' }">
            <div class="block-thumb-stage">
              <div
                v-for="element in block.elements"
                :key="`${block.id}-${element.type}-${element.x}-${element.y}`"
                class="block-thumb-frame"
                :style="getThumbFrameStyle(block, element)"
              >
                <template v-if="['text', 'heading'].includes(element.type)">
                  <div class="thumb-text" :class="element.type === 'heading' && 'thumb-text-heading'">
                    <span
                      v-for="lineIndex in (element.type === 'heading' ? 2 : 3)"
                      :key="`${block.id}-${element.type}-${element.x}-${element.y}-${lineIndex}`"
                      class="thumb-text-line"
                      :style="getTextLineStyle(element, lineIndex - 1)"
                    />
                  </div>
                </template>
                <div v-else class="thumb-element" :style="getThumbElementStyle(element)" />
              </div>
            </div>
          </div>

          <div class="block-card-body">
            <div class="block-card-head">
              <div>
                <div class="block-name">{{ block.name }}</div>
                <div class="block-meta">
                  {{ block.category }}<span v-if="block.scope === 'custom'"> · Custom</span><span v-if="hasBindings(block)"> · {{ block.bindings.length }} field{{ block.bindings.length > 1 ? 's' : '' }}</span>
                </div>
              </div>
              <button
                v-if="block.scope === 'custom'"
                type="button"
                class="block-delete-btn"
                @click="removeCustomBlock(block.id)"
                aria-label="Delete custom block"
                title="Delete custom block"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M9 6V4h6v2"/>
                </svg>
              </button>
            </div>
            <p class="block-description">{{ block.description || 'Reusable layout block' }}</p>
            <div v-if="hasBindings(block)" class="block-binding-note">Editable placeholders included</div>
            <div class="block-tags">
              <span v-for="tag in block.tags || []" :key="`${block.id}-${tag}`" class="block-tag">#{{ tag }}</span>
            </div>
            <button type="button" class="btn btn-secondary btn-sm w-full" @click="startInsertBlock(block)">
              {{ hasBindings(block) ? 'Insert with Fields' : 'Insert Block' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <Modal v-if="showBindingModal" title="Fill Template Fields" size="md" @close="closeBindingModal">
      <div class="binding-modal-body">
        <p class="binding-modal-intro">
          Customize the placeholder text before inserting <strong>{{ pendingInsertBlock?.name }}</strong>.
        </p>
        <div v-for="binding in pendingBindings" :key="binding.id" class="binding-field">
          <label class="form-label" :for="`binding-${binding.id}`">{{ binding.label }}</label>
          <textarea
            :id="`binding-${binding.id}`"
            v-model="pendingBindingValues[binding.id]"
            class="textarea binding-input"
          />
        </div>
      </div>
      <template #footer>
        <button type="button" class="btn btn-ghost" @click="closeBindingModal">Cancel</button>
        <button type="button" class="btn btn-primary" @click="confirmInsertWithBindings">Insert Block</button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.blocks-panel {
  width: var(--slide-panel-width);
  background: color-mix(in srgb, var(--color-surface) 90%, #0d1532 10%);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}

.blocks-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border-subtle);
  background: color-mix(in srgb, var(--color-surface-overlay) 60%, transparent 40%);
}

.blocks-panel-subtitle {
  margin-top: 4px;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.5;
}

.blocks-toolbar {
  padding: var(--space-3);
  border-bottom: 1px solid var(--color-border-subtle);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.blocks-search {
  width: 100%;
}

.blocks-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.blocks-category-chip {
  border: 1px solid var(--color-border);
  background: var(--color-surface-raised);
  color: var(--color-text-muted);
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
}

.blocks-category-chip.active {
  border-color: rgba(108, 71, 255, 0.35);
  background: color-mix(in srgb, var(--color-primary-light) 60%, var(--color-surface-raised) 40%);
  color: var(--color-primary);
}

.blocks-panel-body {
  overflow-y: auto;
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.blocks-save-card,
.block-card {
  border: 1px solid var(--color-border-subtle);
  background: var(--color-surface-raised);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.blocks-save-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-3);
}

.blocks-save-title {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text);
}

.block-binding-note {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary);
}

.blocks-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.block-thumb {
  padding: 12px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--block-accent) 8%, #ffffff) 0%, rgba(255,255,255,0.92) 100%);
  border-bottom: 1px solid var(--color-border-subtle);
}

.block-thumb-stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid color-mix(in srgb, var(--block-accent) 22%, var(--color-border));
  overflow: hidden;
}

.block-thumb-frame {
  position: absolute;
}

.thumb-element {
  width: 100%;
  height: 100%;
  border-radius: inherit;
}

.thumb-text {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10%;
  justify-content: center;
}

.thumb-text-heading .thumb-text-line {
  background: rgba(15, 23, 42, 0.58);
}

.thumb-text-line {
  display: block;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.22);
}

.block-card-body {
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.binding-modal-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.binding-modal-intro {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.5;
}

.binding-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.binding-input {
  min-height: 74px;
  resize: vertical;
}

.block-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-2);
}

.block-name {
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text);
}

.block-meta {
  margin-top: 2px;
  font-size: 11px;
  color: var(--color-text-muted);
}

.block-description {
  margin: 0;
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.55;
}

.block-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.block-tag {
  font-size: 10px;
  font-weight: 600;
  color: var(--color-text-dim);
  background: var(--color-surface-overlay);
  border-radius: 999px;
  padding: 4px 8px;
}

.block-delete-btn {
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
}

.block-delete-btn:hover {
  color: #dc2626;
  background: rgba(220, 38, 38, 0.08);
}
</style>