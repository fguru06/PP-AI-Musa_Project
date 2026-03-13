<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  element: { type: Object, required: true }
})

const c = computed(() => props.element.content || {})
const pairs = computed(() => c.value.pairs || [])

// For simple display, just sort A items by their original order
const leftItems = computed(() => pairs.value.map(p => ({ id: p.id, text: p.left })))
// Scramble B items based on the provided pair data so they aren't straight across
const rightItems = computed(() => {
  const arr = pairs.value.map(p => ({ id: p.id, text: p.right }))
  // pseudo-random scramble based on IDs so it's consistent during edit
  return arr.sort((a, b) => a.id.localeCompare(b.id) > 0 ? 1 : -1)
})

const selectedLeftId = ref(null)
const selectedRightId = ref(null)

const matchedIds = ref(new Set())
const errorState = ref(false)

function selectLeft(id, event) {
  event.stopPropagation()
  if (matchedIds.value.has(id)) return
  selectedLeftId.value = id
  checkMatch()
}

function selectRight(id, event) {
  event.stopPropagation()
  if (matchedIds.value.has(id)) return
  selectedRightId.value = id
  checkMatch()
}

function checkMatch() {
  if (selectedLeftId.value && selectedRightId.value) {
    if (selectedLeftId.value === selectedRightId.value) {
      // Match
      matchedIds.value.add(selectedLeftId.value)
      selectedLeftId.value = null
      selectedRightId.value = null
    } else {
      // Mismatch
      errorState.value = true
      setTimeout(() => {
        errorState.value = false
        selectedLeftId.value = null
        selectedRightId.value = null
      }, 600)
    }
  }
}
</script>

<template>
  <div
    class="matching-element"
    :style="{
      width: '100%',
      height: '100%',
      background: c.bgColor || '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      padding: '24px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif'
    }"
  >
    <h3 v-if="c.title" :style="{ fontSize: '16px', fontWeight: 600, color: c.titleColor || '#0f172a', margin: '0 0 16px 0', textAlign: 'center' }">
      {{ c.title }}
    </h3>
    
    <div :style="{ display: 'flex', gap: '24px', flex: 1, overflow: 'auto' }">
      <!-- Left Column -->
      <div :style="{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }">
        <div
          v-for="item in leftItems"
          :key="item.id"
          :class="[
            'matching-card',
            selectedLeftId === item.id ? 'active' : '',
            matchedIds.has(item.id) ? 'matched' : '',
            (errorState && selectedLeftId === item.id) ? 'error' : ''
          ]"
          :style="{
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid',
            borderColor: matchedIds.has(item.id) ? '#22c55e' : (selectedLeftId === item.id ? (c.accentColor || '#6c47ff') : '#e2e8f0'),
            background: matchedIds.has(item.id) ? '#f0fdf4' : (selectedLeftId === item.id ? (c.accentBgColor || '#f3f0ff') : '#ffffff'),
            color: matchedIds.has(item.id) ? '#15803d' : '#1e293b',
            cursor: matchedIds.has(item.id) ? 'default' : 'pointer',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.2s',
            opacity: matchedIds.has(item.id) ? 0.6 : 1
          }"
          @mousedown="selectLeft(item.id, $event)"
        >
          {{ item.text }}
        </div>
      </div>

      <!-- Right Column -->
      <div :style="{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }">
        <div
          v-for="item in rightItems"
          :key="item.id"
          :class="[
            'matching-card',
            selectedRightId === item.id ? 'active' : '',
            matchedIds.has(item.id) ? 'matched' : '',
            (errorState && selectedRightId === item.id) ? 'error' : ''
          ]"
          :style="{
            padding: '12px',
            borderRadius: '8px',
            border: '2px solid',
            borderColor: matchedIds.has(item.id) ? '#22c55e' : (selectedRightId === item.id ? (c.accentColor || '#6c47ff') : '#e2e8f0'),
            background: matchedIds.has(item.id) ? '#f0fdf4' : (selectedRightId === item.id ? (c.accentBgColor || '#f3f0ff') : '#ffffff'),
            color: matchedIds.has(item.id) ? '#15803d' : '#1e293b',
            cursor: matchedIds.has(item.id) ? 'default' : 'pointer',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.2s',
            opacity: matchedIds.has(item.id) ? 0.6 : 1
          }"
          @mousedown="selectRight(item.id, $event)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.matching-card:not(.matched):not(.error):hover {
  border-color: #cbd5e1 !important;
}
.matching-card.error {
  border-color: #ef4444 !important;
  background: #fef2f2 !important;
  color: #b91c1c !important;
  animation: shake 0.4s;
}

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
}
</style>