<script setup>
import { ref, computed, watch } from 'vue'
import { useAIStore } from '@/stores/aiStore'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'

const aiStore = useAIStore()
const editorStore = useEditorStore()
const projectStore = useProjectStore()

const activeMode = ref('generate') // 'generate' | 'quiz' | 'voiceover' | 'improve' | 'settings'
const prompt = ref('')
const topic = ref('')
const result = ref('')

watch(activeMode, () => {
  result.value = ''
})

watch(() => editorStore.aiPanelMode, (mode) => {
  if (!mode) return
  activeMode.value = mode
}, { immediate: true })

const quizCount = ref(4)
const slideType = ref('general')
const targetLang = ref('Spanish')
const voContent = ref('')

// Content tab config
const contentDescription = ref('')
const contentCustomPrompt = ref('')
const contentPromptUserEdited = ref(false)
const contentGenerationMode = ref('single') // 'single' | 'deck'
const deckSlideCount = ref(5)
const contentOutputMode = ref('slide') // 'slide' | 'options'
const creativeOptions = ref([])
const creativeOptionsError = ref('')

const contentAutoPrompt = computed(() => {
  const t = topic.value.trim() || '[your topic]'
  if (contentGenerationMode.value === 'deck') {
    let promptText = `Create a complete ${deckSlideCount.value}-slide learning deck about "${t}".`
    if (contentDescription.value.trim()) promptText += `\nAdditional context: ${contentDescription.value.trim()}`
    promptText += `\nReturn ONLY valid JSON: { "slides": [{ "title": "...", "subtitle": "...", "bullets": ["..."], "callout": "...", "slideType": "..." }] }`
    promptText += `\nMake each slide distinct, logically sequenced, and specific to "${t}".`
    return promptText
  }
  const typeGuide = {
    general: 'well-structured educational slide with title, key points, and a takeaway',
    intro: 'introduction slide — purpose, motivation, and what learners will achieve',
    overview: 'overview slide — high-level map of all topics to be covered',
    concept: 'concept slide — definition, how it works, and why it matters',
    example: 'example slide — real-world case study or worked example with outcome',
    summary: 'summary slide — recap key points and reinforce the main message',
    callout: 'callout slide — single critical insight or action item',
  }[slideType.value] || 'educational slide'
  let p = `Create a ${typeGuide} about "${t}".`
  if (contentDescription.value.trim()) p += `\nAdditional context: ${contentDescription.value.trim()}`
  p += `\nReturn ONLY valid JSON: { "title": "...", "subtitle": "...", "bullets": ["..."], "callout": "..." }\nMake all content specific to "${t}" — no generic placeholders.`
  return p
})

watch(contentAutoPrompt, (val) => {
  if (!contentPromptUserEdited.value) contentCustomPrompt.value = val
}, { immediate: true })

function resetContentPrompt() {
  contentCustomPrompt.value = contentAutoPrompt.value
  contentPromptUserEdited.value = false
}

// Quiz Assessment config
const quizTopic = ref('')
const quizDifficulty = ref('intermediate')
const quizQuestionType = ref('multiple-choice')
const quizObjective = ref('')
const quizQuestions = ref([])
const quizCustomPrompt = ref('')
const quizPromptUserEdited = ref(false)

const autoPrompt = computed(() => {
  const t = quizTopic.value.trim() || '[your topic]'
  const diffLabels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
  const typeLabels = { 'multiple-choice': 'Multiple Choice', 'true-false': 'True / False', mixed: 'Mixed (MCQ + T/F)' }
  let p = `Generate ${quizCount.value} ${diffLabels[quizDifficulty.value]} ${typeLabels[quizQuestionType.value]} quiz questions about "${t}".
Return ONLY a valid JSON array with no markdown, each item having: question, options (array), correctIndex (0-based), explanation, difficulty, type.`
  if (quizObjective.value.trim()) p += `\nLearning objective: ${quizObjective.value.trim()}`
  return p
})

// Auto-sync prompt from config unless user has manually edited it
watch(autoPrompt, (val) => {
  if (!quizPromptUserEdited.value) quizCustomPrompt.value = val
}, { immediate: true })

function resetQuizPrompt() {
  quizCustomPrompt.value = autoPrompt.value
  quizPromptUserEdited.value = false
}

const project = computed(() => projectStore.getProject(editorStore.projectId))
const slide = computed(() => project.value?.slides?.find(s => s.id === editorStore.currentSlideId))
const selectedEl = computed(() =>
  editorStore.selectedElementId
    ? slide.value?.elements?.find(e => e.id === editorStore.selectedElementId) : null
)

async function generateSlide() {
  if (!topic.value.trim() && !contentCustomPrompt.value.trim()) return
  result.value = ''
  creativeOptions.value = []
  creativeOptionsError.value = ''

  if (contentGenerationMode.value === 'deck') {
    const deck = await aiStore.generateSlideDeck(topic.value, deckSlideCount.value, {
      objective: contentDescription.value,
      customPrompt: contentCustomPrompt.value,
    })
    if (deck?.length) {
      const normalizedDeck = deck.map(item => normalizeSlideContent(item))
      result.value = JSON.stringify({ slides: normalizedDeck }, null, 2)
      applyDeckContent(normalizedDeck, { replaceGenerated: true })
    }
    return
  }

  if (contentOutputMode.value === 'options') {
    await generateCreativeOptions()
    return
  }

  const content = await aiStore.generateSlideContent(
    topic.value,
    slideType.value,
    contentDescription.value,
    contentCustomPrompt.value,
  )
  if (content) {
    const normalized = normalizeSlideContent(content)
    result.value = JSON.stringify(normalized, null, 2)
    applySlideContent(normalized, { replaceGenerated: true })
  }
}

function normalizeSlideContent(content) {
  const parsed = content && typeof content === 'object' ? content : {}
  const rawBullets = Array.isArray(parsed.bullets)
    ? parsed.bullets
    : typeof parsed.bullets === 'string'
      ? parsed.bullets.split('\n')
      : []

  const bullets = rawBullets
    .map(item => String(item || '').replace(/^\s*[-•]\s*/, '').trim())
    .filter(Boolean)

  return {
    title: String(parsed.title || topic.value || 'Untitled Slide').trim(),
    subtitle: String(parsed.subtitle || '').trim(),
    bullets,
    callout: String(parsed.callout || '').trim(),
  }
}

function clearGeneratedSlideContent(projectId, slideId) {
  const currentSlide = projectStore.getProject(projectId)?.slides?.find(s => s.id === slideId)
  if (!currentSlide?.elements?.length) return

  const generatedIds = currentSlide.elements
    .filter(el => el.meta?.source === 'ai-content')
    .map(el => el.id)

  generatedIds.forEach((elementId) => {
    projectStore.deleteElement(projectId, slideId, elementId)
  })
}

function addGeneratedElement(projectId, slideId, type, element) {
  return projectStore.addElement(projectId, slideId, type, {
    ...element,
    meta: { ...(element.meta || {}), source: 'ai-content' },
  })
}

function applyNormalizedContentToSlide(projectId, slideId, normalized, { replaceGenerated = false } = {}) {
  if (!projectId || !slideId) return

  if (replaceGenerated) {
    clearGeneratedSlideContent(projectId, slideId)
  }

  if (normalized.title) {
    projectStore.updateSlide(projectId, slideId, { title: normalized.title })
    addGeneratedElement(projectId, slideId, 'heading', {
      x: 60, y: 40, width: 840, height: 80,
      content: { text: normalized.title, fontSize: 36, fontWeight: 'bold', textAlign: 'center', color: '#1a1a2e', fontFamily: 'Inter, sans-serif', lineHeight: 1.2 }
    })
  }
  if (normalized.subtitle) {
    addGeneratedElement(projectId, slideId, 'text', {
      x: 60, y: 130, width: 840, height: 50,
      content: { text: normalized.subtitle, fontSize: 20, fontWeight: 'normal', textAlign: 'center', color: '#4a4a6a', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }
    })
  }
  if (normalized.bullets?.length) {
    const bulletsText = normalized.bullets.map(b => `• ${b}`).join('\n')
    addGeneratedElement(projectId, slideId, 'text', {
      x: 60, y: normalized.subtitle ? 200 : 150, width: 840, height: 200,
      content: { text: bulletsText, fontSize: 18, fontWeight: 'normal', textAlign: 'left', color: '#2d2d4e', fontFamily: 'Inter, sans-serif', lineHeight: 1.8 }
    })
  }
  if (normalized.callout) {
    addGeneratedElement(projectId, slideId, 'shape', {
      x: 60, y: 420, width: 840, height: 60,
      content: { shapeType: 'rectangle', fillColor: '#ede9ff', borderColor: '#6c47ff', borderWidth: 2, borderRadius: 8 }
    })
    addGeneratedElement(projectId, slideId, 'text', {
      x: 80, y: 432, width: 800, height: 40,
      content: { text: `💡 ${normalized.callout}`, fontSize: 15, fontWeight: '600', textAlign: 'center', color: '#6c47ff', fontFamily: 'Inter, sans-serif', lineHeight: 1.4 }
    })
  }
}

function applyDeckContent(deckSlides, { replaceGenerated = false } = {}) {
  if (!editorStore.currentSlideId) return
  const pid = editorStore.projectId
  if (!pid || !Array.isArray(deckSlides) || !deckSlides.length) return

  const normalizedDeck = deckSlides.map(item => normalizeSlideContent(item))
  normalizedDeck.forEach((slideContent) => {
    const newSlide = projectStore.addSlide(pid)
    if (!newSlide) return
    applyNormalizedContentToSlide(pid, newSlide.id, slideContent, { replaceGenerated })
  })
}

function applySlideContent(contentOverride = null, { replaceGenerated = false } = {}) {
  if (!editorStore.currentSlideId) return
  let content = contentOverride

  if (!content) {
    if (!result.value) return
    try {
      content = JSON.parse(result.value)
    } catch (e) {
      console.warn('Could not parse AI content:', e)
      return
    }
  }

  const normalized = normalizeSlideContent(content)
  const pid = editorStore.projectId
  const sid = editorStore.currentSlideId

  if (!pid || !sid) return
  applyNormalizedContentToSlide(pid, sid, normalized, { replaceGenerated })
}

function applyGeneratedResult() {
  if (!result.value) return
  if (contentGenerationMode.value === 'deck') {
    try {
      const parsed = JSON.parse(result.value)
      const slides = Array.isArray(parsed) ? parsed : parsed?.slides
      if (!Array.isArray(slides) || !slides.length) return
      applyDeckContent(slides, { replaceGenerated: true })
    } catch {
      return
    }
    return
  }
  applySlideContent()
}

async function generateCreativeOptions() {
  const t = topic.value.trim() || '[your topic]'
  const optionPrompt = `You are an expert instructional designer.
Create exactly 3 distinct creative slide directions for a "${slideType.value}" slide about "${t}".

Return ONLY valid JSON array:
[
  {
    "title": "Short option title",
    "angle": "What makes this approach unique in one sentence",
    "prompt": "A detailed prompt for generating that slide content as JSON with title/subtitle/bullets/callout"
  }
]

Each option must be meaningfully different in teaching style and structure.`

  const raw = await aiStore.generate(optionPrompt, { type: 'creativeOptions', topic: t, slideType: slideType.value })
  if (!raw) return

  try {
    const parsed = JSON.parse(raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim())
    if (!Array.isArray(parsed)) throw new Error('Options must be an array')
    creativeOptions.value = parsed
      .slice(0, 3)
      .map((opt, index) => ({
        title: String(opt?.title || `Option ${index + 1}`),
        angle: String(opt?.angle || ''),
        prompt: String(opt?.prompt || ''),
      }))
      .filter(opt => opt.prompt.trim())
    if (!creativeOptions.value.length) {
      creativeOptionsError.value = 'No usable creative options were returned. Try generating again.'
    }
  } catch {
    creativeOptionsError.value = 'Could not parse creative options. Try again or switch to “Show on Slide”.'
  }
}

async function useCreativeOption(option) {
  if (!option?.prompt) return
  contentCustomPrompt.value = option.prompt
  contentPromptUserEdited.value = true
  contentOutputMode.value = 'slide'
  await generateSlide()
}

async function generateQuiz(keepExisting = false) {
  if (!quizTopic.value.trim() && !quizCustomPrompt.value.trim()) return
  if (!keepExisting) quizQuestions.value = []
  const questions = await aiStore.generateQuiz(quizTopic.value, quizCount.value, {
    difficulty: quizDifficulty.value,
    questionType: quizQuestionType.value,
    objective: quizObjective.value,
    customPrompt: quizCustomPrompt.value,
  })
  if (questions) {
    if (keepExisting) {
      // Append new, avoid exact question duplicates
      const existing = new Set(quizQuestions.value.map(q => q.question))
      const fresh = questions.filter(q => !existing.has(q.question)).map(q => ({ ...q, _selected: true }))
      quizQuestions.value = [...quizQuestions.value, ...fresh]
    } else {
      quizQuestions.value = questions.map(q => ({ ...q, _selected: true }))
    }
  }
}

async function applyQuiz() {
  const toApply = quizQuestions.value.filter(q => q._selected)
  if (!toApply.length) return
  const pid = editorStore.projectId
  toApply.forEach((q, i) => {
    const slide = projectStore.addSlide(pid)
    if (slide) {
      projectStore.addElement(pid, slide.id, 'quiz', {
        x: 60, y: 80, width: 840, height: 380,
        content: {
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          explanation: q.explanation || ''
        }
      })
      projectStore.updateSlide(pid, slide.id, { title: `Q${i + 1}: ${q.question.slice(0, 40)}…` })
    }
  })
  quizQuestions.value = []
}

function toggleAllQuestions(val) {
  quizQuestions.value.forEach(q => q._selected = val)
}

async function generateVoiceover() {
  if (!voContent.value.trim()) return
  const script = await aiStore.generateVoiceoverScript(voContent.value)
  if (script) result.value = script
}

async function generateTranslation() {
  const textToTranslate = selectedEl.value?.content?.text
  if (!textToTranslate) return
  const text = await aiStore.generateTranslation(textToTranslate, targetLang.value)
  if (text) {
    result.value = text
  }
}

async function applyTranslation() {
  if (!result.value || !selectedEl.value) return
  projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, selectedEl.value.id, {
    content: { ...selectedEl.value.content, text: result.value }
  })
}

const imageTopic = ref('')
const isImageGenerating = ref(false)

async function generateAiImage() {
  if (!imageTopic.value.trim()) return
  isImageGenerating.value = true
  result.value = "Optimizing prompt..."

  try {
    let finalPrompt = imageTopic.value
    const enhanced = await aiStore.generateImagePrompt(imageTopic.value)
    if (enhanced) {
      finalPrompt = enhanced.replace(/```(json)?\n?/g, '').trim()
    }

    result.value = "Painting image... this takes about 10-20 seconds. Please wait."

    // Create Pollinations URL (free AI image generation, no API key needed)
    // Use slightly smaller dimensions for faster generation and cache-busting seed
    const seed = Math.floor(Math.random() * 1000000)
    const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(finalPrompt)}?width=600&height=400&nologo=true&seed=${seed}`

    // Preload image before adding to canvas so the loading spinner stays active
    await new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = resolve
      img.onerror = reject
      img.src = imgUrl
    })

    projectStore.addElement(editorStore.projectId, editorStore.currentSlideId, 'image', {
      x: 60, y: 150, width: 420, height: 280, // matches 600x400 aspect ratio
      content: { src: imgUrl, objectFit: 'cover' }
    })

    result.value = "Image added to slide!"
  } catch (error) {
    result.value = "Failed to generate image. Try a different prompt."
  } finally {
    isImageGenerating.value = false
  }
}

async function improveSelectedText() {
  if (!selectedEl.value?.content?.text) return
  const improved = await aiStore.improveText(selectedEl.value.content.text, prompt.value || 'Make it clearer and more engaging')
  if (improved) {
    result.value = improved
  }
}

async function applyImproved() {
  if (!result.value || !selectedEl.value) return
  projectStore.updateElement(editorStore.projectId, editorStore.currentSlideId, selectedEl.value.id, {
    content: { ...selectedEl.value.content, text: result.value }
  })
}

async function runFreePrompt() {
  if (!prompt.value.trim()) return
  const out = await aiStore.generate(prompt.value)
  if (out) result.value = out
}
</script>

<template>
  <div class="ai-panel">
    <!-- Mode tabs -->
    <div class="ai-mode-tabs">
      <button v-for="m in [
        { id: 'generate', label: '✦ Content' },
        { id: 'quiz', label: '✅ Quiz' },
        { id: 'voiceover', label: '🎙 Voiceover' },
        { id: 'improve', label: '✏️ Improve' },
        { id: 'translate', label: '🌐 Translate' },
        { id: 'image', label: '🎨 Image' },
        { id: 'settings', label: '⚙ API' },
      ]" :key="m.id"
        :class="['ai-mode-btn', activeMode === m.id && 'active']"
        @click="activeMode = m.id"
      >{{ m.label }}</button>
    </div>

    <div class="ai-content">

      <!-- Generate Slide Content -->
      <template v-if="activeMode === 'generate'">
        <!-- Topic -->
        <div class="form-group">
          <label class="form-label">Topic / Subject <span class="required">*</span></label>
          <input v-model="topic" class="input" placeholder="e.g. Automotive Braking System, Photosynthesis…" @keydown.enter="generateSlide" />
        </div>

        <div class="output-mode-switch" role="group" aria-label="Slide generation scope">
          <button
            :class="['output-mode-btn', contentGenerationMode === 'single' && 'active']"
            @click="contentGenerationMode = 'single'"
          >Single Slide</button>
          <button
            :class="['output-mode-btn', contentGenerationMode === 'deck' && 'active']"
            @click="contentGenerationMode = 'deck'"
          >Slide Deck</button>
        </div>

        <!-- Slide Type -->
        <div v-if="contentGenerationMode === 'single'" class="form-group">
          <label class="form-label">Slide Type</label>
          <select v-model="slideType" class="select">
            <option value="general">General</option>
            <option value="intro">Introduction</option>
            <option value="overview">Overview</option>
            <option value="concept">Concept Explanation</option>
            <option value="example">Example / Case Study</option>
            <option value="summary">Summary</option>
            <option value="callout">Key Takeaway</option>
          </select>
        </div>

        <div v-else class="form-group">
          <label class="form-label">Number of Slides</label>
          <input
            v-model.number="deckSlideCount"
            class="input"
            type="number"
            min="1"
            max="20"
          />
          <p class="form-hint">Generates this many slides from one full prompt.</p>
        </div>

        <!-- Additional description -->
        <div class="form-group">
          <label class="form-label">Description <span class="optional">(optional)</span></label>
          <textarea
            v-model="contentDescription"
            class="textarea"
            style="min-height:64px;resize:vertical"
            placeholder="Add context, audience level, specific subtopics, tone, or any extra detail…"
          />
        </div>

        <!-- Editable AI Prompt -->
        <div class="form-group">
          <div class="prompt-label-row">
            <label class="form-label">AI Prompt</label>
            <button v-if="contentPromptUserEdited" class="prompt-reset-btn" @click="resetContentPrompt" title="Reset to auto-generated prompt">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Reset
            </button>
            <span v-else class="prompt-auto-badge">auto</span>
          </div>
          <textarea
            v-model="contentCustomPrompt"
            class="textarea prompt-textarea"
            placeholder="Describe exactly what you want the AI to create…"
            @input="contentPromptUserEdited = true"
            spellcheck="false"
          />
          <p class="form-hint">Edit freely — the AI will follow your exact instructions.</p>
        </div>

        <div v-if="contentGenerationMode === 'single'" class="output-mode-switch" role="group" aria-label="Generation output mode">
          <button
            :class="['output-mode-btn', contentOutputMode === 'slide' && 'active']"
            @click="contentOutputMode = 'slide'"
          >Show on Slide</button>
          <button
            :class="['output-mode-btn', contentOutputMode === 'options' && 'active']"
            @click="contentOutputMode = 'options'"
          >Creative Options</button>
        </div>

        <!-- Generate + Regenerate -->
        <button
          class="btn btn-primary w-full ai-generate-btn"
          :disabled="aiStore.isGenerating || (!topic.trim() && !contentCustomPrompt.trim()) || (contentGenerationMode === 'deck' && (!deckSlideCount || deckSlideCount < 1 || deckSlideCount > 20))"
          @click="generateSlide"
        >
          <span v-if="aiStore.isGenerating" class="spinner" />
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          {{ aiStore.isGenerating ? 'Generating…' : (contentGenerationMode === 'deck'
            ? (result ? `Regenerate ${deckSlideCount} Slides` : `Generate ${deckSlideCount} Slides`)
            : (contentOutputMode === 'slide' ? (result ? 'Regenerate & Apply' : 'Generate & Apply') : 'Generate Creative Options')) }}
        </button>

        <div v-if="contentGenerationMode === 'single' && contentOutputMode === 'options' && (creativeOptions.length || creativeOptionsError)" class="creative-options-wrap">
          <div class="result-header">
            <span class="form-label">Creative Options</span>
            <button class="btn btn-ghost btn-sm" @click="creativeOptions = []; creativeOptionsError = ''">Clear</button>
          </div>
          <div v-if="creativeOptionsError" class="ai-error" style="margin-top: var(--space-2)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ creativeOptionsError }}
          </div>
          <div v-else class="creative-options-list">
            <article v-for="(opt, idx) in creativeOptions" :key="idx" class="creative-option-card">
              <h4 class="creative-title">{{ opt.title }}</h4>
              <p class="creative-angle">{{ opt.angle }}</p>
              <button class="btn btn-secondary btn-sm" @click="useCreativeOption(opt)">Use This Option</button>
            </article>
          </div>
        </div>
      </template>

      <!-- Generate Quiz Assessment -->
      <template v-else-if="activeMode === 'quiz'">
        <!-- Topic -->
        <div class="form-group">
          <label class="form-label">Quiz Topic <span class="required">*</span></label>
          <input v-model="quizTopic" class="input" placeholder="e.g. World War II Timeline, Photosynthesis, SQL Joins…" @keydown.enter="generateQuiz" />
        </div>

        <!-- Config row -->
        <div class="quiz-config-row">
          <div class="form-group" style="flex:1">
            <label class="form-label">Questions</label>
            <select v-model.number="quizCount" class="select">
              <option :value="2">2</option>
              <option :value="3">3</option>
              <option :value="4">4</option>
              <option :value="5">5</option>
              <option :value="6">6</option>
              <option :value="8">8</option>
              <option :value="10">10</option>
            </select>
          </div>
          <div class="form-group" style="flex:1">
            <label class="form-label">Difficulty</label>
            <select v-model="quizDifficulty" class="select">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <!-- Question type -->
        <div class="form-group">
          <label class="form-label">Question Type</label>
          <div class="qtype-btns">
            <button v-for="t in [
              { id: 'multiple-choice', label: 'Multiple Choice', icon: '☑' },
              { id: 'true-false', label: 'True / False', icon: '✓✗' },
              { id: 'mixed', label: 'Mixed', icon: '⊕' },
            ]" :key="t.id"
              :class="['qtype-btn', quizQuestionType === t.id && 'active']"
              @click="quizQuestionType = t.id"
            >
              <span class="qtype-icon">{{ t.icon }}</span>
              <span>{{ t.label }}</span>
            </button>
          </div>
        </div>

        <!-- Learning objective (optional) -->
        <div class="form-group">
          <label class="form-label">Learning Objective <span class="optional">(optional)</span></label>
          <input v-model="quizObjective" class="input" placeholder="e.g. Identify key causes of WWI" />
        </div>

        <!-- Editable AI Prompt -->
        <div class="form-group">
          <div class="prompt-label-row">
            <label class="form-label">AI Prompt</label>
            <button
              v-if="quizPromptUserEdited"
              class="prompt-reset-btn"
              @click="resetQuizPrompt"
              title="Reset to auto-generated prompt"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Reset
            </button>
            <span v-else class="prompt-auto-badge">auto</span>
          </div>
          <textarea
            v-model="quizCustomPrompt"
            class="textarea prompt-textarea"
            placeholder="Describe what quiz questions you want the AI to create…"
            @input="quizPromptUserEdited = true"
            spellcheck="false"
          />
          <p class="form-hint">Edit this prompt freely. The AI will follow your exact instructions.</p>
        </div>

        <!-- Generate button -->
        <button
          class="btn btn-primary w-full ai-generate-btn"
          :disabled="aiStore.isGenerating || (!quizTopic.trim() && !quizCustomPrompt.trim())"
          @click="generateQuiz(false)"
        >
          <span v-if="aiStore.isGenerating" class="spinner" />
          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          {{ aiStore.isGenerating ? 'Generating…' : `Generate ${quizCount} Questions` }}
        </button>

        <!-- Question cards result -->
        <div v-if="quizQuestions.length" class="quiz-results">
          <div class="quiz-results-header">
            <span class="form-label">{{ quizQuestions.length }} Questions</span>
            <div class="quiz-header-actions">
              <button class="btn btn-ghost btn-sm" @click="toggleAllQuestions(true)">All</button>
              <button class="btn btn-ghost btn-sm" @click="toggleAllQuestions(false)">None</button>
              <button class="btn btn-ghost btn-sm danger" @click="quizQuestions = []">Clear</button>
            </div>
          </div>

          <!-- Regenerate / Add more row -->
          <div class="regen-row">
            <button
              class="btn btn-secondary regen-btn"
              :disabled="aiStore.isGenerating"
              @click="generateQuiz(false)"
              title="Replace all questions with a new set"
            >
              <span v-if="aiStore.isGenerating" class="spinner spinner-sm" />
              <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              Regenerate
            </button>
            <button
              class="btn btn-ghost regen-btn"
              :disabled="aiStore.isGenerating"
              @click="generateQuiz(true)"
              title="Generate more and append to current list"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add More
            </button>
          </div>

          <div v-for="(q, idx) in quizQuestions" :key="idx" class="quiz-card" :class="{ 'deselected': !q._selected }">
            <div class="quiz-card-header">
              <label class="quiz-card-check">
                <input type="checkbox" v-model="q._selected" />
                <span class="q-num">Q{{ idx + 1 }}</span>
              </label>
              <div class="q-badges">
                <span class="badge difficulty-badge" :class="q.difficulty">{{ q.difficulty }}</span>
                <span class="badge type-badge">{{ q.type === 'true-false' ? 'T/F' : 'MCQ' }}</span>
              </div>
            </div>

            <p class="q-question">{{ q.question }}</p>

            <div class="q-options">
              <div v-for="(opt, oi) in q.options" :key="oi"
                :class="['q-option', oi === q.correctIndex && 'correct']"
              >
                <span class="q-option-letter">{{ ['A','B','C','D'][oi] }}</span>
                <span>{{ opt }}</span>
                <svg v-if="oi === q.correctIndex" class="q-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>

            <div v-if="q.explanation" class="q-explanation">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              {{ q.explanation }}
            </div>
          </div>

          <button
            class="btn btn-primary w-full"
            :disabled="!quizQuestions.filter(q => q._selected).length"
            @click="applyQuiz"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            Add {{ quizQuestions.filter(q => q._selected).length }} Selected as Quiz Slides
          </button>
        </div>
      </template>

      <!-- Voiceover -->
      <template v-else-if="activeMode === 'voiceover'">
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Slide Content / Key Points</label>
          <textarea v-model="voContent" class="textarea" style="min-height:100px" placeholder="Paste the slide content or talking points here…" />
        </div>
        <button class="btn btn-primary w-full ai-generate-btn" :disabled="aiStore.isGenerating" @click="generateVoiceover">
          <span v-if="aiStore.isGenerating" class="spinner" />
          {{ aiStore.isGenerating ? 'Generating…' : 'Generate Script' }}
        </button>
      </template>

      <!-- Improve Text -->
      <template v-else-if="activeMode === 'improve'">
        <div v-if="selectedEl?.content?.text" class="selected-text-preview">
          <div class="form-label" style="margin-bottom:var(--space-1)">Selected Text</div>
          <div class="text-preview">{{ selectedEl.content.text.slice(0,120) }}{{ selectedEl.content.text.length > 120 ? '…' : '' }}</div>
        </div>
        <p v-else class="ai-hint">Select a text element on the canvas to improve it.</p>
        <div class="form-group" style="margin-bottom:var(--space-3);margin-top:var(--space-3)">
          <label class="form-label">Instruction</label>
          <input v-model="prompt" class="input" placeholder="Make it more concise and engaging" />
        </div>
        <div class="tab-section-title" style="margin-bottom:var(--space-3)">Or send a custom prompt:</div>
        <textarea v-model="prompt" class="textarea" style="min-height:70px" placeholder="Write anything…" />
        <button class="btn btn-primary w-full ai-generate-btn" :disabled="aiStore.isGenerating || (!selectedEl && !prompt)" @click="selectedEl ? improveSelectedText() : runFreePrompt()">
          <span v-if="aiStore.isGenerating" class="spinner" />
          {{ aiStore.isGenerating ? 'Processing…' : 'Generate' }}
        </button>
      </template>

      <!-- Translate -->
      <template v-else-if="activeMode === 'translate'">
        <div v-if="selectedEl?.content?.text" class="selected-text-preview">
          <div class="form-label" style="margin-bottom:var(--space-1)">Selected Text</div>
          <div class="text-preview">{{ selectedEl.content.text.slice(0,120) }}{{ selectedEl.content.text.length > 120 ? '…' : '' }}</div>
        </div>
        <p v-else class="ai-hint">Select a text element on the canvas to translate it.</p>
        
        <div class="form-group" style="margin-top:var(--space-3); margin-bottom:var(--space-3)">
          <label class="form-label">Target Language</label>
          <select v-model="targetLang" class="select">
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Italian">Italian</option>
            <option value="Portuguese">Portuguese</option>
            <option value="Chinese (Simplified)">Chinese (Simplified)</option>
            <option value="Japanese">Japanese</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>
        
        <button class="btn btn-primary w-full ai-generate-btn" :disabled="aiStore.isGenerating || !selectedEl?.content?.text" @click="generateTranslation">
          <span v-if="aiStore.isGenerating" class="spinner" />
          {{ aiStore.isGenerating ? 'Translating…' : 'Translate Text' }}
        </button>

        <div v-if="result" class="improve-result-wrap" style="margin-top: var(--space-4)">
          <div class="result-header">
            <span class="form-label">Translation Result</span>
            <div class="result-actions">
              <button class="btn btn-ghost btn-sm" @click="navigator.clipboard.writeText(result)">Copy</button>
              <button class="btn btn-primary btn-sm" @click="applyTranslation" :disabled="!selectedEl">Apply</button>
            </div>
          </div>
          <div class="textarea result-display">{{ result }}</div>
        </div>
      </template>

      <!-- Image Generation -->
      <template v-else-if="activeMode === 'image'">
        <p class="ai-hint" style="margin-bottom:var(--space-3)">Generate distinct educational visual assets instantly. The image will be added directly to your slide.</p>
        <div class="form-group" style="margin-bottom:var(--space-3)">
          <label class="form-label">Image Description</label>
          <textarea v-model="imageTopic" class="textarea" style="min-height:100px" placeholder="Describe the image (e.g. 'A futuristic city skyline at sunset in a vibrant retro style')" />
        </div>
<button class="btn btn-primary w-full ai-generate-btn" :disabled="isImageGenerating || aiStore.isGenerating || !imageTopic" @click="generateAiImage">
            <span v-if="isImageGenerating || aiStore.isGenerating" class="spinner" />
            {{ (isImageGenerating || aiStore.isGenerating) ? 'Generating Image…' : 'Generate & Insert' }}
        </button>

        <div v-if="result" class="improve-result-wrap" style="margin-top: var(--space-4)">
          <div class="result-header">
            <span class="form-label">Status</span>
          </div>
          <div class="textarea result-display" style="color: var(--color-primary)">{{ result }}</div>
        </div>
      </template>

      <!-- Settings -->
      <template v-else-if="activeMode === 'settings'">
        <div class="ai-settings">
          <div class="form-group" style="margin-bottom:var(--space-4)">
            <label class="form-label">AI Provider</label>
            <select :value="aiStore.apiProvider" class="select" @change="aiStore.setProvider($event.target.value)">
              <option value="openai">OpenAI (GPT-4o mini)</option>
              <option value="anthropic">Anthropic (Claude)</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:var(--space-4)">
            <label class="form-label">API Key</label>
            <input
              type="password"
              :value="aiStore.apiKey"
              class="input"
              placeholder="sk-…"
              @change="aiStore.setApiKey($event.target.value)"
            />
            <p class="form-hint">Key is stored locally in your browser. It is never sent to our servers.</p>
          </div>
          <div v-if="!aiStore.apiKey" class="demo-notice">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Running in <strong>demo mode</strong> — sample responses only. Add your API key to use real AI generation.
          </div>
        </div>
      </template>

      <!-- Result area (not used in quiz mode — it has its own card display) -->
      <div v-if="result && activeMode !== 'settings' && activeMode !== 'quiz'" class="result-area">
        <div class="result-header">
          <span class="form-label">Result</span>
          <button class="btn btn-ghost btn-sm" @click="result = ''">Clear</button>
        </div>
        <pre class="result-pre">{{ result }}</pre>
        <div class="result-actions">
          <button v-if="activeMode === 'generate'" class="btn btn-primary btn-sm" @click="applyGeneratedResult">
            {{ contentGenerationMode === 'deck' ? 'Apply as Deck' : 'Apply to Slide' }}
          </button>
          <button v-if="activeMode === 'generate'" class="btn btn-ghost btn-sm" :disabled="aiStore.isGenerating" @click="generateSlide">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Regenerate
          </button>
          <button v-if="activeMode === 'improve' && selectedEl" class="btn btn-primary btn-sm" @click="applyImproved">
            Apply to Element
          </button>
          <button class="btn btn-secondary btn-sm" @click="navigator.clipboard?.writeText(result)">
            Copy
          </button>
        </div>
      </div>

      <!-- Error -->
      <div v-if="aiStore.lastError" class="ai-error">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {{ aiStore.lastError }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-panel { display: flex; flex-direction: column; flex: 1; min-height: 0; overflow: hidden; }
.ai-mode-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: var(--space-2);
  border-bottom: 1px solid var(--color-border-subtle);
  flex-shrink: 0;
  background: color-mix(in srgb, var(--color-surface-overlay) 62%, transparent 38%);
  position: sticky;
  top: 0;
  z-index: 2;
}
.ai-mode-btn {
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 600;
  background: var(--color-surface-overlay);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  cursor: pointer;
  white-space: nowrap;
  transition: all var(--transition-fast);
}
.ai-mode-btn:hover { color: var(--color-text); border-color: color-mix(in srgb, var(--color-primary) 35%, var(--color-border)); }
.ai-mode-btn.active { background: color-mix(in srgb, var(--color-primary-light) 22%, var(--color-surface-overlay)); color: var(--color-primary); border-color: color-mix(in srgb, var(--color-primary) 48%, var(--color-border)); }
.ai-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  background: color-mix(in srgb, var(--color-surface) 94%, #111b3b 6%);
}
.ai-generate-btn { gap: var(--space-2); }
.spinner {
  display: inline-block; width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin .7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.selected-text-preview {
  background: color-mix(in srgb, var(--color-surface-overlay) 72%, #ffffff 28%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
}
.text-preview { font-size: var(--text-sm); color: var(--color-text-muted); font-style: italic; }
.ai-hint { font-size: var(--text-sm); color: var(--color-text-dim); text-align: center; padding: var(--space-4) 0; }
.tab-section-title { font-size: var(--text-xs); color: var(--color-text-dim); }

.result-area {
  background: color-mix(in srgb, var(--color-surface-overlay) 70%, #ffffff 30%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-border-subtle);
}
.result-pre {
  padding: var(--space-3);
  font-size: 12px;
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 200px;
  overflow-y: auto;
}
.result-actions {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-top: 1px solid var(--color-border-subtle);
}
.ai-error {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  background: rgba(239,68,68,.1);
  border: 1px solid rgba(239,68,68,.3);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-danger);
}
.form-hint { font-size: var(--text-xs); color: var(--color-text-dim); margin-top: var(--space-1); }
.demo-notice {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  background: rgba(245,158,11,.1);
  border: 1px solid rgba(245,158,11,.3);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-warning);
  line-height: 1.5;
}
.ai-settings { display: flex; flex-direction: column; gap: var(--space-3); }

/* Quiz assessment */
.quiz-config-row {
  display: flex;
  gap: var(--space-3);
}

/* Editable prompt */
.prompt-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-1);
}
.prompt-reset-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 10px;
  font-family: inherit;
  color: var(--color-primary);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  transition: background var(--transition-fast);
}
.prompt-reset-btn:hover { background: var(--color-primary-light); }
.prompt-auto-badge {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 10px;
  background: rgba(87,242,135,.12);
  color: #57f287;
  font-weight: 600;
  letter-spacing: .04em;
}
.prompt-textarea {
  min-height: 88px;
  font-size: 12px;
  font-family: var(--font-mono);
  line-height: 1.6;
  resize: vertical;
}

.output-mode-switch {
  display: flex;
  gap: var(--space-2);
}

.output-mode-btn {
  flex: 1;
  background: color-mix(in srgb, var(--color-surface-overlay) 82%, #ffffff 18%);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: 12px;
  font-family: inherit;
  padding: 7px 8px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.output-mode-btn:hover {
  color: var(--color-text);
  border-color: var(--color-primary);
}

.output-mode-btn.active {
  background: var(--color-primary-light);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.creative-options-wrap {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-surface-overlay) 70%, #ffffff 30%);
  padding: var(--space-2);
}

.creative-options-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-2);
}

.creative-option-card {
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.creative-title {
  margin: 0;
  font-size: 13px;
  color: var(--color-text);
}

.creative-angle {
  margin: 0;
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.5;
}

/* Regenerate row */
.regen-row {
  display: flex;
  gap: var(--space-2);
}
.regen-btn {
  flex: 1;
  font-size: 12px;
  gap: var(--space-1);
  padding: 7px 10px;
}
.spinner-sm {
  width: 11px;
  height: 11px;
  border-width: 1.5px;
}
.required { color: var(--color-danger); margin-left: 2px; }
.optional { font-size: var(--text-xs); color: var(--color-text-dim); font-weight: 400; }

.qtype-btns { display: flex; gap: var(--space-2); }
.qtype-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 4px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-overlay);
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 11px;
  font-family: inherit;
  transition: all var(--transition-fast);
}
.qtype-btn:hover { border-color: var(--color-primary); color: var(--color-text); }
.qtype-btn.active { border-color: var(--color-primary); background: var(--color-primary-light); color: var(--color-primary); }
.qtype-icon { font-size: 16px; line-height: 1; }



/* Quiz results */
.quiz-results { display: flex; flex-direction: column; gap: var(--space-3); }
.quiz-results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}
.quiz-header-actions { display: flex; gap: var(--space-1); }
.danger { color: var(--color-danger) !important; }

.quiz-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: color-mix(in srgb, var(--color-surface-overlay) 72%, #ffffff 28%);
  transition: opacity .2s;
}
.quiz-card.deselected { opacity: .45; }
.quiz-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-border-subtle);
  background: var(--color-surface);
}
.quiz-card-check {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  font-size: var(--text-xs);
}
.quiz-card-check input[type=checkbox] { accent-color: var(--color-primary); width: 14px; height: 14px; }
.q-num { font-weight: 700; color: var(--color-text-muted); font-size: 11px; letter-spacing: .05em; text-transform: uppercase; }
.q-badges { display: flex; gap: var(--space-1); }
.difficulty-badge { font-size: 10px; padding: 2px 6px; border-radius: 10px; font-weight: 600; text-transform: capitalize; }
.difficulty-badge.beginner { background: rgba(87,242,135,.15); color: #57f287; }
.difficulty-badge.intermediate { background: rgba(250,166,26,.15); color: #faa61a; }
.difficulty-badge.advanced { background: rgba(237,66,69,.15); color: #ed4245; }
.type-badge { font-size: 10px; padding: 2px 6px; border-radius: 10px; background: var(--color-primary-light); color: var(--color-primary); font-weight: 600; }

.q-question {
  padding: 10px 12px 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.5;
  margin: 0;
}
.q-options { padding: 0 12px 8px; display: flex; flex-direction: column; gap: 4px; }
.q-option {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 5px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  color: var(--color-text-muted);
  background: transparent;
  transition: background .15s;
}
.q-option.correct {
  background: rgba(87,242,135,.12);
  color: #57f287;
  font-weight: 600;
}
.q-option-letter {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  flex-shrink: 0;
  color: var(--color-text-muted);
}
.q-option.correct .q-option-letter { background: rgba(87,242,135,.2); border-color: #57f287; color: #57f287; }
.q-check-icon { margin-left: auto; flex-shrink: 0; color: #57f287; }
.q-explanation {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin: 0 12px 10px;
  padding: 8px 10px;
  background: rgba(88,101,242,.08);
  border-radius: var(--radius-sm);
  font-size: 11px;
  color: var(--color-text-muted);
  line-height: 1.5;
  border-left: 2px solid var(--color-primary);
}
.q-explanation svg { flex-shrink: 0; margin-top: 1px; color: var(--color-primary); }

@media (max-width: 880px) {
  .quiz-config-row {
    flex-direction: column;
  }

  .result-actions,
  .quiz-results-header {
    flex-wrap: wrap;
  }
}
</style>
