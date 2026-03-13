<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  element: { type: Object, required: true }
})

const c = computed(() => props.element.content || {})
const isFlipped = ref(false)

function toggleFlip(event) {
  event.stopPropagation()
  isFlipped.value = !isFlipped.value
}
</script>

<template>
  <div
    class="flipcard-element"
    :style="{
      width: '100%',
      height: '100%',
      perspective: '1000px',
      fontFamily: 'Inter, sans-serif',
      cursor: 'pointer'
    }"
    @mousedown="toggleFlip"
  >
    <div
      class="flipcard-inner"
      :style="{
        width: '100%',
        height: '100%',
        position: 'relative',
        transition: 'transform 0.6s',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? (c.flipDirection === 'vertical' ? 'rotateX(180deg)' : 'rotateY(180deg)') : 'none'
      }"
    >
      <!-- Front -->
      <div
        class="flipcard-front"
        :style="{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: c.frontBgColor || '#6c47ff',
          color: c.frontTextColor || '#ffffff',
          borderRadius: '12px',
          border: '1px solid ' + (c.borderColor || 'transparent'),
          padding: '24px',
          boxSizing: 'border-box',
          textAlign: 'center'
        }"
      >
        <h3 v-if="c.frontTitle" :style="{ fontSize: '20px', margin: '0 0 8px 0', fontWeight: 600 }">{{ c.frontTitle }}</h3>
        <p v-if="c.frontContent" :style="{ fontSize: '15px', margin: 0, opacity: 0.9, lineHeight: 1.5, whiteSpace: 'pre-wrap' }">{{ c.frontContent }}</p>
      </div>

      <!-- Back -->
      <div
        class="flipcard-back"
        :style="{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: c.backBgColor || '#ffffff',
          color: c.backTextColor || '#1e293b',
          borderRadius: '12px',
          border: '1px solid ' + (c.borderColor || '#e2e8f0'),
          padding: '24px',
          boxSizing: 'border-box',
          textAlign: 'center',
          transform: c.flipDirection === 'vertical' ? 'rotateX(180deg)' : 'rotateY(180deg)'
        }"
      >
        <h3 v-if="c.backTitle" :style="{ fontSize: '20px', margin: '0 0 8px 0', fontWeight: 600 }">{{ c.backTitle }}</h3>
        <p v-if="c.backContent" :style="{ fontSize: '15px', margin: 0, opacity: 0.9, lineHeight: 1.5, whiteSpace: 'pre-wrap' }">{{ c.backContent }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flipcard-element {
  /* Prevent text selection when clicking rapidly to flip */
  user-select: none;
}
</style>