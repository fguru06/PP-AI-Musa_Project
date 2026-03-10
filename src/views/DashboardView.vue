<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projectStore'
import { useEditorStore } from '@/stores/editorStore'
import { useAuthStore } from '@/stores/authStore'
import { useAIStore } from '@/stores/aiStore'
import Modal from '@/components/common/Modal.vue'

const router = useRouter()
const projectStore = useProjectStore()
const editorStore = useEditorStore()
const authStore = useAuthStore()
const aiStore = useAIStore()

const showNewModal = ref(false)
const showImportModal = ref(false)
const showAuthModal = ref(false)
const newProjectName = ref('')
const importJson = ref('')
const importError = ref('')
const searchQuery = ref('')
const activeCategory = ref('all')
const activeRail = ref('home')
const confirmDeleteId = ref(null)
const authMode = ref('signin')
const authEmail = ref('')
const authPassword = ref('')
const authError = ref('')
const authLoading = ref(false)
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

const currentUser = computed(() => {
  if (authStore.user) {
    return {
      authTypeLabel: authStore.user.displayName || authStore.user.email || 'Current User',
      emailVerified: authStore.user.emailVerified,
      email: authStore.user.email,
    }
  }
  return null
})

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

const authProviders = [
  { id: 'google', label: 'Google', description: 'Continue with your Google account' },
  { id: 'microsoft', label: 'Microsoft', description: 'Continue with your Microsoft account' },
]

const authTitle = computed(() => authMode.value === 'signin' ? 'Welcome back' : 'Create your account')
const authMessage = computed(() => authMode.value === 'signin'
  ? 'Existing users can sign in with a standard provider.'
  : 'New users can sign up with a standard provider.')

const categories = [
  { label: 'Games and challenges', value: 'games' },
  { label: 'Quizzes and Surveys', value: 'quizzes' },
  { label: 'Presentations', value: 'presentations' },
  { label: 'More', value: 'more' },
]

const marketplaceCards = [
  { id: 'microcourse', title: 'Microcourse: AI in Education', subtitle: 'Interactive lesson', category: 'presentations', section: 'Teach classes', style: 'bg-a' },
  { id: 'chromatic', title: 'Chromatic', subtitle: 'Presentation', category: 'presentations', section: 'Teach classes', style: 'bg-b' },
  { id: 'branching', title: 'Branching Scenario', subtitle: 'Scenario practice', category: 'games', section: 'Teach classes', style: 'bg-c' },
  { id: 'flipcards', title: 'Flipcards Museum', subtitle: 'Game challenge', category: 'games', section: 'Teach classes', style: 'bg-d' },
  { id: 'higher-ed', title: 'Higher Education', subtitle: 'Presentation', category: 'presentations', section: 'Boost power skills', style: 'bg-e' },
  { id: 'complete', title: 'Complete the sentence', subtitle: 'Quiz', category: 'quizzes', section: 'Boost power skills', style: 'bg-f' },
  { id: 'fill-blanks', title: 'Fill in the blanks', subtitle: 'Quiz assessment', category: 'quizzes', section: 'Boost power skills', style: 'bg-g' },
  { id: 'timeline', title: 'Data Viz Timeline', subtitle: 'Interactive infographic', category: 'more', section: 'Boost power skills', style: 'bg-h' },
]

const filteredMarketplace = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return marketplaceCards.filter(card => {
    const categoryOk = activeCategory.value === 'all' || card.category === activeCategory.value
    const searchOk = !q || card.title.toLowerCase().includes(q) || card.subtitle.toLowerCase().includes(q)
    return categoryOk && searchOk
  })
})

const cardsBySection = computed(() => {
  const grouped = new Map()
  filteredMarketplace.value.forEach(card => {
    if (!grouped.has(card.section)) grouped.set(card.section, [])
    grouped.get(card.section).push(card)
  })
  return Array.from(grouped.entries()).map(([title, cards]) => ({ title, cards }))
})

const visibleProjects = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return projectStore.sortedProjects.filter(p => {
    if (!q) return true
    return p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
  }).slice(0, 8)
})

function openNewModal() {
  if (!currentUser.value) {
    openAuthModal('signin')
    return
  }
  newProjectName.value = 'My New Course'
  showNewModal.value = true
  setTimeout(() => document.getElementById('project-name-input')?.focus(), 50)
}

function openImportModal() {
  if (!currentUser.value) {
    openAuthModal('signin')
    return
  }
  showImportModal.value = true
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

function openAICreationModal(mode = 'quiz') {
  if (!currentUser.value) {
    openAuthModal('signin')
    return
  }
  resetAICreationForm(mode)
  showAIModal.value = true
  setTimeout(() => document.getElementById('ai-topic-input')?.focus(), 50)
}

function createProject() {
  if (!newProjectName.value.trim()) return
  const project = projectStore.createProject(newProjectName.value.trim())
  showNewModal.value = false
  openProject(project.id)
}

function openProject(id) {
  editorStore.setProject(id)
  router.push({ name: 'editor', params: { id } })
}

function createFromTemplate(card) {
  const project = projectStore.createProjectFromTemplate(card.id, card.title, `${card.subtitle} template`)
  openProject(project.id)
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

async function createAIProject() {
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

    showAIModal.value = false
    openProject(project.id)
  } catch (error) {
    console.error('AI project creation failed', error)
    aiCreationError.value = error?.message || 'The AI flow failed. Please try again.'
  } finally {
    aiSubmitting.value = false
  }
}

function deleteProject(id) {
  confirmDeleteId.value = id
}

function confirmDelete() {
  if (!confirmDeleteId.value) return
  projectStore.deleteProject(confirmDeleteId.value)
  confirmDeleteId.value = null
}

function duplicateProject(id) {
  projectStore.duplicateProject(id)
}

function doImport() {
  importError.value = ''
  const imported = projectStore.importProject(importJson.value)
  if (!imported) {
    importError.value = 'Invalid project JSON. Please check and try again.'
    return
  }
  showImportModal.value = false
  importJson.value = ''
  openProject(imported.id)
}

function formatDate(ts) {
  if (!ts) return ''
  return new Date(ts).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function slideCount(project) {
  return project.slides?.length || 0
}

function setAuthMode(mode) {
  authMode.value = mode
  authError.value = ''
  authEmail.value = ''
  authPassword.value = ''
}

async function continueWithEmail() {
  if (!authEmail.value || !authPassword.value) {
    authError.value = 'Please enter both email and password.'
    return
  }
  authLoading.value = true
  authError.value = ''
  try {
    if (authMode.value === 'signin') {
      await authStore.loginWithEmail(authEmail.value, authPassword.value)
    } else {
      await authStore.signUpWithEmail(authEmail.value, authPassword.value)
    }
    showAuthModal.value = false
  } catch (error) {
    console.error('Email Auth Error:', error)
    if (error.code === 'auth/email-already-in-use') {
      authError.value = 'This email is already in use. Try signing in instead.'
    } else if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      authError.value = 'Invalid email or password.'
    } else if (error.code === 'auth/weak-password') {
      authError.value = 'Password should be at least 6 characters.'
    } else {
      authError.value = 'An error occurred. Please try again.'
    }
  } finally {
    authLoading.value = false
  }
}

const isResending = ref(false)
async function handleResendVerification() {
  isResending.value = true
  try {
    await authStore.resendVerification()
    alert('Verification email sent! Please check your inbox.')
  } catch (e) {
    console.error(e)
    alert('Failed to send verification email. Please wait a moment and try again.')
  } finally {
    isResending.value = false
  }
}

async function handleCheckVerification() {
  await authStore.reloadUser()
  if (currentUser.value?.emailVerified) {
    alert('Thank you! Your email has been verified.')
  } else {
    alert('Email not verified yet. Please check your inbox or resend the email.')
  }
}

async function continueWithProvider(provider) {
  try {
    authError.value = ''
    if (provider.id === 'google') {
      await authStore.loginWithGoogle()
    } else if (provider.id === 'microsoft') {
      await authStore.loginWithMicrosoft()
    }
    showAuthModal.value = false
  } catch (error) {
    console.error('Login failed', error)
  }
}

function openAuthModal(mode = 'signin') {
  authMode.value = mode
  showAuthModal.value = true
}

async function signOut() {
  await authStore.logout()
  showAuthModal.value = false
  authMode.value = 'signin'
}

function setRailSection(section) {
  if (section === 'community' || section === 'activity' || section === 'brand') {
    section = 'home'
  }
  activeRail.value = section

  if (section === 'content' && !currentUser.value) {
    openAuthModal('signin')
  }

  if (typeof window === 'undefined') return
  requestAnimationFrame(() => {
    if (section === 'templates') {
      document.getElementById('templates-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    if (section === 'content') {
      document.getElementById('projects-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    document.getElementById('home-anchor')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
</script>

<template>
  <div class="market-shell">
    <aside class="left-rail">
      <div class="rail-logo">MS</div>
      <nav class="rail-nav">
        <button class="rail-item" :class="activeRail === 'home' && 'active'" type="button" @click="setRailSection('home')" data-tooltip="Go to home" data-tooltip-position="right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Home
        </button>
        <button class="rail-item" :class="activeRail === 'content' && 'active'" type="button" @click="setRailSection('content')" data-tooltip="View your content" data-tooltip-position="right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><path d="M7 7h10"></path><path d="M7 12h10"></path><path d="M7 17h10"></path></svg>
          Content
        </button>
        <button class="rail-item" :class="activeRail === 'templates' && 'active'" type="button" @click="setRailSection('templates')" data-tooltip="Browse templates" data-tooltip-position="right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
          Templates
        </button>
        <button class="rail-item" type="button" @click="setRailSection('community')" data-tooltip="Community coming soon" data-tooltip-position="right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          Community
        </button>
        <button class="rail-item" type="button" @click="setRailSection('activity')" data-tooltip="Activity coming soon" data-tooltip-position="right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          Activity
        </button>
        <button class="rail-item" type="button" @click="setRailSection('brand')" data-tooltip="Brand kit coming soon" data-tooltip-position="right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          Brand kit
        </button>
      </nav>
    </aside>

    <main class="market-main">
      <!-- Unverified Email Banner -->
      <div v-if="currentUser && !currentUser.emailVerified" class="verification-banner">
        <span>Please verify your email address (<strong>{{ currentUser.email }}</strong>) to secure your account and unlock all features.</span>
        <div class="verification-actions">
          <button class="btn btn-primary btn-sm" @click="handleCheckVerification">I've verified my email</button>
          <button class="btn btn-secondary btn-sm" @click="handleResendVerification" :disabled="isResending">
            {{ isResending ? 'Sending...' : 'Resend Email' }}
          </button>
        </div>
      </div>

      <!-- 1) Templates View -->
      <template v-if="activeRail === 'templates'">
        <section id="home-anchor" class="hero templates-hero">
          <div class="hero-top">
            <div v-if="currentUser" class="hero-user g-rounded">
              <span class="user-chip-new">{{ currentUser.authTypeLabel }}</span>
              <button class="btn btn-ghost-text" type="button" @click="signOut">Sign out</button>
            </div>
            <div v-else class="hero-user g-rounded">
              <button class="btn btn-ghost-text" type="button" @click="openAuthModal('signin')">Log In</button>
              <button class="btn btn-ghost-text" type="button" @click="openAuthModal('signup')">Sign Up</button>
            </div>
            
            <div class="hero-actions">
              <button class="btn g-premium-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Upgrade to Premium
              </button>
              <button class="btn g-outline-btn" @click="openImportModal" data-tooltip="Import a project">Import</button>
            </div>
          </div>

          <h1 class="hero-title-g">Choose how to create</h1>
          <div class="search-bar-g">
            <input v-model="searchQuery" class="search-input-g" placeholder="Describe what you're looking for" />
            <button class="search-btn-g" type="button" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
        </section>

        <section id="templates-anchor" class="toolbar-row-g">
          <div class="chip-list-g">
            <button class="chip-g" :class="activeCategory === 'all' && 'active'" @click="activeCategory = 'all'" type="button">All</button>
            <button v-for="item in categories" :key="item.value" class="chip-g" :class="activeCategory === item.value && 'active'" @click="activeCategory = item.value" type="button">{{ item.label }}</button>
          </div>
          <button class="btn g-outline-btn ai-btn-g" type="button" @click="openAICreationModal('quiz')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
            Create quiz with AI
          </button>
        </section>

        <section v-for="section in cardsBySection" :key="section.title" class="template-section">
          <h2 class="section-title">{{ section.title }}</h2>
          <div class="cards-row">
            <article v-for="card in section.cards" :key="card.id" class="market-card" :class="card.style" @click="createFromTemplate(card)">
              <div class="hover-overlay"></div>
              <div class="action-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div>
              <span class="card-type">{{ card.subtitle }}</span>
              <h3 class="card-title">{{ card.title }}</h3>
            </article>
          </div>
        </section>
      </template>

      <!-- 2) Home & Content Shared Top Nav -->
      <template v-if="activeRail === 'home' || activeRail === 'content'">
        <header class="app-top-nav">
          <div class="nav-search-bar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input v-model="searchQuery" placeholder="Search templates and creations" />
          </div>
          <div class="nav-actions">
            <button class="btn btn-secondary btn-sm" style="color:#d97706;border-color:rgba(217,119,6,0.3);background:#fffbeb;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> Upgrade to Premium
            </button>
            <div v-if="currentUser" class="user-info-mini">
              <span class="user-chip">{{ currentUser.authTypeLabel }}</span>
              <div class="user-actions-mini">
                <button class="btn btn-secondary btn-sm" type="button" @click="signOut">Log out</button>
                <button class="btn btn-primary btn-sm" @click="openNewModal">Create course</button>
              </div>
            </div>
            <div v-else>
              <button class="btn btn-secondary btn-sm" @click="openAuthModal('signin')">Sign In</button>
            </div>
          </div>
        </header>

        <!-- Home Specific -->
        <template v-if="activeRail === 'home'">
          <div class="home-container">
            <section class="home-hero">
              <div class="home-hero-pattern"></div>
              <div class="home-hero-glow home-hero-glow-left"></div>
              <div class="home-hero-glow home-hero-glow-right"></div>

              <div class="home-hero-copy">
                <span class="home-hero-kicker">Featured challenge</span>
                <h1 class="home-hero-title">Build interactions that feel alive.</h1>
                <p class="home-hero-text">
                  Design drag-and-drop lessons, branching slides, and quick knowledge checks with a workspace that feels built for fast iteration.
                </p>
                <div class="home-hero-actions">
                  <button class="btn btn-primary btn-lg" @click="openNewModal" data-tooltip="Create a new project from scratch">Start a new course</button>
                  <button class="btn home-hero-secondary" @click="setRailSection('templates')" data-tooltip="Open the templates library">Browse templates</button>
                </div>
                <div class="home-hero-metrics">
                  <div class="hero-metric-card">
                    <strong>{{ visibleProjects.length || 0 }}</strong>
                    <span>projects in motion</span>
                  </div>
                  <div class="hero-metric-card">
                    <strong>{{ currentUser ? 'Ready' : 'Guest' }}</strong>
                    <span>{{ currentUser ? 'workspace synced' : 'sign in to sync' }}</span>
                  </div>
                </div>
              </div>

              <div class="home-hero-visual" aria-hidden="true">
                <div class="hero-preview-card hero-preview-main">
                  <span class="preview-badge">Drag and drop</span>
                  <div class="preview-line preview-line-lg"></div>
                  <div class="preview-line preview-line-md"></div>
                  <div class="preview-dropzones">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div class="hero-preview-card hero-preview-floating hero-preview-quiz">
                  <span class="preview-dot"></span>
                  <div class="preview-line preview-line-sm"></div>
                  <div class="preview-pill-row">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div class="hero-preview-card hero-preview-floating hero-preview-media">
                  <div class="preview-media"></div>
                  <div class="preview-line preview-line-sm"></div>
                </div>
              </div>
            </section>
            
            <div class="welcome-section">
              <h2 class="welcome-title">
                Hi, {{ currentUser?.authTypeLabel.split(' ')[0] || 'Creator' }} 👋 What are you going to create today?
              </h2>
              <div class="quick-actions">
                <button class="quick-btn" @click="openNewModal" data-tooltip="Start with a blank project"><span class="q-icon" style="color:var(--color-primary);">+</span> Create scratch project</button>
                <button class="quick-btn quick-btn-ai" @click="openAICreationModal('quiz')" data-tooltip="Generate a project with AI"><span class="q-icon" style="color:#7c3aed;">✦</span> Create with AI</button>
                <button class="quick-btn" @click="setRailSection('templates')" data-tooltip="Use a game template"><span class="q-icon" style="color:var(--color-secondary);">🎮</span> Create a game</button>
                <button class="quick-btn" @click="setRailSection('templates')" data-tooltip="Use a presentation template"><span class="q-icon" style="color:var(--color-success);">📱</span> Create a presentation</button>
              </div>
            </div>

            <section class="projects-section" style="padding-top:0;">
              <div class="projects-head" style="justify-content:space-between;">
                <h2 class="section-title">Pick up where you left off</h2>
                <button class="btn btn-ghost btn-sm" @click="setRailSection('content')">Go to My Content ›</button>
              </div>
              <div class="project-grid" v-if="currentUser && visibleProjects.length">
                <article v-for="project in visibleProjects.slice(0, 4)" :key="project.id" class="project-card" @click="openProject(project.id)" :data-tooltip="`Open ${project.name}`">
                  <div class="project-name">{{ project.name }}</div>
                  <p class="project-meta">{{ slideCount(project) }} slides · {{ formatDate(project.updatedAt) }}</p>
                  <div class="project-actions" @click.stop>
                    <button class="btn btn-ghost btn-sm" @click="duplicateProject(project.id)">Duplicate</button>
                  </div>
                </article>
              </div>
              <div v-else-if="!currentUser" class="projects-lock-card">
                <p>Sign in to see your recent projects.</p>
              </div>
              <div v-else class="projects-lock-card">
                <p>You haven't created any projects yet. Start by creating a project from scratch or a template.</p>
              </div>
            </section>
          </div>
        </template>

        <!-- Content Specific -->
        <template v-if="activeRail === 'content'">
          <div class="content-container">
            <div class="content-header-row">
              <div style="display:flex;align-items:center;gap:12px;">
                <div class="content-icon">💿</div>
                <h1 style="font-size:28px;font-weight:700;">My content</h1>
              </div>
            </div>
            
            <div class="projects-section" style="padding:0;">
              <div class="project-grid" v-if="currentUser">
                <!-- Create New Card inside grid -->
                <article class="project-card create-new-card" @click="openNewModal" data-tooltip="Create a project">
                  <div class="create-circle">+</div>
                  <div class="create-text">Create new project</div>
                </article>

                <article v-for="project in visibleProjects" :key="project.id" class="project-card" @click="openProject(project.id)" :data-tooltip="`Open ${project.name}`">
                  <div class="project-name">{{ project.name }}</div>
                  <p class="project-meta">{{ slideCount(project) }} slides · {{ formatDate(project.updatedAt) }}</p>
                  <div class="project-actions" @click.stop>
                    <button class="btn btn-ghost btn-sm" @click="duplicateProject(project.id)">Duplicate</button>
                    <button class="btn btn-ghost btn-sm" @click="deleteProject(project.id)" style="color:var(--color-danger)">Delete</button>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </template>
      </template>
    </main>

    <Modal v-if="showAuthModal" :title="authMode === 'signin' ? 'Sign In' : 'Sign Up'" size="md" @close="showAuthModal = false">
      <div class="auth-modal-body">
        <p class="auth-eyebrow">Access your workspace</p>
        <h2 class="auth-title">{{ authTitle }}</h2>
        <p class="auth-message">{{ authMessage }}</p>

        <div class="auth-mode-toggle">
          <button
            class="auth-mode-btn"
            :class="authMode === 'signin' && 'active'"
            type="button"
            @click="setAuthMode('signin')"
          >
            Sign In
          </button>
          <button
            class="auth-mode-btn"
            :class="authMode === 'signup' && 'active'"
            type="button"
            @click="setAuthMode('signup')"
          >
            Sign Up
          </button>
        </div>

        <form @submit.prevent="continueWithEmail" class="auth-email-form">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" v-model="authEmail" class="input" placeholder="you@example.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" v-model="authPassword" class="input" placeholder="••••••••" required minlength="6" />
          </div>
          <div v-if="authError" class="auth-error-msg">{{ authError }}</div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; height: 42px;" :disabled="authLoading">
            {{ authLoading ? 'Loading...' : (authMode === 'signin' ? 'Sign In with Email' : 'Sign Up with Email') }}
          </button>
        </form>

        <div class="auth-divider">
          <span>or continue with</span>
        </div>

        <div class="auth-provider-list">
          <button
            v-for="provider in authProviders"
            :key="provider.id"
            class="auth-provider-btn"
            type="button"
            @click="continueWithProvider(provider)"
          >
            <span class="provider-name">{{ provider.label }}</span>
            <span class="provider-description">{{ provider.description }}</span>
          </button>
        </div>
      </div>
    </Modal>

    <Modal v-if="showNewModal" title="New Project" size="sm" @close="showNewModal = false">
      <div class="form-group">
        <label class="form-label">Project Name</label>
        <input
          id="project-name-input"
          v-model="newProjectName"
          class="input"
          placeholder="e.g. Quiz Assessment"
          @keydown.enter="createProject"
        />
      </div>
      <template #footer>
        <button class="btn btn-secondary" @click="showNewModal = false">Cancel</button>
        <button class="btn btn-primary" @click="createProject">Create Project</button>
      </template>
    </Modal>

    <Modal v-if="showImportModal" title="Import Project" size="md" @close="showImportModal = false">
      <div class="form-group">
        <label class="form-label">Paste Project JSON</label>
        <textarea v-model="importJson" class="textarea" style="min-height: 160px" placeholder='{"name":"My Project",...}' />
      </div>
      <p v-if="importError" class="error-msg">{{ importError }}</p>
      <template #footer>
        <button class="btn btn-secondary" @click="showImportModal = false">Cancel</button>
        <button class="btn btn-primary" @click="doImport">Import</button>
      </template>
    </Modal>

    <Modal v-if="showAIModal" title="Create with AI" size="lg" @close="showAIModal = false">
      <div class="ai-create-shell">
        <div class="ai-mode-grid">
          <button class="ai-mode-card" :class="aiMode === 'quiz' && 'active'" type="button" @click="aiMode = 'quiz'">
            <strong>Quiz project</strong>
            <span>Generate question slides learners can answer right away.</span>
          </button>
          <button class="ai-mode-card" :class="aiMode === 'deck' && 'active'" type="button" @click="aiMode = 'deck'">
            <strong>Slide deck</strong>
            <span>Create a structured lesson deck from a topic and learning goal.</span>
          </button>
        </div>

        <div class="form-group">
          <label class="form-label">Topic</label>
          <input
            id="ai-topic-input"
            v-model="aiTopic"
            class="input"
            placeholder="e.g. Cybersecurity basics for new employees"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Project name</label>
          <input
            v-model="aiProjectName"
            class="input"
            :placeholder="aiProjectNamePlaceholder"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Goal or context</label>
          <textarea
            v-model="aiContext"
            class="textarea ai-create-textarea"
            placeholder="Explain the audience, learning objective, tone, or any constraints you want the AI to follow."
          />
        </div>

        <div class="ai-config-grid">
          <div class="form-group" v-if="aiMode === 'deck'">
            <label class="form-label">Slides</label>
            <select v-model="aiSlideCount" class="ai-select">
              <option :value="3">3</option>
              <option :value="5">5</option>
              <option :value="7">7</option>
              <option :value="10">10</option>
            </select>
          </div>

          <template v-else>
            <div class="form-group">
              <label class="form-label">Questions</label>
              <select v-model="aiQuestionCount" class="ai-select">
                <option :value="3">3</option>
                <option :value="5">5</option>
                <option :value="8">8</option>
                <option :value="10">10</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Difficulty</label>
              <select v-model="aiDifficulty" class="ai-select">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Question type</label>
              <select v-model="aiQuestionType" class="ai-select">
                <option value="multiple-choice">Multiple choice</option>
                <option value="true-false">True / False</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </template>
        </div>

        <p class="ai-create-note">
          {{ aiStore.apiKey ? 'Using your configured AI provider.' : 'No API key configured yet. The built-in sample generator will still create starter content.' }}
        </p>

        <p v-if="aiCreationError" class="error-msg">{{ aiCreationError }}</p>
      </div>

      <template #footer>
        <button class="btn btn-secondary" @click="showAIModal = false">Cancel</button>
        <button class="btn btn-primary" :disabled="aiSubmitting || aiStore.isGenerating" @click="createAIProject">
          {{ aiPrimaryActionLabel }}
        </button>
      </template>
    </Modal>

    <Modal v-if="confirmDeleteId" title="Delete Project" size="sm" @close="confirmDeleteId = null">
      <p class="delete-text">Are you sure you want to delete this project? This action cannot be undone.</p>
      <template #footer>
        <button class="btn btn-secondary" @click="confirmDeleteId = null">Cancel</button>
        <button class="btn btn-danger" @click="confirmDelete">Delete</button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.auth-modal-body {
  color: var(--color-text);
}

.auth-eyebrow {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  margin: 0;
}

.auth-title {
  margin-top: var(--space-2);
  font-size: 38px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.auth-message {
  margin-top: var(--space-2);
  color: var(--color-text-muted);
}

.auth-mode-toggle {
  margin-top: var(--space-4);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
}

.auth-mode-btn {
  border: 1px solid var(--color-border);
  background: var(--color-surface-raised);
  color: var(--color-text);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  font-weight: 600;
  cursor: pointer;
}

.auth-mode-btn.active {
  background: color-mix(in srgb, var(--color-primary) 18%, var(--color-surface-raised));
  border-color: color-mix(in srgb, var(--color-primary) 45%, var(--color-border));
  color: var(--color-primary-hover);
}

.auth-provider-list {
  margin-top: var(--space-4);
  display: grid;
  gap: var(--space-2);
}

.auth-provider-btn {
  width: 100%;
  border: 1px solid var(--color-border);
  background: var(--color-surface-raised);
  color: var(--color-text);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
}

.auth-provider-btn:hover {
  border-color: color-mix(in srgb, var(--color-primary) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-primary) 8%, var(--color-surface-raised));
}

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

.quick-btn-ai {
  border-color: rgba(124, 58, 237, 0.24);
  background: linear-gradient(135deg, rgba(245, 243, 255, 0.95), rgba(238, 242, 255, 0.95));
  box-shadow: 0 10px 24px rgba(124, 58, 237, 0.08);
}

.quick-btn-ai:hover {
  border-color: rgba(124, 58, 237, 0.4);
  box-shadow: 0 14px 28px rgba(124, 58, 237, 0.12);
}

.provider-name {
  font-size: var(--text-md);
  font-weight: 600;
}

.provider-description {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: right;
}

.market-shell {
  height: 100vh;
  display: flex;
  background: var(--color-surface);
  color: var(--color-text);
}

.left-rail {
  width: 90px;
  background: #ffffff; /* Modern Genially-like minimal white */
  color: #0f172a;
  padding: var(--space-4) var(--space-2);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  border-right: 1px solid var(--color-border);
  box-shadow: 2px 0 10px rgba(0,0,0,0.02);
  z-index: 10;
}

.rail-logo {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  background: var(--color-primary);
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 18px;
  margin: 0 auto;
  box-shadow: 0 4px 10px rgba(91, 33, 182, 0.2);
}

.rail-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.rail-item {
  border: 1px solid transparent;
  background: transparent;
  color: #64748b;
  border-radius: 18px;
  padding: 12px 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: visible;
}

.rail-item::after {
  content: none;
}

.rail-item svg {
  width: 22px;
  height: 22px;
  opacity: 0.9;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.rail-item:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
  color: #0f172a;
  transform: translateY(-1px);
}

.rail-item:hover svg {
  transform: translateY(-2px);
}

.rail-item.active {
  background: linear-gradient(180deg, rgba(245, 243, 255, 0.98), rgba(238, 242, 255, 0.96));
  border-color: #c4b5fd;
  box-shadow: 0 10px 24px rgba(91, 33, 182, 0.08);
  color: #4c1d95;
}

.rail-item.active svg {
  color: #5b21b6;
  transform: none;
}

.market-main {
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
}

.hero {
  background: #ffffff;
  padding: var(--space-8) var(--space-8) var(--space-8);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  position: relative;
}

.hero::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(circle at top right, rgba(91, 33, 182, 0.05), transparent 40%),
              radial-gradient(circle at top left, rgba(234, 179, 8, 0.05), transparent 40%);
  pointer-events: none;
}

.hero-top {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  position: relative;
  z-index: 2;
}

.hero-user {
  margin-right: auto;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.user-chip {
  border-radius: var(--radius-full);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-weight: 600;
  font-size: var(--text-xs);
  padding: 6px 12px;
}

.hero-actions {
  display: flex;
  gap: var(--space-2);
}

.hero-title {
  text-align: center;
  font-size: clamp(34px, 5vw, 56px);
  font-weight: 800;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: var(--space-5);
  position: relative;
  z-index: 2;
}

.hero-search {
  margin: 0 auto;
  width: 100%;
  max-width: 680px;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
  padding: 6px 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
}

.hero-search:focus-within {
  box-shadow: 0 8px 24px rgba(91, 33, 182, 0.12);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  color: #333;
  padding: 12px 20px;
  font-size: var(--text-md);
  font-weight: 500;
  outline: none;
}

.search-input::placeholder {
  color: #94a3b8;
}

.hero-search-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: var(--color-primary);
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-search-btn:hover {
  background: var(--color-primary-hover);
  transform: scale(1.05);
}

.toolbar-row {
  background: rgba(255,255,255,0.85);
  border-bottom: 1px solid var(--color-border);
  padding: 16px var(--space-8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
  position: sticky;
  top: 0;
  z-index: 5;
  backdrop-filter: blur(12px);
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.chip {
  border: 1px solid var(--color-border);
  background: #ffffff;
  color: #475569;
  border-radius: var(--radius-full);
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.chip:hover {
  border-color: #cbd5e1;
  color: #0f172a;
}

.chip.active {
  background: #ffffff;
  border-color: var(--color-primary);
  color: var(--color-primary);
  box-shadow: 0 0 0 1px var(--color-primary);
}

.template-section,
.projects-section {
  padding: var(--space-6) var(--space-8) 0;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: var(--space-4);
  color: var(--color-text);
  letter-spacing: -0.01em;
}

.cards-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}

.market-card {
  position: relative;
  min-height: 180px;
  border-radius: var(--radius-xl);
  padding: 20px;
  cursor: pointer;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.market-card::before {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 44px; height: 44px;
  background: rgba(255,255,255,0.9);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>') no-repeat center / 20px;
}

.market-card::after {
  content: '';
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 44px; height: 44px;
  background: white;
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 9;
}

.market-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.1);
}

.market-card:hover::before, .market-card:hover::after {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.market-card:hover .card-title, .market-card:hover .card-type {
  transform: translateY(4px);
  opacity: 0.9;
}

.market-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%);
  z-index: 1;
}

.market-card .hover-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.market-card:hover .hover-overlay {
  opacity: 1;
}

.market-card .action-icon {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  width: 44px; height: 44px;
  background: rgba(255,255,255,1);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e293b;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.market-card:hover .action-icon {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.card-type,
.card-title {
  position: relative;
  z-index: 3;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.card-type {
  font-size: 13px;
  opacity: 0.9;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.card-title {
  font-size: 22px;
  line-height: 1.2;
  margin-top: 6px;
  font-weight: 700;
}

.bg-a { background: linear-gradient(135deg, #a855f7 0%, #7e22ce 100%); }
.bg-b { background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%); }
.bg-c { background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); }
.bg-d { background: linear-gradient(135deg, #f59e0b 0%, #b45309 100%); }
.bg-e { background: linear-gradient(135deg, #10b981 0%, #047857 100%); }
.bg-f { background: linear-gradient(135deg, #f43f5e 0%, #be123c 100%); }
.bg-g { background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); }
.bg-h { background: linear-gradient(135deg, #06b6d4 0%, #0369a1 100%); }

.projects-head {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.count-pill {
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  padding: 2px 10px;
  font-size: var(--text-xs);
  font-weight: 700;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-4);
  padding-bottom: var(--space-8);
}

.project-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 6px rgba(0,0,0,0.02);
}

.project-card:hover {
  transform: translateY(-6px) scale(1.01);
  border-color: #cbd5e1;
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
}

.templates-hero,
.toolbar-row-g,
.template-section,
.home-container,
.content-container {
  animation: dashboard-rise 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes dashboard-rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-name {
  font-size: var(--text-md);
  font-weight: 700;
  color: var(--color-text);
}

.project-meta {
  margin-top: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.project-actions {
  margin-top: var(--space-3);
  display: flex;
  gap: var(--space-2);
}

.projects-lock-card {
  border: 1px solid var(--color-border);
  background: var(--color-surface-raised);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.projects-lock-actions {
  margin-top: var(--space-3);
  display: flex;
  gap: var(--space-2);
}

.delete-text {
  color: var(--color-text-muted);
}

.error-msg {
  color: var(--color-danger);
  font-size: var(--text-sm);
  margin-top: var(--space-2);
}

@media (max-width: 980px) {
  .auth-title {
    font-size: 30px;
  }

  .auth-provider-btn {
    align-items: flex-start;
    flex-direction: column;
  }

  .provider-description {
    text-align: left;
  }

  .left-rail {
    display: none;
  }

  .hero-title {
    font-size: 38px;
  }

  .hero-top {
    flex-wrap: wrap;
  }

  .hero-user {
    width: 100%;
    margin-right: 0;
    margin-bottom: var(--space-2);
    justify-content: flex-start;
  }

  .toolbar-row,
  .template-section,
  .projects-section,
  .hero {
    padding-left: var(--space-4);
    padding-right: var(--space-4);
  }

  .ai-config-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .ai-mode-grid,
  .ai-config-grid {
    grid-template-columns: 1fr;
  }

  .cards-row,
  .project-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    width: 100%;
  }

  .hero-actions .btn {
    flex: 1;
    justify-content: center;
  }

  .toolbar-row {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
