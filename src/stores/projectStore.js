import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { v4 as uuid } from 'uuid'
import { useAuthStore } from './authStore'
import { DEFAULT_CANVAS_HEIGHT, DEFAULT_CANVAS_WIDTH, normalizeCanvasSettings } from '@/lib/canvas'
import { buildThemeChartContent } from '@/lib/chart'
import { BUILT_IN_CONTENT_BLOCKS, normalizeContentBlock } from '@/lib/blockLibrary'

let firestoreServicesPromise = null

async function getFirestoreServices() {
  if (!firestoreServicesPromise) {
    firestoreServicesPromise = import('@/lib/firebase/firestore').then((module) => module.getFirebaseFirestoreServices())
  }

  return firestoreServicesPromise
}

const STORAGE_KEY = 'elearn_projects'
const LOCAL_ANON_KEY = `${STORAGE_KEY}_anonymous`

function makeDefaultTheme() {
  return {
    primaryColor: '#6c47ff',
    secondaryColor: '#00c9a7',
    bgColor: '#ffffff',
    textColor: '#1a1a2e',
    chartPalette: '',
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    headingFont: 'Inter, sans-serif',
  }
}

function defaultMotionPresets() {
  return [
    {
      id: uuid(),
      scope: 'single',
      name: 'Hero Intro',
      category: 'Presentation',
      tags: ['hero', 'intro'],
      type: 'fade-up-strong',
      delay: 0,
      duration: 0.8,
      stepDelay: 0,
      usageCount: 0,
      lastUsedAt: 0,
    },
    {
      id: uuid(),
      scope: 'group',
      name: 'Three Card Cascade',
      category: 'Sequence',
      tags: ['cards', 'stagger'],
      type: 'stagger-in',
      delay: 0,
      duration: 0.72,
      stepDelay: 0.14,
      usageCount: 0,
      lastUsedAt: 0,
    },
  ]
}

function normalizeMotionPresets(presets) {
  if (!Array.isArray(presets) || !presets.length) return defaultMotionPresets()

  return presets.map((preset) => ({
    id: preset?.id || uuid(),
    scope: preset?.scope === 'group' ? 'group' : 'single',
    name: String(preset?.name || 'Untitled Preset').trim() || 'Untitled Preset',
    category: String(preset?.category || '').trim(),
    tags: Array.isArray(preset?.tags)
      ? preset.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : String(preset?.tags || '')
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
    type: String(preset?.type || 'auto'),
    delay: Math.max(0, Number(preset?.delay) || 0),
    duration: Math.max(0.1, Number(preset?.duration) || 0.72),
    stepDelay: Math.max(0, Number(preset?.stepDelay) || 0),
    usageCount: Math.max(0, Number(preset?.usageCount) || 0),
    lastUsedAt: Math.max(0, Number(preset?.lastUsedAt) || 0),
  }))
}

function normalizeContentBlocks(blocks) {
  if (!Array.isArray(blocks) || !blocks.length) return []
  return blocks.map((block, index) => normalizeContentBlock(block, block?.id || `custom-block-${index}`))
}

function getBlockBounds(elements) {
  const normalized = Array.isArray(elements) ? elements : []
  if (!normalized.length) {
    return { minX: 0, minY: 0, width: 0, height: 0 }
  }

  const minX = Math.min(...normalized.map((element) => Number(element.x || 0)))
  const minY = Math.min(...normalized.map((element) => Number(element.y || 0)))
  const maxX = Math.max(...normalized.map((element) => Number(element.x || 0) + Number(element.width || 0)))
  const maxY = Math.max(...normalized.map((element) => Number(element.y || 0) + Number(element.height || 0)))

  return {
    minX,
    minY,
    width: Math.max(0, maxX - minX),
    height: Math.max(0, maxY - minY),
  }
}

function getBuiltInContentBlocks() {
  return BUILT_IN_CONTENT_BLOCKS.map((block) => normalizeContentBlock(block, block.id))
}

function getBindableContentEntries(element) {
  if (!element?.content) return []

  if (element.type === 'text' || element.type === 'heading') {
    return typeof element.content.text === 'string' && element.content.text.trim()
      ? [{ contentKey: 'text', kind: element.type === 'heading' ? 'Heading' : 'Text', defaultValue: element.content.text }]
      : []
  }

  if (element.type === 'button') {
    return typeof element.content.label === 'string' && element.content.label.trim()
      ? [{ contentKey: 'label', kind: 'Button', defaultValue: element.content.label }]
      : []
  }

  return []
}

function buildSelectionBlockBindings(elements) {
  const counters = new Map()
  const bindings = []

  elements.forEach((element, elementIndex) => {
    getBindableContentEntries(element).forEach((entry) => {
      const nextCount = (counters.get(entry.kind) || 0) + 1
      counters.set(entry.kind, nextCount)
      const preview = String(entry.defaultValue || '').trim().split('\n')[0].slice(0, 28)
      bindings.push({
        id: `${entry.kind.toLowerCase()}-${nextCount}`,
        label: preview || `${entry.kind} ${nextCount}`,
        defaultValue: String(entry.defaultValue || ''),
        elementIndex,
        contentKey: entry.contentKey,
      })
    })
  })

  return bindings
}

function makeBlankSlide(order = 0) {
  return {
    id: uuid(),
    title: `Slide ${order + 1}`,
    background: '#ffffff',
    backgroundType: 'color', // 'color' | 'gradient' | 'image'
    backgroundGradient: '',
    backgroundImage: '',
    elements: [],
    notes: '',
    order,
    transition: 'none',
    duration: 0,
    advanceOnMediaEnd: false,
  }
}

function makeNewProject(name = 'Untitled Project') {
  const slide = makeBlankSlide(0)
  const defaultCanvas = normalizeCanvasSettings({
    slideWidth: DEFAULT_CANVAS_WIDTH,
    slideHeight: DEFAULT_CANVAS_HEIGHT,
  })
  return {
    id: uuid(),
    name,
    description: '',
    thumbnail: '',
    slides: [slide],
    theme: makeDefaultTheme(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: '1.0',
    authorName: '',
    tags: [],
    settings: {
      slideWidth: defaultCanvas.slideWidth,
      slideHeight: defaultCanvas.slideHeight,
      autoPlay: false,
      loop: false,
      showProgress: true,
      showNavControls: true,
      allowKeyboardNav: true,
      motionPresets: defaultMotionPresets(),
      customBlocks: [],
    },
  }
}

function makeElement(type, config = {}) {
  const defaults = elementDefaults(type)
  return {
    id: uuid(),
    type,
    x: config.x ?? 100,
    y: config.y ?? 100,
    width: config.width ?? defaults.width,
    height: config.height ?? defaults.height,
    rotation: config.rotation ?? 0,
    zIndex: config.zIndex ?? 1,
    locked: false,
    visible: true,
    opacity: config.opacity ?? 1,
    meta: { ...(config.meta || {}) },
    content: { ...(defaults.content || {}), ...(config.content || {}) },
    styles: { ...(defaults.styles || {}) },
    interactions: config.interactions || [],
    animations: config.animations || [],
  }
}

function makeTemplateSlide(definition, order = 0) {
  return {
    id: uuid(),
    title: definition.title || `Slide ${order + 1}`,
    background: definition.background || '#ffffff',
    backgroundType: definition.backgroundType || 'color',
    backgroundGradient: definition.backgroundGradient || '',
    backgroundImage: definition.backgroundImage || '',
    elements: (definition.elements || []).map((el, idx) => makeElement(el.type, { ...el, zIndex: el.zIndex ?? (idx + 1) })),
    notes: definition.notes || '',
    order,
    transition: definition.transition || 'none',
    duration: definition.duration || 0,
    advanceOnMediaEnd: Boolean(definition.advanceOnMediaEnd),
  }
}

function getTemplateBlueprint(templateId, name) {
  const map = {
    microcourse: {
      description: 'Interactive lesson template',
      theme: { primaryColor: '#6c47ff', secondaryColor: '#00c9a7', bgColor: '#f8f8ff', textColor: '#1a1a2e' },
      slides: [
        {
          title: 'Course Intro',
          background: '#f8f8ff',
          elements: [
            { type: 'heading', x: 80, y: 72, width: 800, height: 84, content: { text: name || 'Microcourse: AI in Education', textAlign: 'left' } },
            { type: 'text', x: 80, y: 170, width: 760, height: 90, content: { text: 'Learning objective: understand practical AI use-cases for classrooms and workplace training.' } },
            { type: 'button', x: 80, y: 292, width: 180, height: 50, content: { label: 'Start Lesson', action: 'navigate', target: '2' } },
            { type: 'shape', x: 700, y: 320, width: 190, height: 130, content: { shapeType: 'rectangle', fillColor: '#00c9a7', borderRadius: 18 } },
          ],
        },
        {
          title: 'Knowledge Check',
          background: '#ffffff',
          elements: [
            { type: 'heading', x: 80, y: 44, width: 600, height: 70, content: { text: 'Quick Check', textAlign: 'left', fontSize: 40 } },
            { type: 'quiz', x: 80, y: 130, width: 760, height: 330, content: { question: 'Which AI feature best supports personalized learning?', options: ['Automated attendance only', 'Adaptive feedback based on learner progress', 'Static PDF handouts', 'Manual grading spreadsheets'], correctIndex: 1, explanation: 'Adaptive feedback tailors support based on learner responses and performance.' } },
          ],
        },
      ],
    },
    chromatic: {
      description: 'Modern presentation starter',
      theme: { primaryColor: '#7c3aed', secondaryColor: '#ec4899', bgColor: '#ffffff', textColor: '#1f1638' },
      slides: [
        {
          title: 'Title Slide',
          backgroundType: 'gradient',
          backgroundGradient: 'linear-gradient(135deg, #faf5ff 0%, #fff1f2 100%)',
          elements: [
            { type: 'heading', x: 90, y: 130, width: 780, height: 88, content: { text: name || 'Chromatic Presentation', textAlign: 'center', fontSize: 52 } },
            { type: 'text', x: 180, y: 232, width: 600, height: 70, content: { text: 'A colorful template to introduce your topic with style.', textAlign: 'center' } },
            { type: 'button', x: 390, y: 328, width: 180, height: 48, content: { label: 'Continue', action: 'navigate', target: '2', variant: 'primary', bgColor: '#7c3aed' } },
          ],
        },
      ],
    },
    branching: {
      description: 'Branching scenario template',
      theme: { primaryColor: '#2563eb', secondaryColor: '#14b8a6', bgColor: '#f8fafc', textColor: '#0f172a' },
      slides: [
        {
          title: 'Decision Point',
          background: '#f8fafc',
          elements: [
            { type: 'heading', x: 80, y: 60, width: 740, height: 74, content: { text: 'Branching Scenario', textAlign: 'left' } },
            { type: 'text', x: 80, y: 150, width: 800, height: 80, content: { text: 'A customer asks for a full refund after the deadline. What do you do first?' } },
            { type: 'button', x: 80, y: 270, width: 290, height: 54, content: { label: 'Option A: Escalate to manager', action: 'navigate', target: '2' } },
            { type: 'button', x: 390, y: 270, width: 290, height: 54, content: { label: 'Option B: Offer partial credit', action: 'navigate', target: '3' } },
            { type: 'hotspot', x: 770, y: 420, width: 66, height: 66, content: { icon: 'i', popupTitle: 'Facilitator Tip', popupContent: 'Ask learners why they chose each option before revealing outcomes.' } },
          ],
        },
      ],
    },
    flipcards: {
      description: 'Interactive card challenge starter',
      theme: { primaryColor: '#0891b2', secondaryColor: '#f59e0b', bgColor: '#f0f9ff', textColor: '#0f172a' },
      slides: [
        {
          title: 'Flipcards Activity',
          background: '#f0f9ff',
          elements: [
            { type: 'heading', x: 80, y: 58, width: 800, height: 74, content: { text: 'Flipcards Museum', textAlign: 'left' } },
            { type: 'text', x: 80, y: 138, width: 780, height: 64, content: { text: 'Prompt learners to reveal each card and discuss what they discover.' } },
            { type: 'shape', x: 120, y: 235, width: 200, height: 150, content: { shapeType: 'rectangle', fillColor: '#ffffff', borderColor: '#0891b2', borderWidth: 2, borderRadius: 14 } },
            { type: 'shape', x: 380, y: 235, width: 200, height: 150, content: { shapeType: 'rectangle', fillColor: '#ffffff', borderColor: '#0891b2', borderWidth: 2, borderRadius: 14 } },
            { type: 'shape', x: 640, y: 235, width: 200, height: 150, content: { shapeType: 'rectangle', fillColor: '#ffffff', borderColor: '#0891b2', borderWidth: 2, borderRadius: 14 } },
          ],
        },
      ],
    },
    'higher-ed': {
      description: 'Higher education lecture starter',
      theme: { primaryColor: '#1d4ed8', secondaryColor: '#16a34a', bgColor: '#ffffff', textColor: '#0f172a' },
      slides: [
        {
          title: 'Lecture Overview',
          background: '#ffffff',
          elements: [
            { type: 'heading', x: 80, y: 70, width: 790, height: 80, content: { text: name || 'Higher Education', textAlign: 'left' } },
            { type: 'text', x: 80, y: 170, width: 780, height: 124, content: { text: 'Use this deck to define outcomes, introduce key concepts, and include formative checks.' } },
            { type: 'button', x: 80, y: 328, width: 190, height: 48, content: { label: 'Add Agenda', action: 'none' } },
          ],
        },
      ],
    },
    complete: {
      description: 'Sentence completion quiz starter',
      theme: { primaryColor: '#6c47ff', secondaryColor: '#22c55e', bgColor: '#f8f7ff', textColor: '#1a1a2e' },
      slides: [
        {
          title: 'Complete the Sentence',
          background: '#f8f7ff',
          elements: [
            { type: 'heading', x: 80, y: 55, width: 700, height: 76, content: { text: 'Complete the sentence', textAlign: 'left' } },
            { type: 'quiz', x: 80, y: 140, width: 760, height: 330, content: { question: 'AI literacy in workplaces improves when teams ______.', options: ['Avoid practical tasks', 'Use AI tools with clear guardrails and practice', 'Rely only on theory', 'Stop measuring outcomes'], correctIndex: 1, explanation: 'Practice with clear policies helps teams use AI safely and effectively.' } },
          ],
        },
      ],
    },
    'fill-blanks': {
      description: 'Quiz assessment starter',
      theme: { primaryColor: '#6c47ff', secondaryColor: '#06b6d4', bgColor: '#ffffff', textColor: '#111827' },
      slides: [
        {
          title: 'Quiz Assessment',
          background: '#ffffff',
          elements: [
            { type: 'heading', x: 80, y: 48, width: 760, height: 76, content: { text: 'Fill in the blanks', textAlign: 'left' } },
            { type: 'text', x: 80, y: 126, width: 760, height: 64, content: { text: 'Replace with your own question set and publish in minutes.' } },
            { type: 'quiz', x: 80, y: 196, width: 760, height: 280, content: { question: 'The most important part of a good assessment is ______.', options: ['Clear learning objective', 'Random difficulty', 'Longer text only', 'Colorful background'], correctIndex: 0, explanation: 'Assessments should align clearly with learning objectives.' } },
          ],
        },
      ],
    },
    timeline: {
      description: 'Timeline infographic starter',
      theme: { primaryColor: '#0ea5e9', secondaryColor: '#8b5cf6', bgColor: '#f8fafc', textColor: '#0f172a' },
      slides: [
        {
          title: 'Data Timeline',
          background: '#f8fafc',
          elements: [
            { type: 'heading', x: 80, y: 40, width: 760, height: 74, content: { text: 'Data Viz Timeline', textAlign: 'left' } },
            { type: 'shape', x: 100, y: 255, width: 760, height: 8, content: { shapeType: 'rectangle', fillColor: '#0ea5e9', borderRadius: 8 } },
            { type: 'shape', x: 170, y: 235, width: 46, height: 46, content: { shapeType: 'circle', fillColor: '#8b5cf6' } },
            { type: 'shape', x: 430, y: 235, width: 46, height: 46, content: { shapeType: 'circle', fillColor: '#8b5cf6' } },
            { type: 'shape', x: 690, y: 235, width: 46, height: 46, content: { shapeType: 'circle', fillColor: '#8b5cf6' } },
            { type: 'text', x: 120, y: 290, width: 150, height: 70, content: { text: 'Phase 1\nDiscovery', textAlign: 'center' } },
            { type: 'text', x: 380, y: 290, width: 150, height: 70, content: { text: 'Phase 2\nBuild', textAlign: 'center' } },
            { type: 'text', x: 640, y: 290, width: 150, height: 70, content: { text: 'Phase 3\nLaunch', textAlign: 'center' } },
          ],
        },
      ],
    },
  }

  return map[templateId] || {
    description: 'Starter template',
    theme: makeDefaultTheme(),
    slides: [{ title: name || 'New Slide', background: '#ffffff', elements: [] }],
  }
}

function loadLocal(userId = null) {
  const key = userId ? `${STORAGE_KEY}_${userId}` : LOCAL_ANON_KEY
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveLocal(projects, userId = null) {
  const key = userId ? `${STORAGE_KEY}_${userId}` : LOCAL_ANON_KEY
  try {
    localStorage.setItem(key, JSON.stringify(projects))
  } catch {}
}

function clearLocal(userId = null) {
  const key = userId ? `${STORAGE_KEY}_${userId}` : LOCAL_ANON_KEY
  try {
    localStorage.removeItem(key)
  } catch {}
}

function normalizeProject(project) {
  const normalizedCanvas = normalizeCanvasSettings(project.settings || {})
  return {
    ...project,
    description: project.description || '',
    thumbnail: project.thumbnail || '',
    slides: Array.isArray(project.slides)
      ? project.slides.map((slide, index) => ({
          ...makeBlankSlide(index),
          ...slide,
          order: Number(slide?.order ?? index),
          duration: Number(slide?.duration || 0),
          advanceOnMediaEnd: Boolean(slide?.advanceOnMediaEnd),
          elements: Array.isArray(slide?.elements) ? slide.elements : [],
        }))
      : [makeBlankSlide(0)],
    theme: { ...makeDefaultTheme(), ...(project.theme || {}) },
    createdAt: Number(project.createdAt) || Date.now(),
    updatedAt: Number(project.updatedAt) || Date.now(),
    version: project.version || '1.0',
    authorName: project.authorName || '',
    tags: Array.isArray(project.tags) ? project.tags : [],
    settings: {
      autoPlay: false,
      loop: false,
      showProgress: true,
      showNavControls: true,
      allowKeyboardNav: true,
      ...(project.settings || {}),
      slideWidth: normalizedCanvas.slideWidth,
      slideHeight: normalizedCanvas.slideHeight,
      motionPresets: normalizeMotionPresets(project.settings?.motionPresets),
      customBlocks: normalizeContentBlocks(project.settings?.customBlocks),
    },
  }
}

async function upsertRemoteProject(userId, project) {
  if (!userId || !project?.id) return
  const { db, collection, doc, setDoc } = await getFirestoreServices()
  const collectionRef = collection(db, 'users', userId, 'projects')
  await setDoc(doc(collectionRef, project.id), normalizeProject(project))
}

async function deleteRemoteProject(userId, projectId) {
  if (!userId || !projectId) return
  const { db, collection, doc, deleteDoc } = await getFirestoreServices()
  const collectionRef = collection(db, 'users', userId, 'projects')
  await deleteDoc(doc(collectionRef, projectId))
}

async function migrateBrowserProjects(userId) {
  if (!userId) return

  const anonymousProjects = loadLocal()
  const accountProjects = loadLocal(userId)
  if (!anonymousProjects.length && !accountProjects.length) return

  const { db, collection, doc, getDocs, writeBatch } = await getFirestoreServices()
  const collectionRef = collection(db, 'users', userId, 'projects')
  const existingSnapshot = await getDocs(collectionRef)
  const existingIds = new Set(existingSnapshot.docs.map(projectDoc => projectDoc.id))
  const batch = writeBatch(db)
  let hasWrites = false
  const allowAccountCacheRestore = existingSnapshot.empty

  anonymousProjects.forEach(project => {
    if (existingIds.has(project.id)) return
    batch.set(doc(collectionRef, project.id), normalizeProject(project))
    existingIds.add(project.id)
    hasWrites = true
  })

  // Only restore account-scoped local cache when the remote collection is empty.
  // Otherwise an older browser cache can resurrect projects deleted on another device.
  if (allowAccountCacheRestore) {
    accountProjects.forEach(project => {
      if (existingIds.has(project.id)) return
      batch.set(doc(collectionRef, project.id), normalizeProject(project))
      existingIds.add(project.id)
      hasWrites = true
    })
  }

  if (hasWrites) {
    await batch.commit()
  }

  clearLocal()
}

export const useProjectStore = defineStore('projects', () => {
  const authStore = useAuthStore()
  const projects = ref([])
  const syncError = ref('')
  const remoteSyncRequested = ref(false)
  const remoteSyncState = ref('idle')
  let stopProjectsSync = null
  let remoteSyncPromise = Promise.resolve()
  let resolveRemoteSyncPromise = null

  function resetRemoteSyncPromise() {
    remoteSyncPromise = new Promise((resolve) => {
      resolveRemoteSyncPromise = resolve
    })
  }

  function resolveRemoteSync() {
    if (resolveRemoteSyncPromise) {
      resolveRemoteSyncPromise()
      resolveRemoteSyncPromise = null
    }
  }

  async function ensureRemoteProjectsLoaded() {
    if (!authStore.user?.uid) return
    if (remoteSyncRequested.value && remoteSyncState.value === 'ready') return

    if (!remoteSyncRequested.value) {
      resetRemoteSyncPromise()
      remoteSyncRequested.value = true
    }

    return remoteSyncPromise
  }

  watch([() => authStore.user?.uid, remoteSyncRequested], async ([userId, shouldSync]) => {
    syncError.value = ''

    if (stopProjectsSync) {
      stopProjectsSync()
      stopProjectsSync = null
    }

    if (!userId) {
      projects.value = loadLocal()
      remoteSyncState.value = 'idle'
      resolveRemoteSync()
      return
    }

    if (!shouldSync) {
      projects.value = loadLocal(userId)
      remoteSyncState.value = 'idle'
      resolveRemoteSync()
      return
    }

    projects.value = []
    remoteSyncState.value = 'loading'

    try {
      await migrateBrowserProjects(userId)
    } catch (error) {
      console.error('Failed to migrate browser projects', error)
      syncError.value = 'Some browser-saved projects could not be migrated to your account.'
    }

    const { db, collection, onSnapshot } = await getFirestoreServices()
    const collectionRef = collection(db, 'users', userId, 'projects')

    stopProjectsSync = onSnapshot(
      collectionRef,
      (snapshot) => {
        projects.value = snapshot.docs.map(projectDoc => normalizeProject({ id: projectDoc.id, ...projectDoc.data() }))
        saveLocal(projects.value, userId)
        remoteSyncState.value = 'ready'
        resolveRemoteSync()
      },
      (error) => {
        console.error('Failed to sync account projects', error)
        syncError.value = 'Unable to sync your projects right now.'
        projects.value = loadLocal(userId)
        remoteSyncState.value = 'ready'
        resolveRemoteSync()
      }
    )
  }, { immediate: true, flush: 'sync' })

  const sortedProjects = computed(() =>
    [...projects.value].sort((a, b) => b.updatedAt - a.updatedAt)
  )

  function cacheLocalProjects() {
    saveLocal(projects.value, authStore.user?.uid || null)
  }

  function persistProject(project) {
    cacheLocalProjects()

    if (!authStore.user?.uid) {
      return Promise.resolve()
    }

    return upsertRemoteProject(authStore.user.uid, project).catch((error) => {
      console.error('Failed to persist project', error)
      syncError.value = 'Unable to save your latest project changes.'
    })
  }

  function removePersistedProject(projectId) {
    cacheLocalProjects()

    if (!authStore.user?.uid) {
      return Promise.resolve()
    }

    return deleteRemoteProject(authStore.user.uid, projectId).catch((error) => {
      console.error('Failed to delete project', error)
      syncError.value = 'Unable to delete this project from your account.'
    })
  }

  function createProject(name) {
    const p = makeNewProject(name)
    projects.value.push(p)
    persistProject(p)
    return p
  }

  function createProjectFromTemplate(templateId, name, description = '') {
    const blueprint = getTemplateBlueprint(templateId, name)
    const p = makeNewProject(name)
    p.description = description || blueprint.description || ''
    p.theme = { ...p.theme, ...(blueprint.theme || {}) }
    p.slides = (blueprint.slides || []).map((slide, idx) => makeTemplateSlide(slide, idx))
    p.createdAt = Date.now()
    p.updatedAt = Date.now()
    projects.value.push(p)
    persistProject(p)
    return p
  }

  function duplicateProject(id) {
    const src = projects.value.find(p => p.id === id)
    if (!src) return null
    const copy = JSON.parse(JSON.stringify(src))
    copy.id = uuid()
    copy.name = `${copy.name} (copy)`
    copy.createdAt = Date.now()
    copy.updatedAt = Date.now()
    // Reassign all IDs
    copy.slides = copy.slides.map(s => {
      s.id = uuid()
      s.elements = s.elements.map(e => ({ ...e, id: uuid() }))
      return s
    })
    projects.value.push(copy)
    persistProject(copy)
    return copy
  }

  function deleteProject(id) {
    const idx = projects.value.findIndex(p => p.id === id)
    if (idx !== -1) {
      projects.value.splice(idx, 1)
      removePersistedProject(id)
    }
  }

  function getProject(id) {
    return projects.value.find(p => p.id === id) || null
  }

  function updateProject(id, patch) {
    const idx = projects.value.findIndex(p => p.id === id)
    if (idx !== -1) {
      const nextPatch = { ...patch }
      if (patch?.settings) {
        nextPatch.settings = {
          ...patch.settings,
          ...normalizeCanvasSettings(patch.settings),
        }
        if (Object.prototype.hasOwnProperty.call(patch.settings, 'customBlocks')) {
          nextPatch.settings.customBlocks = normalizeContentBlocks(patch.settings.customBlocks)
        }
      }
      projects.value[idx] = { ...projects.value[idx], ...nextPatch, updatedAt: Date.now() }
      persistProject(projects.value[idx])
    }
  }

  // Slide operations
  function addSlide(projectId, afterIndex = -1) {
    const p = getProject(projectId)
    if (!p) return null
    const order = afterIndex >= 0 ? afterIndex + 1 : p.slides.length
    const slide = makeBlankSlide(order)
    if (afterIndex >= 0) {
      p.slides.splice(afterIndex + 1, 0, slide)
    } else {
      p.slides.push(slide)
    }
    p.slides.forEach((s, i) => { s.order = i })
    p.updatedAt = Date.now()
    persistProject(p)
    return slide
  }

  function deleteSlide(projectId, slideId) {
    const p = getProject(projectId)
    if (!p || p.slides.length <= 1) return
    const idx = p.slides.findIndex(s => s.id === slideId)
    if (idx !== -1) {
      p.slides.splice(idx, 1)
      p.slides.forEach((s, i) => { s.order = i })
      p.updatedAt = Date.now()
      persistProject(p)
    }
  }

  function duplicateSlide(projectId, slideId) {
    const p = getProject(projectId)
    if (!p) return null
    const src = p.slides.find(s => s.id === slideId)
    if (!src) return null
    const copy = JSON.parse(JSON.stringify(src))
    copy.id = uuid()
    copy.title = `${copy.title} (copy)`
    const idx = p.slides.findIndex(s => s.id === slideId)
    p.slides.splice(idx + 1, 0, copy)
    p.slides.forEach((s, i) => { s.order = i })
    p.updatedAt = Date.now()
    persistProject(p)
    return copy
  }

  function reorderSlides(projectId, from, to) {
    const p = getProject(projectId)
    if (!p) return
    const [moved] = p.slides.splice(from, 1)
    p.slides.splice(to, 0, moved)
    p.slides.forEach((s, i) => { s.order = i })
    p.updatedAt = Date.now()
    persistProject(p)
  }

  function updateSlide(projectId, slideId, patch) {
    const p = getProject(projectId)
    if (!p) return
    const s = p.slides.find(s => s.id === slideId)
    if (s) {
      Object.assign(s, patch)
      p.updatedAt = Date.now()
      persistProject(p)
    }
  }

  // Element operations
  function addElement(projectId, slideId, elementType, extra = {}) {
    const p = getProject(projectId)
    if (!p) return null
    const slide = p.slides.find(s => s.id === slideId)
    if (!slide) return null
    const maxZ = slide.elements.reduce((m, e) => Math.max(m, e.zIndex || 0), 0)
    const defaults = elementDefaults(elementType)
    const chartThemeDefaults = elementType === 'chart' ? buildThemeChartContent(p.theme || {}) : null
    const el = {
      id: uuid(),
      type: elementType,
      x: 100, y: 100,
      width: defaults.width, height: defaults.height,
      rotation: 0,
      zIndex: maxZ + 1,
      locked: false,
      visible: true,
      opacity: 1,
      ...defaults,
      ...(chartThemeDefaults ? { content: { ...defaults.content, ...chartThemeDefaults } } : {}),
      ...extra,
      interactions: [],
      animations: [],
    }
    slide.elements.push(el)
    p.updatedAt = Date.now()
    persistProject(p)
    return el
  }

  function updateElement(projectId, slideId, elementId, patch, options = {}) {
    const p = getProject(projectId)
    if (!p) return
    const slide = p.slides.find(s => s.id === slideId)
    if (!slide) return
    const el = slide.elements.find(e => e.id === elementId)
    if (el) {
      Object.assign(el, patch)
      p.updatedAt = Date.now()
      if (options.persist !== false) {
        persistProject(p)
      }
    }
  }

  function commitProject(projectId) {
    const p = getProject(projectId)
    if (!p) return
    p.updatedAt = Date.now()
    persistProject(p)
  }

  function deleteElement(projectId, slideId, elementId) {
    const p = getProject(projectId)
    if (!p) return
    const slide = p.slides.find(s => s.id === slideId)
    if (!slide) return
    const idx = slide.elements.findIndex(e => e.id === elementId)
    if (idx !== -1) {
      slide.elements.splice(idx, 1)
      p.updatedAt = Date.now()
      persistProject(p)
    }
  }

  function duplicateElement(projectId, slideId, elementId) {
    const p = getProject(projectId)
    if (!p) return null
    const slide = p.slides.find(s => s.id === slideId)
    if (!slide) return null
    const src = slide.elements.find(e => e.id === elementId)
    if (!src) return null
    const copy = JSON.parse(JSON.stringify(src))
    copy.id = uuid()
    copy.x += 20
    copy.y += 20
    copy.zIndex = src.zIndex + 1
    slide.elements.push(copy)
    p.updatedAt = Date.now()
    persistProject(p)
    return copy
  }

  function reorderElement(projectId, slideId, elementId, direction) {
    const p = getProject(projectId)
    if (!p) return
    const slide = p.slides.find(s => s.id === slideId)
    if (!slide) return
    const el = slide.elements.find(e => e.id === elementId)
    if (!el) return
    const allZ = slide.elements.map(e => e.zIndex).sort((a, b) => a - b)
    const curZ = el.zIndex
    if (direction === 'up') {
      const next = allZ.find(z => z > curZ)
      if (next !== undefined) {
        const other = slide.elements.find(e => e.zIndex === next)
        if (other) { other.zIndex = curZ; el.zIndex = next }
      }
    } else {
      const prev = [...allZ].reverse().find(z => z < curZ)
      if (prev !== undefined) {
        const other = slide.elements.find(e => e.zIndex === prev)
        if (other) { other.zIndex = curZ; el.zIndex = prev }
      }
    }
    p.updatedAt = Date.now()
    persistProject(p)
  }

  function getContentBlocks(projectId) {
    const project = getProject(projectId)
    const customBlocks = normalizeContentBlocks(project?.settings?.customBlocks)
    return [...getBuiltInContentBlocks(), ...customBlocks]
  }

  function insertContentBlock(projectId, slideId, blockRef, options = {}) {
    const project = getProject(projectId)
    if (!project) return []

    const slide = project.slides.find((item) => item.id === slideId)
    if (!slide) return []

    const block = typeof blockRef === 'string'
      ? getContentBlocks(projectId).find((item) => item.id === blockRef)
      : normalizeContentBlock(blockRef, blockRef?.id || uuid())

    if (!block?.elements?.length) return []

    const bounds = getBlockBounds(block.elements)
    const canvasWidth = Number(project.settings?.slideWidth || DEFAULT_CANVAS_WIDTH)
    const canvasHeight = Number(project.settings?.slideHeight || DEFAULT_CANVAS_HEIGHT)
    const originX = Number.isFinite(Number(options.x))
      ? Number(options.x)
      : Math.max(24, Math.round((canvasWidth - bounds.width) / 2))
    const originY = Number.isFinite(Number(options.y))
      ? Number(options.y)
      : Math.max(24, Math.round((canvasHeight - bounds.height) / 2))
    const offsetX = originX - bounds.minX
    const offsetY = originY - bounds.minY
    const maxZ = slide.elements.reduce((highest, element) => Math.max(highest, Number(element.zIndex || 0)), 0)

    const created = block.elements.map((element, index) => makeElement(element.type, {
      ...JSON.parse(JSON.stringify(element)),
      x: Number(element.x || 0) + offsetX,
      y: Number(element.y || 0) + offsetY,
      zIndex: maxZ + index + 1,
      content: { ...(element.content || {}) },
      styles: { ...(element.styles || {}) },
      interactions: Array.isArray(element.interactions) ? element.interactions.map((interaction) => ({ ...interaction })) : [],
      animations: Array.isArray(element.animations) ? element.animations.map((animation) => ({ ...animation })) : [],
    }))

    const bindingValues = options?.bindingValues && typeof options.bindingValues === 'object'
      ? options.bindingValues
      : {}

    ;(block.bindings || []).forEach((binding) => {
      const target = created[Number(binding.elementIndex || 0)]
      if (!target?.content || !binding?.contentKey) return

      const nextValue = Object.prototype.hasOwnProperty.call(bindingValues, binding.id)
        ? bindingValues[binding.id]
        : binding.defaultValue

      target.content = {
        ...target.content,
        [binding.contentKey]: String(nextValue ?? ''),
      }
    })

    slide.elements.push(...created)
    project.updatedAt = Date.now()
    persistProject(project)
    return created
  }

  function saveSelectionAsContentBlock(projectId, slideId, elementIds, blockMeta = {}) {
    const project = getProject(projectId)
    if (!project) return null

    const slide = project.slides.find((item) => item.id === slideId)
    if (!slide) return null

    const ids = Array.isArray(elementIds) ? elementIds : []
    const elements = ids
      .map((id) => slide.elements.find((element) => element.id === id))
      .filter(Boolean)
      .sort((a, b) => Number(a.zIndex || 0) - Number(b.zIndex || 0))

    if (!elements.length) return null

    const bounds = getBlockBounds(elements)
    const normalizedElements = elements.map((element, index) => {
      const clone = JSON.parse(JSON.stringify(element))
      delete clone.id
      return {
        ...clone,
        x: Number(element.x || 0) - bounds.minX,
        y: Number(element.y || 0) - bounds.minY,
        zIndex: index + 1,
      }
    })

    const nextBlock = normalizeContentBlock({
      id: uuid(),
      scope: 'custom',
      name: blockMeta.name,
      category: blockMeta.category || 'Custom',
      description: blockMeta.description || '',
      accent: blockMeta.accent || project.theme?.primaryColor || '#6c47ff',
      tags: Array.isArray(blockMeta.tags) ? blockMeta.tags : [],
      bindings: Array.isArray(blockMeta.bindings) ? blockMeta.bindings : buildSelectionBlockBindings(normalizedElements),
      elements: normalizedElements,
    })

    updateProject(projectId, {
      settings: {
        ...project.settings,
        customBlocks: [...normalizeContentBlocks(project.settings?.customBlocks), nextBlock],
      },
    })

    return nextBlock
  }

  function deleteContentBlock(projectId, blockId) {
    const project = getProject(projectId)
    if (!project || !blockId) return

    updateProject(projectId, {
      settings: {
        ...project.settings,
        customBlocks: normalizeContentBlocks(project.settings?.customBlocks).filter((block) => block.id !== blockId),
      },
    })
  }

  function exportProject(projectId) {
    const p = getProject(projectId)
    if (!p) return null
    return JSON.stringify(p, null, 2)
  }

  function importProject(json) {
    try {
      const p = JSON.parse(json)
      p.id = uuid()
      p.name = `${p.name} (imported)`
      p.createdAt = Date.now()
      p.updatedAt = Date.now()
      projects.value.push(p)
      persistProject(p)
      return p
    } catch { return null }
  }

  return {
    projects,
    sortedProjects,
    syncError,
    remoteSyncState,
    ensureRemoteProjectsLoaded,
    createProject,
    createProjectFromTemplate,
    duplicateProject,
    deleteProject,
    getProject,
    updateProject,
    addSlide,
    deleteSlide,
    duplicateSlide,
    reorderSlides,
    updateSlide,
    addElement,
    updateElement,
    commitProject,
    deleteElement,
    duplicateElement,
    reorderElement,
    getContentBlocks,
    insertContentBlock,
    saveSelectionAsContentBlock,
    deleteContentBlock,
    exportProject,
    importProject,
    makeBlankSlide,
    makeNewProject,
  }
})

function elementDefaults(type) {
  const map = {
    text: { width: 300, height: 80, content: { text: 'Click to edit text', fontSize: 18, fontFamily: 'Inter, sans-serif', fontWeight: 'normal', fontStyle: 'normal', textDecoration: 'none', textAlign: 'left', color: '#1a1a2e', lineHeight: 1.5, textTransform: 'none', letterSpacing: 0 }, styles: {} },
    heading: { width: 500, height: 80, content: { text: 'Heading', fontSize: 36, fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontStyle: 'normal', textDecoration: 'none', textAlign: 'center', color: '#1a1a2e', lineHeight: 1.2, textTransform: 'none', letterSpacing: 0 }, styles: {} },
    image: { width: 300, height: 200, content: { src: '', alt: '', objectFit: 'cover', borderRadius: 0, borderWidth: 0, borderColor: '#e2e8f0' }, styles: {} },
    shape: { width: 150, height: 100, content: { shapeType: 'rectangle', fillColor: '#6c47ff', borderColor: 'transparent', borderWidth: 0, borderRadius: 8, opacity: 1 }, styles: {} },
    button: { width: 160, height: 48, content: { label: 'Click Me', variant: 'primary', action: 'none', target: '', bgColor: '', textColor: '', borderColor: '', borderRadius: 8, fontSize: 15, fontWeight: 600, fontFamily: 'Inter, sans-serif', letterSpacing: 0 }, styles: {} },
    hotspot: { width: 60, height: 60, content: { icon: '?', bgColor: '#6c47ff', iconColor: '#ffffff', borderRadius: 999, tooltip: 'Click to learn more', popupContent: 'Add your content here...', popupTitle: 'Info', popupBgColor: '#ffffff', popupTextColor: '#1a1a2e' }, styles: {} },
    video: { width: 480, height: 270, content: { src: '', poster: '', autoplay: false, controls: true, loop: false, muted: false, objectFit: 'cover' }, styles: {} },
    audio: { width: 280, height: 56, content: { src: '', label: 'Audio Player', autoplay: false, controls: true, loop: false, bgColor: '#ede7ff', textColor: '#555555', accentColor: '#6c47ff' }, styles: {} },
    divider: { width: 400, height: 4, content: { color: '#e2e8f0', thickness: 2 }, styles: {} },
    quiz: { width: 480, height: 300, content: { question: 'Your question here?', options: ['Option A', 'Option B', 'Option C', 'Option D'], correctIndex: 0, explanation: '', cardBgColor: '#ffffff', questionColor: '#1a1a2e', accentColor: '#6c47ff' }, styles: {} },
    chart: { width: 420, height: 280, content: { chartType: 'bar', title: 'Quarterly Results', dataText: 'Q1, 120\nQ2, 180\nQ3, 150\nQ4, 210', paletteText: '#6c47ff, #06b6d4, #22c55e, #f59e0b', showLegend: true, showGrid: true, showValues: true, showArea: false, innerRadius: 62, strokeWidth: 3, maxValue: '', xAxisLabel: '', yAxisLabel: '', backgroundColor: '#ffffff', textColor: '#1a1a2e', gridColor: '#dbe3ef', borderColor: '#e2e8f0', borderWidth: 1 }, styles: {} },
    tabs: { width: 480, height: 260, content: { tabs: [{ id: '1', label: 'Tab 1', content: 'Content for the first tab...' }, { id: '2', label: 'Tab 2', content: 'Content for the second tab...' }, { id: '3', label: 'Tab 3', content: 'Content for the third tab...' }], activeTabColor: '#6c47ff', inactiveTabColor: '#f8fafc', contentBgColor: '#ffffff', textColor: '#1e293b' }, styles: {} },
    accordion: { width: 400, height: 300, content: { items: [{ id: '1', title: 'Section 1', content: 'Detailed information for section 1.' }, { id: '2', title: 'Section 2', content: 'Detailed information for section 2.' }, { id: '3', title: 'Section 3', content: 'Detailed information for section 3.' }], activeBgColor: '#f8fafc', activeColor: '#6c47ff', titleColor: '#0f172a', itemBgColor: '#ffffff', textColor: '#475569', allowAllClosed: true }, styles: {} },
    flipcard: { width: 300, height: 200, content: { frontTitle: 'Flashcard', frontContent: 'Click to reveal', backTitle: '', backContent: 'Hidden answer goes here...', frontBgColor: '#6c47ff', frontTextColor: '#ffffff', backBgColor: '#ffffff', backTextColor: '#1e293b', borderColor: '#e2e8f0', flipDirection: 'horizontal' }, styles: {} },
    stepper: { width: 480, height: 260, content: { steps: [{ id: '1', title: 'Step 1: Planning', content: 'Define the goals and scope of the project.' }, { id: '2', title: 'Step 2: Execution', content: 'Implement the strategy defined in step 1.' }, { id: '3', title: 'Step 3: Review', content: 'Analyze the results and iterate.' }], bgColor: '#ffffff', accentColor: '#6c47ff', titleColor: '#0f172a', textColor: '#475569' }, styles: {} },
    poll: { width: 480, height: 320, content: { question: 'What is your favorite topic?', options: [{ id: '1', text: 'Design', votes: 12 }, { id: '2', text: 'Development', votes: 24 }, { id: '3', text: 'Marketing', votes: 8 }], showResults: false, barColor: '#cbd5e1', barSelectedColor: '#6c47ff', trackColor: '#f1f5f9', textColor: '#1e293b', bgColor: '#ffffff' }, styles: {} },
    labeledimage: { width: 500, height: 360, content: { src: '', borderRadius: 8, markerColor: '#6c47ff', markerTextColor: '#ffffff', markers: [{ id: '1', x: 25, y: 35, label: '1', title: 'Key Subject', description: 'This highlights the main point of interest.' }, { id: '2', x: 75, y: 65, label: '2', title: 'Secondary Detail', description: 'Additional context can be found here.' }] }, styles: {} },
    matching: { width: 540, height: 300, content: { title: 'Match the concepts', bgColor: '#ffffff', titleColor: '#0f172a', accentColor: '#6c47ff', accentBgColor: '#f3f0ff', pairs: [{ id: '1', left: 'Apple', right: 'Fruit' }, { id: '2', left: 'Carrot', right: 'Vegetable' }, { id: '3', left: 'Dog', right: 'Animal' }] }, styles: {} },
    sorting: { width: 400, height: 340, content: { title: 'Sort from smallest to largest', bgColor: '#ffffff', titleColor: '#0f172a', accentColor: '#6c47ff', items: [{ id: '1', text: 'Pebble', correctOrder: 0 }, { id: '3', text: 'Boulder', correctOrder: 2 }, { id: '2', text: 'Rock', correctOrder: 1 }] }, styles: {} },
    progress: { width: 320, height: 140, content: { title: 'Your Progress', bgColor: '#ffffff', titleColor: '#0f172a', textColor: '#64748b', fillColor: '#10b981', borderRadius: 8, mockXP: 350, mockLevel: 4, mockPercent: 65 }, styles: {} },
    cloze: { width: 400, height: 180, content: { title: 'Fill in the blanks', text: 'An assessment should align closely with the [learning] objectives.', bgColor: '#ffffff', textColor: '#1e293b', fontSize: 16, borderRadius: 8 }, styles: {} },
    scenario: { width: 440, height: 320, content: { bgColor: '#f8fafc', borderRadius: 8, messages: [{ role: 'agent', text: 'Welcome to this scenario. What will you do first?' }, { role: 'user', text: 'I will analyze the requirements.' }] }, styles: {} },
  }
  return map[type] || map.text
}
