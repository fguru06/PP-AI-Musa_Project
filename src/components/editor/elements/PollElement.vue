<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  element: { type: Object, required: true }
})

const c = computed(() => props.element.content || {})
const options = computed(() => c.value.options || [])
const submitted = ref(false)
const selectedOptionId = ref(null)

const totalVotes = computed(() => {
  return options.value.reduce((sum, opt) => sum + (opt.votes || 0), 0) + (submitted.value ? 1 : 0)
})

function vote(id, event) {
  event.stopPropagation()
  if (submitted.value) return
  selectedOptionId.value = id
  submitted.value = true
}

function getVotes(opt) {
  let v = opt.votes || 0
  if (submitted.value && selectedOptionId.value === opt.id) v++
  return v
}

function getPercentage(opt) {
  if (totalVotes.value === 0) return 0
  return Math.round((getVotes(opt) / totalVotes.value) * 100)
}
</script>

<template>
  <div
    class="poll-element"
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: c.bgColor || '#ffffff',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      padding: '24px',
      boxSizing: 'border-box',
      overflow: 'auto',
      fontFamily: 'Inter, sans-serif'
    }"
  >
    <h3 :style="{ fontSize: '18px', fontWeight: 600, color: c.textColor || '#1e293b', margin: '0 0 16px 0', lineHeight: 1.4 }">
      {{ c.question || 'Poll Question' }}
    </h3>
    
    <div class="poll-options" :style="{ display: 'flex', flexDirection: 'column', gap: '12px' }">
      <div v-for="opt in options" :key="opt.id" class="poll-option-wrapper">
        <div
          v-if="!submitted && !c.showResults"
          class="poll-option-btn"
          :style="{
            padding: '12px 16px',
            border: '1.5px solid #e2e8f0',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '15px',
            color: c.textColor || '#1e293b',
            transition: 'all 0.2s',
            background: 'transparent'
          }"
          @mousedown="vote(opt.id, $event)"
        >
          {{ opt.text }}
        </div>
        
        <div
          v-else
          class="poll-result-track"
          :style="{
            position: 'relative',
            padding: '12px 16px',
            borderRadius: '8px',
            background: c.trackColor || '#f1f5f9',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '15px',
            color: selectedOptionId === opt.id ? '#ffffff' : (c.textColor || '#1e293b'),
            fontWeight: selectedOptionId === opt.id ? 600 : 400
          }"
        >
          <div
            class="poll-result-bar"
            :style="{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: getPercentage(opt) + '%',
              background: selectedOptionId === opt.id ? (c.barSelectedColor || '#4f46e5') : (c.barColor || '#cbd5e1'),
              transition: 'width 0.8s ease-out',
              zIndex: 0
            }"
          ></div>
          <span :style="{ position: 'relative', zIndex: 1 }">{{ opt.text }}</span>
          <span :style="{ position: 'relative', zIndex: 1 }">{{ getPercentage(opt) }}%</span>
        </div>
      </div>
    </div>
    
    <div v-if="submitted || c.showResults" :style="{ marginTop: '16px', fontSize: '13px', color: '#64748b', textAlign: 'right' }">
      {{ totalVotes }} votes
    </div>
  </div>
</template>

<style scoped>
.poll-option-btn:hover {
  border-color: #94a3b8 !important;
  background: rgba(0, 0, 0, 0.02) !important;
}
.poll-element {
  scrollbar-width: thin;
}
</style>