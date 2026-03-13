<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  element: { type: Object, required: true }
})

const c = computed(() => props.element.content || {})
const steps = computed(() => c.value.steps || [])
const currentStepIndex = ref(0)

function goToStep(index, event) {
  event.stopPropagation()
  if (index >= 0 && index < steps.value.length) {
    currentStepIndex.value = index
  }
}

function nextStep(event) {
  event.stopPropagation()
  if (currentStepIndex.value < steps.value.length - 1) {
    currentStepIndex.value++
  }
}

function prevStep(event) {
  event.stopPropagation()
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--
  }
}

const activeStep = computed(() => {
  return steps.value[currentStepIndex.value] || {}
})
</script>

<template>
  <div
    class="stepper-element"
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: c.bgColor || '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif'
    }"
  >
    <!-- Stepper Header -->
    <div
      class="stepper-header"
      :style="{
        padding: '16px',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px'
      }"
    >
      <div v-for="(step, index) in steps" :key="step.id" :style="{ display: 'flex', alignItems: 'center' }">
        <!-- Step Circle -->
        <div
          class="step-circle"
          :style="{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            background: index <= currentStepIndex.value ? (c.accentColor || '#6c47ff') : '#f1f5f9',
            color: index <= currentStepIndex.value ? '#ffffff' : '#64748b',
            border: index <= currentStepIndex.value ? `2px solid ${c.accentColor || '#6c47ff'}` : '2px solid #e2e8f0',
            transition: 'all 0.3s'
          }"
          @mousedown="goToStep(index, $event)"
        >
          {{ index + 1 }}
        </div>
        <!-- Step Line -->
        <div
          v-if="index < steps.length - 1"
          class="step-line"
          :style="{
            width: '32px',
            height: '2px',
            background: index < currentStepIndex.value ? (c.accentColor || '#6c47ff') : '#e2e8f0',
            transition: 'all 0.3s'
          }"
        ></div>
      </div>
    </div>

    <!-- Stepper Content -->
    <div
      class="stepper-content"
      :style="{
        flex: 1,
        padding: '24px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }"
    >
      <h3 :style="{ fontSize: '18px', fontWeight: 600, color: c.titleColor || '#0f172a', margin: '0 0 12px 0' }">
        {{ activeStep.title }}
      </h3>
      <div :style="{ fontSize: '15px', color: c.textColor || '#475569', lineHeight: 1.5, whiteSpace: 'pre-wrap' }">
        {{ activeStep.content }}
      </div>
    </div>

    <!-- Stepper Footer -->
    <div
      class="stepper-footer"
      :style="{
        padding: '12px 24px',
        borderTop: '1px solid #f1f5f9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }"
    >
      <button
        class="stepper-btn"
        :disabled="currentStepIndex === 0"
        :style="{
          padding: '6px 12px',
          borderRadius: '4px',
          border: '1px solid #e2e8f0',
          background: '#ffffff',
          color: currentStepIndex === 0 ? '#cbd5e1' : '#475569',
          cursor: currentStepIndex === 0 ? 'default' : 'pointer',
          fontSize: '13px',
          fontWeight: 500
        }"
        @mousedown="prevStep"
      >
        Previous
      </button>
      <span :style="{ fontSize: '13px', color: '#94a3b8' }">
        Step {{ currentStepIndex + 1 }} of {{ steps.length }}
      </span>
      <button
        class="stepper-btn primary"
        :disabled="currentStepIndex === steps.length - 1"
        :style="{
          padding: '6px 16px',
          borderRadius: '4px',
          border: 'none',
          background: currentStepIndex === steps.length - 1 ? '#e2e8f0' : (c.accentColor || '#6c47ff'),
          color: currentStepIndex === steps.length - 1 ? '#94a3b8' : '#ffffff',
          cursor: currentStepIndex === steps.length - 1 ? 'default' : 'pointer',
          fontSize: '13px',
          fontWeight: 500
        }"
        @mousedown="nextStep"
      >
        Next
      </button>
    </div>
  </div>
</template>

<style scoped>
.stepper-content {
  scrollbar-width: thin;
}
.stepper-content::-webkit-scrollbar {
  width: 6px;
}
.stepper-content::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.stepper-btn:not(:disabled):hover {
  opacity: 0.9;
}
</style>