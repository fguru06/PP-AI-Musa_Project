<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  element: { type: Object, required: true }
})

const c = computed(() => props.element.content || {})
const tabs = computed(() => c.value.tabs || [])
const activeTabId = ref(tabs.value.length > 0 ? tabs.value[0].id : null)

function selectTab(id, event) {
  // Prevent drag when clicking tab headers
  event.stopPropagation()
  activeTabId.value = id
}

const activeTabContent = computed(() => {
  const tab = tabs.value.find(t => t.id === activeTabId.value) || tabs.value[0] || {}
  return tab.content || ''
})
</script>

<template>
  <div
    class="tabs-element"
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: c.contentBgColor || '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif'
    }"
  >
    <div class="tabs-header" :style="{ display: 'flex', background: c.inactiveTabColor || '#f8fafc', borderBottom: '1px solid #e2e8f0' }">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :style="{
          flex: 1,
          padding: '10px 12px',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: activeTabId === tab.id ? 600 : 400,
          cursor: 'pointer',
          color: activeTabId === tab.id ? c.activeTabColor || '#6c47ff' : '#64748b',
          borderBottom: activeTabId === tab.id ? `2px solid ${c.activeTabColor || '#6c47ff'}` : '2px solid transparent',
          background: activeTabId === tab.id ? c.contentBgColor || '#ffffff' : 'transparent',
          transition: 'all 0.2s'
        }"
        @mousedown="selectTab(tab.id, $event)"
      >
        {{ tab.label }}
      </div>
    </div>
    <div
      class="tab-content"
      :style="{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        fontSize: '14px',
        color: c.textColor || '#1e293b',
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap'
      }"
    >
      {{ activeTabContent }}
    </div>
  </div>
</template>

<style scoped>
.tab-btn:hover {
  background: rgba(0, 0, 0, 0.02) !important;
}
.tab-content {
  /* Scrollbar styling */
  scrollbar-width: thin;
}
.tab-content::-webkit-scrollbar {
  width: 6px;
}
.tab-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
</style>