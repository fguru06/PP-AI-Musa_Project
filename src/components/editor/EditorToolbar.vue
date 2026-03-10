<script setup>
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'

const emit = defineEmits(['open-ai-project'])

const editorStore = useEditorStore()
const projectStore = useProjectStore()

const project = computed(() => projectStore.getProject(editorStore.projectId))

const ELEMENT_TOOLS = [
  { id: 'text', label: 'Text', tooltip: 'Add text (T)', icon: 'text' },
  { id: 'heading', label: 'Heading', tooltip: 'Add heading', icon: 'heading' },
  { id: 'image', label: 'Image', tooltip: 'Add image (I)', icon: 'image' },
  { id: 'shape', label: 'Shape', tooltip: 'Add shape (S)', icon: 'shape' },
  { id: 'button', label: 'Button', tooltip: 'Add button (B)', icon: 'button' },
  { id: 'hotspot', label: 'Hotspot', tooltip: 'Add hotspot (H)', icon: 'hotspot' },
  { id: 'video', label: 'Video', tooltip: 'Embed video', icon: 'video' },
  { id: 'audio', label: 'Audio', tooltip: 'Embed audio', icon: 'audio' },
  { id: 'quiz', label: 'Quiz', tooltip: 'Add quiz', icon: 'quiz' },
]

const SHAPES = [
  { id: 'rectangle', label: 'Rectangle' },
  { id: 'circle', label: 'Circle' },
  { id: 'triangle', label: 'Triangle' },
  { id: 'star', label: 'Star' },
  { id: 'arrow', label: 'Arrow' },
]

function setTool(id) {
  editorStore.setActiveTool(id)
}
</script>

<template>
  <div class="editor-toolbar">
    <!-- Left: select tool -->
    <div class="toolbar-group">
      <button
        :class="['tool-btn', editorStore.activeTool === 'select' && 'active']"
        @click="setTool('select')"
        data-tooltip="Select (V)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 3l14 9-7 2-5 7V3z"/>
        </svg>
        <span class="tool-label">Select</span>
      </button>
    </div>

    <div class="toolbar-divider" />

    <!-- Element tools -->
    <div class="toolbar-group">
      <button
        v-for="tool in ELEMENT_TOOLS"
        :key="tool.id"
        :class="['tool-btn', editorStore.activeTool === tool.id && 'active']"
        :data-tooltip="tool.tooltip"
        @click="setTool(tool.id)"
      >
        <!-- Text -->
        <template v-if="tool.icon === 'text'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
          </svg>
        </template>
        <!-- Heading -->
        <template v-else-if="tool.icon === 'heading'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 12h12M6 4v16M18 4v16" stroke-linecap="round"/>
          </svg>
        </template>
        <!-- Image -->
        <template v-else-if="tool.icon === 'image'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
          </svg>
        </template>
        <!-- Shape -->
        <template v-else-if="tool.icon === 'shape'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="3"/>
          </svg>
        </template>
        <!-- Button -->
        <template v-else-if="tool.icon === 'button'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="10" rx="5"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
        </template>
        <!-- Hotspot -->
        <template v-else-if="tool.icon === 'hotspot'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </template>
        <!-- Video -->
        <template v-else-if="tool.icon === 'video'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>
          </svg>
        </template>
        <!-- Audio -->
        <template v-else-if="tool.icon === 'audio'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
          </svg>
        </template>
        <!-- Quiz -->
        <template v-else-if="tool.icon === 'quiz'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
        </template>
        <span class="tool-label">{{ tool.label }}</span>
      </button>
    </div>

    <div class="toolbar-divider" />

    <div class="toolbar-group">
      <button class="tool-btn tool-btn-ai-project" @click="emit('open-ai-project')" data-tooltip="Create a new AI project">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/>
        </svg>
        <span class="tool-label">AI Project</span>
      </button>
    </div>

    <div class="toolbar-spacer" />

    <!-- Right: zoom + view options -->
    <div class="toolbar-group">
      <button class="tool-btn" @click="editorStore.zoomOut()" data-tooltip="Zoom out (Ctrl−)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </button>
      <button class="zoom-display" @click="editorStore.zoomReset()">
        {{ Math.round(editorStore.zoomLevel * 100) }}%
      </button>
      <button class="tool-btn" @click="editorStore.zoomIn()" data-tooltip="Zoom in (Ctrl+)">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </button>
    </div>

    <div class="toolbar-divider" />

    <div class="toolbar-group">
      <button
        :class="['tool-btn', editorStore.showGrid && 'active']"
        @click="editorStore.toggleGrid()"
        data-tooltip="Toggle grid (Ctrl+G)"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/>
        </svg>
      </button>
      <button
        :class="['tool-btn', editorStore.snapToGrid && 'active']"
        @click="editorStore.toggleSnap()"
        data-tooltip="Snap to grid"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="5" cy="5" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="19" cy="5" r="1"/>
          <circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>
          <circle cx="5" cy="19" r="1"/><circle cx="12" cy="19" r="1"/><circle cx="19" cy="19" r="1"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.editor-toolbar {
  height: 56px;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0 var(--space-4);
  background: rgba(255,255,255,0.82);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(148,163,184,0.16);
  flex-shrink: 0;
  overflow-x: auto;
  box-shadow: 0 10px 30px rgba(15,23,42,0.04);
  z-index: 15;
}
.toolbar-group {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(248,250,252,0.72);
  border: 1px solid rgba(226,232,240,0.9);
}
.toolbar-spacer { flex: 1; }
.toolbar-divider {
  width: 1px;
  height: 28px;
  background: rgba(148,163,184,0.18);
  margin: 0 var(--space-3);
  flex-shrink: 0;
}
.tool-btn {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: var(--radius-full);
  background: transparent;
  border: 1px solid transparent;
  color: #475569;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.tool-btn:hover {
  background: rgba(255,255,255,0.92);
  color: #0f172a;
  border-color: rgba(148,163,184,0.12);
}
.tool-btn.active {
  background: linear-gradient(135deg, #6c47ff, #4f46e5);
  color: #fff;
  box-shadow: 0 10px 24px rgba(108, 71, 255, 0.24);
}
.tool-btn-ai-project {
  background: linear-gradient(135deg, rgba(245, 243, 255, 0.96), rgba(238, 242, 255, 0.96));
  border-color: rgba(124, 58, 237, 0.18);
  color: #5b21b6;
}
.tool-btn-ai-project:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(245, 243, 255, 0.98));
  border-color: rgba(124, 58, 237, 0.26);
  color: #4c1d95;
}
.tool-label {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: .02em;
}
.zoom-display {
  font-size: 13px;
  font-weight: 700;
  color: #334155;
  background: rgba(255,255,255,0.88);
  border: 1px solid rgba(148,163,184,0.18);
  border-radius: var(--radius-full);
  padding: 6px 14px;
  cursor: pointer;
  min-width: 68px;
  text-align: center;
  transition: all 0.2s ease;
}
.zoom-display:hover { color: #0f172a; background: #fff; border-color: rgba(91,33,182,0.16); box-shadow: 0 8px 20px rgba(15,23,42,0.06); }

@media (max-width: 780px) {
  .editor-toolbar {
    padding: 8px 12px;
    height: auto;
  }

  .toolbar-group {
    padding: 4px;
  }

  .tool-label {
    display: none;
  }
}
</style>
