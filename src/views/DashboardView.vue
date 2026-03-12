<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useAuthStore } from '@/stores/authStore'
import { useProjectStore } from '@/stores/projectStore'
import { useEditorStore } from '@/stores/editorStore'
import { useDashboardAICreation } from '@/composables/useDashboardAICreation'
import AIProjectModal from '@/components/common/AIProjectModal.vue'
import WorkspaceAuthModal from '@/components/common/WorkspaceAuthModal.vue'
import ProjectNameModal from '@/components/common/ProjectNameModal.vue'
import ImportProjectModal from '@/components/common/ImportProjectModal.vue'
import ProjectDeleteModal from '@/components/common/ProjectDeleteModal.vue'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()
const editorStore = useEditorStore()
const authStore = useAuthStore()

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

const {
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
  createAIProject: createBaseAIProject,
} = useDashboardAICreation({ onRequireAuth: openAuthModal })

const AI_QUERY_KEYS = ['ai', 'topic', 'context', 'name', 'slides', 'questions', 'difficulty', 'type']

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
  { id: 'microcourse', title: 'Microcourse: AI in Education', subtitle: 'Interactive lesson', category: 'presentations', section: 'Teach classes', style: 'bg-a', preview: 'lesson' },
  { id: 'chromatic', title: 'Chromatic', subtitle: 'Presentation', category: 'presentations', section: 'Teach classes', style: 'bg-b', preview: 'presentation' },
  { id: 'branching', title: 'Branching Scenario', subtitle: 'Scenario practice', category: 'games', section: 'Teach classes', style: 'bg-c', preview: 'branching' },
  { id: 'flipcards', title: 'Flipcards Museum', subtitle: 'Game challenge', category: 'games', section: 'Teach classes', style: 'bg-d', preview: 'cards' },
  { id: 'higher-ed', title: 'Higher Education', subtitle: 'Presentation', category: 'presentations', section: 'Boost power skills', style: 'bg-e', preview: 'spotlight' },
  { id: 'complete', title: 'Complete the sentence', subtitle: 'Quiz', category: 'quizzes', section: 'Boost power skills', style: 'bg-f', preview: 'quiz' },
  { id: 'fill-blanks', title: 'Fill in the blanks', subtitle: 'Quiz assessment', category: 'quizzes', section: 'Boost power skills', style: 'bg-g', preview: 'assessment' },
  { id: 'timeline', title: 'Data Viz Timeline', subtitle: 'Interactive infographic', category: 'more', section: 'Boost power skills', style: 'bg-h', preview: 'timeline' },
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

const projectPendingDelete = computed(() =>
  confirmDeleteId.value ? projectStore.getProject(confirmDeleteId.value) : null
)

watch(
  () => [authStore.isAuthReady, authStore.user?.uid],
  async ([isReady, userId]) => {
    if (!isReady || !userId) return
    await projectStore.ensureRemoteProjectsLoaded()
  },
  { immediate: true }
)

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

function sanitizeAIQuery(queryOverrides = {}) {
  const nextQuery = { ...route.query }
  AI_QUERY_KEYS.forEach((key) => delete nextQuery[key])

  Object.entries(queryOverrides).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return
    nextQuery[key] = String(value)
  })

  return nextQuery
}

function getAIPresetsFromQuery(query = route.query, mode = query.ai) {
  const presets = {
    topic: typeof query.topic === 'string' ? query.topic : '',
    context: typeof query.context === 'string' ? query.context : '',
    projectName: typeof query.name === 'string' ? query.name : '',
  }

  if (mode === 'deck') {
    if (typeof query.slides === 'string') {
      presets.slideCount = query.slides
    }
    return presets
  }

  if (typeof query.questions === 'string') {
    presets.questionCount = query.questions
  }
  if (typeof query.difficulty === 'string') {
    presets.difficulty = query.difficulty
  }
  if (typeof query.type === 'string') {
    presets.questionType = query.type
  }
  return presets
}

function triggerDashboardAICreation(mode = 'quiz', presets = {}) {
  router.replace({ query: sanitizeAIQuery({ ai: mode, ...presets }) })
}

function clearDashboardAIQuery() {
  if (!AI_QUERY_KEYS.some((key) => key in route.query)) return Promise.resolve()
  return router.replace({ query: sanitizeAIQuery() })
}

function closeDashboardAICreation() {
  showAIModal.value = false
  clearDashboardAIQuery()
}

function createDashboardAIProject() {
  return createBaseAIProject({ onSuccess: clearDashboardAIQuery })
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

watch(
  () => [route.query.ai, route.query.topic, route.query.context, route.query.name, route.query.slides, route.query.questions, route.query.difficulty, route.query.type, authStore.user?.uid],
  ([aiQuery]) => {
    const requestedMode = aiQuery === 'deck' || aiQuery === 'quiz' ? aiQuery : null

    if (!requestedMode) {
      return
    }

    if (!currentUser.value) {
      openAuthModal('signin')
      return
    }

    const presets = getAIPresetsFromQuery(route.query, requestedMode)

    if (!showAIModal.value || aiMode.value !== requestedMode) {
      openAICreationModal(requestedMode, presets)
    }
  },
  { immediate: true }
)

async function signOut() {
  await authStore.logout()
  showAuthModal.value = false
  authMode.value = 'signin'
}

function setRailSection(section) {
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

function startDashboardWalkthrough() {
  const driverObj = driver({
    showProgress: true,
    animate: true,
    allowClose: true,
    overlayColor: 'rgba(15, 23, 42, 0.6)',
    popoverClass: 'app-walkthrough-theme',
    steps: [
      {
        popover: {
          title: 'Welcome to your Dashboard! 👋',
          description: 'This is where you manage all your presentations, games, and quizzes. Let\'s quickly show you around.',
        }
      },
      {
        element: '.left-rail',
        popover: {
          title: 'Navigation',
          description: 'Quickly switch back and forth between your home, your content, and browsing fresh templates.',
          side: 'right',
          align: 'start'
        }
      },
      {
        element: '.quick-actions',
        popover: {
          title: 'Fast Magic ✨',
          description: 'Use these shortcuts to start a project from scratch, use an AI wizard, or pick a beautiful template right away.',
          side: 'top',
          align: 'center'
        }
      },
      {
        element: '.nav-search-bar',
        popover: {
          title: 'Find everything',
          description: 'Search across your projects and millions of templates instantly from the top bar.',
          side: 'bottom',
          align: 'start'
        }
      }
    ],
    onDestroyed: () => {
      localStorage.setItem('hasSeenDashboardWalkthrough', 'true')
    }
  })

  // Ensure we are on the Home rail to show off the right parts
  if (activeRail.value !== 'home') {
    setRailSection('home')
    setTimeout(() => driverObj.drive(), 300)
  } else {
    driverObj.drive()
  }
}

onMounted(() => {
  if (!localStorage.getItem('hasSeenDashboardWalkthrough')) {
    setTimeout(() => {
      startDashboardWalkthrough()
    }, 800)
  }
})
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
          <button class="btn g-outline-btn ai-btn-g" type="button" @click="triggerDashboardAICreation('quiz')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
            Create quiz with AI
          </button>
        </section>

        <section v-for="section in cardsBySection" :key="section.title" class="template-section">
          <h2 class="section-title">{{ section.title }}</h2>
          <div class="cards-row">
            <article v-for="card in section.cards" :key="card.id" class="market-card" :class="card.style" @click="createFromTemplate(card)">
              <div class="template-wireframe" :class="`preview-${card.preview}`" aria-hidden="true"></div>
              <div class="hover-overlay"></div>
              <div class="action-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></div>
              <div class="card-copy">
                <span class="card-type">{{ card.subtitle }}</span>
                <h3 class="card-title">{{ card.title }}</h3>
              </div>
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
            <button class="btn btn-ghost btn-sm" @click="startDashboardWalkthrough" data-tooltip="Show Tour">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Help
            </button>
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
                <button class="quick-btn quick-btn-ai" @click="triggerDashboardAICreation('quiz')" data-tooltip="Generate a quiz project with AI"><span class="q-icon" style="color:#7c3aed;">✦</span> Create quiz with AI</button>
                <button class="quick-btn quick-btn-deck" @click="triggerDashboardAICreation('deck')" data-tooltip="Generate a lesson deck with AI"><span class="q-icon" style="color:#0284c7;">◫</span> Create slides with AI</button>
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

    <WorkspaceAuthModal
      v-if="showAuthModal"
      :mode="authMode"
      :title-text="authTitle"
      :message-text="authMessage"
      :email="authEmail"
      :password="authPassword"
      :error-text="authError"
      :is-loading="authLoading"
      :providers="authProviders"
      @close="showAuthModal = false"
      @submit="continueWithEmail"
      @provider="continueWithProvider"
      @update:mode="setAuthMode"
      @update:email="authEmail = $event"
      @update:password="authPassword = $event"
    />

    <ProjectNameModal
      v-if="showNewModal"
      title="New Project"
      :value="newProjectName"
      placeholder="e.g. Quiz Assessment"
      confirm-label="Create Project"
      @close="showNewModal = false"
      @confirm="createProject"
      @update:value="newProjectName = $event"
    />

    <ImportProjectModal
      v-if="showImportModal"
      :value="importJson"
      :error-text="importError"
      @close="showImportModal = false"
      @confirm="doImport"
      @update:value="importJson = $event"
    />

    <AIProjectModal
      v-if="showAIModal"
      :mode="aiMode"
      :topic="aiTopic"
      :context="aiContext"
      :project-name="aiProjectName"
      :slide-count="aiSlideCount"
      :question-count="aiQuestionCount"
      :difficulty="aiDifficulty"
      :question-type="aiQuestionType"
      :project-name-placeholder="aiProjectNamePlaceholder"
      :primary-action-label="aiPrimaryActionLabel"
      :creation-error="aiCreationError"
      :is-submitting="aiSubmitting"
      :is-generating="aiStore.isGenerating"
      :has-api-key="!!aiStore.apiKey"
      @close="closeDashboardAICreation"
      @create="createDashboardAIProject"
      @update:mode="aiMode = $event"
      @update:topic="aiTopic = $event"
      @update:context="aiContext = $event"
      @update:project-name="aiProjectName = $event"
      @update:slide-count="aiSlideCount = $event"
      @update:question-count="aiQuestionCount = $event"
      @update:difficulty="aiDifficulty = $event"
      @update:question-type="aiQuestionType = $event"
    />

    <ProjectDeleteModal
      v-if="confirmDeleteId"
      :project-name="projectPendingDelete?.name || ''"
      @close="confirmDeleteId = null"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style scoped>
.quick-btn-ai {
  border-color: rgba(124, 58, 237, 0.24);
  background: linear-gradient(135deg, rgba(245, 243, 255, 0.95), rgba(238, 242, 255, 0.95));
  box-shadow: 0 10px 24px rgba(124, 58, 237, 0.08);
}

.quick-btn-ai:hover {
  border-color: rgba(124, 58, 237, 0.4);
  box-shadow: 0 14px 28px rgba(124, 58, 237, 0.12);
}

.quick-btn-deck {
  border-color: rgba(2, 132, 199, 0.22);
  background: linear-gradient(135deg, rgba(239, 246, 255, 0.96), rgba(236, 254, 255, 0.96));
  box-shadow: 0 10px 24px rgba(2, 132, 199, 0.08);
}

.quick-btn-deck:hover {
  border-color: rgba(2, 132, 199, 0.38);
  box-shadow: 0 14px 28px rgba(2, 132, 199, 0.12);
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
  min-height: 210px;
  border-radius: var(--radius-xl);
  padding: 16px;
  cursor: pointer;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 18px 34px rgba(15, 23, 42, 0.12);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.market-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 34%, rgba(2,6,23,0.08) 100%);
  z-index: 0;
  pointer-events: none;
}

.market-card::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 92px;
  background: linear-gradient(180deg, rgba(8,15,34,0) 0%, rgba(8,15,34,0.52) 38%, rgba(8,15,34,0.82) 100%);
  z-index: 2;
  pointer-events: none;
}

.market-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.18);
}

.market-card:hover .card-copy {
  transform: translateY(-2px);
}

.market-card .hover-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(15,23,42,0.16));
  z-index: 3;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.market-card:hover .hover-overlay {
  opacity: 1;
}

.template-wireframe {
  position: absolute;
  inset: 16px 16px 70px;
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,0.24);
  background-color: rgba(255,255,255,0.12);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.22);
  opacity: 0.96;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, background-color 0.3s ease;
  z-index: 1;
}

.template-wireframe::before {
  content: '';
  position: absolute;
  inset: 10px;
  border-radius: 12px;
  border: 1px dashed rgba(255,255,255,0.22);
  opacity: 0.65;
}

.market-card:hover .template-wireframe {
  transform: translateY(-3px) scale(1.01);
  background-color: rgba(255,255,255,0.16);
}

.market-card .action-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  transform: translateY(-8px) scale(0.9);
  width: 38px; height: 38px;
  background: rgba(255,255,255,1);
  border-radius: 50%;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1e293b;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.market-card:hover .action-icon {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.card-copy {
  position: relative;
  z-index: 4;
  padding: 14px 14px 2px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(6,10,24,0.04), rgba(6,10,24,0.2));
  backdrop-filter: blur(8px);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-type,
.card-title {
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.card-type {
  display: inline-block;
  font-size: 11px;
  opacity: 0.92;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.14);
}

.card-title {
  font-size: 24px;
  line-height: 1.2;
  margin-top: 10px;
  font-weight: 700;
}

.preview-lesson {
  background:
    linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)) 16px 16px / calc(100% - 32px) 38px no-repeat,
    linear-gradient(rgba(255,255,255,0.46), rgba(255,255,255,0.46)) 16px 66px / 54% 8px no-repeat,
    linear-gradient(rgba(255,255,255,0.34), rgba(255,255,255,0.34)) 16px 82px / 68% 8px no-repeat,
    linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)) 16px 102px / calc(100% - 32px) 42px no-repeat,
    linear-gradient(rgba(255,255,255,0.26), rgba(255,255,255,0.26)) calc(100% - 94px) 66px / 78px 54px no-repeat,
    linear-gradient(rgba(255,255,255,0.28), rgba(255,255,255,0.28)) 16px calc(100% - 28px) / 120px 8px no-repeat;
}

.preview-presentation {
  background:
    linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)) 16px 16px / calc(100% - 32px) 12px no-repeat,
    linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)) 16px 38px / calc(100% - 32px) 78px no-repeat,
    linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.42)) 28px 54px / 34% 8px no-repeat,
    linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)) 28px 72px / 48% 8px no-repeat,
    linear-gradient(rgba(255,255,255,0.24), rgba(255,255,255,0.24)) calc(100% - 94px) 50px / 64px 54px no-repeat,
    linear-gradient(rgba(255,255,255,0.28), rgba(255,255,255,0.28)) 16px calc(100% - 26px) / 96px 8px no-repeat;
}

.preview-branching {
  background:
    radial-gradient(circle, rgba(255,255,255,0.9) 0 11px, transparent 12px) center 30px / 24px 24px no-repeat,
    linear-gradient(rgba(255,255,255,0.26), rgba(255,255,255,0.26)) center 50px / 2px 24px no-repeat,
    linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)) center 72px / 120px 2px no-repeat,
    linear-gradient(rgba(255,255,255,0.22), rgba(255,255,255,0.22)) 22px 84px / 74px 42px no-repeat,
    linear-gradient(rgba(255,255,255,0.22), rgba(255,255,255,0.22)) calc(100% - 96px) 84px / 74px 42px no-repeat,
    linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.42)) 34px 98px / 42px 8px no-repeat,
    linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.42)) calc(100% - 74px) 98px / 42px 8px no-repeat;
}

.preview-cards {
  background:
    linear-gradient(12deg, rgba(255,255,255,0.18), rgba(255,255,255,0.18)) 22px 24px / 72px 96px no-repeat,
    linear-gradient(12deg, rgba(255,255,255,0.16), rgba(255,255,255,0.16)) calc(50% - 36px) 18px / 72px 96px no-repeat,
    linear-gradient(12deg, rgba(255,255,255,0.14), rgba(255,255,255,0.14)) calc(100% - 94px) 24px / 72px 96px no-repeat,
    linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.42)) 34px 102px / 48px 8px no-repeat,
    linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.42)) calc(50% - 24px) 96px / 48px 8px no-repeat,
    linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.42)) calc(100% - 82px) 102px / 48px 8px no-repeat;
}

.preview-spotlight {
  background:
    linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)) 16px 16px / calc(100% - 32px) 14px no-repeat,
    linear-gradient(rgba(255,255,255,0.22), rgba(255,255,255,0.22)) 16px 42px / 42% 84px no-repeat,
    linear-gradient(rgba(255,255,255,0.46), rgba(255,255,255,0.46)) calc(48% + 10px) 52px / 30% 8px no-repeat,
    linear-gradient(rgba(255,255,255,0.34), rgba(255,255,255,0.34)) calc(48% + 10px) 70px / 36% 8px no-repeat,
    linear-gradient(rgba(255,255,255,0.24), rgba(255,255,255,0.24)) calc(48% + 10px) 90px / 40% 30px no-repeat,
    linear-gradient(rgba(255,255,255,0.28), rgba(255,255,255,0.28)) 16px calc(100% - 24px) / 110px 8px no-repeat;
}

.preview-quiz {
  background:
    linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)) 16px 16px / 56% 12px no-repeat,
    linear-gradient(rgba(255,255,255,0.42), rgba(255,255,255,0.42)) 16px 44px / calc(100% - 32px) 10px no-repeat,
    linear-gradient(rgba(255,255,255,0.24), rgba(255,255,255,0.24)) 16px 66px / calc(100% - 32px) 24px no-repeat,
    linear-gradient(rgba(255,255,255,0.24), rgba(255,255,255,0.24)) 16px 98px / calc(100% - 32px) 24px no-repeat,
    radial-gradient(circle, rgba(255,255,255,0.8) 0 5px, transparent 6px) 28px 74px / 10px 10px no-repeat,
    radial-gradient(circle, rgba(255,255,255,0.8) 0 5px, transparent 6px) 28px 106px / 10px 10px no-repeat,
    linear-gradient(rgba(255,255,255,0.22), rgba(255,255,255,0.22)) calc(100% - 88px) calc(100% - 24px) / 72px 10px no-repeat;
}

.preview-assessment {
  background:
    linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)) 16px 16px / 62% 12px no-repeat,
    linear-gradient(rgba(255,255,255,0.32), rgba(255,255,255,0.32)) 16px 46px / 54px 40px no-repeat,
    linear-gradient(rgba(255,255,255,0.32), rgba(255,255,255,0.32)) 82px 46px / 54px 40px no-repeat,
    linear-gradient(rgba(255,255,255,0.32), rgba(255,255,255,0.32)) 148px 46px / 54px 40px no-repeat,
    linear-gradient(rgba(255,255,255,0.44), rgba(255,255,255,0.44)) 16px 98px / calc(100% - 32px) 9px no-repeat,
    linear-gradient(rgba(255,255,255,0.24), rgba(255,255,255,0.24)) 16px 118px / calc(100% - 32px) 16px no-repeat,
    linear-gradient(rgba(255,255,255,0.22), rgba(255,255,255,0.22)) calc(100% - 84px) calc(100% - 24px) / 68px 10px no-repeat;
}

.preview-timeline {
  background:
    linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)) 16px 18px / 44% 12px no-repeat,
    linear-gradient(rgba(255,255,255,0.26), rgba(255,255,255,0.26)) 20px 74px / calc(100% - 40px) 3px no-repeat,
    radial-gradient(circle, rgba(255,255,255,0.86) 0 7px, transparent 8px) 32px 66px / 16px 16px no-repeat,
    radial-gradient(circle, rgba(255,255,255,0.86) 0 7px, transparent 8px) calc(50% - 8px) 66px / 16px 16px no-repeat,
    radial-gradient(circle, rgba(255,255,255,0.86) 0 7px, transparent 8px) calc(100% - 48px) 66px / 16px 16px no-repeat,
    linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)) 18px 96px / 64px 24px no-repeat,
    linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)) calc(50% - 32px) 96px / 64px 24px no-repeat,
    linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)) calc(100% - 82px) 96px / 64px 24px no-repeat;
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

}

@media (max-width: 640px) {
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
