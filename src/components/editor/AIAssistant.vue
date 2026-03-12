<script setup>
import { ref, computed, watch } from 'vue'
import { useAIStore } from '@/stores/aiStore'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'
import { BUILT_IN_CONTENT_BLOCKS, getContentBlockBounds, normalizeContentBlock } from '@/lib/blockLibrary'

const CONTENT_LAYOUT_OPTIONS = [
  {
    id: 'classic',
    label: 'Classic',
    hint: 'Title, bullets, and a takeaway.',
    promptHint: 'Use a standard explanatory slide with a title, optional subtitle, 3-5 bullets, and one strong takeaway.',
    schema: '{ "layout": "classic", "title": "...", "subtitle": "...", "bullets": ["..."], "callout": "..." }',
  },
  {
    id: 'cards',
    label: 'Cards',
    hint: 'Three concept or benefit cards.',
    promptHint: 'Structure the content as three distinct cards with a short title and supporting sentence for each.',
    schema: '{ "layout": "cards", "title": "...", "subtitle": "...", "callout": "...", "cards": [{ "title": "...", "body": "..." }, { "title": "...", "body": "..." }, { "title": "...", "body": "..." }] }',
  },
  {
    id: 'comparison',
    label: 'Comparison',
    hint: 'Side-by-side before/after or option A/B.',
    promptHint: 'Create a two-column comparison with clear labels and 2-3 points on each side.',
    schema: '{ "layout": "comparison", "title": "...", "subtitle": "...", "callout": "...", "comparison": { "leftTitle": "...", "leftPoints": ["..."], "rightTitle": "...", "rightPoints": ["..."] } }',
  },
  {
    id: 'metrics',
    label: 'Metrics',
    hint: 'Three KPI-style highlights.',
    promptHint: 'Return three concise, presentation-ready metrics with realistic values and short labels.',
    schema: '{ "layout": "metrics", "title": "...", "subtitle": "...", "callout": "...", "metrics": [{ "value": "92%", "label": "..." }, { "value": "3.4x", "label": "..." }, { "value": "14d", "label": "..." }] }',
  },
  {
    id: 'timeline',
    label: 'Timeline',
    hint: 'Four-step milestone story.',
    promptHint: 'Turn the topic into four clear milestones that progress from start to finish.',
    schema: '{ "layout": "timeline", "title": "...", "subtitle": "...", "callout": "...", "timeline": [{ "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }] }',
  },
  {
    id: 'faq',
    label: 'FAQ',
    hint: 'Three audience questions and answers.',
    promptHint: 'Return three strong audience questions, each with a concise useful answer.',
    schema: '{ "layout": "faq", "title": "...", "subtitle": "...", "callout": "...", "faqs": [{ "question": "...", "answer": "..." }, { "question": "...", "answer": "..." }, { "question": "...", "answer": "..." }] }',
  },
  {
    id: 'process',
    label: 'Process',
    hint: 'Three practical steps.',
    promptHint: 'Break the topic into three clear steps with actionable descriptions.',
    schema: '{ "layout": "process", "title": "...", "subtitle": "...", "callout": "...", "process": [{ "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }, { "title": "...", "detail": "..." }] }',
  },
]

const CONTENT_LAYOUT_BLOCKS = {
  cards: 'three-card-grid',
  comparison: 'comparison-columns',
  metrics: 'metric-strip',
  timeline: 'timeline-ribbon',
  faq: 'faq-stack',
  process: 'process-ladder',
}

function normalizeLayoutId(value, fallback = 'classic') {
  const normalized = String(value || fallback || 'classic').trim().toLowerCase()
  return CONTENT_LAYOUT_OPTIONS.some((option) => option.id === normalized) ? normalized : fallback
}

function cleanText(value, fallback = '') {
  const text = String(value ?? fallback).replace(/^\s*[-•]\s*/, '').trim()
  return text || fallback
}

function normalizeTextList(value) {
  const list = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split('\n')
      : []

  return list
    .map((item) => cleanText(item))
    .filter(Boolean)
}

function fillToCount(items, count, factory) {
  const next = [...items]
  while (next.length < count) next.push(factory(next.length))
  return next.slice(0, count)
}

function normalizeCards(cards, bullets) {
  const normalized = Array.isArray(cards)
    ? cards
        .map((card, index) => ({
          title: cleanText(card?.title, `Card ${index + 1}`),
          body: cleanText(card?.body || card?.text || card?.description, 'Add supporting detail.'),
        }))
        .filter((card) => card.title || card.body)
    : []

  const fallback = bullets.map((bullet, index) => ({
    title: `Point ${index + 1}`,
    body: bullet,
  }))

  return fillToCount(normalized.length ? normalized : fallback, 3, (index) => ({
    title: `Point ${index + 1}`,
    body: 'Add supporting detail.',
  }))
}

function normalizeComparison(comparison, bullets) {
  const leftPoints = normalizeTextList(comparison?.leftPoints)
  const rightPoints = normalizeTextList(comparison?.rightPoints)
  const fallbackLeft = bullets.slice(0, Math.max(1, Math.ceil(bullets.length / 2)))
  const fallbackRight = bullets.slice(Math.max(1, Math.ceil(bullets.length / 2)))

  return {
    leftTitle: cleanText(comparison?.leftTitle, 'Option A'),
    leftPoints: fillToCount(leftPoints.length ? leftPoints : fallbackLeft, 3, (index) => `Left point ${index + 1}`),
    rightTitle: cleanText(comparison?.rightTitle, 'Option B'),
    rightPoints: fillToCount(rightPoints.length ? rightPoints : fallbackRight, 3, (index) => `Right point ${index + 1}`),
  }
}

function normalizeMetrics(metrics, bullets) {
  const parsed = Array.isArray(metrics)
    ? metrics
        .map((metric, index) => ({
          value: cleanText(metric?.value, `${index + 1}`),
          label: cleanText(metric?.label, `Metric ${index + 1}`),
        }))
        .filter((metric) => metric.value || metric.label)
    : []

  const fallback = bullets.map((bullet, index) => {
    const [valuePart, ...labelParts] = bullet.split(/[:\-]/)
    return {
      value: cleanText(valuePart, `${index + 1}`),
      label: cleanText(labelParts.join(' ').trim(), bullet),
    }
  })

  return fillToCount(parsed.length ? parsed : fallback, 3, (index) => ({
    value: `${index + 1}`,
    label: `Metric ${index + 1}`,
  }))
}

function normalizeTimeline(timeline, bullets) {
  const parsed = Array.isArray(timeline)
    ? timeline
        .map((item, index) => ({
          title: cleanText(item?.title, `Phase ${index + 1}`),
          detail: cleanText(item?.detail || item?.description, 'Explain the milestone.'),
        }))
        .filter((item) => item.title || item.detail)
    : []

  const fallback = bullets.map((bullet, index) => ({
    title: `Phase ${index + 1}`,
    detail: bullet,
  }))

  return fillToCount(parsed.length ? parsed : fallback, 4, (index) => ({
    title: `Phase ${index + 1}`,
    detail: 'Explain the milestone.',
  }))
}

function normalizeFaqs(faqs, bullets) {
  const parsed = Array.isArray(faqs)
    ? faqs
        .map((item, index) => ({
          question: cleanText(item?.question, `Question ${index + 1}?`),
          answer: cleanText(item?.answer, 'Add the short answer here.'),
        }))
        .filter((item) => item.question || item.answer)
    : []

  const fallback = bullets.map((bullet, index) => ({
    question: `Question ${index + 1}?`,
    answer: bullet,
  }))

  return fillToCount(parsed.length ? parsed : fallback, 3, (index) => ({
    question: `Question ${index + 1}?`,
    answer: 'Add the short answer here.',
  }))
}

function normalizeProcess(process, bullets) {
  const parsed = Array.isArray(process)
    ? process
        .map((item, index) => ({
          title: cleanText(item?.title, `Step ${index + 1}`),
          detail: cleanText(item?.detail || item?.description, 'Add the step detail here.'),
        }))
        .filter((item) => item.title || item.detail)
    : []

  const fallback = bullets.map((bullet, index) => ({
    title: `Step ${index + 1}`,
    detail: bullet,
  }))

  return fillToCount(parsed.length ? parsed : fallback, 3, (index) => ({
    title: `Step ${index + 1}`,
    detail: 'Add the step detail here.',
  }))
}

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
const contentLayoutMode = ref('classic')
const deckLayoutStrategy = ref('mixed')
const deckSlideCount = ref(5)
const contentOutputMode = ref('slide') // 'slide' | 'options'
const creativeOptions = ref([])
const creativeOptionsError = ref('')
const selectedContentLayout = computed(() =>
  CONTENT_LAYOUT_OPTIONS.find((option) => option.id === contentLayoutMode.value) || CONTENT_LAYOUT_OPTIONS[0]
)

const contentAutoPrompt = computed(() => {
  const t = topic.value.trim() || '[your topic]'
  if (contentGenerationMode.value === 'deck') {
    let promptText = `Create a complete ${deckSlideCount.value}-slide learning deck about "${t}".`
    if (contentDescription.value.trim()) promptText += `\nAdditional context: ${contentDescription.value.trim()}`
    promptText += `\nDeck layout strategy: ${deckLayoutStrategy.value}`
    if (deckLayoutStrategy.value === 'single') {
      promptText += `\nUse the ${contentLayoutMode.value} layout for every slide.`
    } else {
      promptText += '\nMix layouts across the deck when appropriate.'
    }
    promptText += `\nReturn ONLY valid JSON: { "slides": [{ "title": "...", "subtitle": "...", "callout": "...", "slideType": "...", "layout": "classic|cards|comparison|metrics|timeline|faq|process" }] }`
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
  p += `\nLayout mode: ${contentLayoutMode.value}`
  p += `\nLayout instruction: ${selectedContentLayout.value.promptHint}`
  p += `\nReturn ONLY valid JSON matching this shape: ${selectedContentLayout.value.schema}`
  p += `\nMake all content specific to "${t}" — no generic placeholders.`
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
const selectedTextElements = computed(() => {
  const selectedIds = new Set(editorStore.selectedElementIds)
  return (slide.value?.elements || []).filter((element) =>
    selectedIds.has(element.id) && typeof element?.content?.text === 'string' && element.content.text.trim()
  )
})
const selectedTextSource = computed(() =>
  selectedTextElements.value
    .map((element) => element.content.text.trim())
    .filter(Boolean)
    .join('\n\n')
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
      layoutStrategy: deckLayoutStrategy.value,
      layoutMode: contentLayoutMode.value,
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
    { layoutMode: contentLayoutMode.value },
  )
  if (content) {
    const normalized = normalizeSlideContent(content)
    result.value = JSON.stringify(normalized, null, 2)
    applySlideContent(normalized, { replaceGenerated: true })
  }
}

function normalizeSlideContent(content) {
  const parsed = content && typeof content === 'object' ? content : {}
  const bullets = normalizeTextList(parsed.bullets)
  const layout = normalizeLayoutId(
    parsed.layout || parsed.design?.layout,
    contentGenerationMode.value === 'deck' && deckLayoutStrategy.value === 'mixed'
      ? 'classic'
      : contentLayoutMode.value
  )

  return {
    title: String(parsed.title || topic.value || 'Untitled Slide').trim(),
    subtitle: String(parsed.subtitle || '').trim(),
    bullets,
    callout: String(parsed.callout || '').trim(),
    layout,
    cards: normalizeCards(parsed.cards, bullets),
    comparison: normalizeComparison(parsed.comparison, bullets),
    metrics: normalizeMetrics(parsed.metrics, bullets),
    timeline: normalizeTimeline(parsed.timeline, bullets),
    faqs: normalizeFaqs(parsed.faqs, bullets),
    process: normalizeProcess(parsed.process, bullets),
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

function cloneBuiltInBlock(blockId) {
  const source = BUILT_IN_CONTENT_BLOCKS.find((block) => block.id === blockId)
  if (!source) return null
  const block = normalizeContentBlock(JSON.parse(JSON.stringify(source)), blockId)
  block.elements = block.elements.map((element) => ({
    ...element,
    meta: { ...(element.meta || {}), source: 'ai-content' },
  }))
  return block
}

function appendBlockSubtitle(block, subtitle) {
  if (!subtitle) return
  block.elements.push({
    type: 'text',
    x: 0,
    y: 54,
    width: 760,
    height: 36,
    meta: { source: 'ai-content' },
    content: {
      text: subtitle,
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'left',
      color: '#64748b',
      lineHeight: 1.4,
      fontFamily: 'Inter, sans-serif',
    },
  })
}

function appendBlockCallout(block, callout) {
  if (!callout) return
  const bounds = getContentBlockBounds(block)
  block.elements.push({
    type: 'text',
    x: 0,
    y: bounds.height + 18,
    width: Math.max(bounds.width, 720),
    height: 40,
    meta: { source: 'ai-content' },
    content: {
      text: `Takeaway: ${callout}`,
      fontSize: 15,
      fontWeight: '600',
      textAlign: 'left',
      color: '#6c47ff',
      lineHeight: 1.4,
      fontFamily: 'Inter, sans-serif',
    },
  })
}

function getElementBounds(elements) {
  const items = Array.isArray(elements) ? elements : []
  if (!items.length) {
    return { minX: 40, minY: 54, width: 0, height: 0 }
  }

  const minX = Math.min(...items.map((element) => Number(element.x || 0)))
  const minY = Math.min(...items.map((element) => Number(element.y || 0)))
  const maxX = Math.max(...items.map((element) => Number(element.x || 0) + Number(element.width || 0)))
  const maxY = Math.max(...items.map((element) => Number(element.y || 0) + Number(element.height || 0)))

  return {
    minX,
    minY,
    width: Math.max(0, maxX - minX),
    height: Math.max(0, maxY - minY),
  }
}

function resolveGeneratedBlockOrigin(projectId, block) {
  const project = projectStore.getProject(projectId)
  const bounds = getContentBlockBounds(block)
  const canvasWidth = Number(project?.settings?.slideWidth || 960)
  return {
    x: Math.max(40, Math.round((canvasWidth - bounds.width) / 2)),
    y: 54,
  }
}

function buildCardsBlock(normalized) {
  const block = cloneBuiltInBlock(CONTENT_LAYOUT_BLOCKS.cards)
  if (!block) return null
  const cards = normalized.cards
  block.elements[0].content.text = normalized.title
  block.elements[1].content.text = normalized.subtitle || normalized.callout || 'Use the three cards to frame the main ideas.'
  cards.forEach((card, index) => {
    block.elements[5 + index].content.text = card.title
    block.elements[8 + index].content.text = card.body
  })
  if (normalized.callout && normalized.subtitle) appendBlockCallout(block, normalized.callout)
  return block
}

function buildComparisonBlock(normalized) {
  const block = cloneBuiltInBlock(CONTENT_LAYOUT_BLOCKS.comparison)
  if (!block) return null
  block.elements[0].content.text = normalized.title
  block.elements[3].content.text = normalized.comparison.leftTitle
  block.elements[4].content.text = normalized.comparison.rightTitle
  block.elements[5].content = {
    ...block.elements[5].content,
    text: normalized.comparison.leftPoints.map((point) => `• ${point}`).join('\n'),
    fontSize: 17,
    lineHeight: 1.55,
  }
  block.elements[6].content = {
    ...block.elements[6].content,
    text: normalized.comparison.rightPoints.map((point) => `• ${point}`).join('\n'),
    fontSize: 17,
    lineHeight: 1.55,
  }
  appendBlockSubtitle(block, normalized.subtitle)
  appendBlockCallout(block, normalized.callout)
  return block
}

function buildMetricsBlock(normalized) {
  const block = cloneBuiltInBlock(CONTENT_LAYOUT_BLOCKS.metrics)
  if (!block) return null
  block.elements[0].content.text = normalized.title
  normalized.metrics.forEach((metric, index) => {
    block.elements[4 + index].content.text = metric.value
    block.elements[7 + index].content.text = metric.label
  })
  appendBlockSubtitle(block, normalized.subtitle)
  appendBlockCallout(block, normalized.callout)
  return block
}

function buildTimelineBlock(normalized) {
  const block = cloneBuiltInBlock(CONTENT_LAYOUT_BLOCKS.timeline)
  if (!block) return null
  block.elements[0].content.text = normalized.title
  normalized.timeline.forEach((item, index) => {
    block.elements[6 + index].content = {
      ...block.elements[6 + index].content,
      text: `${item.title}\n${item.detail}`,
      fontSize: 16,
      lineHeight: 1.35,
    }
  })
  appendBlockSubtitle(block, normalized.subtitle)
  appendBlockCallout(block, normalized.callout)
  return block
}

function buildFaqBlock(normalized) {
  const block = cloneBuiltInBlock(CONTENT_LAYOUT_BLOCKS.faq)
  if (!block) return null
  block.elements[0].content.text = normalized.title
  normalized.faqs.forEach((item, index) => {
    block.elements[4 + index].content = {
      ...block.elements[4 + index].content,
      text: `${item.question}\n${item.answer}`,
      fontSize: 16,
      lineHeight: 1.35,
    }
    block.elements[4 + index].height = 44
  })
  appendBlockSubtitle(block, normalized.subtitle)
  appendBlockCallout(block, normalized.callout)
  return block
}

function buildProcessBlock(normalized) {
  const block = cloneBuiltInBlock(CONTENT_LAYOUT_BLOCKS.process)
  if (!block) return null
  block.elements[0].content.text = normalized.title
  normalized.process.forEach((item, index) => {
    block.elements[8 + index].content.text = item.title
    block.elements[11 + index].content.text = item.detail
  })
  appendBlockSubtitle(block, normalized.subtitle)
  appendBlockCallout(block, normalized.callout)
  return block
}

function buildLayoutBlock(normalized) {
  switch (normalized.layout) {
    case 'cards':
      return buildCardsBlock(normalized)
    case 'comparison':
      return buildComparisonBlock(normalized)
    case 'metrics':
      return buildMetricsBlock(normalized)
    case 'timeline':
      return buildTimelineBlock(normalized)
    case 'faq':
      return buildFaqBlock(normalized)
    case 'process':
      return buildProcessBlock(normalized)
    default:
      return null
  }
}

function applyClassicContentToSlide(projectId, slideId, normalized) {
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

function applyNormalizedContentToSlide(projectId, slideId, normalized, { replaceGenerated = false, origin = null } = {}) {
  if (!projectId || !slideId) return

  if (replaceGenerated) {
    clearGeneratedSlideContent(projectId, slideId)
  }

  const block = buildLayoutBlock(normalized)
  projectStore.updateSlide(projectId, slideId, { title: normalized.title || 'Untitled Slide' })

  if (block) {
    const blockOrigin = origin || resolveGeneratedBlockOrigin(projectId, block)
    projectStore.insertContentBlock(projectId, slideId, block, blockOrigin)
  } else {
    applyClassicContentToSlide(projectId, slideId, normalized)
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
Create exactly 3 distinct creative slide directions for a "${slideType.value}" slide about "${t}" using a ${contentLayoutMode.value} layout.

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

async function transformSelectedTextToLayout() {
  if (!selectedTextSource.value.trim() || !editorStore.projectId || !editorStore.currentSlideId) return

  const transformed = await aiStore.transformSourceTextToSlideContent(selectedTextSource.value, {
    topic: topic.value,
    slideType: slideType.value,
    description: contentDescription.value,
    layoutMode: contentLayoutMode.value,
    customPrompt: contentCustomPrompt.value,
  })

  if (!transformed) return

  const normalized = normalizeSlideContent(transformed)
  const bounds = getElementBounds(selectedTextElements.value)
  const targetOrigin = {
    x: Math.max(24, Math.round(bounds.minX)),
    y: Math.max(24, Math.round(bounds.minY)),
  }

  selectedTextElements.value.forEach((element) => {
    projectStore.deleteElement(editorStore.projectId, editorStore.currentSlideId, element.id)
  })

  result.value = JSON.stringify(normalized, null, 2)
  applyNormalizedContentToSlide(editorStore.projectId, editorStore.currentSlideId, normalized, { origin: targetOrigin })
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

function normalizeImagePromptText(rawPrompt) {
  return String(rawPrompt || '')
    .replace(/```(json)?\n?/gi, ' ')
    .replace(/```/g, ' ')
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 220)
}

function buildAiImageCandidates(promptText, seed) {
  const encoded = encodeURIComponent(promptText)
  const keywords = promptText
    .toLowerCase()
    .replace(/[^a-z0-9\s,]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5)
    .join(',') || 'business,technology'
  const base = `https://pollinations.ai/p/${encoded}`
  return [
    `${base}?width=600&height=400&nologo=true&seed=${seed}`,
    `${base}?width=600&height=400&seed=${seed}`,
    `${base}?seed=${seed}`,
    `https://loremflickr.com/800/600/${keywords}?lock=${seed}`,
  ]
}

function withTimeout(promise, timeoutMs) {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error('Timed out'))
    }, timeoutMs)

    Promise.resolve(promise)
      .then((value) => {
        window.clearTimeout(timeoutId)
        resolve(value)
      })
      .catch((error) => {
        window.clearTimeout(timeoutId)
        reject(error)
      })
  })
}

async function generateAiImage() {
  if (!imageTopic.value.trim()) return
  isImageGenerating.value = true
  result.value = 'Preparing image prompt...'

  try {
    let finalPrompt = imageTopic.value
    try {
      const enhanced = await withTimeout(aiStore.generateImagePrompt(imageTopic.value), 2200)
      if (enhanced) {
        finalPrompt = enhanced.replace(/```(json)?\n?/g, '').trim()
      }
    } catch {
      finalPrompt = imageTopic.value
    }

    finalPrompt = normalizeImagePromptText(finalPrompt) || normalizeImagePromptText(imageTopic.value)

    result.value = 'Generating image and inserting it on the slide...'

    const seed = Math.floor(Math.random() * 1000000)
    const aiGeneratedSrc = await withTimeout(aiStore.generateImageAsset(finalPrompt), 20000).catch(() => null)
    const [providerPrimaryUrl, ...providerFallbackUrls] = buildAiImageCandidates(finalPrompt, seed)
    const primaryUrl = aiGeneratedSrc || providerPrimaryUrl
    const fallbackUrls = providerFallbackUrls
    const imageSourceType = aiGeneratedSrc
      ? 'openai-image'
      : primaryUrl.includes('loremflickr.com')
        ? 'reference-fallback'
        : 'pollinations-fallback'

    projectStore.addElement(editorStore.projectId, editorStore.currentSlideId, 'image', {
      x: 60, y: 150, width: 420, height: 280, // matches 600x400 aspect ratio
      content: {
        src: primaryUrl,
        fallbackSrcs: fallbackUrls,
        alt: imageTopic.value.trim() || 'AI generated image',
        sourceType: imageSourceType,
        objectFit: 'cover',
      }
    })

    if (imageSourceType === 'openai-image') {
      result.value = 'AI image added to slide using OpenAI image generation.'
    } else if (imageSourceType === 'pollinations-fallback') {
      result.value = 'Added an image using the Pollinations fallback provider. Add an OpenAI API key in API settings for direct AI image generation.'
    } else {
      result.value = 'Added a fallback reference image because no AI image provider responded reliably. Add an OpenAI API key in API settings for direct AI image generation.'
    }
  } catch (error) {
    result.value = 'Could not insert the image right now. Try again in a moment.'
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

        <div v-if="contentGenerationMode === 'single'" class="form-group">
          <div class="layout-label-row">
            <label class="form-label">Layout</label>
            <span class="layout-current-hint">{{ selectedContentLayout.hint }}</span>
          </div>
          <div class="layout-preset-grid" role="group" aria-label="AI layout preset">
            <button
              v-for="layout in CONTENT_LAYOUT_OPTIONS"
              :key="layout.id"
              :class="['layout-preset-card', contentLayoutMode === layout.id && 'active']"
              @click="contentLayoutMode = layout.id"
            >
              <span class="layout-preset-title">{{ layout.label }}</span>
              <span class="layout-preset-hint">{{ layout.hint }}</span>
            </button>
          </div>
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

        <div v-if="contentGenerationMode === 'deck'" class="form-group">
          <div class="layout-label-row">
            <label class="form-label">Deck Layouts</label>
            <span class="layout-current-hint">{{ deckLayoutStrategy === 'mixed' ? 'AI can vary layout by slide' : `All slides use ${selectedContentLayout.label}` }}</span>
          </div>
          <div class="output-mode-switch" role="group" aria-label="Deck layout strategy">
            <button
              :class="['output-mode-btn', deckLayoutStrategy === 'mixed' && 'active']"
              @click="deckLayoutStrategy = 'mixed'"
            >Mixed Layouts</button>
            <button
              :class="['output-mode-btn', deckLayoutStrategy === 'single' && 'active']"
              @click="deckLayoutStrategy = 'single'"
            >Consistent Layout</button>
          </div>
        </div>

        <div v-if="contentGenerationMode === 'deck' && deckLayoutStrategy === 'single'" class="form-group">
          <div class="layout-label-row">
            <label class="form-label">Deck Layout</label>
            <span class="layout-current-hint">{{ selectedContentLayout.hint }}</span>
          </div>
          <div class="layout-preset-grid" role="group" aria-label="Deck layout preset">
            <button
              v-for="layout in CONTENT_LAYOUT_OPTIONS"
              :key="`deck-${layout.id}`"
              :class="['layout-preset-card', contentLayoutMode === layout.id && 'active']"
              @click="contentLayoutMode = layout.id"
            >
              <span class="layout-preset-title">{{ layout.label }}</span>
              <span class="layout-preset-hint">{{ layout.hint }}</span>
            </button>
          </div>
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

        <div v-if="contentGenerationMode === 'single' && selectedTextSource" class="selected-source-card">
          <div class="result-header">
            <span class="form-label">Selected Text Source</span>
            <span class="source-count-badge">{{ selectedTextElements.length }} selected</span>
          </div>
          <div class="selected-source-preview">{{ selectedTextSource }}</div>
          <div class="selected-source-actions">
            <button class="btn btn-secondary btn-sm" :disabled="aiStore.isGenerating" @click="transformSelectedTextToLayout">
              Transform Selection to {{ selectedContentLayout.label }}
            </button>
          </div>
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
.selected-source-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: color-mix(in srgb, var(--color-surface-overlay) 72%, #ffffff 28%);
  box-shadow: var(--shadow-sm);
}
.selected-source-preview {
  padding: var(--space-3);
  font-size: 12px;
  line-height: 1.55;
  color: var(--color-text-muted);
  max-height: 140px;
  overflow-y: auto;
  white-space: pre-wrap;
}
.selected-source-actions {
  display: flex;
  justify-content: flex-end;
  padding: var(--space-2) var(--space-3);
  border-top: 1px solid var(--color-border-subtle);
}
.source-count-badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary-light) 60%, transparent);
  color: var(--color-primary);
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
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

.layout-label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.layout-current-hint {
  font-size: 11px;
  color: var(--color-text-dim);
}

.layout-preset-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
}

.layout-preset-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--color-surface-overlay) 82%, #ffffff 18%);
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.layout-preset-card:hover {
  border-color: color-mix(in srgb, var(--color-primary) 55%, var(--color-border));
  color: var(--color-text);
}

.layout-preset-card.active {
  border-color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary-light) 18%, #ffffff 82%);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-primary) 28%, transparent);
  color: var(--color-primary);
}

.layout-preset-title {
  font-size: 12px;
  font-weight: 700;
}

.layout-preset-hint {
  font-size: 11px;
  line-height: 1.45;
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

@media (max-width: 560px) {
  .layout-preset-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

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
