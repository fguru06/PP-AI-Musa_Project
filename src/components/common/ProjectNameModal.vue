<script setup>
import Modal from '@/components/common/Modal.vue'

defineProps({
  title: { type: String, default: 'New Project' },
  value: { type: String, default: '' },
  placeholder: { type: String, default: 'e.g. Quiz Assessment' },
  confirmLabel: { type: String, default: 'Create Project' },
})

const emit = defineEmits(['close', 'confirm', 'update:value'])
</script>

<template>
  <Modal :title="title" size="sm" @close="emit('close')">
    <div class="form-group">
      <label class="form-label">Project Name</label>
      <input
        id="project-name-input"
        :value="value"
        class="input"
        :placeholder="placeholder"
        @input="emit('update:value', $event.target.value)"
        @keydown.enter="emit('confirm')"
      />
    </div>
    <template #footer>
      <button class="btn btn-secondary" @click="emit('close')">Cancel</button>
      <button class="btn btn-primary" @click="emit('confirm')">{{ confirmLabel }}</button>
    </template>
  </Modal>
</template>