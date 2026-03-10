<script setup>
import Modal from '@/components/common/Modal.vue'

defineProps({
  value: { type: String, default: '' },
  errorText: { type: String, default: '' },
})

const emit = defineEmits(['close', 'confirm', 'update:value'])
</script>

<template>
  <Modal title="Import Project" size="md" @close="emit('close')">
    <div class="form-group">
      <label class="form-label">Paste Project JSON</label>
      <textarea
        :value="value"
        class="textarea import-textarea"
        placeholder='{"name":"My Project",...}'
        @input="emit('update:value', $event.target.value)"
      />
    </div>
    <p v-if="errorText" class="error-msg">{{ errorText }}</p>
    <template #footer>
      <button class="btn btn-secondary" @click="emit('close')">Cancel</button>
      <button class="btn btn-primary" @click="emit('confirm')">Import</button>
    </template>
  </Modal>
</template>

<style scoped>
.import-textarea {
  min-height: 160px;
}

.error-msg {
  color: var(--color-danger);
  font-size: var(--text-sm);
  margin-top: var(--space-2);
}
</style>