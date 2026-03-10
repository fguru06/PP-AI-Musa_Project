<script setup>
import { computed } from 'vue'
import ConfirmActionModal from '@/components/common/ConfirmActionModal.vue'

const props = defineProps({
  projectName: { type: String, default: '' },
})

const emit = defineEmits(['close', 'confirm'])

const message = computed(() =>
  props.projectName
    ? `Delete "${props.projectName}"? This action cannot be undone.`
    : 'Delete this project? This action cannot be undone.'
)
</script>

<template>
  <ConfirmActionModal
    title="Delete Project"
    :message="message"
    confirm-label="Delete"
    confirm-variant="danger"
    @close="emit('close')"
    @confirm="emit('confirm')"
  />
</template>