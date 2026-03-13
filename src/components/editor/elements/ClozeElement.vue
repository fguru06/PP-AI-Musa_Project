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

  while ((match = regex.exec(text.value)) !== null) {
    if (match.index > lastIdx) {
      parts.push({ type: 'text', val: text.value.substring(lastIdx, match.index) })
    }
    parts.push({ type: 'blank', val: match[1] })
    lastIdx = regex.lastIndex
  }
  if (lastIdx < text.value.length) {
    parts.push({ type: 'text', val: text.value.substring(lastIdx) })
  }
  return parts
})

const inputs = ref({})

function checkAnswers() {
  // Real check would happen in preview, here we just visual feedback mock
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
        <span v-if="p.type === 'text'">{{ p.val }}</span>
        <input v-else 
          type="text" 
          class="blank-input" 
          :placeholder="'?'"
          :style="{ width: ((p.val.length * 10) + 16) + 'px' }"
          disabled
        />
      </template>
    </div>
    <button v-if="element.content?.showCheckBtn !== false" class="check-btn" disabled>Check Answers</button>
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
}
.check-btn {
  display: inline-block;
  padding: 8px 16px;
  background: #6c47ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  opacity: 0.8;
  cursor: default;
}
</style>