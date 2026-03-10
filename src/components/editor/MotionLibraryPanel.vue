<script setup>
const props = defineProps({
  searchQuery: { type: String, required: true },
  categoryFilter: { type: String, required: true },
  availableCategories: { type: Array, required: true },
  recentPresets: { type: Array, required: true },
  pendingImportedPresets: { type: Array, required: true },
  filteredPendingImports: { type: Array, required: true },
  importScopeFilter: { type: String, required: true },
  importConflictMode: { type: String, required: true },
})

const emit = defineEmits([
  'update:searchQuery',
  'update:categoryFilter',
  'trigger-import',
  'export-presets',
  'apply-preset',
  'clear-imports',
  'update:importScopeFilter',
  'update:importConflictMode',
  'apply-imports',
])
</script>

<template>
  <div class="panel-section">
    <div class="panel-title">Motion Library</div>
    <div class="preset-toolbar">
      <input :value="searchQuery" class="input" placeholder="Search presets by name, category, or tag" @input="emit('update:searchQuery', $event.target.value)" />
      <select :value="categoryFilter" class="select" @change="emit('update:categoryFilter', $event.target.value)">
        <option value="all">All categories</option>
        <option v-for="category in availableCategories" :key="`library-${category}`" :value="category">{{ category }}</option>
      </select>
      <button type="button" class="btn btn-secondary btn-sm" @click="emit('trigger-import')">Import</button>
      <button type="button" class="btn btn-secondary btn-sm" @click="emit('export-presets')">Export</button>
    </div>
    <div v-if="recentPresets.length" class="preset-list" style="margin-top:var(--space-3)">
      <div class="field-hint">Recently used</div>
      <div class="preset-item" v-for="preset in recentPresets" :key="`recent-${preset.id}`">
        <button type="button" class="preset-chip" @click="emit('apply-preset', preset)">{{ preset.name }}</button>
        <span class="preset-meta-chip muted">Used {{ preset.usageCount }}x</span>
      </div>
    </div>
    <div v-if="pendingImportedPresets.length" class="import-review">
      <div class="motion-scrubber-header">
        <span class="motion-scrubber-title">Import Review</span>
        <button type="button" class="btn btn-secondary btn-sm" @click="emit('clear-imports')">Discard</button>
      </div>
      <div class="preset-toolbar compact">
        <select :value="importScopeFilter" class="select" @change="emit('update:importScopeFilter', $event.target.value)">
          <option value="all">All scopes</option>
          <option value="single">Single presets</option>
          <option value="group">Group presets</option>
        </select>
        <select :value="importConflictMode" class="select" @change="emit('update:importConflictMode', $event.target.value)">
          <option value="replace">Replace matching names</option>
          <option value="copy">Import as copies</option>
        </select>
        <button type="button" class="btn btn-primary btn-sm" @click="emit('apply-imports')">Merge Selected</button>
      </div>
      <div class="import-list">
        <label v-for="preset in filteredPendingImports" :key="`pending-${preset.id}`" class="import-item">
          <input v-model="preset.selected" type="checkbox" />
          <span class="import-item-title">{{ preset.name }}</span>
          <span class="preset-meta-chip">{{ preset.scope }}</span>
          <span v-if="preset.category" class="preset-meta-chip muted">{{ preset.category }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.field-hint {
  margin-top: var(--space-2);
  color: var(--color-text-dim);
  font-size: var(--text-xs);
  line-height: 1.5;
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

.preset-toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) auto auto;
  gap: var(--space-2);
  margin-top: var(--space-3);
}

.preset-toolbar.compact {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
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

@media (max-width: 780px) {
  .preset-toolbar,
  .preset-toolbar.compact {
    grid-template-columns: 1fr;
  }
}
</style>