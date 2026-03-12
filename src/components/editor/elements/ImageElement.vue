<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({ element: { type: Object, required: true } })

const activeSrc = ref('')
const fallbackIndex = ref(0)
const loadState = ref('idle')

const fallbackSrcs = computed(() => Array.isArray(props.element.content?.fallbackSrcs) ? props.element.content.fallbackSrcs : [])

function resetImageState() {
  activeSrc.value = props.element.content?.src || ''
  fallbackIndex.value = 0
  loadState.value = activeSrc.value ? 'loading' : 'empty'
}

function handleImageLoad() {
  loadState.value = 'loaded'
}

function handleImageError() {
  const nextSrc = fallbackSrcs.value[fallbackIndex.value]
  if (nextSrc) {
    fallbackIndex.value += 1
    activeSrc.value = nextSrc
    loadState.value = 'loading'
    return
  }

  loadState.value = 'error'
}

watch(
  () => [props.element.content?.src, JSON.stringify(props.element.content?.fallbackSrcs || [])],
  () => resetImageState(),
  { immediate: true }
)
</script>

<template>
  <div
    class="image-element"
    :style="{
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: (element.content?.borderRadius || 0) + 'px',
      border: `${element.content?.borderWidth || 0}px solid ${element.content?.borderColor || 'transparent'}`,
    }"
  >
    <div v-if="loadState === 'loading'" class="image-status image-loading">
      <span class="image-status-spinner" />
      <span>Loading image…</span>
    </div>
    <img
      v-if="activeSrc && loadState !== 'error'"
      :src="activeSrc"
      :alt="element.content.alt || ''"
      :style="{ width: '100%', height: '100%', objectFit: element.content.objectFit || 'cover', display: loadState === 'loaded' ? 'block' : 'none' }"
      draggable="false"
      @load="handleImageLoad"
      @error="handleImageError"
    />
    <div v-if="loadState === 'empty' || loadState === 'error'" class="image-placeholder">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:.3">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
      <span>{{ loadState === 'error' ? 'Image unavailable' : 'Image' }}</span>
    </div>
  </div>
</template>

<style scoped>
.image-element { position: relative; }
.image-status {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(180deg, rgba(108,71,255,.08), rgba(108,71,255,.04));
  color: var(--color-text-muted);
  font-size: 12px;
}
.image-status-spinner {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid rgba(108,71,255,.22);
  border-top-color: rgba(108,71,255,.82);
  animation: image-spin .8s linear infinite;
}
.image-placeholder {
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 8px;
  background: rgba(108,71,255,.06);
  border: 2px dashed rgba(108,71,255,.2);
  border-radius: inherit;
  color: var(--color-text-muted);
  font-size: 12px;
}
@keyframes image-spin {
  to { transform: rotate(360deg); }
}
</style>
