import { defineStore } from 'pinia'
import { ref } from 'vue'

const SUPPORTED_LAYOUT_MODES = new Set(['classic', 'cards', 'comparison', 'metrics', 'timeline', 'faq', 'process'])
const SUPPORTED_AI_PROVIDERS = new Set(['openai', 'gemini'])
const PROVIDER_MODELS = {
  openai: 'gpt-4o-mini',
  gemini: 'gemini-2.5-flash',
  geminiImage: 'gemini-2.5-flash-image',
}

function normalizeProvider(provider) {
  const normalized = String(provider || 'openai').trim().toLowerCase()
  if (normalized === 'anthropic' || normalized === 'claude') return 'gemini'
  return SUPPORTED_AI_PROVIDERS.has(normalized) ? normalized : 'openai'
}

function buildSystemInstruction(context) {
  return `You are an expert eLearning content creator. Generate clear, engaging, and educational content. Format output as clean text unless asked for JSON. Context: ${JSON.stringify(context)}`
}

function extractErrorMessage(payload, fallbackStatus) {
  return payload?.error?.message || payload?.message || payload?.promptFeedback?.blockReason || fallbackStatus
}

function extractOpenAIText(data) {
  return data?.choices?.[0]?.message?.content || ''
}

function extractGeminiText(data) {
  const parts = Array.isArray(data?.candidates)
    ? data.candidates.flatMap((candidate) => candidate?.content?.parts || [])
    : []

  const text = parts
    .map((part) => part?.text || '')
    .join('')
    .trim()

  return text || ''
}


async function requestOpenAI(apiKey, prompt, context) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: PROVIDER_MODELS.openai,
      messages: [
        {
          role: 'system',
          content: buildSystemInstruction(context),
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(extractErrorMessage(err, `HTTP ${response.status}`))
  }

  const data = await response.json()
  return {
    text: extractOpenAIText(data),
    model: PROVIDER_MODELS.openai,
  }
}

async function requestGemini(apiKey, prompt, context) {
  const model = PROVIDER_MODELS.gemini
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: buildSystemInstruction(context) }],
      },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(extractErrorMessage(err, `HTTP ${response.status}`))
  }

  const data = await response.json()
  const text = extractGeminiText(data)
  if (!text) {
    throw new Error(extractErrorMessage(data, 'Gemini did not return text content.'))
  }

  return { text, model }
}

async function requestGeminiImage(apiKey, prompt) {
  // Gemini's free tier does not support image generation via the Developer API.
  // We use Pollinations.ai as a free, high-quality fallback for image generation.
  // It returns the image directly as a URL.
  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=683&nologo=true`
  
  // To ensure the image is loaded, we can just return the URL directly, 
  // or fetch it to convert to base64 if needed. Returning the URL is usually fine 
  // for the canvas/image element in this tool.
  return imageUrl
}

function normalizeLayoutMode(layoutMode) {
  const normalized = String(layoutMode || 'classic').trim().toLowerCase()
  return SUPPORTED_LAYOUT_MODES.has(normalized) ? normalized : 'classic'
}

function buildLayoutSchema(topic, layoutMode) {
  const layout = normalizeLayoutMode(layoutMode)
  const sharedFields = `{
  "layout": "${layout}",
  "title": "Concise, engaging slide title",
  "subtitle": "One-line supporting statement (optional)",
  "callout": "Single most important takeaway"
}`

  const schemaMap = {
    classic: `${sharedFields.replace('\n}', ',\n  "bullets": ["Specific point 1 about ' + topic + '", "Specific point 2", "Specific point 3"]\n}')}`,
    cards: `${sharedFields.replace('\n}', ',\n  "cards": [{ "title": "Card title", "body": "Short supporting copy" }, { "title": "Card title", "body": "Short supporting copy" }, { "title": "Card title", "body": "Short supporting copy" }]\n}')}`,
    comparison: `${sharedFields.replace('\n}', ',\n  "comparison": {\n    "leftTitle": "Option A",\n    "leftPoints": ["Point 1", "Point 2", "Point 3"],\n    "rightTitle": "Option B",\n    "rightPoints": ["Point 1", "Point 2", "Point 3"]\n  }\n}')}`,
    metrics: `${sharedFields.replace('\n}', ',\n  "metrics": [{ "value": "92%", "label": "KPI label" }, { "value": "3.4x", "label": "KPI label" }, { "value": "14d", "label": "KPI label" }]\n}')}`,
    timeline: `${sharedFields.replace('\n}', ',\n  "timeline": [{ "title": "Phase title", "detail": "Short explanation" }, { "title": "Phase title", "detail": "Short explanation" }, { "title": "Phase title", "detail": "Short explanation" }, { "title": "Phase title", "detail": "Short explanation" }]\n}')}`,
    faq: `${sharedFields.replace('\n}', ',\n  "faqs": [{ "question": "Question?", "answer": "Short answer" }, { "question": "Question?", "answer": "Short answer" }, { "question": "Question?", "answer": "Short answer" }]\n}')}`,
    process: `${sharedFields.replace('\n}', ',\n  "process": [{ "title": "Step title", "detail": "What happens here" }, { "title": "Step title", "detail": "What happens here" }, { "title": "Step title", "detail": "What happens here" }]\n}')}`,
  }

  return schemaMap[layout] || schemaMap.classic
}

function buildLayoutInstruction(layoutMode) {
  const layout = normalizeLayoutMode(layoutMode)
  const instructionMap = {
    classic: 'Use a standard title, subtitle, and bullet structure for explanatory content.',
    cards: 'Structure the slide as three distinct cards covering separate concepts, benefits, or pillars.',
    comparison: 'Create a balanced side-by-side comparison with clear labels and meaningful contrasting points.',
    metrics: 'Return three concrete, presentation-ready metrics with short labels and realistic values.',
    timeline: 'Sequence the story into four milestones that progress logically from start to finish.',
    faq: 'Return three strong audience questions with concise, useful answers.',
    process: 'Break the topic into three clear steps with practical descriptions.',
  }

  return instructionMap[layout] || instructionMap.classic
}

function buildDeckLayoutInstruction(layoutStrategy, layoutMode) {
  if (layoutStrategy === 'single') {
    const layout = normalizeLayoutMode(layoutMode)
    return `Use the ${layout} layout for every slide in the deck.`
  }

  return 'Vary layouts across the deck when appropriate. Use a balanced mix of classic, cards, comparison, metrics, timeline, FAQ, and process layouts based on each slide purpose.'
}

function buildDeckSchema() {
  return `{
  "slides": [
    {
      "title": "Concise slide title",
      "subtitle": "Optional one-line subtitle",
      "callout": "Key takeaway",
      "slideType": "intro|overview|concept|example|summary|callout|general",
      "layout": "classic|cards|comparison|metrics|timeline|faq|process",
      "bullets": ["Point 1", "Point 2", "Point 3"],
      "cards": [{ "title": "Card title", "body": "Short supporting copy" }],
      "comparison": { "leftTitle": "Option A", "leftPoints": ["Point 1"], "rightTitle": "Option B", "rightPoints": ["Point 1"] },
      "metrics": [{ "value": "92%", "label": "KPI label" }],
      "timeline": [{ "title": "Phase title", "detail": "Short explanation" }],
      "faqs": [{ "question": "Question?", "answer": "Short answer" }],
      "process": [{ "title": "Step title", "detail": "What happens here" }]
    }
  ]
}`
}

function buildTextTransformSchema(layoutMode) {
  return buildLayoutSchema('the source material', layoutMode)
}

function mapDeckSlideMock(topic, index, count, layoutStrategy, layoutMode) {
  const layouts = ['classic', 'cards', 'comparison', 'metrics', 'timeline', 'faq', 'process']
  const chosenLayout = layoutStrategy === 'single'
    ? normalizeLayoutMode(layoutMode)
    : layouts[index % layouts.length]
  const isFirst = index === 0
  const isLast = index === count - 1
  const slideType = isFirst ? 'intro' : isLast ? 'summary' : 'concept'

  const common = {
    title: isFirst
      ? `${topic}: Introduction`
      : isLast
        ? `${topic}: Key Takeaways`
        : `${topic}: Core Idea ${index}`,
    subtitle: isFirst
      ? `Why ${topic} matters`
      : isLast
        ? 'Summary and next steps'
        : 'Building practical understanding',
    callout: isLast
      ? `Use these principles of ${topic} to guide decisions and actions.`
      : 'Focus on clarity and practical application.',
    slideType,
    layout: chosenLayout,
  }

  const byLayout = {
    classic: {
      ...common,
      bullets: [
        `Understand a concrete aspect of ${topic}`,
        'Apply this concept in a practical context',
        'Connect this idea to real-world outcomes',
      ],
    },
    cards: {
      ...common,
      cards: [
        { title: 'Core concept', body: `Define an essential idea about ${topic}.` },
        { title: 'Business impact', body: 'Explain why it matters in practice.' },
        { title: 'Action', body: 'Give the audience one concrete next step.' },
      ],
    },
    comparison: {
      ...common,
      comparison: {
        leftTitle: 'Current state',
        leftPoints: ['Manual steps', 'Inconsistent results', 'Limited visibility'],
        rightTitle: 'Improved state',
        rightPoints: ['Faster execution', 'Clear standards', 'Better outcomes'],
      },
    },
    metrics: {
      ...common,
      metrics: [
        { value: '92%', label: 'Completion rate' },
        { value: '3.4x', label: 'Engagement lift' },
        { value: '14d', label: 'Ramp time' },
      ],
    },
    timeline: {
      ...common,
      timeline: [
        { title: 'Discover', detail: 'Define the opportunity.' },
        { title: 'Design', detail: 'Build the approach.' },
        { title: 'Pilot', detail: 'Test with a small audience.' },
        { title: 'Scale', detail: 'Roll out and optimize.' },
      ],
    },
    faq: {
      ...common,
      faqs: [
        { question: 'What is it?', answer: `A practical view of ${topic}.` },
        { question: 'Why does it matter?', answer: 'It improves decision quality and speed.' },
        { question: 'What should happen next?', answer: 'Pilot the approach and measure the result.' },
      ],
    },
    process: {
      ...common,
      process: [
        { title: 'Assess', detail: 'Review current performance.' },
        { title: 'Build', detail: 'Create the new workflow.' },
        { title: 'Refine', detail: 'Measure and improve continuously.' },
      ],
    },
  }

  return byLayout[chosenLayout] || byLayout.classic
}

function buildMockSlideContent(topic, layoutMode) {
  const layout = normalizeLayoutMode(layoutMode)
  const common = {
    layout,
    title: topic || 'Sample Slide',
    subtitle: `A practical view of ${topic || 'this topic'}`,
    callout: `Focus on the clearest action your audience should take about ${topic || 'this topic'}.`,
  }

  const samples = {
    classic: {
      ...common,
      bullets: [
        `Explain the foundations of ${topic || 'the topic'} in concrete language`,
        'Show the most important implications for learners or stakeholders',
        'Close with a practical takeaway that can be applied immediately',
      ],
    },
    cards: {
      ...common,
      cards: [
        { title: 'Core concept', body: `Define the most important idea behind ${topic || 'the topic'}.` },
        { title: 'Why it matters', body: 'Show the benefit, risk, or outcome that makes this worth attention.' },
        { title: 'How to use it', body: 'End with an action, decision, or next step the audience can take.' },
      ],
    },
    comparison: {
      ...common,
      comparison: {
        leftTitle: 'Traditional approach',
        leftPoints: ['Manual and slower', 'Less consistent output', 'Harder to scale'],
        rightTitle: 'Improved approach',
        rightPoints: ['Faster delivery', 'Clearer standards', 'Easier to repeat at scale'],
      },
    },
    metrics: {
      ...common,
      metrics: [
        { value: '92%', label: 'Completion rate' },
        { value: '3.4x', label: 'Engagement lift' },
        { value: '14d', label: 'Average ramp time' },
      ],
    },
    timeline: {
      ...common,
      timeline: [
        { title: 'Discover', detail: 'Identify the real need and constraints.' },
        { title: 'Design', detail: 'Shape the experience and structure.' },
        { title: 'Pilot', detail: 'Test the approach with a small audience.' },
        { title: 'Launch', detail: 'Roll out and measure the outcome.' },
      ],
    },
    faq: {
      ...common,
      faqs: [
        { question: 'What problem does this solve?', answer: 'It removes confusion and speeds up execution.' },
        { question: 'Who should care most?', answer: 'Teams responsible for quality, speed, or consistency.' },
        { question: 'What should happen next?', answer: 'Start with a small pilot and measure the result.' },
      ],
    },
    process: {
      ...common,
      process: [
        { title: 'Assess', detail: 'Review the current state and define success.' },
        { title: 'Build', detail: 'Create the workflow, content, or system needed.' },
        { title: 'Refine', detail: 'Measure results and improve the weak points.' },
      ],
    },
  }

  return JSON.stringify(samples[layout] || samples.classic)
}

export const useAIStore = defineStore('ai', () => {
  const apiKey = ref(localStorage.getItem('ai_api_key') || '')
  const apiProvider = ref(normalizeProvider(localStorage.getItem('ai_provider') || 'openai'))
  const isGenerating = ref(false)
  const lastError = ref('')
  const generationHistory = ref([])

  function setApiKey(key) {
    apiKey.value = key
    localStorage.setItem('ai_api_key', key)
  }

  function setProvider(provider) {
    const normalizedProvider = normalizeProvider(provider)
    apiProvider.value = normalizedProvider
    localStorage.setItem('ai_provider', normalizedProvider)
  }

  async function generate(prompt, context = {}) {
    if (!apiKey.value) {
      return mockGenerate(prompt, context)
    }
    isGenerating.value = true
    lastError.value = ''
    try {
      const provider = normalizeProvider(apiProvider.value)
      const { text, model } = provider === 'gemini'
        ? await requestGemini(apiKey.value, prompt, context)
        : await requestOpenAI(apiKey.value, prompt, context)

      generationHistory.value.push({ prompt, result: text, provider, model, timestamp: Date.now() })
      return text
    } catch (e) {
      lastError.value = e.message
      return null
    } finally {
      isGenerating.value = false
    }
  }

  async function generateSlideContent(topic, slideType = 'general', description = '', customPrompt = '', options = {}) {
    const layoutMode = normalizeLayoutMode(options?.layoutMode)
    let prompt
    if (customPrompt.trim()) {
      prompt = customPrompt.trim()
    } else {
      const descNote = description.trim() ? `\nAdditional context: ${description.trim()}` : ''
      const slideTypeGuide = {
        intro: 'Focus on welcoming learners, stating the purpose, and building motivation.',
        overview: 'Provide a high-level map of all topics to be covered.',
        concept: 'Explain the concept clearly with a definition, how it works, and why it matters.',
        example: 'Present a real-world case study or worked example with outcome.',
        summary: 'Recap the key points covered and reinforce the main message.',
        callout: 'Highlight a single critical insight or action item.',
        general: 'Create a well-structured educational slide with title, key points, and a takeaway.',
      }[slideType] || ''
      prompt = `You are an expert eLearning content creator and visual slide designer.
Create content for a "${slideType}" eLearning slide about: "${topic}".${descNote}
Instruction: ${slideTypeGuide}
Layout mode: ${layoutMode}
Layout instruction: ${buildLayoutInstruction(layoutMode)}

Return ONLY a valid JSON object, no markdown:
${buildLayoutSchema(topic, layoutMode)}

Rules:
- Keep tone professional and concise
- Keep subtitle under 18 words
- Ensure all content is specific to "${topic}" — never use generic placeholders
- The JSON must match the requested layout mode and include only concise, presentation-ready copy.`
    }
    const result = await generate(prompt, { type: 'slideContent', slideType, topic, layoutMode })
    if (!result) return null
    try {
      return JSON.parse(result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim())
    } catch { return { title: topic, bullets: [result], layout: layoutMode } }
  }

  async function generateSlideDeck(topic, slideCount = 5, {
    audience = '',
    objective = '',
    tone = 'professional',
    customPrompt = '',
    layoutStrategy = 'mixed',
    layoutMode = 'classic',
  } = {}) {
    const requestedCount = Math.max(1, Math.min(20, Number(slideCount) || 1))
    const normalizedLayoutStrategy = layoutStrategy === 'single' ? 'single' : 'mixed'
    const normalizedLayoutMode = normalizeLayoutMode(layoutMode)
    let prompt

    if (customPrompt.trim()) {
      prompt = customPrompt.trim()
    } else {
      const audienceNote = audience.trim() ? `\nAudience: ${audience.trim()}` : ''
      const objectiveNote = objective.trim() ? `\nLearning objective: ${objective.trim()}` : ''
      prompt = `You are an expert eLearning instructional designer.
Create a complete ${requestedCount}-slide deck about "${topic}" in a ${tone} tone.${audienceNote}${objectiveNote}
Deck layout strategy: ${normalizedLayoutStrategy}
Layout instruction: ${buildDeckLayoutInstruction(normalizedLayoutStrategy, normalizedLayoutMode)}

Return ONLY valid JSON, no markdown, in this shape:
${buildDeckSchema()}

Rules:
- Return exactly ${requestedCount} slides
- Sequence the deck logically: intro → concept build-up → applied example(s) → summary
- Keep each slide distinct and avoid repeated bullet wording
- Every slide must include a valid layout
- Include only the fields needed for each slide's chosen layout and keep content specific to "${topic}"`
    }

    const result = await generate(prompt, {
      type: 'slideDeck',
      topic,
      slideCount: requestedCount,
      tone,
      layoutStrategy: normalizedLayoutStrategy,
      layoutMode: normalizedLayoutMode,
    })
    if (!result) return null

    try {
      const cleaned = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsed = JSON.parse(cleaned)
      const rawSlides = Array.isArray(parsed) ? parsed : parsed?.slides
      if (!Array.isArray(rawSlides)) return null

      return rawSlides
        .slice(0, requestedCount)
        .map((slide, index) => {
          const bullets = Array.isArray(slide?.bullets)
            ? slide.bullets
            : typeof slide?.bullets === 'string'
              ? slide.bullets.split('\n')
              : []

          return {
            title: String(slide?.title || `${topic || 'Slide'} ${index + 1}`).trim(),
            subtitle: String(slide?.subtitle || '').trim(),
            bullets: bullets
              .map(item => String(item || '').replace(/^\s*[-•]\s*/, '').trim())
              .filter(Boolean),
            callout: String(slide?.callout || '').trim(),
            slideType: String(slide?.slideType || 'general').trim(),
            layout: normalizeLayoutMode(slide?.layout || (normalizedLayoutStrategy === 'single' ? normalizedLayoutMode : 'classic')),
            cards: Array.isArray(slide?.cards) ? slide.cards : [],
            comparison: slide?.comparison || null,
            metrics: Array.isArray(slide?.metrics) ? slide.metrics : [],
            timeline: Array.isArray(slide?.timeline) ? slide.timeline : [],
            faqs: Array.isArray(slide?.faqs) ? slide.faqs : [],
            process: Array.isArray(slide?.process) ? slide.process : [],
          }
        })
    } catch {
      return null
    }
  }

  async function transformSourceTextToSlideContent(sourceText, {
    topic = '',
    slideType = 'general',
    description = '',
    layoutMode = 'classic',
    customPrompt = '',
  } = {}) {
    const normalizedLayoutMode = normalizeLayoutMode(layoutMode)
    const trimmedSource = String(sourceText || '').trim()
    if (!trimmedSource) return null

    let prompt
    if (customPrompt.trim()) {
      prompt = customPrompt.trim()
    } else {
      const topicNote = topic.trim() ? `\nTopic hint: ${topic.trim()}` : ''
      const descriptionNote = description.trim() ? `\nAdditional context: ${description.trim()}` : ''
      prompt = `You are an expert eLearning content strategist and visual slide designer.
Transform the following source material into a concise ${slideType} slide.${topicNote}${descriptionNote}
Layout mode: ${normalizedLayoutMode}
Layout instruction: ${buildLayoutInstruction(normalizedLayoutMode)}

Return ONLY a valid JSON object matching this shape:
${buildTextTransformSchema(normalizedLayoutMode)}

Rules:
- Preserve the intent and most important facts from the source material
- Compress and rewrite for slide readability; do not copy long paragraphs verbatim
- Do not invent highly specific facts that are not implied by the source material
- Keep the output concise, presentation-ready, and specific

Source material:
"""
${trimmedSource}
"""`
    }

    const result = await generate(prompt, {
      type: 'slideContent',
      sourceText: trimmedSource,
      topic,
      slideType,
      layoutMode: normalizedLayoutMode,
      mode: 'transform',
    })
    if (!result) return null
    try {
      return JSON.parse(result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim())
    } catch {
      return {
        title: topic || 'Transformed Slide',
        bullets: trimmedSource.split(/\n+/).map((line) => line.trim()).filter(Boolean).slice(0, 4),
        layout: normalizedLayoutMode,
      }
    }
  }

  async function generateQuiz(topic, count = 4, { difficulty = 'intermediate', questionType = 'multiple-choice', objective = '', customPrompt = '' } = {}) {
    if (customPrompt.trim()) {
      const result = await generate(customPrompt.trim(), { type: 'quiz', topic, count, difficulty, questionType })
      if (!result) return null
      try {
        return JSON.parse(result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim())
      } catch { return null }
    }
    const typeInstruction = questionType === 'true-false'
      ? 'Each question must be True/False with exactly 2 options: ["True", "False"]'
      : questionType === 'mixed'
      ? 'Mix multiple-choice (4 options) and True/False (2 options: ["True", "False"]) questions roughly 50/50'
      : 'Each question must be multiple-choice with exactly 4 distinct options'

    const difficultyNote = {
      beginner: 'Use simple vocabulary. Focus on foundational recall and recognition.',
      intermediate: 'Require some understanding and application of concepts.',
      advanced: 'Challenge deeper understanding, analysis, and critical thinking.',
    }[difficulty] || ''

    const objectiveNote = objective ? `\nLearning objective: ${objective}` : ''

    const prompt = `You are an expert eLearning instructional designer.
Create exactly ${count} quiz questions about: "${topic}".${objectiveNote}

Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} — ${difficultyNote}
Question type: ${typeInstruction}

Return ONLY a valid JSON array, no markdown, no extra text:
[
  {
    "question": "Clear, unambiguous question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation of why the answer is correct",
    "difficulty": "${difficulty}",
    "type": "multiple-choice"
  }
]

Ensure:
- All questions are unique and clearly worded
- Wrong options (distractors) are plausible but clearly incorrect
- Explanations are educational and concise
- correctIndex is 0-based index into the options array`

    const result = await generate(prompt, { type: 'quiz', topic, count, difficulty, questionType })
    if (!result) return null
    try {
      return JSON.parse(result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim())
    } catch { return null }
  }

  async function generateVoiceoverScript(slideContent, style = 'professional') {
    const prompt = `Write a ${style} voiceover script for a slide with this content: "${slideContent}".
Keep it concise (30-60 seconds when read aloud). Write naturally as if speaking.`
    return generate(prompt, { type: 'voiceover', style })
  }

  async function generateTranslation(text, targetLanguage) {
    const prompt = `Translate the following eLearning content to ${targetLanguage}. Preserve formatting and educational tone:\n\n${text}`
    return generate(prompt, { type: 'translation', targetLanguage })
  }

  async function improveText(text, instruction = 'Make it clearer and more engaging') {
    const prompt = `${instruction}:\n\n${text}`
    return generate(prompt, { type: 'improve' })
  }

  async function generateImagePrompt(topic) {
    const prompt = `Generate a detailed image prompt for a corporate or educational slide about: "${topic}". 
Make it suitable for AI image generation (like Midjourney or DALL-E). Ensure the prompt specifically asks for a "highly detailed photorealistic image, realistic lighting, photographic style, no text". Be specific about composition and relevance.`
    return generate(prompt, { type: 'imagePrompt', topic })
  }

  async function generateImageAsset(promptText) {
    const prompt = String(promptText || '').trim()
    const provider = normalizeProvider(apiProvider.value)

    if (!prompt) return null
    if (!apiKey.value && provider !== 'gemini') return null

    isGenerating.value = true
    lastError.value = ''

    try {
      if (provider === 'gemini') {
        return await requestGeminiImage(apiKey.value, prompt)
      }

      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.value}`,
        },
        body: JSON.stringify({
          model: 'gpt-image-1',
          prompt,
          size: '1024x1024',
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error?.message || `HTTP ${response.status}`)
      }

      const data = await response.json()
      const firstImage = Array.isArray(data?.data) ? data.data[0] : null
      if (!firstImage) return null

      if (firstImage.b64_json) {
        return `data:image/png;base64,${firstImage.b64_json}`
      }

      if (firstImage.url) {
        return firstImage.url
      }

      return null
    } catch (e) {
      lastError.value = e.message
      return null
    } finally {
      isGenerating.value = false
    }
  }

  // Mock responses when no API key
  function mockGenerate(prompt, context) {
    const topic = context.topic || 'this topic'
    const count = Math.max(1, Math.min(20, Number(context.slideCount) || 5))
    const samples = {
      slideContent: buildMockSlideContent(context.topic, context.layoutMode),
      slideDeck: JSON.stringify({
        slides: Array.from({ length: count }, (_, index) =>
          mapDeckSlideMock(topic, index, count, context.layoutStrategy, context.layoutMode)
        ),
      }),
      quiz: JSON.stringify([
        { question: 'Which of the following best describes the core concept of this topic?', options: ['It focuses on foundational principles', 'It applies advanced methodologies', 'It combines theory with practice', 'It relies solely on memorization'], correctIndex: 2, explanation: 'Combining theory with practice is the most effective approach for deep understanding.', difficulty: 'intermediate', type: 'multiple-choice' },
        { question: 'A learner who understands this topic can apply it to real-world problems.', options: ['True', 'False'], correctIndex: 0, explanation: 'Understanding foundational concepts enables practical application in real-world scenarios.', difficulty: 'intermediate', type: 'true-false' },
        { question: 'What is the first step when approaching this subject?', options: ['Skip to advanced material', 'Define key terminology', 'Practice without understanding', 'Avoid structured learning'], correctIndex: 1, explanation: 'Defining key terminology builds the vocabulary needed for deeper comprehension.', difficulty: 'beginner', type: 'multiple-choice' },
        { question: 'Which strategy leads to the best long-term retention of this material?', options: ['Cramming the night before', 'Spaced repetition and active recall', 'Reading passively multiple times', 'Watching videos only'], correctIndex: 1, explanation: 'Spaced repetition and active recall are scientifically proven to maximize long-term retention.', difficulty: 'intermediate', type: 'multiple-choice' },
      ]),
      voiceover: "Welcome to this lesson. In this section, we'll explore the key concepts that will help you understand the topic better. Pay close attention to the main points as we go through them one by one.",
      translation: `[Translated text for: ${topic}]\n\nLas mejores prÃ¡cticas garantizan la seguridad, la eficiencia y el rendimiento a largo plazo en este dominio.`,
      improve: `Here is a clearer, more engaging version of your text:\n\nUnderstanding the core components helps you diagnose and solve complex problems much more effectively.`,
      imagePrompt: `A high-quality, professional, photorealistic image about: "${topic}". 8k resolution, highly detailed, realistic lighting, photographic style, suitable for a corporate presentation.`,
      default: "This is a sample AI-generated response. Configure your OpenAI API key in the AI settings panel to get real responses.",
    }
    isGenerating.value = true
    return new Promise(resolve => {
      setTimeout(() => {
        isGenerating.value = false
        const key = context.type || 'default'
        resolve(samples[key] || samples.default)
      }, 1500)
    })
  }

  return {
    apiKey, apiProvider, isGenerating, lastError, generationHistory,
    setApiKey, setProvider, generate,
    generateSlideContent, generateSlideDeck, transformSourceTextToSlideContent, generateQuiz, generateVoiceoverScript,
    generateTranslation, improveText, generateImagePrompt, generateImageAsset,
  }
})
