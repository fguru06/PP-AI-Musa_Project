<script setup>
import Modal from '@/components/common/Modal.vue'

defineProps({
  title: { type: String, default: 'Confirm action' },
  message: { type: String, default: '' },
  confirmLabel: { type: String, default: 'Continue' },
  cancelLabel: { type: String, default: 'Cancel' },
  confirmVariant: { type: String, default: 'primary' },
})

const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <Modal :title="title" size="sm" @close="emit('close')">
    <p class="confirm-message">{{ message }}</p>
    <template #footer>
      <button class="btn btn-secondary" @click="emit('close')">{{ cancelLabel }}</button>
      <button :class="['btn', confirmVariant === 'danger' ? 'btn-danger' : 'btn-primary']" @click="emit('confirm')">
        {{ confirmLabel }}
      </button>
    </template>
  </Modal>
</template>

<style scoped>
.confirm-message {
  color: var(--color-text-muted);
  line-height: 1.55;
  margin: 0;
}
</style>