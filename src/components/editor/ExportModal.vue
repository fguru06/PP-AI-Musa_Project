<script setup>
import { computed, ref } from 'vue'
import JSZip from 'jszip'
import Modal from '@/components/common/Modal.vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'
import { useAuthStore } from '@/stores/authStore'

const editorStore = useEditorStore()
const projectStore = useProjectStore()
const authStore = useAuthStore()

const project = computed(() => projectStore.getProject(editorStore.projectId))
const activeTab = ref('json') // 'json' | 'html' | 'scorm'
const exportStatus = ref('') // '' | 'success' | 'error'

function exportJSON() {
  const json = projectStore.exportProject(editorStore.projectId)
  if (!json) return
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${project.value?.name || 'project'}.learnforge.json`
  a.click()
  URL.revokeObjectURL(url)
  exportStatus.value = 'success'
  setTimeout(() => exportStatus.value = '', 3000)
}

function buildHTMLSlide(slide, theme) {
  const bg = slide.backgroundType === 'gradient' && slide.backgroundGradient
    ? slide.backgroundGradient
    : slide.backgroundType === 'image' && slide.backgroundImage
      ? `url('${slide.backgroundImage}') center/cover`
      : slide.background || '#fff'

  const sortedEls = [...(slide.elements || [])].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))

  const elHTML = sortedEls.filter(e => e.visible !== false).map(el => {
    const baseStyle = `position:absolute;left:${el.x / 960 * 100}%;top:${el.y / 540 * 100}%;width:${el.width / 960 * 100}%;height:${el.height / 540 * 100}%;opacity:${el.opacity ?? 1};transform:rotate(${el.rotation || 0}deg);z-index:${el.zIndex || 1};box-sizing:border-box;`

    if (['text', 'heading'].includes(el.type)) {
      const c = el.content || {}
      return `<div style="${baseStyle}font-size:${c.fontSize || 16}px;font-family:${c.fontFamily || 'inherit'};font-weight:${c.fontWeight || 'normal'};font-style:${c.fontStyle || 'normal'};text-decoration:${c.textDecoration || 'none'};text-align:${c.textAlign || 'left'};color:${c.color || '#000'};line-height:${c.lineHeight || 1.5};white-space:pre-wrap;overflow:hidden;">${el.content?.text || ''}</div>`
    }
    if (el.type === 'image') {
      const c = el.content || {}
      return `<img src="${c.src || ''}" alt="${c.alt || ''}" style="${baseStyle}object-fit:${c.objectFit || 'cover'};border-radius:${c.borderRadius || 0}px;" />`
    }
    if (el.type === 'shape') {
      const c = el.content || {}
      let extra = ''
      if (c.shapeType === 'circle') extra = 'border-radius:50%;'
      return `<div style="${baseStyle}background:${c.fillColor || '#6c47ff'};border:${c.borderWidth || 0}px solid ${c.borderColor || 'transparent'};border-radius:${c.shapeType === 'circle' ? '50%' : (c.borderRadius || 0) + 'px'};"></div>`
    }
    if (el.type === 'button') {
      const c = el.content || {}
      const variants = {
        primary: `background:${theme?.primaryColor || '#6c47ff'};color:#fff;`,
        secondary: `background:#f0f0f0;color:#333;`,
        outline: `background:transparent;border:2px solid ${theme?.primaryColor || '#6c47ff'};color:${theme?.primaryColor || '#6c47ff'};`,
        ghost: `background:transparent;color:${theme?.primaryColor || '#6c47ff'};`,
        danger: `background:#ef4444;color:#fff;`,
      }
      const varStyle = variants[c.variant || 'primary'] || variants.primary
      return `<button style="${baseStyle}${varStyle}border-radius:8px;font-size:15px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;">${c.label || 'Button'}</button>`
    }
    if (el.type === 'hotspot') {
      const c = el.content || {}
      return `<div class="hotspot-el" style="${baseStyle}background:${c.bgColor || '#6c47ff'};border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;font-weight:bold;cursor:pointer;" 
        onclick="document.getElementById('popup-${el.id}').style.display='block'">${c.icon || '?'}
        <div id="popup-${el.id}" style="display:none;position:absolute;bottom:110%;left:50%;transform:translateX(-50%);background:#fff;border:1px solid #ddd;border-radius:8px;padding:16px;min-width:200px;box-shadow:0 4px 20px rgba(0,0,0,.2);z-index:9999;color:#333;">
          <b style="display:block;margin-bottom:8px;">${c.popupTitle || ''}</b>
          <span>${c.popupContent || ''}</span>
          <button onclick="event.stopPropagation();document.getElementById('popup-${el.id}').style.display='none'" style="margin-top:10px;padding:4px 10px;border:none;background:#6c47ff;color:#fff;border-radius:4px;cursor:pointer;">Close</button>
        </div>
      </div>`
    }
    if (el.type === 'video') {
      const c = el.content || {}
      const src = c.src || ''
      // Detect YouTube/Vimeo
      if (src.includes('youtube') || src.includes('youtu.be')) {
        const id = src.match(/(?:v=|youtu\.be\/)([^&?]+)/)?.[1]
        return `<iframe src="https://www.youtube.com/embed/${id}" style="${baseStyle}" frameborder="0" allowfullscreen></iframe>`
      }
      return `<video src="${src}" poster="${c.poster || ''}" style="${baseStyle}object-fit:cover;" ${c.autoplay ? 'autoplay' : ''} ${c.controls !== false ? 'controls' : ''} ${c.loop ? 'loop' : ''}></video>`
    }
    if (el.type === 'audio') {
      const c = el.content || {}
      return `<div style="${baseStyle}display:flex;align-items:center;gap:8px;background:rgba(0,0,0,.05);border-radius:8px;padding:0 12px;">
        <span style="color:#333;font-size:13px;">${c.label || 'Audio'}</span>
        <audio src="${c.src || ''}" ${c.autoplay ? 'autoplay' : ''} controls style="flex:1;height:32px;"></audio>
      </div>`
    }
    if (el.type === 'quiz') {
      const c = el.content || {}
      const opts = (c.options || []).map((o, i) =>
        `<label class="quiz-opt" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-radius:6px;border:1px solid #ddd;cursor:pointer;margin-bottom:6px;">
          <input type="radio" name="quiz-${el.id}" value="${i}" onchange="checkAnswer(this,${c.correctIndex || 0},'quiz-fb-${el.id}','${(c.explanation || '').replace(/'/g, "\\'")}')"> ${o}
        </label>`
      ).join('')
      return `<div style="${baseStyle}background:#fff;border-radius:12px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,.08);overflow:auto;">
        <p style="font-size:17px;font-weight:600;color:#1a1a2e;margin-bottom:14px;">${c.question || ''}</p>
        ${opts}
        <div id="quiz-fb-${el.id}" style="font-size:13px;margin-top:10px;padding:8px 12px;border-radius:6px;display:none;"></div>
      </div>`
    }
    if (el.type === 'divider') {
      const c = el.content || {}
      return `<hr style="${baseStyle}border:none;border-top:${c.thickness || 2}px solid ${c.color || '#e2e8f0'};" />`
    }
    return ''
  }).join('\n    ')

  return `
  <section class="slide" style="position:relative;width:960px;height:540px;background:${bg};overflow:hidden;flex-shrink:0;" data-slide="${slide.id}">
    ${elHTML}
  </section>`
}

async function exportHTML() {
  const p = project.value
  if (!p) return
  exportStatus.value = 'processing'
  
  const zip = new JSZip()
  const assetsFolder = zip.folder('assets')
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

  // Clone project slides so we don't mutate state
  const slides = JSON.parse(JSON.stringify([...(p.slides || [])])).sort((a, b) => a.order - b.order)

  // Pre-process assets in slides
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

  const slidesHTML = slides.map(s => buildHTMLSlide(s, p.theme)).join('\n')

  const css = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #111; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: ${p.theme?.fontFamily || 'Inter, sans-serif'}; overflow: hidden; }
.presentation { position: relative; }
.slide { display: none; }
.slide.active { display: block; }
.nav { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 12px; z-index: 1000; }
.nav-btn { background: rgba(255,255,255,.15); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,.2); color: #fff; padding: 8px 20px; border-radius: 999px; cursor: pointer; font-size: 14px; font-weight: 600; transition: background .15s; }
.nav-btn:hover { background: rgba(255,255,255,.3); }
.nav-counter { color: rgba(255,255,255,.7); font-size: 13px; min-width: 60px; text-align: center; }
.progress { position: fixed; top: 0; left: 0; height: 3px; background: ${p.theme?.primaryColor || '#6c47ff'}; transition: width .3s ease; z-index: 1001; }
`

  const js = `
var current = 0;
var slides = document.querySelectorAll('.slide');
var total = slides.length;

function show(idx) {
  slides.forEach(function(s, i) { s.classList.toggle('active', i === idx); });
  document.getElementById('counter').textContent = (idx + 1) + ' / ' + total;
  document.getElementById('progress').style.width = ((idx + 1) / total * 100) + '%';
  current = idx;
}

function next() { if (current < total - 1) show(current + 1); }
function prev() { if (current > 0) show(current - 1); }

function checkAnswer(el, correct, fbId, explanation) {
  var fb = document.getElementById(fbId);
  var isCorrect = parseInt(el.value) === correct;
  fb.style.display = 'block';
  fb.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
  fb.style.color = isCorrect ? '#166534' : '#991b1b';
  fb.textContent = isCorrect ? '✓ Correct!' : '✗ Incorrect. ' + (explanation || 'Try again.');
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next(); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prev(); }
});

// Scale to window
function resize() {
  var el = document.getElementById('presentation');
  var scale = Math.min(window.innerWidth / 960, window.innerHeight / 540);
  el.style.transform = 'scale(' + scale + ')';
  el.style.transformOrigin = 'center center';
}
window.addEventListener('resize', resize);
resize();
show(0);
`

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${p.name}</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<div class="progress" id="progress"></div>
<div class="presentation" id="presentation">
${slidesHTML}
</div>
<nav class="nav">
  <button class="nav-btn" onclick="prev()">← Prev</button>
  <span class="nav-counter" id="counter">1 / ${slides.length}</span>
  <button class="nav-btn" onclick="next()">Next →</button>
</nav>
<script src="script.js"><\/script>
</body>
</html>`

  zip.file('index.html', html)
  zip.file('style.css', css)
  zip.file('script.js', js)

  const content = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(content)
  const a = document.createElement('a')
  a.href = url
  a.download = `${p.name || 'presentation'}.zip`
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
      <div class="export-tabs tabs">
        <button :class="['tab-btn', activeTab === 'json' && 'active']" @click="activeTab = 'json'">JSON Project</button>
        <button :class="['tab-btn', activeTab === 'html' && 'active']" @click="activeTab = 'html'">HTML Package</button>
        <button :class="['tab-btn', activeTab === 'scorm' && 'active']" @click="activeTab = 'scorm'">SCORM</button>
      </div>

    <div class="export-content">
      <!-- JSON Export -->
      <template v-if="activeTab === 'json'">
        <div class="export-info">
          <div class="export-icon">📦</div>
          <div>
            <h4>JSON Project File</h4>
            <p>Export your complete project as a JSON file. Use this to back up your work, share it with collaborators, or import it into another LearnForge instance.</p>
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

      <!-- Success message -->
      <Transition name="fade">
        <div v-if="exportStatus === 'success'" class="export-success">
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
</style>
