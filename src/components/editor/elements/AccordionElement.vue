<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  element: { type: Object, required: true }
})

const c = computed(() => props.element.content || {})
const items = computed(() => c.value.items || [])

// null means all closed, or ID of currently open item
const openItemId = ref(items.value.length > 0 ? items.value[0].id : null)

function toggleItem(id, event) {
  event.stopPropagation()
  if (openItemId.value === id) {
    if (c.value.allowAllClosed) {
      openItemId.value = null
    }
  } else {
    openItemId.value = id
  }
}
</script>

<template>
  <div
    class="accordion-element"
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      overflow: 'auto',
      fontFamily: 'Inter, sans-serif'
    }"
  >
    <div
      v-for="item in items"
      :key="item.id"
      class="accordion-item"
      :style="{
        background: c.itemBgColor || '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        overflow: 'hidden'
      }"
    >
      <div
        class="accordion-header"
        :style="{
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          background: openItemId === item.id ? (c.activeBgColor || '#f8fafc') : 'transparent',
          color: openItemId === item.id ? (c.activeColor || '#6c47ff') : (c.titleColor || '#0f172a'),
          fontWeight: 600,
          fontSize: '14px',
          transition: 'all 0.2s'
        }"
        @mousedown="toggleItem(item.id, $event)"
      >
        <span>{{ item.title }}</span>
        <svg
          :style="{
            transform: openItemId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            width: '16px',
            height: '16px',
            stroke: 'currentColor',
            strokeWidth: '2',
            fill: 'none'
          }"
          viewBox="0 0 24 24"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      <div
        v-if="openItemId === item.id"
        class="accordion-content"
        :style="{
          padding: '0 16px 16px 16px',
          background: c.activeBgColor || '#f8fafc',
          color: c.textColor || '#475569',
          fontSize: '14px',
          lineHeight: 1.5,
          whiteSpace: 'pre-wrap',
          borderTop: '1px solid transparent'
        }"
      >
        {{ item.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.accordion-element {
  scrollbar-width: thin;
}
.accordion-element::-webkit-scrollbar {
  width: 6px;
}
.accordion-element::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.accordion-header:hover {
  background: rgba(0, 0, 0, 0.02) !important;
}
</style>