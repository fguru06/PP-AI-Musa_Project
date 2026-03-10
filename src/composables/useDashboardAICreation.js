import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAIStore } from '@/stores/aiStore'
import { useAuthStore } from '@/stores/authStore'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'

export function useDashboardAICreation({ onRequireAuth } = {}) {
  const router = useRouter()
  const aiStore = useAIStore()
  const authStore = useAuthStore()
  const editorStore = useEditorStore()
  const projectStore = useProjectStore()

  const showAIModal = ref(false)
  const aiMode = ref('quiz')
  const aiTopic = ref('')
  const aiContext = ref('')
  const aiProjectName = ref('')
  const aiSlideCount = ref(5)
  const aiQuestionCount = ref(5)
  const aiDifficulty = ref('intermediate')
  const aiQuestionType = ref('multiple-choice')
  const aiCreationError = ref('')
  const aiSubmitting = ref(false)

  const aiProjectNamePlaceholder = computed(() => {
    const topic = aiTopic.value.trim()
    if (!topic) {
      return aiMode.value === 'quiz' ? 'AI Quiz Project' : 'AI Slide Deck'
    }
    return aiMode.value === 'quiz' ? `${topic} Quiz` : `${topic} Slide Deck`
  })

  const aiPrimaryActionLabel = computed(() => {
    if (aiSubmitting.value || aiStore.isGenerating) {
      return aiMode.value === 'quiz' ? 'Creating quiz...' : 'Creating slides...'
    }
    return aiMode.value === 'quiz' ? 'Create quiz project' : 'Create slide project'
  })

  function openProject(id) {
    editorStore.setProject(id)
    router.push({ name: 'editor', params: { id } })
  }

  function resetAICreationForm(mode = 'quiz') {
    aiMode.value = mode
    aiTopic.value = ''
    aiContext.value = ''
    aiProjectName.value = ''
    aiSlideCount.value = 5
    aiQuestionCount.value = 5
    aiDifficulty.value = 'intermediate'
    aiQuestionType.value = 'multiple-choice'
    aiCreationError.value = ''
  }

  function clampCount(value, fallback, min = 1, max = 20) {
    const parsed = Number.parseInt(value, 10)
    if (Number.isNaN(parsed)) return fallback
    return Math.max(min, Math.min(max, parsed))
  }

  function applyAIPresets(mode = 'quiz', presets = {}) {
    resetAICreationForm(mode)

    if (typeof presets.topic === 'string') {
      aiTopic.value = presets.topic.trim()
    }

    if (typeof presets.context === 'string') {
      aiContext.value = presets.context.trim()
    }

    if (typeof presets.projectName === 'string') {
      aiProjectName.value = presets.projectName.trim()
    }

    if (mode === 'deck') {
      aiSlideCount.value = clampCount(presets.slideCount, aiSlideCount.value, 1, 10)
      return
    }

    aiQuestionCount.value = clampCount(presets.questionCount, aiQuestionCount.value, 1, 10)

    if (['beginner', 'intermediate', 'advanced'].includes(presets.difficulty)) {
      aiDifficulty.value = presets.difficulty
    }

    if (['multiple-choice', 'true-false', 'mixed'].includes(presets.questionType)) {
      aiQuestionType.value = presets.questionType
    }
  }

  function openAICreationModal(mode = 'quiz', presets = {}) {
    if (!authStore.user) {
      onRequireAuth?.('signin')
      return false
    }

    applyAIPresets(mode, presets)
    showAIModal.value = true
    setTimeout(() => document.getElementById('ai-topic-input')?.focus(), 50)
    return true
  }

  function aiPalette(mode = aiMode.value) {
    if (mode === 'quiz') {
      return {
        primary: '#5b21b6',
        secondary: '#f59e0b',
        surface: '#fffaf0',
        text: '#111827',
        muted: '#475569',
        gradient: 'linear-gradient(135deg, #faf5ff 0%, #fff7ed 100%)',
        panel: '#ffffff',
        accentSoft: '#f3e8ff',
      }
    }

    return {
      primary: '#2563eb',
      secondary: '#14b8a6',
      surface: '#f8fbff',
      text: '#0f172a',
      muted: '#475569',
      gradient: 'linear-gradient(135deg, #eff6ff 0%, #f0fdfa 100%)',
      panel: '#ffffff',
      accentSoft: '#dbeafe',
    }
  }

  function normalizeAIGeneratedSlide(content) {
    const parsed = content && typeof content === 'object' ? content : {}
    const rawBullets = Array.isArray(parsed.bullets)
      ? parsed.bullets
      : typeof parsed.bullets === 'string'
        ? parsed.bullets.split('\n')
        : []

    return {
      title: String(parsed.title || aiTopic.value || 'Untitled Slide').trim(),
      subtitle: String(parsed.subtitle || '').trim(),
      bullets: rawBullets
        .map(item => String(item || '').replace(/^\s*[-•]\s*/, '').trim())
        .filter(Boolean),
      callout: String(parsed.callout || '').trim(),
      slideType: String(parsed.slideType || 'general').trim(),
    }
  }

  function buildSlideFromGeneratedContent(projectId, slideId, content, index = 0) {
    const normalized = normalizeAIGeneratedSlide(content)
    const palette = aiPalette('deck')
    const isIntro = index === 0 || normalized.slideType === 'intro'
    const isSummary = normalized.slideType === 'summary'
    const tagLabel = isIntro
      ? 'AI lesson opener'
      : isSummary
        ? 'AI summary slide'
        : 'AI learning slide'
    const bulletTop = normalized.subtitle ? 228 : 196
    const cardHeight = Math.min(190 + (normalized.bullets.length * 14), 238)
    const calloutTop = isIntro ? 174 : 190
    const backgroundGradient = isIntro
      ? 'linear-gradient(135deg, #eff6ff 0%, #e0f2fe 48%, #ecfeff 100%)'
      : isSummary
        ? 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)'
        : palette.gradient

    projectStore.updateSlide(projectId, slideId, {
      title: normalized.title,
      notes: normalized.callout || '',
      order: index,
      backgroundType: 'gradient',
      backgroundGradient,
      background: palette.surface,
    })

    projectStore.addElement(projectId, slideId, 'shape', {
      x: 720,
      y: 28,
      width: 180,
      height: 180,
      content: {
        shapeType: 'circle',
        fillColor: palette.accentSoft,
        borderColor: 'transparent',
        borderWidth: 0,
        opacity: 0.9,
      },
    })

    projectStore.addElement(projectId, slideId, 'shape', {
      x: 760,
      y: 74,
      width: 94,
      height: 94,
      content: {
        shapeType: 'circle',
        fillColor: '#ffffff',
        borderColor: 'transparent',
        borderWidth: 0,
        opacity: 0.82,
      },
    })

    projectStore.addElement(projectId, slideId, 'shape', {
      x: 68,
      y: 40,
      width: 148,
      height: 30,
      content: {
        shapeType: 'rectangle',
        fillColor: '#ffffff',
        borderColor: palette.accentSoft,
        borderWidth: 1,
        borderRadius: 999,
      },
    })

    projectStore.addElement(projectId, slideId, 'text', {
      x: 92,
      y: 47,
      width: 112,
      height: 16,
      content: {
        text: tagLabel,
        fontSize: 12,
        fontWeight: 600,
        textAlign: 'left',
        color: palette.primary,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.2,
        letterSpacing: 0.4,
        textTransform: 'uppercase',
      },
    })

    projectStore.addElement(projectId, slideId, 'heading', {
      x: 68,
      y: 86,
      width: 610,
      height: 88,
      content: {
        text: normalized.title,
        fontSize: isIntro ? 38 : 34,
        fontWeight: 'bold',
        textAlign: 'left',
        color: palette.text,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.2,
      },
    })

    if (normalized.subtitle) {
      projectStore.addElement(projectId, slideId, 'text', {
        x: 68,
        y: 172,
        width: 590,
        height: 46,
        content: {
          text: normalized.subtitle,
          fontSize: 19,
          textAlign: 'left',
          color: palette.muted,
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.45,
        },
      })
    }

    projectStore.addElement(projectId, slideId, 'shape', {
      x: 68,
      y: bulletTop - 26,
      width: 574,
      height: cardHeight,
      content: {
        shapeType: 'rectangle',
        fillColor: palette.panel,
        borderColor: '#dbeafe',
        borderWidth: 1,
        borderRadius: 22,
      },
    })

    if (normalized.bullets.length) {
      projectStore.addElement(projectId, slideId, 'text', {
        x: 96,
        y: bulletTop,
        width: 520,
        height: Math.max(cardHeight - 40, 120),
        content: {
          text: normalized.bullets.map(item => `• ${item}`).join('\n'),
          fontSize: 18,
          textAlign: 'left',
          color: '#1e293b',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1.8,
        },
      })
    }

    projectStore.addElement(projectId, slideId, 'shape', {
      x: 676,
      y: calloutTop,
      width: 216,
      height: isIntro ? 240 : 222,
      content: {
        shapeType: 'rectangle',
        fillColor: '#ffffff',
        borderColor: palette.accentSoft,
        borderWidth: 1,
        borderRadius: 26,
      },
    })

    projectStore.addElement(projectId, slideId, 'text', {
      x: 704,
      y: calloutTop + 26,
      width: 160,
      height: 20,
      content: {
        text: isSummary ? 'Wrap-up' : 'Key takeaway',
        fontSize: 12,
        fontWeight: 700,
        textAlign: 'left',
        color: palette.primary,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.2,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
      },
    })

    projectStore.addElement(projectId, slideId, 'text', {
      x: 704,
      y: calloutTop + 62,
      width: 162,
      height: 120,
      content: {
        text: normalized.callout || `Use this slide to anchor discussion around ${aiTopic.value || 'the topic'}.`,
        fontSize: 18,
        fontWeight: 600,
        textAlign: 'left',
        color: palette.text,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.55,
      },
    })

    projectStore.addElement(projectId, slideId, 'shape', {
      x: 704,
      y: calloutTop + 176,
      width: 110,
      height: 2,
      content: {
        shapeType: 'rectangle',
        fillColor: palette.primary,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 8,
      },
    })

    projectStore.addElement(projectId, slideId, 'text', {
      x: 68,
      y: 488,
      width: 280,
      height: 20,
      content: {
        text: `Generated from: ${aiTopic.value}`,
        fontSize: 12,
        textAlign: 'left',
        color: '#64748b',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.3,
      },
    })
  }

  function buildQuizSlide(projectId, slideId, question, index = 0, total = 1) {
    const palette = aiPalette('quiz')
    const title = String(question?.question || `Question ${index + 1}`).trim()
    const explanation = String(question?.explanation || '').trim()
    const questionType = question?.type === 'true-false' ? 'True / False' : 'Multiple choice'

    projectStore.updateSlide(projectId, slideId, {
      title: `Question ${index + 1}`,
      notes: explanation,
      order: index,
      backgroundType: 'gradient',
      backgroundGradient: palette.gradient,
      background: palette.surface,
    })

    projectStore.addElement(projectId, slideId, 'shape', {
      x: 70,
      y: 34,
      width: 820,
      height: 472,
      content: {
        shapeType: 'rectangle',
        fillColor: '#ffffff',
        borderColor: '#f3e8ff',
        borderWidth: 1,
        borderRadius: 28,
      },
    })

    projectStore.addElement(projectId, slideId, 'shape', {
      x: 70,
      y: 34,
      width: 820,
      height: 76,
      content: {
        shapeType: 'rectangle',
        fillColor: '#faf5ff',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 28,
      },
    })

    projectStore.addElement(projectId, slideId, 'shape', {
      x: 92,
      y: 56,
      width: 118,
      height: 26,
      content: {
        shapeType: 'rectangle',
        fillColor: '#ffffff',
        borderColor: '#ddd6fe',
        borderWidth: 1,
        borderRadius: 999,
      },
    })

    projectStore.addElement(projectId, slideId, 'text', {
      x: 114,
      y: 62,
      width: 90,
      height: 14,
      content: {
        text: `${questionType}`,
        fontSize: 11,
        fontWeight: 700,
        textAlign: 'left',
        color: palette.primary,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.2,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      },
    })

    projectStore.addElement(projectId, slideId, 'text', {
      x: 736,
      y: 60,
      width: 116,
      height: 18,
      content: {
        text: `${index + 1} / ${total}`,
        fontSize: 16,
        fontWeight: 700,
        textAlign: 'right',
        color: palette.primary,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.2,
      },
    })

    projectStore.addElement(projectId, slideId, 'heading', {
      x: 92,
      y: 124,
      width: 708,
      height: 56,
      content: {
        text: title,
        fontSize: 29,
        fontWeight: 'bold',
        textAlign: 'left',
        color: palette.text,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.2,
      },
    })

    projectStore.addElement(projectId, slideId, 'text', {
      x: 92,
      y: 198,
      width: 360,
      height: 20,
      content: {
        text: `Choose the best answer for ${aiTopic.value}.`,
        fontSize: 14,
        fontWeight: 500,
        textAlign: 'left',
        color: palette.muted,
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.35,
      },
    })

    projectStore.addElement(projectId, slideId, 'quiz', {
      x: 92,
      y: 238,
      width: 776,
      height: 188,
      content: {
        question: title,
        options: Array.isArray(question?.options) ? question.options : [],
        correctIndex: typeof question?.correctIndex === 'number' ? question.correctIndex : 0,
        explanation,
        cardBgColor: '#ffffff',
        questionColor: palette.text,
        accentColor: palette.primary,
      },
    })

    projectStore.addElement(projectId, slideId, 'shape', {
      x: 92,
      y: 444,
      width: 776,
      height: 42,
      content: {
        shapeType: 'rectangle',
        fillColor: '#fff7ed',
        borderColor: '#fde68a',
        borderWidth: 1,
        borderRadius: 14,
      },
    })

    projectStore.addElement(projectId, slideId, 'text', {
      x: 112,
      y: 456,
      width: 736,
      height: 18,
      content: {
        text: explanation || 'Add your facilitator explanation here after reviewing the AI-generated answer choices.',
        fontSize: 14,
        textAlign: 'left',
        color: '#92400e',
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.4,
      },
    })
  }

  async function createAIProject(options = {}) {
    if (!aiTopic.value.trim()) {
      aiCreationError.value = 'Add a topic so the AI has something concrete to generate.'
      return
    }

    aiSubmitting.value = true
    aiCreationError.value = ''

    try {
      const projectName = aiProjectName.value.trim() || aiProjectNamePlaceholder.value

      if (aiMode.value === 'quiz') {
        const questions = await aiStore.generateQuiz(aiTopic.value, aiQuestionCount.value, {
          difficulty: aiDifficulty.value,
          questionType: aiQuestionType.value,
          objective: aiContext.value,
        })

        if (!Array.isArray(questions) || !questions.length) {
          throw new Error(aiStore.lastError || 'No quiz content was generated.')
        }

        const project = projectStore.createProject(projectName)
        projectStore.updateProject(project.id, {
          description: aiContext.value || `AI-generated quiz about ${aiTopic.value}`,
          tags: ['ai', 'quiz'],
          theme: {
            ...project.theme,
            primaryColor: '#5b21b6',
            secondaryColor: '#f59e0b',
            bgColor: '#fffaf0',
            textColor: '#111827',
          },
        })

        questions.forEach((question, index) => {
          const targetSlide = index === 0 ? project.slides[0] : projectStore.addSlide(project.id)
          if (!targetSlide) return
          buildQuizSlide(project.id, targetSlide.id, question, index, questions.length)
        })

        await options.onSuccess?.(project)
        showAIModal.value = false
        openProject(project.id)
        return
      }

      const deck = await aiStore.generateSlideDeck(aiTopic.value, aiSlideCount.value, {
        objective: aiContext.value,
      })

      if (!Array.isArray(deck) || !deck.length) {
        throw new Error(aiStore.lastError || 'No slide content was generated.')
      }

      const project = projectStore.createProject(projectName)
      projectStore.updateProject(project.id, {
        description: aiContext.value || `AI-generated slide deck about ${aiTopic.value}`,
        tags: ['ai', 'slides'],
        theme: {
          ...project.theme,
          primaryColor: '#2563eb',
          secondaryColor: '#14b8a6',
          bgColor: '#f8fbff',
          textColor: '#0f172a',
        },
      })

      deck.forEach((slideContent, index) => {
        const targetSlide = index === 0 ? project.slides[0] : projectStore.addSlide(project.id)
        if (!targetSlide) return
        buildSlideFromGeneratedContent(project.id, targetSlide.id, slideContent, index)
      })

      await options.onSuccess?.(project)
      showAIModal.value = false
      openProject(project.id)
    } catch (error) {
      console.error('AI project creation failed', error)
      aiCreationError.value = error?.message || 'The AI flow failed. Please try again.'
    } finally {
      aiSubmitting.value = false
    }
  }

  return {
    aiStore,
    showAIModal,
    aiMode,
    aiTopic,
    aiContext,
    aiProjectName,
    aiSlideCount,
    aiQuestionCount,
    aiDifficulty,
    aiQuestionType,
    aiCreationError,
    aiSubmitting,
    aiProjectNamePlaceholder,
    aiPrimaryActionLabel,
    openAICreationModal,
    createAIProject,
  }
}