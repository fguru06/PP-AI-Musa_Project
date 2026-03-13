<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  element: Object
})

const text = computed(() => props.element.content?.text || 'This is a [blank] example where you fill in the [missing] words.')

// We parse the string to find [word]
const parsedParts = computed(() => {
  const parts = []
  const regex = /\[([^\]]+)\]/g
  let lastIdx = 0
  let match
  let blankIndex = 0

  while ((match = regex.exec(text.value)) !== null) {
    if (match.index > lastIdx) {
      parts.push({ type: 'text', val: text.value.substring(lastIdx, match.index) })
    }
    parts.push({ type: 'blank', val: match[1], id: blankIndex++ })
    lastIdx = regex.lastIndex
  }
  if (lastIdx < text.value.length) {
    parts.push({ type: 'text', val: text.value.substring(lastIdx) })
  }
  return parts
})

const inputs = ref({})
const submitted = ref(false)
const results = ref({})

function checkAnswers() {
  submitted.value = true
  parsedParts.value.forEach(p => {
    if (p.type === 'blank') {
      const isCorrect = (inputs.value[p.id] || '').trim().toLowerCase() === p.val.trim().toLowerCase()
      results.value[p.id] = isCorrect
    }
  })
}

function resetAnswers() {
  submitted.value = false
  inputs.value = {}
  results.value = {}
}

</script>

<template>
  <div class="cloze-el" :style="{
    background: element.content?.bgColor || '#ffffff',
    color: element.content?.textColor || '#1e293b',
    borderRadius: (element.content?.borderRadius || 8) + 'px'
  }">
    <h3 v-if="element.content?.title" :style="{ color: element.content?.titleColor || '#0f172a' }">{{ element.content.title }}</h3>
    <div class="cloze-content" :style="{ fontSize: (element.content?.fontSize || 16) + 'px' }">
      <template v-for="(p, i) in parsedParts" :key="i">
        <span v-if="p.type === 'text'" style="white-space: pre-wrap;">{{ p.val }}</span>
        <input v-else
          type="text"
          class="blank-input"
          :class="{ correct: submitted && results[p.id], incorrect: submitted && !results[p.id] }"
          :placeholder="'?'"
          :style="{ width: ((p.val.length * 10) + 16) + 'px', pointerEvents: 'auto' }"
          v-model="inputs[p.id]"
          :readonly="submitted"
        />
      </template>
    </div>
    <div style="display: flex; gap: 8px;">
      <button v-if="!submitted && element.content?.showCheckBtn !== false" class="check-btn" @mousedown="checkAnswers">Check Answers</button>
      <button v-if="submitted" class="check-btn secondary" @mousedown="resetAnswers">Try Again</button>
      </div>
  </div>
</template>

<style scoped>
.cloze-el {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  font-family: system-ui, sans-serif;
  overflow-y: auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
h3 {
  margin: 0 0 12px 0;
  font-size: 18px;
}
.cloze-content {
  line-height: 1.8;
  margin-bottom: 16px;
}
.blank-input {
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  background: #f8fafc;
  padding: 2px 6px;
  font-size: inherit;
  font-family: inherit;
  text-align: center;
  color: #334155;
  margin: 0 4px;
  transition: all 0.2s;
}
.blank-input.correct {
  border-color: #22c55e;
  background: #f0fdf4;
  color: #15803d;
}
.blank-input.incorrect {
  border-color: #ef4444;
  background: #fef2f2;
  color: #b91c1c;
}
.check-btn {
  display: inline-block;
  padding: 8px 16px;
  background: #6c47ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  opacity: 0.9;
  cursor: pointer;
  pointer-events: auto;
}
.check-btn:hover {
  opacity: 1;
}
.check-btn.secondary {
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}
.check-btn.secondary:hover {
  background: #e2e8f0;
}
</style>