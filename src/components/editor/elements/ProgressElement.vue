<script setup>
import { computed } from 'vue'

const props = defineProps({
  element: Object
})

</script>

<template>
  <div class="progress-el" :style="{
    background: element.content?.bgColor || '#f8fafc',
    borderRadius: (element.content?.borderRadius || 8) + 'px',
    padding: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  }">
    <div class="header">
      <span class="title" :style="{ color: element.content?.titleColor || '#0f172a' }">{{ element.content?.title || 'Your Progress' }}</span>
      <span class="xp">{{ element.content?.mockXP || 350 }} XP</span>
    </div>
    <div class="bar-bg">
      <div class="bar-fill" :style="{ width: (element.content?.mockPercent || 65) + '%', background: element.content?.fillColor || '#10b981' }"></div>
    </div>
    <div class="footer" :style="{ color: element.content?.textColor || '#64748b' }">
      Level {{ element.content?.mockLevel || 4 }} · {{ 100 - (element.content?.mockPercent || 65) }}% to next level
    </div>
  </div>
</template>

<style scoped>
.progress-el {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-weight: 600;
  font-size: 14px;
}
.xp {
  font-weight: 700;
  font-size: 14px;
  color: #fbbf24;
}
.bar-bg {
  width: 100%;
  height: 12px;
  background: #e2e8f0;
  border-radius: 999px;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.5s ease;
}
.footer {
  font-size: 12px;
  text-align: right;
}
</style>