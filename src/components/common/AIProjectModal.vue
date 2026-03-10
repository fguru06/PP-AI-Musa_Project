<script setup>
import Modal from '@/components/common/Modal.vue'

defineProps({
  mode: { type: String, default: 'quiz' },
  topic: { type: String, default: '' },
  context: { type: String, default: '' },
  projectName: { type: String, default: '' },
  slideCount: { type: Number, default: 5 },
  questionCount: { type: Number, default: 5 },
  difficulty: { type: String, default: 'intermediate' },
  questionType: { type: String, default: 'multiple-choice' },
  projectNamePlaceholder: { type: String, default: 'AI Project' },
  primaryActionLabel: { type: String, default: 'Create project' },
  creationError: { type: String, default: '' },
  isSubmitting: { type: Boolean, default: false },
  isGenerating: { type: Boolean, default: false },
  hasApiKey: { type: Boolean, default: false },
})

const emit = defineEmits([
  'close',
  'create',
  'update:mode',
  'update:topic',
  'update:context',
  'update:projectName',
  'update:slideCount',
  'update:questionCount',
  'update:difficulty',
  'update:questionType',
])
</script>

<template>
  <Modal title="Create with AI" size="lg" @close="emit('close')">
    <div class="ai-create-shell">
      <div class="ai-mode-grid">
        <button class="ai-mode-card" :class="mode === 'quiz' && 'active'" type="button" @click="emit('update:mode', 'quiz')">
          <strong>Quiz project</strong>
          <span>Generate question slides learners can answer right away.</span>
        </button>
        <button class="ai-mode-card" :class="mode === 'deck' && 'active'" type="button" @click="emit('update:mode', 'deck')">
          <strong>Slide deck</strong>
          <span>Create a structured lesson deck from a topic and learning goal.</span>
        </button>
      </div>

      <div class="form-group">
        <label class="form-label">Topic</label>
        <input
          id="ai-topic-input"
          :value="topic"
          class="input"
          placeholder="e.g. Cybersecurity basics for new employees"
          @input="emit('update:topic', $event.target.value)"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Project name</label>
        <input
          :value="projectName"
          class="input"
          :placeholder="projectNamePlaceholder"
          @input="emit('update:projectName', $event.target.value)"
        />
      </div>

      <div class="form-group">
        <label class="form-label">Goal or context</label>
        <textarea
          :value="context"
          class="textarea ai-create-textarea"
          placeholder="Explain the audience, learning objective, tone, or any constraints you want the AI to follow."
          @input="emit('update:context', $event.target.value)"
        />
      </div>

      <div class="ai-config-grid">
        <div class="form-group" v-if="mode === 'deck'">
          <label class="form-label">Slides</label>
          <select :value="slideCount" class="ai-select" @change="emit('update:slideCount', Number($event.target.value))">
            <option :value="3">3</option>
            <option :value="5">5</option>
            <option :value="7">7</option>
            <option :value="10">10</option>
          </select>
        </div>

        <template v-else>
          <div class="form-group">
            <label class="form-label">Questions</label>
            <select :value="questionCount" class="ai-select" @change="emit('update:questionCount', Number($event.target.value))">
              <option :value="3">3</option>
              <option :value="5">5</option>
              <option :value="8">8</option>
              <option :value="10">10</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Difficulty</label>
            <select :value="difficulty" class="ai-select" @change="emit('update:difficulty', $event.target.value)">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Question type</label>
            <select :value="questionType" class="ai-select" @change="emit('update:questionType', $event.target.value)">
              <option value="multiple-choice">Multiple choice</option>
              <option value="true-false">True / False</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </template>
      </div>

      <p class="ai-create-note">
        {{ hasApiKey ? 'Using your configured AI provider.' : 'No API key configured yet. The built-in sample generator will still create starter content.' }}
      </p>

      <p v-if="creationError" class="error-msg">{{ creationError }}</p>
    </div>

    <template #footer>
      <button class="btn btn-secondary" @click="emit('close')">Cancel</button>
      <button class="btn btn-primary" :disabled="isSubmitting || isGenerating" @click="emit('create')">
        {{ primaryActionLabel }}
      </button>
    </template>
  </Modal>
</template>

<style scoped>
.ai-create-shell {
  display: grid;
  gap: 18px;
}

.ai-mode-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.ai-mode-card {
  border: 1px solid var(--color-border);
  border-radius: 18px;
  background: #ffffff;
  color: var(--color-text);
  padding: 16px;
  display: grid;
  gap: 6px;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.ai-mode-card strong {
  font-size: 16px;
}

.ai-mode-card span {
  color: var(--color-text-muted);
  line-height: 1.45;
  font-size: 14px;
}

.ai-mode-card:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--color-primary) 45%, var(--color-border));
}

.ai-mode-card.active {
  border-color: #6c47ff;
  background: linear-gradient(180deg, rgba(245, 243, 255, 0.92), rgba(238, 242, 255, 0.92));
  box-shadow: 0 18px 34px rgba(108, 71, 255, 0.12);
}

.ai-config-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.ai-select {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: #ffffff;
  color: var(--color-text);
  padding: 12px 14px;
  font: inherit;
}

.ai-create-textarea {
  min-height: 120px;
}

.ai-create-note {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 13px;
  line-height: 1.5;
}

.error-msg {
  color: var(--color-danger);
  font-size: var(--text-sm);
  margin-top: var(--space-2);
}

@media (max-width: 980px) {
  .ai-config-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .ai-mode-grid,
  .ai-config-grid {
    grid-template-columns: 1fr;
  }
}
</style>