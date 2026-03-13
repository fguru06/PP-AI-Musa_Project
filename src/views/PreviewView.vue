<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projectStore'
import { useAuthStore } from '@/stores/authStore'
import { formatCanvasAspectRatio, getProjectCanvasSize, matchCanvasSizePreset } from '@/lib/canvas'
import ChartElement from '@/components/editor/elements/ChartElement.vue'
import TabsElement from '@/components/editor/elements/TabsElement.vue'
import AccordionElement from '@/components/editor/elements/AccordionElement.vue'
import FlipCardElement from '@/components/editor/elements/FlipCardElement.vue'
import StepperElement from '@/components/editor/elements/StepperElement.vue'
import PollElement from '@/components/editor/elements/PollElement.vue'
import LabeledImageElement from '@/components/editor/elements/LabeledImageElement.vue'
import MatchingElement from '@/components/editor/elements/MatchingElement.vue'
import SortingElement from '@/components/editor/elements/SortingElement.vue'
import ClozeElement from '@/components/editor/elements/ClozeElement.vue'
import ScenarioElement from '@/components/editor/elements/ScenarioElement.vue'
import ProgressElement from '@/components/editor/elements/ProgressElement.vue'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()
const authStore = useAuthStore()

const projectId = computed(() => route.params.id)
const project = computed(() => projectStore.getProject(projectId.value))
const slides = computed(() => [...(project.value?.slides || [])].sort((a, b) => a.order - b.order))
const presentationSettings = computed(() => ({
  autoPlay: false,
  loop: false,
  showProgress: true,
  showNavControls: true,
  allowKeyboardNav: true,
  ...(project.value?.settings || {}),
}))
const canvasSize = computed(() => getProjectCanvasSize(project.value))
const canvasPreset = computed(() => matchCanvasSizePreset(project.value))
const canvasAspectLabel = computed(() => formatCanvasAspectRatio(canvasSize.value.width, canvasSize.value.height))

const currentIndex = ref(0)
const containerRef = ref(null)
const scale = ref(1)
const showUI = ref(true)
const showGuideOverlay = ref(true)
let uiTimer = null
let autoAdvanceTimer = null

const currentSlide = computed(() => slides.value[currentIndex.value] || null)
const previewSource = computed(() => typeof route.query.from === 'string' ? route.query.from : 'dashboard')
const previewBackLabel = computed(() => previewSource.value === 'editor' ? 'Back to Editor' : 'Back to Dashboard')
const currentSlideElements = computed(() =>
  [...(currentSlide.value?.elements || [])].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
)
const slideTransitionName = computed(() => {
  switch (currentSlide.value?.transition) {
    case 'fade': return 'slide-fade'
    case 'slide': return 'slide-shift'
    case 'zoom': return 'slide-zoom'
    case 'flip': return 'slide-flip'
    default: return 'slide-fade'
  }
})
const currentSlideDurationMs = computed(() => Math.max(0, Number(currentSlide.value?.duration || 0)) * 1000)
const mediaAdvanceElementId = computed(() => {
  if (!currentSlide.value?.advanceOnMediaEnd) return null

  const elements = currentSlideElements.value.filter((element) => {
    if (!['video', 'audio'].includes(element.type)) return false
    const src = String(element.content?.src || '').trim()
    if (!src) return false
    if (element.type === 'video' && (src.includes('youtube') || src.includes('youtu.be') || src.includes('vimeo'))) {
      return false
    }
    return true
  })

  const autoplayElement = elements.find((element) => element.content?.autoplay)
  return autoplayElement?.id || elements[0]?.id || null
})
const canAutoAdvance = computed(() =>
  presentationSettings.value.autoPlay &&
  currentSlideDurationMs.value > 0 &&
  slides.value.length > 1 &&
  !mediaAdvanceElementId.value
)
const deckProgress = computed(() => {
  if (!slides.value.length) return 0
  return ((currentIndex.value + 1) / slides.value.length) * 100
})
const previewGuide = computed(() => {
  if (canvasPreset.value?.id === 'mobile') {
    return {
      tone: 'mobile',
      label: 'Mobile safe area',
      style: {
        inset: '5% 8%',
        borderRadius: '28px',
      },
    }
  }

  if (canvasPreset.value?.id === 'square') {
    return {
      tone: 'square',
      label: 'Square composition guide',
      style: {
        inset: '8%',
        borderRadius: '24px',
      },
    }
  }

  return null
})

function calcScale() {
  if (!containerRef.value) return
  const bw = containerRef.value.clientWidth
  const bh = containerRef.value.clientHeight
  scale.value = Math.min(bw / canvasSize.value.width, bh / canvasSize.value.height, 1.5)
}

function goNext() {
  if (currentIndex.value < slides.value.length - 1) {
    currentIndex.value++
    return
  }
  if (presentationSettings.value.loop) {
    currentIndex.value = 0
  }
}
function goPrev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    return
  }
  if (presentationSettings.value.loop) {
    currentIndex.value = slides.value.length - 1
  }
}
function goTo(i) {
  currentIndex.value = i
}

function advanceFromMedia(elementId) {
  if (!mediaAdvanceElementId.value || elementId !== mediaAdvanceElementId.value) return
  goNext()
}

function handleKey(e) {
  if (presentationSettings.value.allowKeyboardNav !== false) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault()
      goNext()
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      goPrev()
    }
  }
  if (e.key === 'Escape') exitPreview()
}

function goToEditor() {
  router.push({ name: 'editor', params: { id: projectId.value } })
}

function goToDashboard() {
  router.push({ name: 'dashboard' })
}

function exitPreview() {
  if (previewSource.value === 'editor') {
    goToEditor()
    return
  }
  goToDashboard()
}

function revealUI() {
  showUI.value = true
  clearTimeout(uiTimer)
  uiTimer = setTimeout(() => { showUI.value = false }, 3000)
}

function clearAutoAdvanceTimer() {
  clearTimeout(autoAdvanceTimer)
  autoAdvanceTimer = null
}

function scheduleAutoAdvance() {
  clearAutoAdvanceTimer()
  if (!canAutoAdvance.value) return
  autoAdvanceTimer = setTimeout(() => {
    goNext()
  }, currentSlideDurationMs.value)
}

const ro = new ResizeObserver(calcScale)

watch(
  () => authStore.isAuthReady,
  async (isReady) => {
    if (isReady) {
      if (authStore.user?.uid) {
        await projectStore.ensureRemoteProjectsLoaded()
      }
      if (!project.value) {
        router.push({ name: 'dashboard' })
        return
      }
    }
  },
  { immediate: true }
)

onMounted(() => {
  window.addEventListener('keydown', handleKey)
  if (containerRef.value) {
    ro.observe(containerRef.value)
    calcScale()
  }
  revealUI()
  scheduleAutoAdvance()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
  ro.disconnect()
  clearTimeout(uiTimer)
  clearAutoAdvanceTimer()
})

watch(
  [currentIndex, slides, currentSlideDurationMs, canAutoAdvance],
  () => {
    scheduleAutoAdvance()
  },
  { deep: true }
)

watch(canvasSize, () => {
  calcScale()
}, { deep: true })

watch(previewGuide, (guide) => {
  showGuideOverlay.value = Boolean(guide)
}, { immediate: true })

// Element rendering helpers
function slideBackground(slide) {
  if (!slide) return {}
  if (slide.backgroundType === 'gradient' && slide.backgroundGradient) {
    return { background: slide.backgroundGradient }
  }
  if (slide.backgroundType === 'image' && slide.backgroundImage) {
    return { backgroundImage: `url(${slide.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  return { backgroundColor: slide.background || '#1a1a2e' }
}

function elementStyle(el) {
  return {
    position: 'absolute',
    left: `${el.x}px`,
    top: `${el.y}px`,
    width: `${el.width}px`,
    height: `${el.height}px`,
    opacity: el.opacity ?? 1,
    transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
    overflow: 'hidden',
    pointerEvents: ['button', 'hotspot', 'quiz', 'poll', 'matching', 'sorting', 'cloze', 'scenario', 'progress', 'tabs', 'accordion', 'flipcard', 'stepper', 'labeledimage', 'audio', 'video'].includes(el.type) ? 'auto' : 'none',
  }
}

function elementMotionPreset(el) {
  const customAnimation = Array.isArray(el.animations) ? el.animations[0] : null
  const customType = customAnimation?.type || customAnimation?.name
  if (customType) {
    return customType
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
  }

  switch (el.type) {
    case 'heading': return 'fade-up-strong'
    case 'text': return 'fade-up'
    case 'image': return 'zoom-in'
    case 'shape': return 'soft-pop'
    case 'button': return 'pop-in'
    case 'quiz': return 'fade-up-strong'
    case 'hotspot': return 'pop-in'
    case 'video':
    case 'audio': return 'fade-up'
    default: return 'fade-up'
  }
}

function animatedElementStyle(el, index) {
  const baseStyle = elementStyle(el)
  const customAnimation = Array.isArray(el.animations) ? el.animations[0] : null
  const motionPreset = elementMotionPreset(el)
  const customDelay = customAnimation?.delay != null
    ? Math.max(0, Number(customAnimation.delay) || 0) * 1000
    : 0
  const staggerDelay = motionPreset === 'stagger-in' ? index * 140 : Math.min(index * 90, 720)
  const delay = customAnimation?.delay != null
    ? customDelay + (motionPreset === 'stagger-in' ? index * 140 : 0)
    : staggerDelay
  const duration = customAnimation?.duration != null
    ? Math.max(100, Number(customAnimation.duration) * 1000 || 640)
    : motionPreset === 'stagger-in' ? 720 : el.type === 'heading' ? 720 : el.type === 'image' ? 780 : 640

  return {
    ...baseStyle,
    '--enter-delay': `${delay}ms`,
    '--enter-duration': `${duration}ms`,
  }
}

// Quiz runtime state
const quizAnswers = ref({})  // elId -> selectedIndex
const quizSubmitted = ref({}) // elId -> true

function selectOption(elId, idx) {
  if (quizSubmitted.value[elId]) return
  quizAnswers.value[elId] = idx
}
function submitQuiz(el) {
  if (quizAnswers.value[el.id] === undefined) return
  quizSubmitted.value[el.id] = true
}
function retryQuiz(elId) {
  delete quizAnswers.value[elId]
  delete quizSubmitted.value[elId]
}

// Hotspot runtime state
const hotspotOpen = ref({})
function toggleHotspot(elId) {
  hotspotOpen.value[elId] = !hotspotOpen.value[elId]
}

// Interaction runtime state
const hiddenElements = ref({}) // store elements toggled to hide
const completedActivities = ref({})

function hasInteraction(el, trigger) {
  return el.interactions?.some(i => i.trigger === trigger)
}

function handleInteraction(el, trigger) {
  if (!el.interactions) return
  const evts = el.interactions.filter(i => i.trigger === trigger)
  evts.forEach(it => {
    runInteractionAction(it.action, it.value, el.id)
  })
}

function runInteractionAction(action, value, sourceId) {
  if (action === 'navigate') {
    if (value === 'next') goNext()
    else if (value === 'prev') goPrev()
    else {
      const idx = parseInt(value, 10)
      if (!isNaN(idx) && idx >= 0 && idx < slides.value.length) {
        goTo(idx)
      }
    }
  } else if (action === 'openUrl') {
    window.open(value, '_blank')
  } else if (action === 'showPopup') {
    alert(value) // simple temp replacement for a real popup
  } else if (action === 'playAudio') {
    // Note: robust audio requires an audio manager
  } else if (action === 'pauseVideo') {
    // Note: requires video refs tracking
  } else if (action === 'toggleElement') {
    if (value) {
      hiddenElements.value[value] = !hiddenElements.value[value]
    }
  } else if (action === 'completeActivity') {
    completedActivities.value[sourceId] = true
  }
}

// Reset states on slide change
watch(currentIndex, () => {
  hiddenElements.value = {}
  quizAnswers.value = {}
  quizSubmitted.value = {}
  completedActivities.value = {}
  
  setTimeout(() => {
    if (currentSlideElements.value) {
      currentSlideElements.value.forEach(el => {
        if (el.interactions) {
          el.interactions.filter(i => i.trigger === 'load').forEach(it => {
            runInteractionAction(it.action, it.value, el.id)
          })
        }
      })
    }
  }, 50)
}, { immediate: true })
</script>

<template>
  <div
    class="preview-root"
    @mousemove="revealUI"
    @click.self="revealUI"
  >
    <div class="preview-orb preview-orb-left"></div>
    <div class="preview-orb preview-orb-right"></div>
    <div class="preview-grid"></div>
    <div v-if="presentationSettings.showProgress !== false" class="preview-progress-track">
      <div class="preview-progress-bar" :style="{ width: `${deckProgress}%`, background: project?.theme?.primaryColor || '#6c47ff' }"></div>
    </div>

    <!-- Slide canvas container -->
    <div class="canvas-bg" ref="containerRef">
      <Transition :name="slideTransitionName" mode="out-in">
        <div class="preview-stage" v-if="currentSlide" :key="currentSlide.id">
          <div
            class="slide-canvas"
            :style="[
              slideBackground(currentSlide),
              {
                width: `${canvasSize.width}px`,
                height: `${canvasSize.height}px`,
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
              },
            ]"
          >
            <div
              v-if="previewGuide && showGuideOverlay"
              class="preview-guide"
              :class="`preview-guide-${previewGuide.tone}`"
              :style="previewGuide.style"
              aria-hidden="true"
            >
              <span class="preview-guide-label">{{ previewGuide.label }} · {{ canvasAspectLabel }}</span>
            </div>

            <!-- Elements -->
            <template v-for="(el, index) in currentSlideElements" :key="el.id">
              <div
                v-if="el.visible !== false && !hiddenElements[el.id]"
                :class="['preview-element', `motion-${elementMotionPreset(el)}`, { 'interactable': hasInteraction(el, 'click'), 'completed': completedActivities[el.id] }]"
                :style="animatedElementStyle(el, index)"
                @click="hasInteraction(el, 'click') ? handleInteraction(el, 'click') : null"
                @mouseenter="hasInteraction(el, 'hover') ? handleInteraction(el, 'hover') : null"
              >

            <!-- Text / Heading -->
            <div v-if="el.type === 'text' || el.type === 'heading'"
              class="el-text"
              :style="{
                fontSize: el.content.fontSize + 'px',
                color: el.content.color,
                fontFamily: el.content.fontFamily,
                fontWeight: el.content.bold ? '700' : (el.type==='heading' ? '700' : '400'),
                fontStyle: el.content.italic ? 'italic' : 'normal',
                textDecoration: el.content.underline ? 'underline' : 'none',
                textAlign: el.content.align,
                lineHeight: el.content.lineHeight || 1.4,
                letterSpacing: el.content.letterSpacing ? el.content.letterSpacing + 'px' : undefined,
                padding: '4px',
                width: '100%', height: '100%', boxSizing: 'border-box', display: 'flex', alignItems: 'center', wordBreak: 'break-word',
              }"
            >{{ el.content.text }}</div>

            <!-- Image -->
            <img v-else-if="el.type === 'image'"
              :src="el.content.src"
              :alt="el.content.alt"
              :style="{ width: '100%', height: '100%', objectFit: el.content.objectFit || 'cover', borderRadius: el.content.borderRadius ? el.content.borderRadius + 'px' : undefined }"
            />

            <!-- Shape -->
            <div v-else-if="el.type === 'shape'" style="width:100%;height:100%">
              <div v-if="el.content.shape === 'rectangle' || el.content.shape === 'circle'"
                :style="{
                  width: '100%', height: '100%',
                  backgroundColor: el.content.fillColor,
                  border: `${el.content.strokeWidth||0}px solid ${el.content.strokeColor||'transparent'}`,
                  borderRadius: el.content.shape === 'circle' ? '50%' : (el.content.borderRadius||0) + 'px',
                  boxSizing: 'border-box',
                }"
              />
              <svg v-else width="100%" height="100%" :viewBox="`0 0 ${el.width} ${el.height}`" preserveAspectRatio="xMidYMid meet">
                <polygon v-if="el.content.shape === 'triangle'"
                  :points="`${el.width/2} 0 ${el.width} ${el.height} 0 ${el.height}`"
                  :fill="el.content.fillColor" :stroke="el.content.strokeColor" :stroke-width="el.content.strokeWidth||0"
                />
                <polygon v-if="el.content.shape === 'diamond'"
                  :points="`${el.width/2} 0 ${el.width} ${el.height/2} ${el.width/2} ${el.height} 0 ${el.height/2}`"
                  :fill="el.content.fillColor" :stroke="el.content.strokeColor" :stroke-width="el.content.strokeWidth||0"
                />
              </svg>
            </div>

            <ChartElement v-else-if="el.type === 'chart'" :element="el" :theme="project?.theme || {}" />
            <TabsElement v-else-if="el.type === 'tabs'" :element="el" />
            <AccordionElement v-else-if="el.type === 'accordion'" :element="el" />
            <FlipCardElement v-else-if="el.type === 'flipcard'" :element="el" />
            <StepperElement v-else-if="el.type === 'stepper'" :element="el" />
            <PollElement v-else-if="el.type === 'poll'" :element="el" />
            <LabeledImageElement v-else-if="el.type === 'labeledimage'" :element="el" />
            <MatchingElement v-else-if="el.type === 'matching'" :element="el" />
            <SortingElement v-else-if="el.type === 'sorting'" :element="el" />
            <ClozeElement v-else-if="el.type === 'cloze'" :element="el" />
            <ScenarioElement v-else-if="el.type === 'scenario'" :element="el" />
            <ProgressElement v-else-if="el.type === 'progress'" :element="el" />

            <!-- Button -->
            <div v-else-if="el.type === 'button'" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
              <button
                :style="{
                  padding: '8px 20px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: (el.content.fontSize || 14) + 'px',
                  cursor: 'pointer',
                  border: '2px solid ' + (el.content.backgroundColor || '#5865f2'),
                  backgroundColor: el.content.variant === 'outline' || el.content.variant === 'ghost' ? 'transparent' : (el.content.backgroundColor || '#5865f2'),
                  color: el.content.variant === 'outline' || el.content.variant === 'ghost' ? (el.content.backgroundColor || '#5865f2') : (el.content.textColor || '#fff'),
                  fontFamily: el.content.fontFamily,
                }"
              >{{ el.content.label }}</button>
            </div>

            <!-- Hotspot -->
            <div v-else-if="el.type === 'hotspot'" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative;">
              <button
                class="hotspot-trigger"
                :style="{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: el.content.color || '#5865f2', border: '3px solid rgba(255,255,255,0.4)', color: '#fff', fontSize: '20px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }"
                @click="toggleHotspot(el.id)"
              >+</button>
              <Transition name="popup">
                <div v-if="hotspotOpen[el.id]" class="hotspot-popup"
                  :style="{ position: 'absolute', left: '60px', top: '0', background: '#fff', color: '#111', borderRadius: '8px', padding: '12px 16px', minWidth: '160px', maxWidth: '220px', boxShadow: '0 8px 24px rgba(0,0,0,.3)', zIndex: 10 }"
                >
                  <strong style="display:block;margin-bottom:4px;font-size:14px;">{{ el.content.title }}</strong>
                  <p style="font-size:13px;margin:0;line-height:1.5">{{ el.content.body }}</p>
                </div>
              </Transition>
            </div>

            <!-- Video -->
            <div v-else-if="el.type === 'video'" style="width:100%;height:100%;background:#000;border-radius:4px;overflow:hidden;">
              <iframe v-if="el.content.src && (el.content.src.includes('youtube') || el.content.src.includes('vimeo'))"
                :src="el.content.src"
                width="100%" height="100%" frameborder="0" allowfullscreen allow="autoplay"
              />
              <video
                v-else-if="el.content.src"
                :src="el.content.src"
                :controls="el.content.controls !== false"
                :autoplay="Boolean(el.content.autoplay)"
                :loop="Boolean(el.content.loop)"
                :muted="Boolean(el.content.muted)"
                style="width:100%;height:100%;object-fit:contain"
                @ended="advanceFromMedia(el.id)"
              />
              <div v-else style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#666;font-size:13px;">No video source</div>
            </div>

            <!-- Audio -->
            <div v-else-if="el.type === 'audio'" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px;padding:8px;box-sizing:border-box;">
              <span style="font-size:28px">🎵</span>
              <span style="font-size:12px;color:#aaa">{{ el.content.label || 'Audio' }}</span>
              <audio
                v-if="el.content.src"
                :src="el.content.src"
                :controls="el.content.controls !== false"
                :autoplay="Boolean(el.content.autoplay)"
                :loop="Boolean(el.content.loop)"
                style="width:100%;max-width:240px;"
                @ended="advanceFromMedia(el.id)"
              />
            </div>

            <!-- Quiz -->
            <div v-else-if="el.type === 'quiz'"
              style="width:100%;height:100%;padding:16px;box-sizing:border-box;background:rgba(0,0,0,.4);border-radius:6px;overflow:auto;"
            >
              <h4 style="margin:0 0 12px;font-size:15px;color:#fff;">{{ el.content.question }}</h4>
              <div style="display:flex;flex-direction:column;gap:8px;">
                <button
                  v-for="(opt, idx) in el.content.options" :key="idx"
                  @click="selectOption(el.id, idx)"
                  :style="{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: quizAnswers[el.id] === idx ? '2px solid #5865f2' : '1px solid rgba(255,255,255,.2)',
                    background: quizSubmitted[el.id]
                      ? idx === el.content.correctIndex ? 'rgba(87,242,135,.2)' : quizAnswers[el.id] === idx ? 'rgba(237,66,69,.2)' : 'rgba(255,255,255,.05)'
                      : quizAnswers[el.id] === idx ? 'rgba(88,101,242,.3)' : 'rgba(255,255,255,.05)',
                    color: '#fff',
                    textAlign: 'left',
                    cursor: quizSubmitted[el.id] ? 'default' : 'pointer',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                  }"
                >{{ opt }}</button>
              </div>
              <div v-if="!quizSubmitted[el.id]" style="margin-top:12px;">
                <button
                  @click="submitQuiz(el)"
                  :disabled="quizAnswers[el.id] === undefined"
                  style="padding:6px 16px;background:#5865f2;border:none;border-radius:6px;color:#fff;font-size:13px;cursor:pointer;font-family:inherit;"
                >Submit</button>
              </div>
              <div v-else style="margin-top:12px;">
                <p :style="{ color: quizAnswers[el.id] === el.content.correctIndex ? '#57f287' : '#ed4245', fontWeight: 600, fontSize: '13px', margin: '0 0 4px' }">
                  {{ quizAnswers[el.id] === el.content.correctIndex ? '✓ Correct!' : '✗ Incorrect' }}
                </p>
                <p v-if="el.content.explanation" style="font-size:12px;color:#ccc;margin:0 0 8px">{{ el.content.explanation }}</p>
                <button @click="retryQuiz(el.id)" style="padding:4px 12px;background:transparent;border:1px solid rgba(255,255,255,.3);border-radius:4px;color:#ccc;font-size:12px;cursor:pointer;font-family:inherit;">Try Again</button>
              </div>
            </div>

              </div>
            </template>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Navigation UI (fades on idle) -->
    <Transition name="ui-fade">
      <div class="preview-ui" v-show="showUI">
        <!-- Top bar -->
        <div class="preview-topbar">
          <button class="ui-btn" @click="exitPreview">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            {{ previewBackLabel }}
          </button>
          <div class="preview-topbar-center">
            <span class="preview-title">{{ project?.name }}</span>
            <button v-if="previewGuide" class="guide-toggle-btn" @click="showGuideOverlay = !showGuideOverlay">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                <path d="M8 8h8v8H8z"></path>
              </svg>
              {{ showGuideOverlay ? 'Hide Guide' : 'Show Guide' }}
            </button>
          </div>
          <span class="slide-counter">{{ currentIndex + 1 }} / {{ slides.length }}</span>
        </div>

        <!-- Side nav buttons -->
        <button v-if="presentationSettings.showNavControls !== false" class="nav-btn nav-btn-left" @click="goPrev" :disabled="!presentationSettings.loop && currentIndex === 0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button v-if="presentationSettings.showNavControls !== false" class="nav-btn nav-btn-right" @click="goNext" :disabled="!presentationSettings.loop && currentIndex === slides.length - 1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        <!-- Dot nav -->
        <div v-if="presentationSettings.showNavControls !== false" class="dot-nav">
          <button
            v-for="(s, i) in slides" :key="s.id"
            :class="['dot', i === currentIndex && 'active']"
            @click="goTo(i)"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.preview-root {
  width: 100vw;
  height: 100vh;
  background:
    radial-gradient(circle at 18% 18%, rgba(139, 92, 246, 0.24), transparent 20%),
    radial-gradient(circle at 82% 72%, rgba(59, 130, 246, 0.18), transparent 24%),
    linear-gradient(180deg, #08101f, #040812 58%, #02050b);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.preview-orb,
.preview-grid {
  position: absolute;
  pointer-events: none;
}

.preview-orb {
  border-radius: 999px;
  filter: blur(16px);
}

.preview-orb-left {
  top: -140px;
  left: -80px;
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.16), transparent 70%);
}

.preview-orb-right {
  right: -120px;
  bottom: -160px;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.18), transparent 72%);
}

.preview-grid {
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at center, rgba(0,0,0,0.55), transparent 88%);
}

.preview-progress-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.08);
  z-index: 24;
}

.preview-progress-bar {
  height: 100%;
  transition: width 220ms ease;
  box-shadow: 0 0 18px rgba(255,255,255,0.18);
}

.canvas-bg {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.preview-stage {
  position: relative;
  padding: 18px;
  border-radius: 32px;
  background: linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 30px 80px rgba(0,0,0,.34);
}

.preview-stage::before {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.08);
  pointer-events: none;
}

.slide-canvas {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  box-shadow: 0 30px 90px rgba(0,0,0,.5);
}
.preview-guide {
  position: absolute;
  border: 2px dashed rgba(255,255,255,.72);
  pointer-events: none;
  z-index: 4;
}
.preview-guide-mobile {
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
}
.preview-guide-square {
  background: linear-gradient(180deg, rgba(108,71,255,.08), rgba(108,71,255,.03));
}
.preview-guide-label {
  position: absolute;
  top: 10px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(10, 16, 31, 0.78);
  color: rgba(255,255,255,.88);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .05em;
  text-transform: uppercase;
}

.preview-element {
  animation-duration: var(--enter-duration, 640ms);
  animation-delay: var(--enter-delay, 0ms);
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform, filter;
  transition: filter 0.2s, transform 0.2s;
}
.preview-element.interactable {
  cursor: pointer;
}
.preview-element.interactable:hover {
  filter: brightness(0.95);
  transform: scale(1.02);
}
.preview-element.completed::after {
  content: '✓';
  position: absolute;
  top: -10px;
  right: -10px;
  background: #10b981;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 10;
  animation: pop-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.motion-fade-up {
  animation-name: motion-fade-up;
}

.motion-fade-up-strong {
  animation-name: motion-fade-up-strong;
}

.motion-fade-left {
  animation-name: motion-fade-left;
}

.motion-fade-right {
  animation-name: motion-fade-right;
}

.motion-zoom-in {
  animation-name: motion-zoom-in;
}

.motion-soft-pop,
.motion-pop-in {
  animation-name: motion-pop-in;
}

.motion-stagger-in {
  animation-name: motion-stagger-in;
}

/* Preview UI */
.preview-ui {
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 20;
}
.preview-ui > * { pointer-events: auto; }

.preview-topbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: linear-gradient(to bottom, rgba(2,8,25,.78), rgba(2,8,25,.34), transparent);
}
.preview-topbar-center {
  display: flex;
  align-items: center;
  gap: 10px;
}
.ui-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 999px;
  color: #fff;
  font-size: 13px;
  font-family: inherit;
  padding: 8px 16px;
  cursor: pointer;
  transition: background .2s, transform .2s;
}
.ui-btn:hover { background: rgba(255,255,255,.18); transform: translateY(-1px); }
.guide-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.08);
  color: rgba(255,255,255,.82);
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  transition: background .2s, transform .2s, color .2s;
}
.guide-toggle-btn:hover {
  background: rgba(255,255,255,.16);
  color: #fff;
  transform: translateY(-1px);
}
.preview-title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: .01em;
  color: #fff;
}
.slide-counter {
  font-size: 13px;
  color: rgba(255,255,255,.74);
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  padding: 6px 12px;
  border-radius: 20px;
}

.nav-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.18);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .2s, opacity .2s, transform .2s;
}
.nav-btn:disabled { opacity: .2; cursor: default; }
.nav-btn:not(:disabled):hover { background: rgba(255,255,255,.2); transform: translateY(-50%) scale(1.04); }
.nav-btn-left { left: 28px; }
.nav-btn-right { right: 28px; }

.dot-nav {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}
.dot {
  width: 10px;
  height: 8px;
  border-radius: 999px;
  background: rgba(255,255,255,.3);
  border: none;
  cursor: pointer;
  transition: background .2s, transform .2s;
  padding: 0;
}
.dot.active { width: 28px; background: #fff; transform: scale(1); }

/* Transitions */
.ui-fade-enter-active, .ui-fade-leave-active { transition: opacity .4s; }
.ui-fade-enter-from, .ui-fade-leave-to { opacity: 0; }

.slide-fade-enter-active,
.slide-fade-leave-active,
.slide-shift-enter-active,
.slide-shift-leave-active,
.slide-zoom-enter-active,
.slide-zoom-leave-active,
.slide-flip-enter-active,
.slide-flip-leave-active {
  transition: opacity 340ms ease, transform 520ms cubic-bezier(0.22, 1, 0.36, 1), filter 420ms ease;
}

.slide-fade-enter-from,
.slide-shift-enter-from,
.slide-zoom-enter-from,
.slide-flip-enter-from {
  opacity: 0;
}

.slide-fade-leave-to,
.slide-shift-leave-to,
.slide-zoom-leave-to,
.slide-flip-leave-to {
  opacity: 0;
}

.slide-shift-enter-from {
  transform: translateX(44px);
  filter: blur(8px);
}

.slide-shift-leave-to {
  transform: translateX(-36px);
  filter: blur(10px);
}

.slide-zoom-enter-from {
  transform: scale(0.94);
  filter: blur(8px);
}

.slide-zoom-leave-to {
  transform: scale(1.03);
  filter: blur(10px);
}

.slide-flip-enter-from {
  transform: perspective(1200px) rotateY(10deg) scale(0.98);
  filter: blur(6px);
}

.slide-flip-leave-to {
  transform: perspective(1200px) rotateY(-8deg) scale(1.01);
  filter: blur(8px);
}

@keyframes motion-fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes motion-fade-up-strong {
  from {
    opacity: 0;
    transform: translateY(28px);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes motion-zoom-in {
  from {
    opacity: 0;
    transform: scale(0.92);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
}

@keyframes motion-fade-left {
  from {
    opacity: 0;
    transform: translateX(-26px);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

@keyframes motion-fade-right {
  from {
    opacity: 0;
    transform: translateX(26px);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0);
  }
}

@keyframes motion-pop-in {
  from {
    opacity: 0;
    transform: scale(0.88) translateY(12px);
  }
  60% {
    opacity: 1;
    transform: scale(1.02) translateY(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes motion-stagger-in {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
    filter: blur(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

.popup-enter-active, .popup-leave-active { transition: opacity .2s, transform .2s; }
.popup-enter-from, .popup-leave-to { opacity: 0; transform: translateX(-6px); }

.hotspot-trigger:hover { transform: scale(1.1); transition: transform .2s; }

.el-text {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

@media (max-width: 900px) {
  .preview-stage {
    padding: 10px;
    border-radius: 20px;
  }

  .preview-topbar {
    height: auto;
    min-height: 52px;
    padding: 10px 12px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .preview-title {
    order: 3;
    width: 100%;
    text-align: center;
    font-size: 13px;
  }

  .nav-btn {
    width: 38px;
    height: 38px;
  }

  .nav-btn-left { left: 10px; }
  .nav-btn-right { right: 10px; }

  .dot-nav {
    bottom: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .preview-element,
  .slide-fade-enter-active,
  .slide-fade-leave-active,
  .slide-shift-enter-active,
  .slide-shift-leave-active,
  .slide-zoom-enter-active,
  .slide-zoom-leave-active,
  .slide-flip-enter-active,
  .slide-flip-leave-active {
    animation: none !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
  }
}
</style>
