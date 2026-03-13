<script setup>
import { computed } from 'vue'

const props = defineProps({
  element: Object
})

const messages = computed(() => props.element.content?.messages || [
  { role: 'user', text: 'Hello, how should I approach this problem?' },
  { role: 'agent', text: 'Good question! First, analyze the requirements, then choose a design pattern.' }
])

</script>

<template>
  <div class="scenario-el" :style="{
    background: element.content?.bgColor || '#f8fafc',
    borderRadius: (element.content?.borderRadius || 8) + 'px'
  }">
    <div v-for="(msg, i) in messages" :key="i" :class="['message', msg.role]">
      <div class="avatar" :style="{ background: msg.role === 'user' ? '#3b82f6' : '#10b981' }">
        {{ msg.role === 'user' ? 'U' : 'A' }}
      </div>
      <div class="bubble" :style="{ 
        background: msg.role === 'user' ? '#eff6ff' : '#ffffff',
        borderColor: msg.role === 'user' ? '#bfdbfe' : '#e2e8f0' 
      }">
        {{ msg.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.scenario-el {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  font-family: system-ui, sans-serif;
  overflow-y: auto;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.message {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.message.user {
  flex-direction: row-reverse;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  flex-shrink: 0;
}
.bubble {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid;
  font-size: 14px;
  color: #334155;
  line-height: 1.4;
  max-width: 80%;
}
.message.user .bubble {
  border-top-right-radius: 2px;
}
.message.agent .bubble {
  border-top-left-radius: 2px;
}
</style>