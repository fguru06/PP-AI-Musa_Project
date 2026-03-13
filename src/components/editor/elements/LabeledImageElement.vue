<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  element: { type: Object, required: true }
})

const c = computed(() => props.element.content || {})
const markers = computed(() => c.value.markers || [])
const activeMarkerId = ref(null)

function toggleMarker(id, event) {
  event.stopPropagation()
  if (activeMarkerId.value === id) {
    activeMarkerId.value = null
  } else {
    activeMarkerId.value = id
  }
}
</script>

<template>
  <div
    class="labeled-image-element"
    :style="{
      width: '100%',
      height: '100%',
      position: 'relative',
      borderRadius: c.borderRadius + 'px' || '0',
      overflow: 'visible',
      fontFamily: 'Inter, sans-serif'
    }"
  >
    <!-- Background Image -->
    <div
      class="labeled-image-bg"
      :style="{
        position: 'absolute',
        inset: '0',
        backgroundImage: c.src ? `url(${c.src})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#e2e8f0',
        borderRadius: 'inherit',
        overflow: 'hidden'
      }"
    >
      <div v-if="!c.src" :style="{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '14px' }">
        No image selected
      </div>
    </div>

    <!-- Markers -->
    <div
      v-for="m in markers"
      :key="m.id"
      class="labeled-image-marker-wrap"
      :style="{
        position: 'absolute',
        left: m.x + '%',
        top: m.y + '%',
        transform: 'translate(-50%, -50%)',
        zIndex: activeMarkerId === m.id ? 10 : 1
      }"
    >
      <div
        class="labeled-image-marker"
        :style="{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: c.markerColor || '#6c47ff',
          color: c.markerTextColor || '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          border: '2px solid #ffffff',
          transition: 'transform 0.2s',
          transform: activeMarkerId === m.id ? 'scale(1.1)' : 'scale(1)'
        }"
        @mousedown="toggleMarker(m.id, $event)"
      >
        {{ m.label }}
      </div>

      <!-- Tooltip / Popover -->
      <div
        v-if="activeMarkerId === m.id"
        class="labeled-image-tooltip"
        :style="{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '220px',
          background: '#ffffff',
          borderRadius: '8px',
          padding: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          border: '1px solid #e2e8f0',
          cursor: 'default'
        }"
        @mousedown.stop
      >
        <div :style="{ position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: '12px', height: '12px', background: '#ffffff', borderLeft: '1px solid #e2e8f0', borderTop: '1px solid #e2e8f0' }"></div>
        <h4 :style="{ margin: '0 0 6px 0', fontSize: '15px', color: '#0f172a', fontWeight: 600, position: 'relative', zIndex: 1 }">{{ m.title }}</h4>
        <p :style="{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: 1.5, position: 'relative', zIndex: 1, whiteSpace: 'pre-wrap' }">{{ m.description }}</p>
      </div>
    </div>
  </div>
</template>
