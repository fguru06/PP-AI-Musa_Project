<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  element: { type: Object, required: true }
})

const c = computed(() => props.element.content || {})
const itemsData = computed(() => c.value.items || [])

const items = ref([])
const submitted = ref(false)

// Init randomly shuffled items (or provided initial order)
watch(itemsData, (newItems) => {
  // In a real environment, you might provide a specific "initialOrder"
  // Here we just shuffle them or use a preset property, we'll just sort them alphabetically by text as a simple "not in correct order" strategy if they came out of order, or just copy them.
  // Actually, easiest is just to copy them and let the user shuffle.
  items.value = [...newItems].map((item, idx) => ({ ...item, currentOrder: idx }))
}, { immediate: true, deep: true })

function moveUp(index, event) {
  event.stopPropagation()
  if (submitted.value || index === 0) return
  const temp = items.value[index]
  items.value[index] = items.value[index - 1]
  items.value[index - 1] = temp
}

function moveDown(index, event) {
  event.stopPropagation()
  if (submitted.value || index === items.value.length - 1) return
  const temp = items.value[index]
  items.value[index] = items.value[index + 1]
  items.value[index + 1] = temp
}

const isCorrect = computed(() => {
  return items.value.every((item, idx) => item.correctOrder === idx)
})

function submit(event) {
  event.stopPropagation()
  submitted.value = true
}

function reset(event) {
  event.stopPropagation()
  submitted.value = false
}
</script>

<template>
  <div
    class="sorting-element"
    :style="{
      width: '100%',
      height: '100%',
      background: c.bgColor || '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif'
    }"
  >
    <h3 v-if="c.title" :style="{ fontSize: '16px', fontWeight: 600, color: c.titleColor || '#0f172a', margin: '0 0 16px 0' }">
      {{ c.title }}
    </h3>
    
    <div :style="{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, overflow: 'auto' }">
      <div
        v-for="(item, idx) in items"
        :key="item.id"
        class="sorting-card"
        :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 12px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          background: submitted ? (item.correctOrder === idx ? '#f0fdf4' : '#fef2f2') : '#f8fafc',
          borderColor: submitted ? (item.correctOrder === idx ? '#bbf7d0' : '#fecaca') : '#e2e8f0',
        }"
      >
        <!-- Sort Controls -->
        <div v-if="!submitted" :style="{ display: 'flex', flexDirection: 'column', gap: '2px' }">
          <button
            class="sort-btn up"
            :disabled="idx === 0"
            @mousedown="moveUp(idx, $event)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
          </button>
          <button
            class="sort-btn down"
            :disabled="idx === items.length - 1"
            @mousedown="moveDown(idx, $event)"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
        </div>
        
        <!-- Status Icon -->
        <div v-else :style="{ width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }">
          <svg v-if="item.correctOrder === idx" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>

        <span :style="{ fontSize: '14px', color: '#1e293b', flex: 1 }">{{ item.text }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div :style="{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
      <div :style="{ fontSize: '13px', fontWeight: 600, color: isCorrect ? '#16a34a' : '#dc2626' }">
        <span v-if="submitted">{{ isCorrect ? 'Great job!' : 'Not quite right.' }}</span>
      </div>
      
      <button
        v-if="!submitted"
        class="sorting-action-btn primary"
        :style="{ background: c.accentColor || '#6c47ff' }"
        @mousedown="submit"
      >
        Submit
      </button>
      <button
        v-else
        class="sorting-action-btn secondary"
        @mousedown="reset"
      >
        Try Again
      </button>
    </div>
  </div>
</template>

<style scoped>
.sort-btn {
  background: transparent;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: #64748b;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sort-btn:not(:disabled):hover {
  background: #e2e8f0;
  color: #0f172a;
}
.sort-btn:disabled {
  opacity: 0.3;
  cursor: default;
}
.sorting-action-btn {
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-family: inherit;
}
.sorting-action-btn.primary {
  color: white;
}
.sorting-action-btn.primary:hover {
  opacity: 0.9;
}
.sorting-action-btn.secondary {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}
.sorting-action-btn.secondary:hover {
  background: #e2e8f0;
}
</style>