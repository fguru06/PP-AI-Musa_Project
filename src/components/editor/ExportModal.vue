<script setup>
import { computed, ref, watch } from 'vue'
import JSZip from 'jszip'
import Modal from '@/components/common/Modal.vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'
import { useAuthStore } from '@/stores/authStore'
import { getProjectCanvasSize } from '@/lib/canvas'
import { buildChartModel } from '@/lib/chart'

const editorStore = useEditorStore()
const projectStore = useProjectStore()
const authStore = useAuthStore()

const project = computed(() => projectStore.getProject(editorStore.projectId))
const activeTab = ref('json') // 'json' | 'html' | 'scorm'
const exportStatus = ref('') // '' | 'success' | 'error' | 'processing'

const exportFileName = ref('')
const exportIncludeAssets = ref(true)

watch(project, (p) => {
  if (p && !exportFileName.value) {
    exportFileName.value = p.name || 'presentation'
  }
}, { immediate: true })

function exportJSON() {
  const json = projectStore.exportProject(editorStore.projectId)
  if (!json) return
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${exportFileName.value || 'project'}.mediasurf.json`
  a.click()
  URL.revokeObjectURL(url)
  exportStatus.value = 'success'
  setTimeout(() => exportStatus.value = '', 3000)
}

function sanitizeExportName(name, fallback = 'presentation') {
  const value = String(name || fallback).trim()
  return value.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, ' ').trim() || fallback
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
}

function buildRuntimeCSS(theme, settings, mode = 'html') {
  const canvasSize = getProjectCanvasSize(settings)
  return `
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; }
:root {
  --lf-slide-width: ${canvasSize.width}px;
  --lf-slide-height: ${canvasSize.height}px;
}
body {
  min-height: 100vh;
  font-family: ${theme?.fontFamily || 'Inter, sans-serif'};
  background: ${mode === 'pdf'
    ? '#f3f4f6'
    : `
    radial-gradient(circle at 18% 18%, rgba(108, 71, 255, 0.24), transparent 22%),
    radial-gradient(circle at 82% 72%, rgba(0, 201, 167, 0.18), transparent 28%),
    linear-gradient(180deg, #08101f 0%, #050916 62%, #02050b 100%)`};
  color: ${mode === 'pdf' ? '#111827' : '#ffffff'};
  display: ${mode === 'pdf' ? 'block' : 'flex'};
  align-items: ${mode === 'pdf' ? 'stretch' : 'center'};
  justify-content: ${mode === 'pdf' ? 'flex-start' : 'center'};
  overflow: ${mode === 'pdf' ? 'auto' : 'hidden'};
  padding: ${mode === 'pdf' ? '24px 0' : '0'};
}
.lf-shell {
  width: ${mode === 'pdf' ? '100%' : '100vw'};
  min-height: ${mode === 'pdf' ? 'auto' : '100vh'};
  height: ${mode === 'pdf' ? 'auto' : '100vh'};
  position: relative;
  display: flex;
  align-items: ${mode === 'pdf' ? 'stretch' : 'center'};
  justify-content: center;
  overflow: ${mode === 'pdf' ? 'visible' : 'hidden'};
}
.lf-shell::before,
.lf-shell::after {
  content: '';
  position: absolute;
  border-radius: 999px;
  filter: blur(24px);
  pointer-events: none;
}
.lf-shell::before {
  width: 420px;
  height: 420px;
  top: -120px;
  left: -80px;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.18), transparent 72%);
}
.lf-shell::after {
  width: 520px;
  height: 520px;
  right: -160px;
  bottom: -200px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.22), transparent 72%);
}
.lf-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at center, rgba(0,0,0,0.65), transparent 88%);
  pointer-events: none;
}
.lf-stage-shell {
  position: relative;
  z-index: 1;
  width: ${mode === 'pdf' ? '100%' : 'auto'};
  max-width: ${mode === 'pdf' ? 'none' : 'auto'};
  padding: ${mode === 'pdf' ? '0' : '18px'};
  border-radius: ${mode === 'pdf' ? '0' : '32px'};
  background: ${mode === 'pdf' ? 'transparent' : 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))'};
  border: ${mode === 'pdf' ? 'none' : '1px solid rgba(255,255,255,0.12)'};
  box-shadow: ${mode === 'pdf' ? 'none' : '0 30px 80px rgba(0,0,0,.34)'};
}
.lf-stage-shell::before {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.08);
  pointer-events: none;
}
.presentation {
  position: relative;
  width: ${mode === 'pdf' ? '100%' : 'var(--lf-slide-width)'};
  height: ${mode === 'pdf' ? 'auto' : 'var(--lf-slide-height)'};
  border-radius: ${mode === 'pdf' ? '0' : '18px'};
  overflow: ${mode === 'pdf' ? 'visible' : 'hidden'};
  box-shadow: ${mode === 'pdf' ? 'none' : '0 30px 90px rgba(0,0,0,.5)'};
  transform-origin: center center;
  display: ${mode === 'pdf' ? 'flex' : 'block'};
  flex-direction: ${mode === 'pdf' ? 'column' : 'row'};
  align-items: ${mode === 'pdf' ? 'center' : 'stretch'};
  gap: ${mode === 'pdf' ? '24px' : '0'};
}
.slide {
  position: ${mode === 'pdf' ? 'relative' : 'absolute'};
  inset: ${mode === 'pdf' ? 'auto' : '0'};
  display: ${mode === 'pdf' ? 'block' : 'none'};
  overflow: hidden;
  color: ${theme?.textColor || '#1a1a2e'};
  width: var(--lf-slide-width);
  height: var(--lf-slide-height);
  flex: 0 0 auto;
  background-clip: padding-box;
  box-shadow: ${mode === 'pdf' ? '0 12px 32px rgba(15, 23, 42, 0.16)' : 'none'};
  page-break-after: ${mode === 'pdf' ? 'always' : 'auto'};
  break-after: ${mode === 'pdf' ? 'page' : 'auto'};
}
.slide.active { display: block; }
.slide:last-child {
  page-break-after: auto;
  break-after: auto;
}
.lf-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: rgba(255,255,255,.72);
  font-size: 16px;
  background: rgba(255,255,255,.06);
}
.lf-el {
  position: absolute;
  box-sizing: border-box;
}
.lf-el-content {
  width: 100%;
  height: 100%;
}
.lf-text {
  width: 100%;
  height: 100%;
  padding: 4px;
  display: flex;
  align-items: center;
  overflow: hidden;
  word-break: break-word;
  white-space: pre-wrap;
}
.lf-image,
.lf-video,
.lf-video iframe,
.lf-video video {
  width: 100%;
  height: 100%;
}
.lf-video {
  background: #000;
  border-radius: 10px;
  overflow: hidden;
}
.lf-button-wrap,
.lf-chart-wrap,
.lf-divider-wrap,
.lf-audio-wrap {
  width: 100%;
  height: 100%;
}
.lf-chart-wrap {
  border-radius: 16px;
  overflow: hidden;
}
.lf-chart {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px 12px 10px;
  border-radius: 16px;
}
.lf-chart-title {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.2;
}
.lf-chart-svg {
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: visible;
}
.lf-chart-axis,
.lf-chart-value,
.lf-chart-center-label,
.lf-chart-center-value {
  font-family: inherit;
}
.lf-chart-axis {
  font-size: 10px;
  opacity: .78;
}
.lf-chart-value {
  font-size: 10px;
  font-weight: 700;
}
.lf-chart-center-value {
  font-size: 18px;
  font-weight: 800;
}
.lf-chart-center-label {
  font-size: 10px;
  opacity: .72;
  text-transform: uppercase;
  letter-spacing: .08em;
}
.lf-chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  margin-top: 8px;
}
.lf-chart-legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  font-size: 10px;
}
.lf-chart-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  flex: 0 0 auto;
}
.lf-chart-legend-label {
  max-width: 9ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: .82;
}
.lf-chart-legend-value {
  font-weight: 700;
}
.lf-button {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 16px;
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease;
}
.lf-button:hover { transform: translateY(-1px); }
.lf-button:focus-visible,
.lf-hotspot-btn:focus-visible,
.nav-btn:focus-visible,
.dot:focus-visible,
.lf-quiz-submit:focus-visible,
.lf-quiz-reset:focus-visible,
.lf-quiz-option:focus-visible {
  outline: 2px solid rgba(255,255,255,.9);
  outline-offset: 2px;
}
.lf-hotspot-btn {
  width: 100%;
  height: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(15, 23, 42, .26);
}
.lf-hotspot-popup {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 12px);
  transform: translateX(-50%) translateY(6px);
  min-width: 220px;
  max-width: 300px;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, .08);
  box-shadow: 0 24px 48px rgba(15, 23, 42, .22);
  opacity: 0;
  visibility: hidden;
  transition: opacity .16s ease, transform .16s ease, visibility .16s ease;
  z-index: 20;
  overflow: hidden;
}
.lf-hotspot-popup.is-open {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}
.lf-hotspot-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(15, 23, 42, .08);
}
.lf-hotspot-title {
  font-size: 14px;
  font-weight: 700;
}
.lf-hotspot-close {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}
.lf-hotspot-body {
  padding: 12px 14px 14px;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre-wrap;
}
.lf-audio-card {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
}
.lf-audio-icon {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}
.lf-audio-label {
  min-width: 0;
  flex: 0 0 auto;
  max-width: 180px;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.lf-audio-player {
  flex: 1;
  min-width: 120px;
}
.lf-divider {
  width: 100%;
  height: 100%;
  margin: 0;
  border: none;
}
.lf-tabs {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
.lf-tabs-header {
  display: flex;
  border-bottom: 1px solid #e2e8f0;
}
.lf-tab-btn {
  flex: 1;
  padding: 10px 12px;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  background: transparent;
  border-top: none;border-left: none;border-right: none;
  font-family: inherit;
}
.lf-tab-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.lf-accordion {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
}
.lf-accordion-item {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}
.lf-accordion-header {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s;
}
.lf-accordion-content {
  padding: 0 16px 16px 16px;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
}
.lf-flipcard {
  width: 100%;
  height: 100%;
  perspective: 1000px;
  cursor: pointer;
}
.lf-flipcard-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.lf-flipcard-front, .lf-flipcard-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 12px;
}
.lf-stepper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}
.lf-stepper-header {
  padding: 16px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.lf-step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}
.lf-step-line {
  width: 32px;
  height: 2px;
  transition: all 0.3s;
}
.lf-stepper-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.lf-stepper-footer {
  padding: 12px 24px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.lf-stepper-btn {
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  font-family: inherit;
  border: 1px solid #e2e8f0;
}
.lf-stepper-btn[disabled] { opacity: 0.5; }

.lf-quiz {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid rgba(15, 23, 42, .08);
  border-radius: 14px;
  overflow: auto;
  box-shadow: 0 14px 34px rgba(15, 23, 42, .08);
}
.lf-quiz-question {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
}
.lf-quiz-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.lf-quiz-option {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1.5px solid #dbe3ef;
  background: rgba(255,255,255,.92);
  text-align: left;
  cursor: pointer;
  transition: border-color .16s ease, background .16s ease, transform .16s ease;
}
.lf-quiz-option:hover:not([disabled]) {
  transform: translateY(-1px);
}
.lf-quiz-option.selected {
  background: rgba(108, 71, 255, .12);
}
.lf-quiz-option.correct {
  border-color: #16a34a;
  background: rgba(22, 163, 74, .10);
  color: #14532d;
}
.lf-quiz-option.wrong {
  border-color: #ef4444;
  background: rgba(239, 68, 68, .10);
  color: #991b1b;
}
.lf-quiz-option[disabled] {
  cursor: default;
}
.lf-quiz-letter {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: rgba(15, 23, 42, .08);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex: 0 0 auto;
}
.lf-quiz-text {
  flex: 1;
}
.lf-quiz-actions {
  display: flex;
  gap: 10px;
  margin-top: 2px;
}
.lf-quiz-submit,
.lf-quiz-reset {
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}
.lf-quiz-submit[disabled] {
  opacity: .45;
  cursor: not-allowed;
}
.lf-quiz-feedback {
  display: none;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.5;
}
.lf-quiz-feedback.show { display: block; }
.lf-quiz-feedback.correct {
  background: rgba(22, 163, 74, .12);
  color: #166534;
}
.lf-quiz-feedback.wrong {
  background: rgba(239, 68, 68, .12);
  color: #991b1b;
}
.nav {
  position: fixed;
  left: 50%;
  bottom: 22px;
  transform: translateX(-50%);
  display: ${settings?.showNavControls === false ? 'none' : 'flex'};
  align-items: center;
  gap: 12px;
  z-index: 5;
}
.nav-btn {
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.1);
  color: #fff;
  min-width: 92px;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  backdrop-filter: blur(10px);
  transition: background .18s ease, opacity .18s ease, transform .18s ease;
}
.nav-btn:hover:not(:disabled) {
  background: rgba(255,255,255,.18);
  transform: translateY(-1px);
}
.nav-btn:disabled {
  opacity: .3;
  cursor: default;
}
.nav-counter {
  min-width: 74px;
  text-align: center;
  color: rgba(255,255,255,.76);
  font-size: 13px;
}
.dot-nav {
  position: fixed;
  left: 50%;
  bottom: 74px;
  transform: translateX(-50%);
  display: ${settings?.showNavControls === false ? 'none' : 'flex'};
  align-items: center;
  gap: 8px;
  z-index: 5;
}
.dot {
  width: 10px;
  height: 8px;
  border-radius: 999px;
  border: none;
  padding: 0;
  background: rgba(255,255,255,.28);
  cursor: pointer;
  transition: width .18s ease, background .18s ease;
}
.dot.active {
  width: 30px;
  background: #ffffff;
}
.progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: 0;
  background: ${theme?.primaryColor || '#6c47ff'};
  transition: width .22s ease;
  display: ${settings?.showProgress === false ? 'none' : 'block'};
  z-index: 6;
}
${mode === 'iframe' ? `
body {
  background: transparent;
}
.lf-shell::before,
.lf-shell::after,
.lf-grid {
  display: none;
}
.lf-stage-shell {
  padding: 0;
  border: none;
  background: transparent;
  box-shadow: none;
}
.lf-stage-shell::before {
  display: none;
}
.presentation {
  box-shadow: none;
}
` : ''}
${mode === 'pdf' ? `
.lf-shell::before,
.lf-shell::after,
.lf-grid,
.progress,
.dot-nav,
.nav {
  display: none !important;
}
.lf-stage-shell::before {
  display: none;
}
@page {
  size: auto;
  margin: 12mm;
}
@media print {
  html, body {
    min-height: auto;
    background: #ffffff;
  }
  body {
    padding: 0;
    overflow: visible;
  }
  .lf-shell,
  .lf-stage-shell,
  .presentation {
    width: 100%;
    min-height: auto;
    overflow: visible;
  }
  .presentation {
    gap: 0;
  }
  .slide {
    margin: 0 auto;
    box-shadow: none;
  }
}
` : ''}
@media (max-width: 900px) {
  .lf-stage-shell {
    padding: 10px;
    border-radius: 20px;
  }
  .dot-nav { bottom: 66px; }
  .nav { bottom: 12px; }
  .nav-btn {
    min-width: 78px;
    padding: 9px 14px;
  }
}
`
}

function buildRuntimeJS(mode = 'html') {
  return `
(function () {
  var exportMode = ${JSON.stringify(mode)};
  var dataNode = document.getElementById('lf-data');
  if (!dataNode) return;

  var project;
  try {
    project = JSON.parse(dataNode.textContent || '{}');
  } catch (error) {
    console.error('MediaSurf export could not read project data.', error);
    var mountError = document.getElementById('presentation');
    if (mountError) mountError.innerHTML = '<div class="lf-empty">Unable to load exported slides.</div>';
    return;
  }

  var slides = Array.isArray(project.slides)
    ? project.slides.slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); })
    : [];
  var settings = project.settings || {};
  var theme = project.theme || {};
  var state = { current: 0, timer: null, mediaCleanup: null };
  var slideLookup = {};
  var slideNodes = [];

  var mount = document.getElementById('presentation');
  var counter = document.getElementById('counter');
  var progress = document.getElementById('progress');
  var prevBtn = document.getElementById('prev-btn');
  var nextBtn = document.getElementById('next-btn');
  var dotNav = document.getElementById('dot-nav');

  slides.forEach(function (slide, index) {
    slideLookup[slide.id] = index;
    var node = renderSlide(slide, index);
    mount.appendChild(node);
    slideNodes.push(node);
  });

  if (!slideNodes.length) {
    mount.innerHTML = '<div class="lf-empty">This export has no slides.</div>';
    if (counter) counter.textContent = '0 / 0';
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    return;
  }

  if (exportMode === 'pdf') {
    slideNodes.forEach(function (node) {
      node.classList.add('active');
      triggerLoadInteractions(node);
    });
    queuePrint();
    return;
  }

  renderDots();

  if (prevBtn) prevBtn.addEventListener('click', function () { prev(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { next(); });

  if (settings.allowKeyboardNav !== false) {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === ' ') {
        event.preventDefault();
        next();
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        prev();
      }
    });
  }

  document.addEventListener('click', function (event) {
    if (event.target.closest('.lf-hotspot-btn') || event.target.closest('.lf-hotspot-popup')) return;
    document.querySelectorAll('.lf-hotspot-popup.is-open').forEach(function (popup) {
      popup.classList.remove('is-open');
    });
  });

  window.addEventListener('resize', resizeStage);
  resizeStage();
  show(0);

  function resizeStage() {
    var stage = document.getElementById('presentation');
    if (!stage) return;
    if (exportMode === 'pdf') {
      stage.style.transform = 'none';
      return;
    }
    var slideWidth = Math.max(320, Number(settings.slideWidth || 960));
    var slideHeight = Math.max(320, Number(settings.slideHeight || 540));
    var availableWidth = Math.max(240, window.innerWidth - 72);
    var availableHeight = Math.max(240, window.innerHeight - 72);
    var scale = Math.min(availableWidth / slideWidth, availableHeight / slideHeight, 1.5);
    stage.style.transform = 'scale(' + scale + ')';
  }

  function queuePrint() {
    var images = Array.prototype.filter.call(document.images || [], function (image) {
      return !image.complete;
    });
    var didPrint = false;

    function triggerPrint() {
      if (didPrint) return;
      didPrint = true;
      window.setTimeout(function () {
        window.focus();
        window.print();
      }, 300);
    }

    if (!images.length) {
      triggerPrint();
      return;
    }

    var remaining = images.length;
    images.forEach(function (image) {
      function onReady() {
        remaining -= 1;
        if (remaining <= 0) triggerPrint();
      }
      image.addEventListener('load', onReady, { once: true });
      image.addEventListener('error', onReady, { once: true });
    });

    window.setTimeout(triggerPrint, 1800);
  }

  function renderDots() {
    if (!dotNav) return;
    dotNav.innerHTML = '';
    slideNodes.forEach(function (_, index) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'dot';
      button.setAttribute('aria-label', 'Go to slide ' + (index + 1));
      button.addEventListener('click', function () { show(index); });
      dotNav.appendChild(button);
    });
  }

  function next() {
    if (state.current < slideNodes.length - 1) {
      show(state.current + 1);
      return;
    }
    if (settings.loop) show(0);
  }

  function prev() {
    if (state.current > 0) {
      show(state.current - 1);
      return;
    }
    if (settings.loop) show(slideNodes.length - 1);
  }

  function show(index) {
    if (!slideNodes.length) return;
    if (index < 0) index = 0;
    if (index > slideNodes.length - 1) index = slideNodes.length - 1;

    slideNodes.forEach(function (node, nodeIndex) {
      node.classList.toggle('active', nodeIndex === index);
    });

    state.current = index;
    if (counter) counter.textContent = (index + 1) + ' / ' + slideNodes.length;
    if (progress) progress.style.width = (((index + 1) / slideNodes.length) * 100) + '%';
    if (prevBtn) prevBtn.disabled = !settings.loop && index === 0;
    if (nextBtn) nextBtn.disabled = !settings.loop && index === slideNodes.length - 1;

    Array.prototype.forEach.call(dotNav ? dotNav.children : [], function (dot, dotIndex) {
      dot.classList.toggle('active', dotIndex === index);
    });

    closeHotspots();
    pauseInactiveMedia(index);
    bindMediaAdvance(index);
    triggerLoadInteractions(slideNodes[index]);
    scheduleAutoAdvance();
  }

  function scheduleAutoAdvance() {
    window.clearTimeout(state.timer);
    if (!settings.autoPlay) return;
    var currentSlide = slides[state.current] || {};
    if (currentSlide.advanceOnMediaEnd && getMediaAdvanceNode(state.current)) return;
    var duration = Number(currentSlide.duration || 0);
    if (duration > 0) {
      state.timer = window.setTimeout(function () { next(); }, duration * 1000);
    }
  }

  function bindMediaAdvance(index) {
    if (typeof state.mediaCleanup === 'function') {
      state.mediaCleanup();
      state.mediaCleanup = null;
    }

    var slide = slides[index] || {};
    if (!slide.advanceOnMediaEnd) return;

    var media = getMediaAdvanceNode(index);
    if (!media) return;

    var onEnded = function () { next(); };
    media.addEventListener('ended', onEnded);
    state.mediaCleanup = function () {
      media.removeEventListener('ended', onEnded);
    };
  }

  function getMediaAdvanceNode(index) {
    var slide = slides[index] || {};
    var node = slideNodes[index];
    if (!slide || !node || !Array.isArray(slide.elements)) return null;

    var mediaElements = slide.elements.filter(function (element) {
      if (['video', 'audio'].indexOf(element.type) === -1) return false;
      var src = String((element.content && element.content.src) || '').trim();
      if (!src) return false;
      if (element.type === 'video' && (src.indexOf('youtube') !== -1 || src.indexOf('youtu.be') !== -1 || src.indexOf('vimeo') !== -1)) {
        return false;
      }
      return true;
    });

    if (!mediaElements.length) return null;

    var preferred = mediaElements.find(function (element) {
      return Boolean(element.content && element.content.autoplay);
    }) || mediaElements[0];

    var selector = preferred.type === 'video' ? '.lf-video video' : '.lf-audio-player';
    return node.querySelector(selector);
  }

  function closeHotspots() {
    document.querySelectorAll('.lf-hotspot-popup.is-open').forEach(function (popup) {
      popup.classList.remove('is-open');
    });
  }

  function pauseInactiveMedia(activeIndex) {
    slideNodes.forEach(function (slideNode, index) {
      if (index === activeIndex) return;
      slideNode.querySelectorAll('audio, video').forEach(function (media) {
        try { media.pause(); } catch (error) {}
      });
    });
  }

  function resolveSlideTarget(value) {
    var raw = String(value == null ? '' : value).trim();
    if (!raw) return null;
    if (raw === 'next') return state.current + 1 < slideNodes.length ? state.current + 1 : null;
    if (raw === 'prev') return state.current - 1 >= 0 ? state.current - 1 : null;
    if (String(Number(raw)) === raw && Number.isInteger(Number(raw))) {
      var numericIndex = Number(raw) - 1;
      if (numericIndex >= 0 && numericIndex < slideNodes.length) return numericIndex;
    }
    if (Object.prototype.hasOwnProperty.call(slideLookup, raw)) {
      return slideLookup[raw];
    }
    var lower = raw.toLowerCase();
    var titleIndex = slides.findIndex(function (slide) {
      return String(slide.title || '').trim().toLowerCase() === lower;
    });
    return titleIndex >= 0 ? titleIndex : null;
  }

  function runAction(action, value, sourceNode) {
    if (!action || action === 'none') return;
    if (action === 'navigate') {
      var targetIndex = resolveSlideTarget(value);
      if (targetIndex !== null) show(targetIndex);
      return;
    }
    if (action === 'openUrl' || action === 'link') {
      var url = String(value || '').trim();
      if (url) window.open(url, '_blank', 'noopener');
      return;
    }
    if (action === 'showPopup') {
      var popup = sourceNode ? sourceNode.querySelector('.lf-hotspot-popup') : null;
      if (popup) {
        popup.classList.toggle('is-open');
      } else if (value) {
        window.alert(String(value));
      }
      return;
    }
    if (action === 'playAudio') {
      var audioTarget = resolveMediaNode('audio', value, sourceNode);
      if (audioTarget) audioTarget.play().catch(function () {});
      return;
    }
    if (action === 'pauseVideo') {
      var videoTarget = resolveMediaNode('video', value, sourceNode);
      if (videoTarget) videoTarget.pause();
      return;
    }
    if (action === 'submit') {
      var scope = sourceNode ? sourceNode.closest('.slide') : slideNodes[state.current];
      var submitButton = scope ? scope.querySelector('.lf-quiz-submit') : null;
      if (submitButton) submitButton.click();
      return;
    }
    if (action === 'toggleElement') {
      var scope = sourceNode ? sourceNode.closest('.slide') : slideNodes[state.current];
      var targetNode = scope ? scope.querySelector('[data-el-id="' + cssEscape(value) + '"]') : null;
      if (targetNode) {
        targetNode.style.display = targetNode.style.display === 'none' ? '' : 'none';
      }
      return;
    }
    if (action === 'completeActivity') {
      if (sourceNode) {
        var check = document.createElement('div');
        check.className = 'lf-completion-mark';
        check.textContent = '✓';
        check.style.cssText = 'position:absolute;top:-10px;right:-10px;width:24px;height:24px;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:bold;z-index:99;box-shadow:0 2px 4px rgba(0,0,0,0.2)';
        sourceNode.appendChild(check);
      }
      return;
    }
  }

  function resolveMediaNode(tagName, value, sourceNode) {
    var scope = sourceNode ? sourceNode.closest('.slide') : slideNodes[state.current];
    if (!scope) return null;
    var target = String(value || '').trim();
    if (target) {
      var byElement = scope.querySelector('[data-el-id="' + cssEscape(target) + '"] ' + tagName);
      if (byElement) return byElement;
    }
    return scope.querySelector(tagName);
  }

  function triggerLoadInteractions(slideNode) {
    if (!slideNode) return;
    slideNode.querySelectorAll('.lf-el').forEach(function (node) {
      var interactions = node._lfLoadInteractions || [];
      interactions.forEach(function (interaction) {
        runAction(interaction.action, interaction.value, node);
      });
    });
  }

  function buildElementBox(el, interactive) {
    var node = document.createElement('div');
    node.className = 'lf-el lf-el-' + (el.type || 'unknown');
    node.dataset.elId = el.id || '';
    node.dataset.elType = el.type || '';
    node.style.left = (el.x || 0) + 'px';
    node.style.top = (el.y || 0) + 'px';
    node.style.width = (el.width || 0) + 'px';
    node.style.height = (el.height || 0) + 'px';
    node.style.opacity = el.opacity == null ? '1' : String(el.opacity);
    node.style.zIndex = String(el.zIndex || 1);
    node.style.transform = el.rotation ? 'rotate(' + el.rotation + 'deg)' : '';
    node.style.pointerEvents = interactive ? 'auto' : 'none';
    return node;
  }

  function renderSlide(slide, slideIndex) {
    var node = document.createElement('section');
    node.className = 'slide';
    node.dataset.slideId = slide.id || '';
    node.dataset.slideIndex = String(slideIndex);
    applySlideBackground(node, slide);

    var elements = Array.isArray(slide.elements)
      ? slide.elements.slice().sort(function (a, b) { return (a.zIndex || 0) - (b.zIndex || 0); })
      : [];

    elements.forEach(function (el) {
      if (el && el.visible !== false) {
        node.appendChild(renderElement(el));
      }
    });

    return node;
  }

  function applySlideBackground(node, slide) {
    if (slide.backgroundType === 'gradient' && slide.backgroundGradient) {
      node.style.background = slide.backgroundGradient;
      return;
    }
    if (slide.backgroundType === 'image' && slide.backgroundImage) {
      node.style.backgroundImage = 'url("' + String(slide.backgroundImage).replace(/"/g, '&quot;') + '")';
      node.style.backgroundSize = 'cover';
      node.style.backgroundPosition = 'center';
      return;
    }
    node.style.background = slide.background || theme.bgColor || '#ffffff';
  }

  function renderElement(el) {
    var interactions = Array.isArray(el.interactions) ? el.interactions.filter(Boolean) : [];
    var interactive = ['button', 'hotspot', 'quiz', 'video', 'audio'].includes(el.type) || interactions.length > 0;
    var wrapper = buildElementBox(el, interactive);
    var content = el.content || {};

    if (el.type === 'text' || el.type === 'heading') {
      var text = document.createElement('div');
      text.className = 'lf-text';
      text.textContent = content.text || '';
      text.style.fontSize = (content.fontSize || (el.type === 'heading' ? 36 : 18)) + 'px';
      text.style.fontFamily = content.fontFamily || theme.fontFamily || 'Inter, sans-serif';
      text.style.fontWeight = String(content.fontWeight || (el.type === 'heading' ? '700' : '400'));
      text.style.fontStyle = content.fontStyle || 'normal';
      text.style.textDecoration = content.textDecoration || 'none';
      text.style.textAlign = content.textAlign || 'left';
      text.style.color = content.color || theme.textColor || '#1a1a2e';
      text.style.lineHeight = String(content.lineHeight || (el.type === 'heading' ? 1.2 : 1.5));
      text.style.letterSpacing = (content.letterSpacing || 0) + 'px';
      text.style.textTransform = content.textTransform || 'none';
      wrapper.appendChild(text);
    } else if (el.type === 'image') {
      var image = document.createElement('img');
      image.className = 'lf-image';
      image.src = content.src || '';
      image.alt = content.alt || '';
      image.style.objectFit = content.objectFit || 'cover';
      image.style.borderRadius = (content.borderRadius || 0) + 'px';
      image.style.border = (content.borderWidth || 0) + 'px solid ' + (content.borderColor || 'transparent');
      wrapper.appendChild(image);
    } else if (el.type === 'shape') {
      wrapper.appendChild(renderShape(el));
    } else if (el.type === 'button') {
      var buttonWrap = document.createElement('div');
      buttonWrap.className = 'lf-button-wrap';
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'lf-button';
      button.textContent = content.label || 'Button';
      button.style.fontSize = (content.fontSize || 15) + 'px';
      button.style.fontWeight = String(content.fontWeight || 600);
      button.style.fontFamily = content.fontFamily || theme.fontFamily || 'Inter, sans-serif';
      button.style.letterSpacing = (content.letterSpacing || 0) + 'px';
      button.style.borderRadius = (content.borderRadius == null ? 8 : content.borderRadius) + 'px';
      applyButtonStyle(button, content, theme);
      buttonWrap.appendChild(button);
      wrapper.appendChild(buttonWrap);

      if (content.action && content.action !== 'none') {
        button.addEventListener('click', function (event) {
          event.stopPropagation();
          var action = content.action === 'link' ? 'openUrl' : content.action;
          runAction(action, content.target, wrapper);
        });
      }
    } else if (el.type === 'hotspot') {
      wrapper.appendChild(renderHotspot(content));
    } else if (el.type === 'video') {
      wrapper.appendChild(renderVideo(content));
    } else if (el.type === 'audio') {
      wrapper.appendChild(renderAudio(content));
    } else if (el.type === 'chart') {
      wrapper.appendChild(renderChart(el));
    } else if (el.type === 'quiz') {
      wrapper.appendChild(renderQuiz(content));
    } else if (el.type === 'tabs') {
      wrapper.appendChild(renderTabs(content));
    } else if (el.type === 'accordion') {
      wrapper.appendChild(renderAccordion(content));
    } else if (el.type === 'flipcard') {
      wrapper.appendChild(renderFlipCard(content));
    } else if (el.type === 'stepper') {
      wrapper.appendChild(renderStepper(content));
    } else if (el.type === 'poll') {
      wrapper.appendChild(renderPoll(content, el.id));
    } else if (el.type === 'labeledimage') {
      wrapper.appendChild(renderLabeledImage(content, el.id));
    } else if (el.type === 'matching') {
      wrapper.appendChild(renderMatching(content, el.id));
    } else if (el.type === 'sorting') {
      wrapper.appendChild(renderSorting(content, el.id));
    } else if (el.type === 'cloze') {
      wrapper.appendChild(renderCloze(content, el.id));
    } else if (el.type === 'scenario') {
      wrapper.appendChild(renderScenario(content, el.id));
    } else if (el.type === 'progress') {
      wrapper.appendChild(renderProgress(content, el.id));
    } else if (el.type === 'divider') {
      var dividerWrap = document.createElement('div');
      dividerWrap.className = 'lf-divider-wrap';
      var divider = document.createElement('hr');
      divider.className = 'lf-divider';
      divider.style.borderTop = (content.thickness || 2) + 'px solid ' + (content.color || '#e2e8f0');
      dividerWrap.appendChild(divider);
      wrapper.appendChild(dividerWrap);
    }

    bindInteractions(wrapper, interactions);
    return wrapper;
  }

  function renderShape(el) {
    var content = el.content || {};
    var type = content.shapeType || 'rectangle';
    if (['triangle', 'diamond', 'star', 'arrow'].includes(type)) {
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', String(el.width || 0));
      svg.setAttribute('height', String(el.height || 0));
      svg.setAttribute('viewBox', '0 0 ' + (el.width || 0) + ' ' + (el.height || 0));
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.style.width = '100%';
      svg.style.height = '100%';
      var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      polygon.setAttribute('points', getPolygonPoints(type, el.width || 0, el.height || 0));
      polygon.setAttribute('fill', content.fillColor || '#6c47ff');
      polygon.setAttribute('stroke', content.borderColor || 'transparent');
      polygon.setAttribute('stroke-width', String(content.borderWidth || 0));
      svg.appendChild(polygon);
      return svg;
    }

    var div = document.createElement('div');
    div.className = 'lf-el-content';
    div.style.background = content.fillColor || '#6c47ff';
    div.style.border = (content.borderWidth || 0) + 'px solid ' + (content.borderColor || 'transparent');
    div.style.opacity = content.opacity == null ? '1' : String(content.opacity);
    div.style.borderRadius = type === 'circle' ? '50%' : (content.borderRadius || 0) + 'px';
    return div;
  }

  function getPolygonPoints(type, width, height) {
    if (type === 'triangle') return (width / 2) + ',0 ' + width + ',' + height + ' 0,' + height;
    if (type === 'diamond') return (width / 2) + ',0 ' + width + ',' + (height / 2) + ' ' + (width / 2) + ',' + height + ' 0,' + (height / 2);
    if (type === 'arrow') {
      return '0,' + (height * 0.3) + ' ' + (width * 0.6) + ',' + (height * 0.3) + ' ' + (width * 0.6) + ',0 ' + width + ',' + (height / 2) + ' ' + (width * 0.6) + ',' + height + ' ' + (width * 0.6) + ',' + (height * 0.7) + ' 0,' + (height * 0.7);
    }
    if (type === 'star') {
      var points = [];
      var cx = width / 2;
      var cy = height / 2;
      var outerR = Math.min(width, height) / 2;
      var innerR = outerR * 0.4;
      for (var index = 0; index < 10; index++) {
        var angle = ((index * 36) - 90) * Math.PI / 180;
        var radius = index % 2 === 0 ? outerR : innerR;
        points.push((cx + radius * Math.cos(angle)) + ',' + (cy + radius * Math.sin(angle)));
      }
      return points.join(' ');
    }
    return '';
  }

  function applyButtonStyle(button, content, themeConfig) {
    var primary = themeConfig.primaryColor || '#6c47ff';
    var variants = {
      primary: { background: primary, color: '#ffffff', border: 'none' },
      secondary: { background: '#f0f0f0', color: '#333333', border: '1px solid #dbe3ef' },
      outline: { background: 'transparent', color: primary, border: '2px solid ' + primary },
      ghost: { background: 'transparent', color: primary, border: 'none' },
      danger: { background: '#ef4444', color: '#ffffff', border: 'none' },
    };
    var variant = variants[content.variant || 'primary'] || variants.primary;
    button.style.background = content.bgColor || variant.background;
    button.style.color = content.textColor || variant.color;
    button.style.border = content.borderColor ? '1px solid ' + content.borderColor : variant.border;
  }

  function renderHotspot(content) {
    var root = document.createElement('div');
    root.className = 'lf-el-content';
    root.style.position = 'relative';

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'lf-hotspot-btn';
    button.textContent = content.icon || '?';
    button.style.background = content.bgColor || '#6c47ff';
    button.style.color = content.iconColor || '#ffffff';
    button.style.borderRadius = (content.borderRadius == null ? 999 : content.borderRadius) >= 999 ? '50%' : (content.borderRadius || 0) + 'px';

    var popup = document.createElement('div');
    popup.className = 'lf-hotspot-popup';
    popup.style.background = content.popupBgColor || '#ffffff';
    popup.style.color = content.popupTextColor || '#1a1a2e';

    var header = document.createElement('div');
    header.className = 'lf-hotspot-header';
    var title = document.createElement('div');
    title.className = 'lf-hotspot-title';
    title.textContent = content.popupTitle || 'Info';
    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'lf-hotspot-close';
    close.textContent = '×';
    close.addEventListener('click', function (event) {
      event.stopPropagation();
      popup.classList.remove('is-open');
    });
    header.appendChild(title);
    header.appendChild(close);

    var body = document.createElement('div');
    body.className = 'lf-hotspot-body';
    body.textContent = content.popupContent || 'Add your content in the editor.';

    popup.appendChild(header);
    popup.appendChild(body);

    button.addEventListener('click', function (event) {
      event.stopPropagation();
      popup.classList.toggle('is-open');
    });

    root.appendChild(button);
    root.appendChild(popup);
    return root;
  }

  function renderVideo(content) {
    var wrapper = document.createElement('div');
    wrapper.className = 'lf-video';
    var src = String(content.src || '').trim();
    var embed = toEmbedUrl(src);

    if (embed) {
      var frame = document.createElement('iframe');
      frame.src = embed;
      frame.setAttribute('frameborder', '0');
      frame.setAttribute('allowfullscreen', 'true');
      frame.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
      wrapper.appendChild(frame);
      return wrapper;
    }

    if (!src) {
      var empty = document.createElement('div');
      empty.className = 'lf-empty';
      empty.textContent = 'No video source';
      wrapper.appendChild(empty);
      return wrapper;
    }

    var video = document.createElement('video');
    video.src = src;
    if (content.poster) video.poster = content.poster;
    video.controls = content.controls !== false;
    video.autoplay = Boolean(content.autoplay);
    video.loop = Boolean(content.loop);
    video.muted = Boolean(content.muted);
    video.style.objectFit = content.objectFit || 'cover';
    wrapper.appendChild(video);
    return wrapper;
  }

  function toEmbedUrl(src) {
    if (!src) return '';
    if (src.includes('youtube.com/embed/')) return src;
    if (src.includes('youtu.be/') || src.includes('youtube.com/watch')) {
      var videoId = extractYouTubeId(src);
      return videoId ? 'https://www.youtube.com/embed/' + videoId : '';
    }
    if (src.includes('player.vimeo.com/video/')) return src;
    if (src.includes('vimeo.com/')) {
      var vimeoId = extractVimeoId(src);
      return vimeoId ? 'https://player.vimeo.com/video/' + vimeoId : '';
    }
    return '';
  }

  function extractYouTubeId(src) {
    if (src.includes('youtu.be/')) {
      var shortPart = src.split('youtu.be/')[1] || '';
      return stripAfterDelimiters(shortPart) || '';
    }
    if (src.includes('v=')) {
      var queryPart = src.split('v=')[1] || '';
      return stripAfterDelimiters(queryPart) || '';
    }
    return '';
  }

  function extractVimeoId(src) {
    var parts = src.split('/').filter(Boolean);
    for (var index = parts.length - 1; index >= 0; index--) {
      var part = stripAfterDelimiters(parts[index]);
      if (String(Number(part)) === part && Number.isInteger(Number(part))) {
        return part;
      }
    }
    return '';
  }

  function stripAfterDelimiters(value) {
    var end = value.length;
    ['?', '&', '#', '/'].forEach(function (token) {
      var index = value.indexOf(token);
      if (index !== -1 && index < end) end = index;
    });
    return value.slice(0, end);
  }

  function renderAudio(content) {
    var wrap = document.createElement('div');
    wrap.className = 'lf-audio-card';
    wrap.style.background = content.bgColor || '#ede7ff';

    var icon = document.createElement('div');
    icon.className = 'lf-audio-icon';
    icon.style.background = content.accentColor || '#6c47ff';
    icon.textContent = '♪';

    var label = document.createElement('div');
    label.className = 'lf-audio-label';
    label.style.color = content.textColor || '#555555';
    label.textContent = content.label || 'Audio Player';

    var audio = document.createElement('audio');
    audio.className = 'lf-audio-player';
    audio.src = content.src || '';
    audio.controls = content.controls !== false;
    audio.autoplay = Boolean(content.autoplay);
    audio.loop = Boolean(content.loop);

    wrap.appendChild(icon);
    wrap.appendChild(label);
    wrap.appendChild(audio);
    return wrap;
  }

  function renderChart(el) {
    var model = buildChartModel(el.content || {}, el.width || 420, el.height || 280, project.theme || {});
    var wrap = document.createElement('div');
    wrap.className = 'lf-chart-wrap';

    var root = document.createElement('div');
    root.className = 'lf-chart';
    root.style.background = model.backgroundColor;
    root.style.color = model.textColor;
    root.style.border = (model.borderWidth || 0) + 'px solid ' + (model.borderColor || '#e2e8f0');

    if (model.title) {
      var title = document.createElement('div');
      title.className = 'lf-chart-title';
      title.textContent = model.title;
      root.appendChild(title);
    }

    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'lf-chart-svg');
    svg.setAttribute('viewBox', '0 0 ' + (el.width || 420) + ' ' + (el.height || 280));
    svg.setAttribute('preserveAspectRatio', 'none');

    if (model.type === 'circle') {
      model.circle.slices.forEach(function (slice) {
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', slice.path);
        path.setAttribute('fill', slice.color);
        svg.appendChild(path);
      });

      var inner = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      inner.setAttribute('cx', model.circle.center.x);
      inner.setAttribute('cy', model.circle.center.y);
      inner.setAttribute('r', Math.max(0, model.circle.innerRadius - 2));
      inner.setAttribute('fill', model.backgroundColor);
      svg.appendChild(inner);

      var centerValue = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      centerValue.setAttribute('x', model.circle.center.x);
      centerValue.setAttribute('y', model.circle.center.y - 4);
      centerValue.setAttribute('text-anchor', 'middle');
      centerValue.setAttribute('class', 'lf-chart-center-value');
      centerValue.setAttribute('fill', model.textColor);
      centerValue.textContent = model.circle.centerValue;
      svg.appendChild(centerValue);

      var centerLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      centerLabel.setAttribute('x', model.circle.center.x);
      centerLabel.setAttribute('y', model.circle.center.y + 14);
      centerLabel.setAttribute('text-anchor', 'middle');
      centerLabel.setAttribute('class', 'lf-chart-center-label');
      centerLabel.setAttribute('fill', model.textColor);
      centerLabel.textContent = 'Total';
      svg.appendChild(centerLabel);
    } else {
      if (model.showGrid) {
        model.cartesian.ticks.forEach(function (tick) {
          var grid = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          grid.setAttribute('x1', model.cartesian.padding.left);
          grid.setAttribute('x2', model.cartesian.padding.left + model.cartesian.plotWidth);
          grid.setAttribute('y1', tick.y);
          grid.setAttribute('y2', tick.y);
          grid.setAttribute('stroke', model.gridColor);
          grid.setAttribute('stroke-width', '1');
          svg.appendChild(grid);
        });
      }

      model.cartesian.ticks.forEach(function (tick) {
        var tickLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        tickLabel.setAttribute('x', model.cartesian.padding.left - 8);
        tickLabel.setAttribute('y', tick.y + 4);
        tickLabel.setAttribute('text-anchor', 'end');
        tickLabel.setAttribute('class', 'lf-chart-axis');
        tickLabel.setAttribute('fill', model.textColor);
        tickLabel.textContent = tick.label;
        svg.appendChild(tickLabel);
      });

      if (model.type === 'bar') {
        model.cartesian.bars.forEach(function (bar) {
          var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', bar.x);
          rect.setAttribute('y', bar.y);
          rect.setAttribute('width', bar.width);
          rect.setAttribute('height', bar.height);
          rect.setAttribute('fill', bar.color);
          rect.setAttribute('rx', '8');
          svg.appendChild(rect);

          if (model.showValues) {
            var valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            valueLabel.setAttribute('x', bar.x + (bar.width / 2));
            valueLabel.setAttribute('y', bar.y - 8);
            valueLabel.setAttribute('text-anchor', 'middle');
            valueLabel.setAttribute('class', 'lf-chart-value');
            valueLabel.setAttribute('fill', model.textColor);
            valueLabel.textContent = bar.valueLabel;
            svg.appendChild(valueLabel);
          }

          var barLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          barLabel.setAttribute('x', bar.x + (bar.width / 2));
          barLabel.setAttribute('y', model.cartesian.padding.top + model.cartesian.plotHeight + 18);
          barLabel.setAttribute('text-anchor', 'middle');
          barLabel.setAttribute('class', 'lf-chart-axis');
          barLabel.setAttribute('fill', model.textColor);
          barLabel.textContent = bar.label;
          svg.appendChild(barLabel);
        });
      } else {
        if (model.showArea && model.cartesian.areaPath) {
          var area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          area.setAttribute('d', model.cartesian.areaPath);
          area.setAttribute('fill', (model.cartesian.points[0] && model.cartesian.points[0].color) || '#6c47ff');
          area.setAttribute('opacity', '0.16');
          svg.appendChild(area);
        }

        var line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        line.setAttribute('d', model.cartesian.linePath);
        line.setAttribute('stroke', (model.cartesian.points[0] && model.cartesian.points[0].color) || '#6c47ff');
        line.setAttribute('stroke-width', model.strokeWidth || 3);
        line.setAttribute('fill', 'none');
        line.setAttribute('stroke-linecap', 'round');
        line.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(line);

        model.cartesian.points.forEach(function (point) {
          var dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          dot.setAttribute('cx', point.x);
          dot.setAttribute('cy', point.y);
          dot.setAttribute('r', '4.5');
          dot.setAttribute('fill', point.color);
          svg.appendChild(dot);

          if (model.showValues) {
            var pointValue = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            pointValue.setAttribute('x', point.x);
            pointValue.setAttribute('y', point.y - 10);
            pointValue.setAttribute('text-anchor', 'middle');
            pointValue.setAttribute('class', 'lf-chart-value');
            pointValue.setAttribute('fill', model.textColor);
            pointValue.textContent = point.valueLabel;
            svg.appendChild(pointValue);
          }

          var pointLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          pointLabel.setAttribute('x', point.x);
          pointLabel.setAttribute('y', model.cartesian.padding.top + model.cartesian.plotHeight + 18);
          pointLabel.setAttribute('text-anchor', 'middle');
          pointLabel.setAttribute('class', 'lf-chart-axis');
          pointLabel.setAttribute('fill', model.textColor);
          pointLabel.textContent = point.label;
          svg.appendChild(pointLabel);
        });
      }
    }

    root.appendChild(svg);

    if (model.showLegend) {
      var legend = document.createElement('div');
      legend.className = 'lf-chart-legend';
      model.series.forEach(function (item) {
        var legendItem = document.createElement('div');
        legendItem.className = 'lf-chart-legend-item';

        var dot = document.createElement('span');
        dot.className = 'lf-chart-legend-dot';
        dot.style.background = item.color;

        var label = document.createElement('span');
        label.className = 'lf-chart-legend-label';
        label.textContent = item.label;

        var value = document.createElement('span');
        value.className = 'lf-chart-legend-value';
        value.textContent = String(item.value);

        legendItem.appendChild(dot);
        legendItem.appendChild(label);
        legendItem.appendChild(value);
        legend.appendChild(legendItem);
      });
      root.appendChild(legend);
    }

    wrap.appendChild(root);
    return wrap;
  }

  function renderQuiz(content) {
    var root = document.createElement('div');
    root.className = 'lf-quiz';
    root.style.background = content.cardBgColor || '#ffffff';
    root.style.color = content.questionColor || '#1a1a2e';
    root.style.setProperty('--quiz-accent', content.accentColor || '#6c47ff');

    var question = document.createElement('p');
    question.className = 'lf-quiz-question';
    question.style.color = content.questionColor || '#1a1a2e';
    question.textContent = content.question || 'Question';

    var optionsWrap = document.createElement('div');
    optionsWrap.className = 'lf-quiz-options';
    var optionButtons = [];
    var selectedIndex = null;
    var submitted = false;
    var correctIndex = Number(content.correctIndex || 0);

    (Array.isArray(content.options) ? content.options : []).forEach(function (option, optionIndex) {
      var optionBtn = document.createElement('button');
      optionBtn.type = 'button';
      optionBtn.className = 'lf-quiz-option';
      optionBtn.style.borderColor = '#dbe3ef';

      var letter = document.createElement('span');
      letter.className = 'lf-quiz-letter';
      letter.textContent = String.fromCharCode(65 + optionIndex);

      var text = document.createElement('span');
      text.className = 'lf-quiz-text';
      text.textContent = option;

      optionBtn.appendChild(letter);
      optionBtn.appendChild(text);
      optionBtn.addEventListener('click', function () {
        if (submitted) return;
        selectedIndex = optionIndex;
        syncQuizState();
      });
      optionsWrap.appendChild(optionBtn);
      optionButtons.push(optionBtn);
    });

    var feedback = document.createElement('div');
    feedback.className = 'lf-quiz-feedback';

    var actions = document.createElement('div');
    actions.className = 'lf-quiz-actions';

    var submit = document.createElement('button');
    submit.type = 'button';
    submit.className = 'lf-quiz-submit';
    submit.textContent = 'Submit';
    submit.style.background = content.accentColor || '#6c47ff';
    submit.style.color = '#ffffff';
    submit.disabled = true;
    submit.addEventListener('click', function () {
      if (selectedIndex == null) return;
      submitted = true;
      syncQuizState();
    });

    var reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'lf-quiz-reset';
    reset.textContent = 'Try Again';
    reset.style.background = '#f0f0f0';
    reset.style.color = '#333333';
    reset.style.display = 'none';
    reset.addEventListener('click', function () {
      selectedIndex = null;
      submitted = false;
      syncQuizState();
    });

    actions.appendChild(submit);
    actions.appendChild(reset);

    root.appendChild(question);
    root.appendChild(optionsWrap);
    root.appendChild(feedback);
    root.appendChild(actions);

    function syncQuizState() {
      optionButtons.forEach(function (button, optionIndex) {
        button.classList.remove('selected', 'correct', 'wrong');
        button.disabled = submitted;
        button.style.borderColor = optionIndex === selectedIndex ? (content.accentColor || '#6c47ff') : '#dbe3ef';
        button.style.background = optionIndex === selectedIndex ? 'rgba(108, 71, 255, .10)' : 'rgba(255,255,255,.92)';
        if (submitted) {
          if (optionIndex === correctIndex) {
            button.classList.add('correct');
          } else if (optionIndex === selectedIndex && selectedIndex !== correctIndex) {
            button.classList.add('wrong');
          }
        } else if (optionIndex === selectedIndex) {
          button.classList.add('selected');
        }
      });

      submit.disabled = selectedIndex == null || submitted;
      submit.style.display = submitted ? 'none' : 'inline-flex';
      reset.style.display = submitted ? 'inline-flex' : 'none';

      if (!submitted) {
        feedback.className = 'lf-quiz-feedback';
        feedback.textContent = '';
        return;
      }

      var correct = selectedIndex === correctIndex;
      feedback.className = 'lf-quiz-feedback show ' + (correct ? 'correct' : 'wrong');
      feedback.textContent = correct
        ? '✓ Correct!'
        : ('✗ Incorrect.' + (content.explanation ? ' ' + content.explanation : ''));
    }

    return root;
  }

  function renderTabs(content) {
    var root = document.createElement('div');
    root.className = 'lf-tabs';
    root.style.background = content.contentBgColor || '#ffffff';

    var header = document.createElement('div');
    header.className = 'lf-tabs-header';
    header.style.background = content.inactiveTabColor || '#f8fafc';

    var tabContent = document.createElement('div');
    tabContent.className = 'lf-tab-content';
    tabContent.style.color = content.textColor || '#1e293b';

    var tabs = Array.isArray(content.tabs) ? content.tabs : [];
    var activeId = tabs.length > 0 ? tabs[0].id : null;
    var tabButtons = [];

    tabs.forEach(function(tab) {
      var btn = document.createElement('button');
      btn.className = 'lf-tab-btn';
      btn.textContent = tab.label;
      btn.onclick = function() {
        activeId = tab.id;
        syncTabs();
      };
      header.appendChild(btn);
      tabButtons.push({ id: tab.id, el: btn, content: tab.content });
    });

    function syncTabs() {
      var activeContent = '';
      tabButtons.forEach(function(tabObj) {
        var isActive = tabObj.id === activeId;
        tabObj.el.style.color = isActive ? (content.activeTabColor || '#6c47ff') : '#64748b';
        tabObj.el.style.borderBottomColor = isActive ? (content.activeTabColor || '#6c47ff') : 'transparent';
        tabObj.el.style.background = isActive ? (content.contentBgColor || '#ffffff') : 'transparent';
        tabObj.el.style.fontWeight = isActive ? '600' : '400';
        if (isActive) activeContent = tabObj.content || '';
      });
      tabContent.textContent = activeContent;
    }

    if (tabs.length > 0) syncTabs();

    root.appendChild(header);
    root.appendChild(tabContent);
    return root;
  }

  function renderAccordion(content) {
    var root = document.createElement('div');
    root.className = 'lf-accordion';
    
    var items = Array.isArray(content.items) ? content.items : [];
    var openId = items.length > 0 ? items[0].id : null;
    var itemNodes = [];

    items.forEach(function(item) {
      var itemWrap = document.createElement('div');
      itemWrap.className = 'lf-accordion-item';
      itemWrap.style.background = content.itemBgColor || '#ffffff';

      var header = document.createElement('div');
      header.className = 'lf-accordion-header';
      
      var title = document.createElement('span');
      title.textContent = item.title;
      
      var icon = document.createElement('span');
      // basic chevron
      icon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>';
      
      header.appendChild(title);
      header.appendChild(icon);

      var contentDiv = document.createElement('div');
      contentDiv.className = 'lf-accordion-content';
      contentDiv.textContent = item.content;

      header.onclick = function() {
        if (openId === item.id && content.allowAllClosed) {
          openId = null;
        } else {
          openId = item.id;
        }
        syncAccordion();
      };

      itemWrap.appendChild(header);
      itemWrap.appendChild(contentDiv);
      root.appendChild(itemWrap);
      
      itemNodes.push({ id: item.id, header: header, contentDiv: contentDiv, icon: icon.querySelector('svg') });
    });

    function syncAccordion() {
      itemNodes.forEach(function(node) {
        var isOpen = node.id === openId;
        node.header.style.background = isOpen ? (content.activeBgColor || '#f8fafc') : 'transparent';
        node.header.style.color = isOpen ? (content.activeColor || '#6c47ff') : (content.titleColor || '#0f172a');
        node.contentDiv.style.display = isOpen ? 'block' : 'none';
        node.contentDiv.style.background = content.activeBgColor || '#f8fafc';
        node.contentDiv.style.color = content.textColor || '#475569';
        if (node.icon) node.icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
      });
    }

    syncAccordion();
    return root;
  }

  function renderFlipCard(content) {
    var root = document.createElement('div');
    root.className = 'lf-flipcard';
    
    var inner = document.createElement('div');
    inner.className = 'lf-flipcard-inner';
    
    var front = document.createElement('div');
    front.className = 'lf-flipcard-front';
    front.style.background = content.frontBgColor || '#6c47ff';
    front.style.color = content.frontTextColor || '#ffffff';
    front.style.border = '1px solid ' + (content.borderColor || 'transparent');
    
    var frontTitle = document.createElement('h3');
    frontTitle.style.fontSize = '20px'; frontTitle.style.margin = '0 0 8px 0';
    frontTitle.textContent = content.frontTitle || '';
    
    var frontContent = document.createElement('p');
    frontContent.style.fontSize = '15px'; frontContent.style.margin = '0'; frontContent.style.whiteSpace = 'pre-wrap';
    frontContent.textContent = content.frontContent || '';
    
    if (content.frontTitle) front.appendChild(frontTitle);
    if (content.frontContent) front.appendChild(frontContent);

    var back = document.createElement('div');
    back.className = 'lf-flipcard-back';
    back.style.background = content.backBgColor || '#ffffff';
    back.style.color = content.backTextColor || '#1e293b';
    back.style.border = '1px solid ' + (content.borderColor || '#e2e8f0');
    
    var backTitle = document.createElement('h3');
    backTitle.style.fontSize = '20px'; backTitle.style.margin = '0 0 8px 0';
    backTitle.textContent = content.backTitle || '';
    
    var backContent = document.createElement('p');
    backContent.style.fontSize = '15px'; backContent.style.margin = '0'; backContent.style.whiteSpace = 'pre-wrap';
    backContent.textContent = content.backContent || '';
    
    if (content.backTitle) back.appendChild(backTitle);
    if (content.backContent) back.appendChild(backContent);

    var isVertical = content.flipDirection === 'vertical';
    back.style.transform = isVertical ? 'rotateX(180deg)' : 'rotateY(180deg)';

    inner.appendChild(front);
    inner.appendChild(back);
    root.appendChild(inner);

    var flipped = false;
    root.onclick = function() {
      flipped = !flipped;
      inner.style.transform = flipped ? (isVertical ? 'rotateX(180deg)' : 'rotateY(180deg)') : 'none';
    };

    return root;
  }

  function renderStepper(content) {
    var root = document.createElement('div');
    root.className = 'lf-stepper';
    root.style.background = content.bgColor || '#ffffff';

    var header = document.createElement('div');
    header.className = 'lf-stepper-header';

    var steps = Array.isArray(content.steps) ? content.steps : [];
    var currentIndex = 0;
    var stepNodes = [];
    var lineNodes = [];

    steps.forEach(function(step, idx) {
      var wrap = document.createElement('div');
      wrap.style.display = 'flex'; wrap.style.alignItems = 'center';

      var circle = document.createElement('div');
      circle.className = 'lf-step-circle';
      circle.textContent = String(idx + 1);
      circle.onclick = function() {
        currentIndex = idx;
        syncStepper();
      };
      wrap.appendChild(circle);
      stepNodes.push(circle);

      if (idx < steps.length - 1) {
        var line = document.createElement('div');
        line.className = 'lf-step-line';
        wrap.appendChild(line);
        lineNodes.push(line);
      }
      
      header.appendChild(wrap);
    });

    var cBody = document.createElement('div');
    cBody.className = 'lf-stepper-content';
    
    var cTitle = document.createElement('h3');
    cTitle.style.fontSize = '18px'; cTitle.style.margin = '0 0 12px 0';
    cTitle.style.color = content.titleColor || '#0f172a';
    
    var cText = document.createElement('div');
    cText.style.fontSize = '15px'; cText.style.whiteSpace = 'pre-wrap';
    cText.style.color = content.textColor || '#475569';
    
    cBody.appendChild(cTitle);
    cBody.appendChild(cText);

    var footer = document.createElement('div');
    footer.className = 'lf-stepper-footer';

    var prevBtn = document.createElement('button');
    prevBtn.className = 'lf-stepper-btn';
    prevBtn.textContent = 'Previous';
    prevBtn.onclick = function() { if (currentIndex > 0) { currentIndex--; syncStepper(); } };
    
    var statusText = document.createElement('span');
    statusText.style.fontSize = '13px'; statusText.style.color = '#94a3b8';

    var nextBtn = document.createElement('button');
    nextBtn.className = 'lf-stepper-btn';
    nextBtn.textContent = 'Next';
    nextBtn.onclick = function() { if (currentIndex < steps.length - 1) { currentIndex++; syncStepper(); } };

    footer.appendChild(prevBtn);
    footer.appendChild(statusText);
    footer.appendChild(nextBtn);

    root.appendChild(header);
    root.appendChild(cBody);
    root.appendChild(footer);

    function syncStepper() {
      var activeStep = steps[currentIndex] || {};
      cTitle.textContent = activeStep.title || '';
      cText.textContent = activeStep.content || '';
      statusText.textContent = 'Step ' + (currentIndex + 1) + ' of ' + steps.length;
      
      prevBtn.disabled = currentIndex === 0;
      prevBtn.style.color = currentIndex === 0 ? '#cbd5e1' : '#475569';
      
      var isLast = currentIndex === steps.length - 1;
      nextBtn.disabled = isLast;
      nextBtn.style.background = isLast ? '#e2e8f0' : (content.accentColor || '#6c47ff');
      nextBtn.style.color = isLast ? '#94a3b8' : '#ffffff';
      nextBtn.style.border = isLast ? '1px solid #e2e8f0' : 'none';

      stepNodes.forEach(function(node, j) {
        var isActive = j <= currentIndex;
        node.style.background = isActive ? (content.accentColor || '#6c47ff') : '#f1f5f9';
        node.style.color = isActive ? '#ffffff' : '#64748b';
        node.style.borderColor = isActive ? (content.accentColor || '#6c47ff') : '#e2e8f0';
        node.style.borderStyle = 'solid';
        node.style.borderWidth = '2px';
      });

      lineNodes.forEach(function(line, j) {
        line.style.background = j < currentIndex ? (content.accentColor || '#6c47ff') : '#e2e8f0';
      });
    }

    if (steps.length > 0) syncStepper();

    return root;
  }

  function renderPoll(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.fontFamily = 'system-ui, sans-serif';
    root.style.display = 'flex'; root.style.flexDirection = 'column';
    root.style.padding = '16px'; root.style.boxSizing = 'border-box';
    root.style.background = '#ffffff'; root.style.borderRadius = '8px';
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';

    var question = document.createElement('h3');
    question.style.fontSize = '18px'; question.style.margin = '0 0 16px 0';
    question.style.color = '#1e293b'; question.textContent = content.question || 'Poll Question';
    root.appendChild(question);

    var options = content.options || [];
    var totalVotes = 0;
    var votedIndex = -1;
    var optionNodes = [];

    var optsContainer = document.createElement('div');
    optsContainer.style.display = 'flex'; optsContainer.style.flexDirection = 'column'; optsContainer.style.gap = '8px';
    
    options.forEach(function(opt, idx) {
      if (opt.votes) totalVotes += opt.votes;
      var optEl = document.createElement('div');
      optEl.style.position = 'relative'; optEl.style.padding = '12px 16px';
      optEl.style.border = '1px solid #e2e8f0'; optEl.style.borderRadius = '6px';
      optEl.style.cursor = 'pointer'; optEl.style.overflow = 'hidden';
      
      var bgEl = document.createElement('div');
      bgEl.style.position = 'absolute'; bgEl.style.left = '0'; bgEl.style.top = '0'; bgEl.style.bottom = '0';
      bgEl.style.width = '0%'; bgEl.style.background = content.votedColor || '#6c47ff';
      bgEl.style.opacity = '0.15'; bgEl.style.transition = 'width 0.3s ease';
      
      var contentEl = document.createElement('div');
      contentEl.style.position = 'relative'; contentEl.style.display = 'flex'; 
      contentEl.style.justifyContent = 'space-between'; contentEl.style.zIndex = '1';
      contentEl.style.fontSize = '14px'; contentEl.style.color = '#334155';
      
      var labelEl = document.createElement('span'); labelEl.textContent = opt.label;
      var pctEl = document.createElement('span'); pctEl.style.fontWeight = '600'; pctEl.style.display = 'none';
      
      contentEl.appendChild(labelEl); contentEl.appendChild(pctEl);
      optEl.appendChild(bgEl); optEl.appendChild(contentEl);
      
      optEl.onclick = function() {
        if (votedIndex > -1) return;
        votedIndex = idx;
        totalVotes++;
        // client side faked vote
        options[idx] = options[idx] || {};
        options[idx].votes = (options[idx].votes || 0) + 1;
        
        optionNodes.forEach(function(node, j) {
          node.el.style.cursor = 'default';
          var pct = totalVotes > 0 ? Math.round(((options[j].votes || 0) / totalVotes) * 100) : 0;
          node.bg.style.width = pct + '%';
          if (j === votedIndex) {
            node.el.style.border = '1px solid ' + (content.votedColor || '#6c47ff');
          }
          node.pct.textContent = pct + '%';
          node.pct.style.display = 'inline';
        });
      };
      
      optsContainer.appendChild(optEl);
      optionNodes.push({ el: optEl, bg: bgEl, pct: pctEl });
    });
    
    root.appendChild(optsContainer);
    return root;
  }

  function renderLabeledImage(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.position = 'relative'; root.style.background = '#f8fafc';
    root.style.borderRadius = '8px'; root.style.overflow = 'hidden';

    if (content.imageUrl) {
      var img = document.createElement('img');
      img.src = content.imageUrl;
      img.style.width = '100%'; img.style.height = '100%'; img.style.objectFit = 'contain';
      root.appendChild(img);
    } else {
      root.style.display = 'flex'; root.style.alignItems = 'center'; root.style.justifyContent = 'center';
      root.textContent = 'No Image Provided'; root.style.color = '#94a3b8';
    }

    var markersContainer = document.createElement('div');
    markersContainer.style.position = 'absolute'; markersContainer.style.top = '0'; markersContainer.style.left = '0';
    markersContainer.style.width = '100%'; markersContainer.style.height = '100%';

    (content.markers || []).forEach(function(m) {
      var btn = document.createElement('button');
      btn.textContent = '?';
      btn.style.position = 'absolute';
      btn.style.left = Number(m.x || 50) + '%';
      btn.style.top = Number(m.y || 50) + '%';
      btn.style.transform = 'translate(-50%, -50%)';
      btn.style.width = '24px'; btn.style.height = '24px';
      btn.style.borderRadius = '50%'; btn.style.border = 'none';
      btn.style.background = m.color || '#6c47ff'; btn.style.color = '#ffffff';
      btn.style.fontSize = '12px'; btn.style.fontWeight = 'bold';
      btn.style.cursor = 'pointer'; btn.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
      btn.style.zIndex = '2';
      
      var popover = document.createElement('div');
      popover.style.position = 'absolute'; popover.style.display = 'none';
      popover.style.left = '50%'; popover.style.bottom = '100%';
      popover.style.transform = 'translate(-50%, -8px)';
      popover.style.background = '#1e293b'; popover.style.color = '#ffffff';
      popover.style.padding = '8px 12px'; popover.style.borderRadius = '6px';
      popover.style.fontSize = '13px'; popover.style.whiteSpace = 'nowrap';
      popover.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
      popover.style.zIndex = '3';
      popover.textContent = m.label || 'Marker info';
      
      btn.appendChild(popover);
      btn.onmouseenter = function() { popover.style.display = 'block'; };
      btn.onmouseleave = function() { popover.style.display = 'none'; };
      
      markersContainer.appendChild(btn);
    });

    root.appendChild(markersContainer);
    return root;
  }

  function renderMatching(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.background = '#ffffff'; root.style.borderRadius = '8px';
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; root.style.padding = '16px';
    root.style.boxSizing = 'border-box'; root.style.fontFamily = 'system-ui, sans-serif';
    root.style.display = 'flex'; root.style.overflow = 'hidden';

    var containerStyle = 'flex: 1; display: flex; flex-direction: column; gap: 8px; overflow-y: auto;';
    var leftCol = document.createElement('div'); leftCol.style.cssText = containerStyle + ' padding-right: 8px; border-right: 1px solid #e2e8f0;';
    var rightCol = document.createElement('div'); rightCol.style.cssText = containerStyle + ' padding-left: 8px;';

    var pairs = content.pairs || [];
    var selectedLeft = null;
    var matches = {}; // leftId -> rightId
    
    // In pure JS export, we'll rough out a simple click-to-match without SVG lines for brevity
    var rightItems = [...pairs].sort(() => Math.random() - 0.5);
    
    pairs.forEach(function(p, i) {
      var leftBtn = document.createElement('div');
      leftBtn.textContent = p.left || 'A';
      leftBtn.style.padding = '8px 12px'; leftBtn.style.border = '2px solid #e2e8f0'; leftBtn.style.borderRadius = '6px';
      leftBtn.style.cursor = 'pointer'; leftBtn.style.textAlign = 'center'; leftBtn.style.background = '#f8fafc';
      leftBtn.onclick = function() {
        if (matches[i]) return;
        if (selectedLeft === leftBtn) {
           selectedLeft.style.borderColor = '#e2e8f0'; selectedLeft = null;
        } else {
           if (selectedLeft) selectedLeft.style.borderColor = '#e2e8f0';
           selectedLeft = leftBtn; selectedLeft.dataset.index = i;
           selectedLeft.style.borderColor = '#3b82f6';
        }
      };
      leftCol.appendChild(leftBtn);
    });

    rightItems.forEach(function(p, idx) {
      var rightBtn = document.createElement('div');
      rightBtn.textContent = p.right || 'B';
      rightBtn.style.padding = '8px 12px'; rightBtn.style.border = '2px solid #e2e8f0'; rightBtn.style.borderRadius = '6px';
      rightBtn.style.cursor = 'pointer'; rightBtn.style.textAlign = 'center'; rightBtn.style.background = '#f8fafc';
      
      rightBtn.onclick = function() {
        if (!selectedLeft || rightBtn.dataset.matched) return;
        var leftIndex = selectedLeft.dataset.index;
        var expectedRight = pairs[leftIndex].right;
        
        if (p.right === expectedRight) {
           selectedLeft.style.borderColor = '#22c55e'; selectedLeft.style.background = '#dcfce7'; selectedLeft.style.color = '#15803d';
           rightBtn.style.borderColor = '#22c55e'; rightBtn.style.background = '#dcfce7'; rightBtn.style.color = '#15803d';
           rightBtn.dataset.matched = "true";
           matches[leftIndex] = p.right;
           selectedLeft = null;
        } else {
           selectedLeft.style.borderColor = '#ef4444'; selectedLeft.style.background = '#fef2f2'; selectedLeft.style.color = '#b91c1c';
           setTimeout(function() {
             if (matches[leftIndex]) return;
             if (selectedLeft) { selectedLeft.style.borderColor = '#3b82f6'; selectedLeft.style.background = '#f8fafc'; selectedLeft.style.color = 'inherit'; }
           }, 800);
        }
      };
      rightCol.appendChild(rightBtn);
    });

    root.appendChild(leftCol); root.appendChild(rightCol);
    return root;
  }

  function renderSorting(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.background = '#ffffff'; root.style.borderRadius = '8px';
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; root.style.padding = '16px';
    root.style.boxSizing = 'border-box'; root.style.fontFamily = 'system-ui, sans-serif';
    root.style.display = 'flex'; root.style.flexDirection = 'column';
    
    var container = document.createElement('div');
    container.style.flex = '1'; container.style.display = 'flex'; container.style.flexDirection = 'column';
    container.style.gap = '8px'; container.style.overflowY = 'auto';

    var items = [...(content.items || [])].map((item, id) => ({ item, id })).sort(() => Math.random() - 0.5);
    
    var checkBtn = document.createElement('button');
    checkBtn.textContent = 'Check Order';
    checkBtn.style.marginTop = '12px'; checkBtn.style.padding = '8px 16px'; checkBtn.style.border = 'none';
    checkBtn.style.borderRadius = '6px'; checkBtn.style.background = '#6c47ff'; checkBtn.style.color = '#ffffff';
    checkBtn.style.cursor = 'pointer'; checkBtn.style.fontWeight = '500';

    var nodes = [];
    items.forEach(function(obj, idx) {
      var itemEl = document.createElement('div');
      itemEl.textContent = obj.item.label || 'Item';
      itemEl.dataset.originalId = obj.id;
      itemEl.style.padding = '10px 14px'; itemEl.style.background = '#f8fafc'; itemEl.style.border = '1px solid #e2e8f0';
      itemEl.style.borderRadius = '6px'; itemEl.style.cursor = 'grab'; itemEl.style.userSelect = 'none';
      
      // Basic fallback drag behavior for exported HTML
      var startY = 0; var currentY = 0; var dragIndex = -1;
      itemEl.draggable = true;
      itemEl.ondragstart = function(e) { dragIndex = Array.from(container.children).indexOf(itemEl); itemEl.style.opacity = '0.5'; };
      itemEl.ondragend = function(e) { itemEl.style.opacity = '1'; };
      itemEl.ondragover = function(e) { e.preventDefault(); };
      itemEl.ondrop = function(e) {
         e.preventDefault();
         var targetIndex = Array.from(container.children).indexOf(e.currentTarget);
         if (dragIndex === targetIndex) return;
         var draggedNode = container.children[dragIndex];
         if (targetIndex > dragIndex) container.insertBefore(draggedNode, e.currentTarget.nextSibling);
         else container.insertBefore(draggedNode, e.currentTarget);
         
         // Clear statuses
         Array.from(container.children).forEach(n => { n.style.borderColor = '#e2e8f0'; n.style.background = '#f8fafc'; n.style.color = '#0f172a'; });
      };
      
      nodes.push(itemEl);
      container.appendChild(itemEl);
    });

    checkBtn.onclick = function() {
      Array.from(container.children).forEach((node, i) => {
        var ogId = parseInt(node.dataset.originalId);
        if (ogId === i) {
          node.style.borderColor = '#22c55e'; node.style.background = '#dcfce7'; node.style.color = '#15803d';
        } else {
          node.style.borderColor = '#ef4444'; node.style.background = '#fef2f2'; node.style.color = '#b91c1c';
        }
      });
    };

    root.appendChild(container);
    root.appendChild(checkBtn);
    return root;
  }

  function renderCloze(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.background = content.bgColor || '#ffffff'; root.style.color = content.textColor || '#1e293b';
    root.style.borderRadius = (content.borderRadius || 8) + 'px';
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; root.style.padding = '16px';
    root.style.boxSizing = 'border-box'; root.style.fontFamily = 'system-ui, sans-serif';
    root.style.overflowY = 'auto';

    if (content.title) {
       var h3 = document.createElement('h3');
       h3.style.margin = '0 0 12px 0'; h3.style.fontSize = '18px'; h3.style.color = content.titleColor || '#0f172a';
       h3.textContent = content.title;
       root.appendChild(h3);
    }

    var textContainer = document.createElement('div');
    textContainer.style.lineHeight = '1.8'; textContainer.style.marginBottom = '16px';
    textContainer.style.fontSize = (content.fontSize || 16) + 'px';

    var val = content.text || '';
    var regex = /\\[([^\\]]+)\\]/g;
    var lastIdx = 0;
    var match;
    var blanks = [];

    while ((match = regex.exec(val)) !== null) {
      if (match.index > lastIdx) {
        var span = document.createElement('span'); span.textContent = val.substring(lastIdx, match.index);
        textContainer.appendChild(span);
      }
      var input = document.createElement('input');
      input.type = 'text'; input.placeholder = '?'; input.dataset.answer = match[1];
      input.style.border = '1px solid #cbd5e1'; input.style.borderRadius = '4px'; input.style.background = '#f8fafc';
      input.style.padding = '2px 6px'; input.style.fontSize = 'inherit'; input.style.fontFamily = 'inherit';
      input.style.textAlign = 'center'; input.style.color = '#334155'; input.style.margin = '0 4px';
      input.style.width = ((match[1].length * 10) + 16) + 'px';
      blanks.push(input);
      textContainer.appendChild(input);
      lastIdx = regex.lastIndex;
    }
    if (lastIdx < val.length) {
      var spanEnd = document.createElement('span'); spanEnd.textContent = val.substring(lastIdx);
      textContainer.appendChild(spanEnd);
    }
    root.appendChild(textContainer);

    if (content.showCheckBtn !== false) {
      var btn = document.createElement('button');
      btn.textContent = 'Check Answers';
      btn.style.display = 'inline-block'; btn.style.padding = '8px 16px'; btn.style.background = '#6c47ff';
      btn.style.color = 'white'; btn.style.border = 'none'; btn.style.borderRadius = '6px';
      btn.style.fontWeight = '500'; btn.style.cursor = 'pointer';
      btn.onclick = function() {
        blanks.forEach(function(b) {
          if (b.value.trim().toLowerCase() === b.dataset.answer.toLowerCase()) {
            b.style.borderColor = '#10b981'; b.style.background = '#d1fae5';
          } else {
            b.style.borderColor = '#ef4444'; b.style.background = '#fee2e2';
          }
        });
      };
      root.appendChild(btn);
    }

    return root;
  }

  function renderScenario(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.background = content.bgColor || '#f8fafc';
    root.style.borderRadius = (content.borderRadius || 8) + 'px';
    root.style.padding = '16px'; root.style.boxSizing = 'border-box';
    root.style.fontFamily = 'system-ui, sans-serif'; root.style.overflowY = 'auto';
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; root.style.display = 'flex';
    root.style.flexDirection = 'column'; root.style.gap = '12px';

    (content.messages || []).forEach(function(m) {
      var row = document.createElement('div');
      row.style.display = 'flex'; row.style.gap = '10px'; row.style.alignItems = 'flex-start';
      if (m.role === 'user') row.style.flexDirection = 'row-reverse';

      var avatar = document.createElement('div');
      avatar.style.width = '32px'; avatar.style.height = '32px'; avatar.style.borderRadius = '50%';
      avatar.style.color = 'white'; avatar.style.display = 'flex'; avatar.style.alignItems = 'center';
      avatar.style.justifyContent = 'center'; avatar.style.fontSize = '13px'; avatar.style.fontWeight = 'bold';
      avatar.style.flexShrink = '0';
      avatar.style.background = m.role === 'user' ? '#3b82f6' : '#10b981';
      avatar.textContent = m.role === 'user' ? 'U' : 'A';

      var bubble = document.createElement('div');
      bubble.style.padding = '10px 14px'; bubble.style.borderRadius = '12px'; bubble.style.border = '1px solid';
      bubble.style.fontSize = '14px'; bubble.style.color = '#334155'; bubble.style.lineHeight = '1.4';
      bubble.style.maxWidth = '80%';
      bubble.style.background = m.role === 'user' ? '#eff6ff' : '#ffffff';
      bubble.style.borderColor = m.role === 'user' ? '#bfdbfe' : '#e2e8f0';
      if (m.role === 'user') bubble.style.borderTopRightRadius = '2px';
      else bubble.style.borderTopLeftRadius = '2px';
      bubble.textContent = m.text;

      row.appendChild(avatar); row.appendChild(bubble);
      root.appendChild(row);
    });

    return root;
  }

  function renderProgress(content, id) {
    var root = document.createElement('div');
    root.style.width = '100%'; root.style.height = '100%';
    root.style.background = content.bgColor || '#f8fafc';
    root.style.borderRadius = (content.borderRadius || 8) + 'px';
    root.style.padding = '16px'; root.style.boxSizing = 'border-box';
    root.style.fontFamily = 'system-ui, sans-serif'; 
    root.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'; 
    root.style.display = 'flex'; root.style.flexDirection = 'column';
    root.style.justifyContent = 'center'; root.style.gap = '8px';

    var header = document.createElement('div');
    header.style.display = 'flex'; header.style.justifyContent = 'space-between'; header.style.alignItems = 'center';
    var title = document.createElement('span');
    title.style.fontWeight = '600'; title.style.fontSize = '14px'; title.style.color = content.titleColor || '#0f172a';
    title.textContent = content.title || 'Your Progress';
    var xp = document.createElement('span');
    xp.style.fontWeight = '700'; xp.style.fontSize = '14px'; xp.style.color = '#fbbf24';
    xp.textContent = (content.mockXP || 350) + ' XP';
    header.appendChild(title); header.appendChild(xp);

    var barBg = document.createElement('div');
    barBg.style.width = '100%'; barBg.style.height = '12px'; barBg.style.background = '#e2e8f0';
    barBg.style.borderRadius = '999px'; barBg.style.overflow = 'hidden';
    var barFill = document.createElement('div');
    barFill.style.height = '100%'; barFill.style.borderRadius = '999px';
    barFill.style.background = content.fillColor || '#10b981';
    barFill.style.width = (content.mockPercent || 65) + '%';
    barBg.appendChild(barFill);

    var footer = document.createElement('div');
    footer.style.fontSize = '12px'; footer.style.textAlign = 'right'; footer.style.color = content.textColor || '#64748b';
    var p = content.mockPercent || 65;
    footer.textContent = 'Level ' + (content.mockLevel || 4) + ' · ' + (100 - p) + '% to next level';

    root.appendChild(header); root.appendChild(barBg); root.appendChild(footer);
    return root;
  }

  function bindInteractions(wrapper, interactions) {
    if (!interactions.length) return;

    wrapper._lfLoadInteractions = interactions.filter(function (interaction) {
      return interaction && interaction.trigger === 'load';
    });

    interactions.forEach(function (interaction) {
      if (!interaction || !interaction.action) return;
      if (interaction.trigger === 'click') {
        wrapper.addEventListener('click', function (event) {
          if (event.target.closest('.lf-button')) return;
          runAction(interaction.action, interaction.value, wrapper);
        });
      }
      if (interaction.trigger === 'hover') {
        wrapper.addEventListener('mouseenter', function () {
          runAction(interaction.action, interaction.value, wrapper);
        });
      }
    });
  }

  function cssEscape(value) {
    if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
      return CSS.escape(String(value));
    }
    return String(value).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
  }
})();
`
}

async function exportHTML() { return doExportWeb('html') }
async function exportIframe() { return doExportWeb('iframe') }
async function exportPDF() { return doExportWeb('pdf') }

async function doExportWeb(mode = 'html') {
  const p = project.value
  if (!p) return
  exportStatus.value = 'processing'

  const pdfWindow = mode === 'pdf' && typeof window !== 'undefined'
    ? window.open('', '_blank')
    : null
  if (mode === 'pdf' && !pdfWindow) {
    exportStatus.value = 'error'
    setTimeout(() => exportStatus.value = '', 3000)
    return
  }

  const zip = mode === 'pdf' ? null : new JSZip()
  const assetsFolder = zip ? zip.folder('assets') : null
  let assetCounter = 0
  
  // Helper to fetch and add asset to zip, returns the new local path
  async function processAsset(url, prefix = 'media') {
    if (!url || url.startsWith('data:') || url.startsWith('http://localhost') || url.startsWith('blob:')) {
      // For local blobs or data URIs, might need special handling. Let's try fetching or leave as is if we can't
      if (url.startsWith('data:')) return url;
      // In case of blob URLs, we can fetch them since they are in the same context
    }
    
    try {
      const response = await fetch(url)
      const blob = await response.blob()

      if (mode === 'pdf') {
        return await blobToDataUrl(blob)
      }
      
      let ext = 'bin'
      const mime = blob.type
      if (mime.includes('image/png')) ext = 'png'
      else if (mime.includes('image/jpeg')) ext = 'jpg'
      else if (mime.includes('image/gif')) ext = 'gif'
      else if (mime.includes('image/svg')) ext = 'svg'
      else if (mime.includes('image/webp')) ext = 'webp'
      else if (mime.includes('video/mp4')) ext = 'mp4'
      else if (mime.includes('audio/mpeg')) ext = 'mp3'
      
      // Fallbacks based on URL extension
      if (ext === 'bin') {
         const match = url.match(/\\.([a-zA-Z0-9]+)(\\?.*)?$/)
         if (match) ext = match[1]
      }

      assetCounter++
      const filename = `${prefix}_${assetCounter}.${ext}`
      assetsFolder.file(filename, blob)
      return `assets/${filename}`
    } catch (err) {
      console.warn('Could not fetch asset:', url, err)
      return url // fallback to original
    }
  }

  const slides = JSON.parse(JSON.stringify([...(p.slides || [])])).sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  if (exportIncludeAssets.value) {
    for (const s of slides) {
      if (s.backgroundType === 'image' && s.backgroundImage) {
        s.backgroundImage = await processAsset(s.backgroundImage, 'bg')
      }
      for (const el of s.elements || []) {
        if (el.type === 'image' && el.content?.src) {
          el.content.src = await processAsset(el.content.src, 'img')
        }
        if (el.type === 'video' && el.content?.src && !el.content.src.includes('youtube') && !el.content.src.includes('youtu.be')) {
          el.content.src = await processAsset(el.content.src, 'vid')
        }
        if (el.type === 'audio' && el.content?.src) {
          el.content.src = await processAsset(el.content.src, 'aud')
        }
      }
    }
  }

  const exportName = sanitizeExportName(exportFileName.value || p.name || 'presentation')
  const payload = {
    name: p.name,
    theme: p.theme || {},
    settings: p.settings || {},
    slides,
  }
  const projectData = JSON.stringify(payload)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')

  const css = buildRuntimeCSS(p.theme, p.settings, mode)
  const js = buildRuntimeJS(mode)
  const dataScriptTag = '<' + `script id="lf-data" type="application/json">${projectData}</` + 'script>'
  const runtimeScriptTag = '<' + 'script src="script.js"></' + 'script>'

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${exportName}</title>
${mode === 'pdf' ? `<style>${css}</style>` : `<link rel="stylesheet" href="style.css">`}
</head>
<body class="${mode === 'iframe' ? 'is-iframe' : mode === 'pdf' ? 'is-pdf' : ''}">
<div class="lf-shell">
<div class="progress" id="progress"></div>
<div class="lf-grid"></div>
<div class="lf-stage-shell">
  <div class="presentation" id="presentation"></div>
</div>
<div class="dot-nav" id="dot-nav"></div>
<nav class="nav">
  <button class="nav-btn" id="prev-btn" type="button">← Prev</button>
  <span class="nav-counter" id="counter">1 / ${slides.length}</span>
  <button class="nav-btn" id="next-btn" type="button">Next →</button>
</nav>
</div>
${dataScriptTag}
${mode !== 'pdf' ? runtimeScriptTag : `<script>${js}<\/script>`}
</body>
</html>`

  if (mode === 'pdf') {
    pdfWindow.document.open()
    pdfWindow.document.write(html)
    pdfWindow.document.close()
    exportStatus.value = 'success'
    setTimeout(() => exportStatus.value = '', 3000)
    return
  }

  zip.file('index.html', html)
  zip.file('style.css', css)
  zip.file('script.js', js)

  const content = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(content)
  const a = document.createElement('a')
  a.href = url
  a.download = `${exportName}.zip`
  a.click()
  URL.revokeObjectURL(url)
  exportStatus.value = 'success'
  setTimeout(() => exportStatus.value = '', 3000)
}
</script>

<template>
  <Modal title="Export Project" size="md" @close="editorStore.showExportModal = false">
    <template v-if="!authStore.user">
      <div class="auth-gate" style="text-align: center; padding: 40px 20px;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity: 0.5; margin-bottom: 16px; margin-inline: auto;">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
        <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px;">Sign up to export</h3>
        <p style="font-size: 14px; color: #64748b; margin-bottom: 32px;">Create a free account to export, save, and share your presentations.</p>
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px; margin: 0 auto;">
          <button class="btn btn-secondary" style="width: 100%; justify-content: center; gap: 8px;" @click="authStore.loginWithGoogle()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8m-4-4h8"/></svg>
            Continue with Google
          </button>
          <button class="btn btn-secondary" style="width: 100%; justify-content: center; gap: 8px;" @click="authStore.loginWithMicrosoft()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Continue with Microsoft
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="export-tabs tabs" style="overflow-x: auto;">
        <button :class="['tab-btn', activeTab === 'json' && 'active']" @click="activeTab = 'json'">JSON</button>
        <button :class="['tab-btn', activeTab === 'html' && 'active']" @click="activeTab = 'html'">HTML</button>
        <button :class="['tab-btn', activeTab === 'iframe' && 'active']" @click="activeTab = 'iframe'">Iframe</button>
        <button :class="['tab-btn', activeTab === 'pdf' && 'active']" @click="activeTab = 'pdf'">PDF</button>
        <button :class="['tab-btn', activeTab === 'scorm' && 'active']" @click="activeTab = 'scorm'">SCORM</button>
      </div>

    <div class="export-content">
      <!-- JSON Export -->
      <template v-if="activeTab === 'json'">
        <div class="export-info">
          <div class="export-icon">📦</div>
          <div>
            <h4>JSON Project File</h4>
            <p>Export your complete project as a JSON file. Use this to back up your work, share it with collaborators, or import it into another MediaSurf instance.</p>
          </div>
        </div>
        
        <div class="export-options" style="margin-bottom: 20px;">
          <div class="form-group">
            <label style="display:block;margin-bottom:4px;font-size:13px;font-weight:600;color:#333;">File Name</label>
            <input type="text" v-model="exportFileName" class="inp" placeholder="My Presentation" style="width:100%;padding:8px;border-radius:6px;border:1px solid #ddd;" />
          </div>
        </div>

        <div class="export-meta">
          <div class="meta-item"><span>Project</span><strong>{{ project?.name }}</strong></div>
          <div class="meta-item"><span>Slides</span><strong>{{ project?.slides?.length || 0 }}</strong></div>
          <div class="meta-item"><span>Elements</span><strong>{{ project?.slides?.reduce((acc, s) => acc + (s.elements?.length || 0), 0) || 0 }}</strong></div>
        </div>
        <button class="btn btn-primary export-btn" @click="exportJSON">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download JSON
        </button>
      </template>

      <!-- HTML Export -->
      <template v-else-if="activeTab === 'html'">
        <div class="export-info">
          <div class="export-icon">🌐</div>
          <div>
            <h4>Standalone HTML Package</h4>
            <p>Export as a self-contained HTML file that works in any browser. Includes all slides, interactions, and quiz functionality. No internet connection required.</p>
          </div>
        </div>

        <div class="export-options" style="margin-bottom: 20px;">
          <div class="form-group">
            <label style="display:block;margin-bottom:4px;font-size:13px;font-weight:600;color:#333;">Package Name</label>
            <input type="text" v-model="exportFileName" class="inp" placeholder="My Presentation" style="width:100%;padding:8px;border-radius:6px;border:1px solid #ddd;" />
          </div>
          <label style="display:flex;align-items:center;gap:8px;margin-top:12px;font-size:13px;cursor:pointer;">
            <input type="checkbox" v-model="exportIncludeAssets" /> Download external assets (Images/Audio/Video) locally for offline use
          </label>
        </div>

        <div class="export-features">
          <div class="feature-item">✓ Keyboard navigation (arrow keys)</div>
          <div class="feature-item">✓ Click-to-reveal hotspots</div>
          <div class="feature-item">✓ Interactive quizzes with feedback</div>
          <div class="feature-item">✓ Progress bar</div>
          <div class="feature-item">✓ Responsive scaling</div>
          <div class="feature-item">✓ YouTube/Vimeo video embeds</div>
        </div>
        <button class="btn btn-primary export-btn" @click="exportHTML">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Download HTML
        </button>
      </template>

        <!-- Iframe Export -->
        <template v-else-if="activeTab === 'iframe'">
          <div class="export-info">
            <div class="export-icon">???</div>
            <div>
              <h4>Iframe Package</h4>
              <p>Export a lightweight package optimized for embedding in other sites via an iframe. Strips out outer backgrounds and fits precisely.</p>
            </div>
          </div>
          <div class="export-options" style="margin-bottom: 20px;">
            <div class="form-group">
              <label style="display:block;margin-bottom:4px;font-size:13px;font-weight:600;color:#333;">Package Name</label>
              <input type="text" v-model="exportFileName" class="inp" placeholder="My Presentation" style="width:100%;padding:8px;border-radius:6px;border:1px solid #ddd;" />
            </div>
            <label style="display:flex;align-items:center;gap:8px;margin-top:12px;font-size:13px;cursor:pointer;">
              <input type="checkbox" v-model="exportIncludeAssets" /> Download external assets locally
            </label>
          </div>
          <button class="btn btn-primary export-btn" @click="exportIframe">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Iframe Zip
          </button>
        </template>

        <!-- PDF Export -->
        <template v-else-if="activeTab === 'pdf'">
          <div class="export-info">
            <div class="export-icon">??</div>
            <div>
              <h4>PDF Document</h4>
              <p>Generate a printable, static PDF version of all slides. Converts perfectly to a standard presentation handout.</p>
            </div>
          </div>
          <p style="margin-bottom: 20px; font-size: 13px; color: #666;">This will open the presentation in a new printable window. Just use your browser's Print dialog and select "Save as PDF".</p>
          <button class="btn btn-primary export-btn" @click="exportPDF">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Generate PDF
          </button>
        </template>

      <!-- SCORM -->
      <template v-else-if="activeTab === 'scorm'">
        <div class="export-info">
          <div class="export-icon">🎓</div>
          <div>
            <h4>SCORM Package</h4>
            <p>Export as a SCORM 1.2 / xAPI compatible package for LMS platforms like Moodle, Blackboard, and Canvas.</p>
          </div>
        </div>
        <div class="coming-soon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="opacity:.4">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <h4>Coming Soon</h4>
          <p>SCORM export is planned for a future release. Use the HTML export for now and embed it via iframe in your LMS.</p>
        </div>
      </template>

      <!-- Status messages -->
      <Transition name="fade">
        <div v-if="exportStatus === 'processing'" class="export-success" style="background:#e0f2fe;color:#166534;border-color:#bbf7d0;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="spin" stroke="currentColor" stroke-width="2.5">
            <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
          </svg>
          Generating package... Please wait.
        </div>
        <div v-else-if="exportStatus === 'success'" class="export-success">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Export successful! Check your downloads folder.
        </div>
      </Transition>
    </div>
    </template>
    
    <template #footer>
      <button class="btn btn-secondary" @click="editorStore.showExportModal = false">Close</button>
    </template>
  </Modal>
</template>

<style scoped>
.export-tabs { margin-bottom: var(--space-5); }
.export-content { display: flex; flex-direction: column; gap: var(--space-4); }
.export-info {
  display: flex;
  gap: var(--space-4);
  background: var(--color-surface-overlay);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}
.export-icon { font-size: 32px; flex-shrink: 0; }
.export-info h4 { font-size: var(--text-lg); font-weight: 700; color: var(--color-text); margin-bottom: var(--space-1); }
.export-info p { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.6; }
.export-meta {
  display: flex;
  gap: var(--space-4);
  background: var(--color-surface-overlay);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
}
.meta-item { display: flex; flex-direction: column; gap: 2px; }
.meta-item span { font-size: var(--text-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: .06em; }
.meta-item strong { font-size: var(--text-md); color: var(--color-text); }
.export-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
  background: var(--color-surface-overlay);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}
.feature-item { font-size: var(--text-sm); color: var(--color-text-muted); }
.export-btn { width: 100%; justify-content: center; padding: 12px; font-size: var(--text-md); }
.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-8) var(--space-4);
  background: var(--color-surface-overlay);
  border-radius: var(--radius-md);
  text-align: center;
}
.coming-soon h4 { font-size: var(--text-xl); color: var(--color-text); }
.coming-soon p { font-size: var(--text-sm); color: var(--color-text-muted); max-width: 380px; line-height: 1.6; }
.export-success {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  background: rgba(34,197,94,.1);
  border: 1px solid rgba(34,197,94,.3);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-success);
}
.spin { animation: spin 1s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }
</style>
