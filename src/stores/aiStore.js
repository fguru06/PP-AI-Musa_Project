import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAIStore = defineStore('ai', () => {
  const apiKey = ref(localStorage.getItem('ai_api_key') || '')
  const apiProvider = ref(localStorage.getItem('ai_provider') || 'openai')
  const isGenerating = ref(false)
  const lastError = ref('')
  const generationHistory = ref([])

  function setApiKey(key) {
    apiKey.value = key
    localStorage.setItem('ai_api_key', key)
  }

  function setProvider(provider) {
    apiProvider.value = provider
    localStorage.setItem('ai_provider', provider)
  }

  async function generate(prompt, context = {}) {
    if (!apiKey.value) {
      return mockGenerate(prompt, context)
    }
    isGenerating.value = true
    lastError.value = ''
    try {
      const messages = [
        {
          role: 'system',
          content: `You are an expert eLearning content creator. Generate clear, engaging, and educational content. Format output as clean text unless asked for JSON. Context: ${JSON.stringify(context)}`,
        },
        { role: 'user', content: prompt },
      ]
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.value}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages,
          temperature: 0.7,
          max_tokens: 1500,
        }),
      })
      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error?.message || `HTTP ${response.status}`)
      }
      const data = await response.json()
      const text = data.choices[0].message.content
      generationHistory.value.push({ prompt, result: text, timestamp: Date.now() })
      return text
    } catch (e) {
      lastError.value = e.message
      return null
    } finally {
      isGenerating.value = false
    }
  }

  async function generateSlideContent(topic, slideType = 'general', description = '', customPrompt = '') {
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

Return ONLY a valid JSON object, no markdown:
{
  "title": "Concise, engaging slide title",
  "subtitle": "One-line supporting statement (optional)",
  "bullets": ["Specific point 1 about ${topic}", "Specific point 2", "Specific point 3"],
  "callout": "Single most important takeaway",
  "design": {
    "layout": "classic | split | focus",
    "titleAlign": "left | center",
    "bulletStyle": "dot | check | number",
    "emphasis": "balanced | callout"
  }
}

Rules:
- Keep tone professional and concise
- Use 3-5 bullets with strong, action-oriented wording
- Keep subtitle under 18 words
- Ensure all content is specific to "${topic}" — never use generic placeholders.`
    }
    const result = await generate(prompt, { type: 'slideContent', slideType, topic })
    if (!result) return null
    try {
      return JSON.parse(result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim())
    } catch { return { title: topic, bullets: [result] } }
  }

  async function generateSlideDeck(topic, slideCount = 5, {
    audience = '',
    objective = '',
    tone = 'professional',
    customPrompt = '',
  } = {}) {
    const requestedCount = Math.max(1, Math.min(20, Number(slideCount) || 1))
    let prompt

    if (customPrompt.trim()) {
      prompt = customPrompt.trim()
    } else {
      const audienceNote = audience.trim() ? `\nAudience: ${audience.trim()}` : ''
      const objectiveNote = objective.trim() ? `\nLearning objective: ${objective.trim()}` : ''
      prompt = `You are an expert eLearning instructional designer.
Create a complete ${requestedCount}-slide deck about "${topic}" in a ${tone} tone.${audienceNote}${objectiveNote}

Return ONLY valid JSON, no markdown, in this shape:
{
  "slides": [
    {
      "title": "Concise slide title",
      "subtitle": "Optional one-line subtitle",
      "bullets": ["Point 1", "Point 2", "Point 3"],
      "callout": "Key takeaway",
      "slideType": "intro|overview|concept|example|summary|callout|general"
    }
  ]
}

Rules:
- Return exactly ${requestedCount} slides
- Sequence the deck logically: intro → concept build-up → applied example(s) → summary
- Keep each slide distinct and avoid repeated bullet wording
- Keep bullets concise (3-5 per slide), action-oriented, and specific to "${topic}"`
    }

    const result = await generate(prompt, { type: 'slideDeck', topic, slideCount: requestedCount, tone })
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
          }
        })
    } catch {
      return null
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
    const prompt = `Generate a detailed image prompt for an eLearning slide about: "${topic}". 
Make it suitable for AI image generation (DALL-E style). Be specific about style, composition, and educational relevance.`
    return generate(prompt, { type: 'imagePrompt', topic })
  }

  // Mock responses when no API key
  function mockGenerate(prompt, context) {
    const topic = context.topic || 'this topic'
    const count = Math.max(1, Math.min(20, Number(context.slideCount) || 5))
    const samples = {
      slideContent: JSON.stringify({
        title: context.topic || 'Sample Slide',
        subtitle: `An introduction to ${topic}`,
        bullets: [
          `${context.topic ? context.topic + ' covers' : 'This topic covers'} foundational principles that drive real-world applications`,
          'Understanding the core components helps in diagnosing and solving complex problems effectively',
          'Best practices ensure safety, efficiency, and long-term performance in this domain',
        ],
        callout: `Master the fundamentals of ${context.topic || 'this subject'} to build a strong professional foundation`,
        design: {
          layout: 'split',
          titleAlign: 'left',
          bulletStyle: 'check',
          emphasis: 'balanced',
        },
      }),
      slideDeck: JSON.stringify({
        slides: Array.from({ length: count }, (_, index) => {
          const isFirst = index === 0
          const isLast = index === count - 1
          return {
            title: isFirst
              ? `${topic}: Introduction`
              : isLast
                ? `${topic}: Key Takeaways`
                : `${topic}: Core Idea ${index}`,
            subtitle: isFirst
              ? `Why ${topic} matters`
              : isLast
                ? `Summary and next steps`
                : `Building practical understanding`,
            bullets: [
              `Understand a concrete aspect of ${topic}`,
              `Apply this concept in a practical context`,
              `Connect this idea to real-world outcomes`,
            ],
            callout: isLast
              ? `Use these principles of ${topic} to guide decisions and actions.`
              : `Focus on clarity and practical application.`,
            slideType: isFirst ? 'intro' : isLast ? 'summary' : 'concept',
          }
        }),
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
      imagePrompt: `A high-quality, professional educational illustration about: "${topic}". Clean modern vector art style, bright colors, visually engaging, masterpiece.`,
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
    generateSlideContent, generateSlideDeck, generateQuiz, generateVoiceoverScript,
    generateTranslation, improveText, generateImagePrompt,
  }
})
