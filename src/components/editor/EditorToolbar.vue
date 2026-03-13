<script setup>
import { computed } from 'vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'

const emit = defineEmits(['open-ai-project'])

const editorStore = useEditorStore()
const projectStore = useProjectStore()

const project = computed(() => projectStore.getProject(editorStore.projectId))

const ELEMENT_GROUPS = [
  {
    id: 'basic',
    name: 'Basic',
    tools: [
      { id: 'text', label: 'Text', tooltip: 'Add text (T)', icon: 'text' },
      { id: 'heading', label: 'Heading', tooltip: 'Add heading', icon: 'heading' },
      { id: 'image', label: 'Image', tooltip: 'Add image (I)', icon: 'image' },
      { id: 'shape', label: 'Shape', tooltip: 'Add shape (S)', icon: 'shape' },
    ]
  },
  {
    id: 'media',
    name: 'Media',
    tools: [
      { id: 'video', label: 'Video', tooltip: 'Embed video', icon: 'video' },
      { id: 'audio', label: 'Audio', tooltip: 'Embed audio', icon: 'audio' },
    ]
  },
  {
    id: 'interactive',
    name: 'Interactive',
    tools: [
      { id: 'button', label: 'Button', tooltip: 'Add button (B)', icon: 'button' },
      { id: 'hotspot', label: 'Hotspot', tooltip: 'Add hotspot (H)', icon: 'hotspot' },
      { id: 'tabs', label: 'Tabs', tooltip: 'Add tabs', icon: 'tabs' },
      { id: 'accordion', label: 'Accordion', tooltip: 'Add accordion', icon: 'accordion' },
      { id: 'flipcard', label: 'Flip Card', tooltip: 'Add flip card', icon: 'flipcard' },
      { id: 'stepper', label: 'Stepper', tooltip: 'Add stepper', icon: 'stepper' },
    ]
  },
  {
    id: 'learning',
    name: 'Learning & Data',
    tools: [
      { id: 'quiz', label: 'Quiz', tooltip: 'Add quiz', icon: 'quiz' },
      { id: 'chart', label: 'Chart', tooltip: 'Add chart', icon: 'chart' },
      { id: 'poll', label: 'Poll', tooltip: 'Add poll', icon: 'poll' },
      { id: 'labeledimage', label: 'L-Image', tooltip: 'Add labeled image', icon: 'labeledimage' },
      { id: 'matching', label: 'Match', tooltip: 'Add matching game', icon: 'matching' },
      { id: 'sorting', label: 'Sort', tooltip: 'Add sorting game', icon: 'sorting' },
      { id: 'cloze', label: 'Cloze', tooltip: 'Fill in blanks', icon: 'cloze' },
      { id: 'scenario', label: 'Dialog', tooltip: 'Scenario chat', icon: 'scenario' },
      { id: 'progress', label: 'Stats', tooltip: 'Track progress', icon: 'progress' },
    ]
  }
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

    <!-- Element tools grouped -->
    <template v-for="(group, gIdx) in ELEMENT_GROUPS" :key="group.id">
      <div v-if="gIdx > 0" class="toolbar-divider" />
      <div class="toolbar-group element-group" :data-group-name="group.name">
        <button
          v-for="tool in group.tools"
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
        <!-- Chart -->
        <template v-else-if="tool.icon === 'chart'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 19h16"/><path d="M7 16V9"/><path d="M12 16V5"/><path d="M17 16v-4"/>
          </svg>
        </template>
        <!-- Tabs -->
        <template v-else-if="tool.icon === 'tabs'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="13" rx="2"/><path d="M2 11h20"/><path d="M8 7v4"/>
          </svg>
        </template>
        <!-- Accordion -->
        <template v-else-if="tool.icon === 'accordion'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M3 16h18"/>
          </svg>
        </template>
        <!-- Flip Card -->
        <template v-else-if="tool.icon === 'flipcard'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/><path d="M3 12h18"/><path d="M21 8h-4"/>
          </svg>
        </template>
        <!-- Stepper -->
        <template v-else-if="tool.icon === 'stepper'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="6" cy="12" r="3"/><circle cx="18" cy="12" r="3"/><path d="M9 12h6"/>
          </svg>
        </template>
        <!-- Poll -->
        <template v-else-if="tool.icon === 'poll'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10h10"/><path d="M7 14h6"/>
          </svg>
        </template>
        <!-- Labeled Image -->
        <template v-else-if="tool.icon === 'labeledimage'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="14" x2="12" y2="18"/>
          </svg>
        </template>
        <!-- Matching -->
        <template v-else-if="tool.icon === 'matching'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 6h4"/><path d="M4 18h4"/><path d="M16 6h4"/><path d="M16 18h4"/><line x1="8" y1="6" x2="16" y2="18"/>
          </svg>
        </template>
        <!-- Sorting -->
        <template v-else-if="tool.icon === 'sorting'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/>
          </svg>
        </template>
        <!-- Cloze -->
        <template v-else-if="tool.icon === 'cloze'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12h4"/><path d="M16 12h4"/><rect x="9" y="9" width="6" height="6" rx="1"/>
          </svg>
        </template>
        <!-- Scenario -->
        <template v-else-if="tool.icon === 'scenario'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        </template>
        <!-- Progress -->
        <template v-else-if="tool.icon === 'progress'">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </template>
        <span class="tool-label">{{ tool.label }}</span>
      </button>
      </div>
    </template>

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
  position: relative;
}
.element-group::after {
  content: attr(data-group-name);
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: var(--color-text-muted);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  font-weight: 500;
}
.editor-toolbar:hover .element-group::after {
  opacity: 1;
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
