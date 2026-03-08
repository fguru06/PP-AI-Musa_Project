<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projectStore'
import { useEditorStore } from '@/stores/editorStore'
import { useAuthStore } from '@/stores/authStore'
import Modal from '@/components/common/Modal.vue'

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
      <div class="rail-logo">LF</div>
      <nav class="rail-nav">
        <button class="rail-item" :class="activeRail === 'home' && 'active'" type="button" @click="setRailSection('home')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Home
        </button>
        <button class="rail-item" :class="activeRail === 'content' && 'active'" type="button" @click="setRailSection('content')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><path d="M7 7h10"></path><path d="M7 12h10"></path><path d="M7 17h10"></path></svg>
          Content
        </button>
        <button class="rail-item" :class="activeRail === 'templates' && 'active'" type="button" @click="setRailSection('templates')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect></svg>
          Templates
        </button>
        <button class="rail-item" type="button" @click="setRailSection('community')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          Community
        </button>
        <button class="rail-item" type="button" @click="setRailSection('activity')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          Activity
        </button>
        <button class="rail-item" type="button" @click="setRailSection('brand')">
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
              <button class="btn g-outline-btn" @click="openImportModal">Import</button>
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
          <button class="btn g-outline-btn ai-btn-g">
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
              <button class="btn btn-primary btn-sm" @click="openNewModal">Create course</button>
            </div>
            <div v-else>
              <button class="btn btn-secondary btn-sm" @click="openAuthModal('signin')">Sign In</button>
            </div>
          </div>
        </header>

        <!-- Home Specific -->
        <template v-if="activeRail === 'home'">
          <div class="home-container">
            <div class="challenge-banner">
              <h2>Drag, drop... and win!</h2>
              <p>Put your new interactivity to the test by creating your own drag-and-drop activity.</p>
              <button class="btn btn-primary btn-sm" style="background:#111;color:#fff;">Join the challenge</button>
            </div>
            
            <div class="welcome-section">
              <h2 class="welcome-title">
                Hi, {{ currentUser?.authTypeLabel.split(' ')[0] || 'Creator' }} 👋 What are you going to create today?
              </h2>
              <div class="quick-actions">
                <button class="quick-btn" @click="openNewModal"><span class="q-icon" style="color:var(--color-primary);">+</span> Create scratch project</button>
                <button class="quick-btn" @click="setRailSection('templates')"><span class="q-icon" style="color:var(--color-secondary);">🎮</span> Create a game</button>
                <button class="quick-btn" @click="setRailSection('templates')"><span class="q-icon" style="color:var(--color-success);">📱</span> Create a presentation</button>
              </div>
            </div>

            <section class="projects-section" style="padding-top:0;">
              <div class="projects-head" style="justify-content:space-between;">
                <h2 class="section-title">Pick up where you left off</h2>
                <button class="btn btn-ghost btn-sm" @click="setRailSection('content')">Go to My Content ›</button>
              </div>
              <div class="project-grid" v-if="currentUser && visibleProjects.length">
                <article v-for="project in visibleProjects.slice(0, 4)" :key="project.id" class="project-card" @click="openProject(project.id)">
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
                <article class="project-card create-new-card" @click="openNewModal">
                  <div class="create-circle">+</div>
                  <div class="create-text">Create new project</div>
                </article>

                <article v-for="project in visibleProjects" :key="project.id" class="project-card" @click="openProject(project.id)">
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
  border: none;
  background: transparent;
  color: #64748b;
  border-radius: var(--radius-lg);
  padding: 12px 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.rail-item svg {
  width: 22px;
  height: 22px;
  opacity: 0.9;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.rail-item:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.rail-item:hover svg {
  transform: translateY(-2px);
}

.rail-item.active {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.rail-item.active svg {
  color: var(--color-primary);
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
  transform: translateY(-4px);
  border-color: #cbd5e1;
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
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
