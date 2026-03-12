<script setup>
import { computed, ref, watch, nextTick } from 'vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'

const props = defineProps({ element: { type: Object, required: true } })
const c = computed(() => props.element.content || {})

const editorStore = useEditorStore()
const projectStore = useProjectStore()

const isEditing = ref(false)
const textRef = ref(null)

const localText = ref('')

watch(() => c.value.text, (newText) => {
  if (!isEditing.value) {
    localText.value = newText || (props.element.type === 'heading' ? 'Heading' : 'Click to edit text')
  }
}, { immediate: true })

function startEdit() {
  if (editorStore.selectedElementId !== props.element.id) return
  isEditing.value = true
  nextTick(() => {
    if (textRef.value) {
      textRef.value.focus()
      if (typeof textRef.value.setSelectionRange === 'function') {
        const len = textRef.value.value.length
        textRef.value.setSelectionRange(len, len)
      } else {
        const range = document.createRange()
        range.selectNodeContents(textRef.value)
        range.collapse(false) // move caret to end
        const sel = window.getSelection()
        sel.removeAllRanges()
        sel.addRange(range)
      }
    }
  })
}

function handleInput(e) {
  // To avoid resetting cursor during typing, we do nothing here.
  // The content is saved on @blur in stopEdit.
}

function handleMouseDown(e) {
  if (isEditing.value) {
    e.stopPropagation()
  }
}

function stopEdit() {
  isEditing.value = false
  const finalTxt = localText.value
  projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, props.element.id, {
    content: { ...props.element.content, text: finalTxt }
  })
}
</script>

<template>
  <textarea
    v-if="isEditing"
    class="text-element-input"
    ref="textRef"
    v-model="localText"
    @blur="stopEdit"
    @mousedown="handleMouseDown"
    :style="{
      fontSize: (c.fontSize || 16) + 'px',
      fontFamily: c.fontFamily || 'Inter, sans-serif',
      fontWeight: c.fontWeight || 'normal',
      fontStyle: c.fontStyle || 'normal',
      textDecoration: c.textDecoration || 'none',
      textAlign: c.textAlign || 'left',
      color: c.color || '#1a1a2e',
      lineHeight: c.lineHeight || 1.5,
      textTransform: c.textTransform || 'none',
      letterSpacing: (c.letterSpacing || 0) + 'px',
      width: '100%',
      height: '100%',
      background: 'transparent',
      border: 'none',
      resize: 'none',
      overflow: 'hidden',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      padding: '4px',
      outline: '2px solid var(--color-primary)',
      cursor: 'text',
      margin: 0,
      display: 'block'
    }"
  ></textarea>
  <div
    v-else
    class="text-element"
    @dblclick="startEdit"
    :style="{
      fontSize: (c.fontSize || 16) + 'px',
      fontFamily: c.fontFamily || 'Inter, sans-serif',
      fontWeight: c.fontWeight || 'normal',
      fontStyle: c.fontStyle || 'normal',
      textDecoration: c.textDecoration || 'none',
      textAlign: c.textAlign || 'left',
      color: c.color || '#1a1a2e',
      lineHeight: c.lineHeight || 1.5,
      textTransform: c.textTransform || 'none',
      letterSpacing: (c.letterSpacing || 0) + 'px',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      padding: '4px',
      outline: 'none',
      cursor: 'inherit',
      userSelect: 'none'
    }"
  >{{ localText }}</div>
</template>
