<script setup>
import { computed, ref } from 'vue'
import { useEditorStore } from '@/stores/editorStore'
import { useProjectStore } from '@/stores/projectStore'
import { buildThemeChartContent, buildThemeChartPalette, paletteToText } from '@/lib/chart'

const editorStore = useEditorStore()
const projectStore = useProjectStore()

const project = computed(() => projectStore.getProject(editorStore.projectId))
const theme = computed(() => project.value?.theme || {})
const chartPalettePreview = computed(() => buildThemeChartPalette(theme.value))
const applyMessage = ref('')
const applyError = ref('')

function updateTheme(patch) {
  projectStore.updateProject(editorStore.projectId, { theme: { ...theme.value, ...patch } })
}

const PRESET_THEMES = [
  { name: 'Corporate Blue', primaryColor: '#1e40af', secondaryColor: '#0ea5e9', bgColor: '#f8fafc', textColor: '#0f172a', fontFamily: 'Inter, sans-serif' },
  { name: 'Vibrant Purple', primaryColor: '#6c47ff', secondaryColor: '#00c9a7', bgColor: '#ffffff', textColor: '#1a1a2e', fontFamily: 'Inter, sans-serif' },
  { name: 'Nature Green', primaryColor: '#16a34a', secondaryColor: '#84cc16', bgColor: '#f0fdf4', textColor: '#14532d', fontFamily: 'Georgia, serif' },
  { name: 'Dark Modern', primaryColor: '#818cf8', secondaryColor: '#f472b6', bgColor: '#0f172a', textColor: '#e2e8f0', fontFamily: 'Inter, sans-serif' },
  { name: 'Warm Sunset', primaryColor: '#dc2626', secondaryColor: '#f59e0b', bgColor: '#fffbeb', textColor: '#451a03', fontFamily: 'Verdana, sans-serif' },
  { name: 'Ocean Breeze', primaryColor: '#0891b2', secondaryColor: '#6366f1', bgColor: '#ecfeff', textColor: '#164e63', fontFamily: 'Trebuchet MS, sans-serif' },
]

const FONT_OPTIONS = [
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Times New Roman', value: '"Times New Roman", serif' },
  { label: 'Courier New', value: '"Courier New", monospace' },
  { label: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
  { label: 'Tahoma', value: 'Tahoma, sans-serif' },
]

function applyPreset(preset) {
  updateTheme(preset)
}

function themedPatchForElement(element, currentTheme) {
  const c = element.content || {}

  if (element.type === 'text') {
    return {
      content: {
        ...c,
        fontFamily: currentTheme.fontFamily || c.fontFamily,
        color: currentTheme.textColor || c.color,
      },
    }
  }

  if (element.type === 'heading') {
    return {
      content: {
        ...c,
        fontFamily: currentTheme.headingFont || currentTheme.fontFamily || c.fontFamily,
        color: currentTheme.textColor || c.color,
      },
    }
  }

  if (element.type === 'shape') {
    return {
      content: {
        ...c,
        fillColor: currentTheme.secondaryColor || c.fillColor,
      },
    }
  }

  if (element.type === 'hotspot') {
    return {
      content: {
        ...c,
        bgColor: currentTheme.primaryColor || c.bgColor,
      },
    }
  }

  if (element.type === 'button') {
    return {
      content: {
        ...c,
        bgColor: currentTheme.primaryColor || c.bgColor,
        textColor: '#ffffff',
        borderColor: 'transparent',
        fontFamily: currentTheme.fontFamily || c.fontFamily,
      },
    }
  }

  if (element.type === 'quiz') {
    return {
      content: {
        ...c,
        cardBgColor: currentTheme.bgColor || c.cardBgColor,
        questionColor: currentTheme.textColor || c.questionColor,
        accentColor: currentTheme.primaryColor || c.accentColor,
      },
    }
  }

  if (element.type === 'chart') {
    return {
      content: {
        ...c,
        ...buildThemeChartContent(currentTheme),
      },
    }
  }

  return null
}

function resetChartPaletteToAuto() {
  updateTheme({ chartPalette: '' })
}

function applyThemeToSlides() {
  applyMessage.value = ''
  applyError.value = ''

  const pid = editorStore.projectId
  const p = project.value
  const t = theme.value

  if (!pid || !p) {
    applyError.value = 'No active project to apply theme.'
    return
  }

  const slides = p.slides || []
  let updatedElements = 0

  slides.forEach((slide) => {
    if ((slide.backgroundType || 'color') === 'color') {
      projectStore.updateSlide(pid, slide.id, {
        backgroundType: 'color',
        background: t.bgColor || slide.background || '#ffffff',
      })
    }

    ;(slide.elements || []).forEach((element) => {
      const patch = themedPatchForElement(element, t)
      if (!patch) return
      projectStore.updateElement(pid, slide.id, element.id, patch)
      updatedElements += 1
    })
  })

  applyMessage.value = `Applied theme to ${slides.length} slide${slides.length === 1 ? '' : 's'} and ${updatedElements} element${updatedElements === 1 ? '' : 's'}.`
}
</script>

<template>
  <div class="theme-manager">
    <div class="panel-section">
      <div class="panel-title">Preset Themes</div>
      <div class="presets-grid">
        <div
          v-for="preset in PRESET_THEMES"
          :key="preset.name"
          class="preset-card"
          :title="preset.name"
          @click="applyPreset(preset)"
        >
          <div class="preset-preview">
            <div class="pp-header" :style="{ background: preset.primaryColor }"/>
            <div class="pp-body" :style="{ background: preset.bgColor }">
              <div class="pp-line" :style="{ background: preset.textColor, opacity: .7 }" />
              <div class="pp-line" :style="{ background: preset.textColor, opacity: .4, width: '60%' }" />
            </div>
            <div class="pp-accent" :style="{ background: preset.secondaryColor }"/>
          </div>
          <span class="preset-name">{{ preset.name }}</span>
        </div>
      </div>
    </div>

    <div class="panel-section">
      <div class="panel-title">Colors</div>
      <div class="theme-fields">
        <div class="theme-field" v-for="(cfg, key) in {
          primaryColor: 'Primary Color',
          secondaryColor: 'Secondary Color',
          bgColor: 'Background',
          textColor: 'Text Color',
        }" :key="key">
          <label class="form-label">{{ cfg }}</label>
          <div class="color-row">
            <input
              type="color"
              :value="theme[key] || '#ffffff'"
              class="color-input-native"
              @input="updateTheme({ [key]: $event.target.value })"
            />
            <input
              :value="theme[key] || ''"
              class="input"
              @change="updateTheme({ [key]: $event.target.value })"
              style="font-family:var(--font-mono);font-size:var(--text-xs)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="panel-section">
      <div class="panel-title">Chart Palette</div>
      <div class="theme-field">
        <label class="form-label">Chart Colors</label>
        <input
          :value="theme.chartPalette || ''"
          class="input"
          :placeholder="paletteToText(buildThemeChartPalette(theme))"
          @change="updateTheme({ chartPalette: $event.target.value })"
        />
        <div class="chart-palette-preview">
          <span v-for="(color, index) in chartPalettePreview" :key="`theme-chart-${index}`" class="chart-palette-dot" :style="{ background: color }"></span>
        </div>
        <div class="chart-palette-actions">
          <button type="button" class="btn btn-secondary btn-sm" @click="resetChartPaletteToAuto">Use auto palette</button>
        </div>
        <div class="field-hint">Leave blank to derive chart colors from the theme primary, secondary, background, and text colors.</div>
      </div>
    </div>

    <div class="panel-section">
      <div class="panel-title">Typography</div>
      <div class="form-group" style="margin-bottom:var(--space-3)">
        <label class="form-label">Heading Font</label>
        <select :value="theme.headingFont || 'Inter, sans-serif'" class="select" @change="updateTheme({ headingFont: $event.target.value })">
          <option v-for="f in FONT_OPTIONS" :key="f.value" :value="f.value">{{ f.label }}</option>
        </select>
      </div>
      <div class="form-group" style="margin-bottom:var(--space-3)">
        <label class="form-label">Body Font</label>
        <select :value="theme.fontFamily || 'Inter, sans-serif'" class="select" @change="updateTheme({ fontFamily: $event.target.value })">
          <option v-for="f in FONT_OPTIONS" :key="f.value" :value="f.value">{{ f.label }}</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Base Font Size</label>
        <input type="number" min="12" max="24" :value="theme.fontSize || 16" class="input" @change="updateTheme({ fontSize: +$event.target.value })" />
      </div>
    </div>

    <div class="panel-section">
      <div class="panel-title">Preview</div>
      <div class="theme-preview" :style="{
        background: theme.bgColor || '#fff',
        fontFamily: theme.fontFamily || 'Inter, sans-serif',
      }">
        <div class="tp-heading" :style="{ color: theme.textColor, fontFamily: theme.headingFont || theme.fontFamily }">
          Heading Text
        </div>
        <div class="tp-body" :style="{ color: theme.textColor, opacity: .7 }">
          Body text looks like this. Clear, readable, and well-spaced for learners.
        </div>
        <div class="tp-btn" :style="{ background: theme.primaryColor }">Button</div>
        <div class="tp-badge" :style="{ background: theme.secondaryColor }">Badge</div>
        <div class="tp-chart-row">
          <span v-for="(color, index) in chartPalettePreview.slice(0, 5)" :key="`preview-chart-${index}`" class="tp-chart-bar" :style="{ background: color, height: `${22 + (index * 8)}px` }"></span>
        </div>
      </div>
      <button class="btn btn-primary w-full apply-theme-btn" @click="applyThemeToSlides">
        Apply Theme to Slides
      </button>
      <p v-if="applyMessage" class="apply-message success">{{ applyMessage }}</p>
      <p v-if="applyError" class="apply-message error">{{ applyError }}</p>
    </div>
  </div>
</template>

<style scoped>
.theme-manager {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  background: color-mix(in srgb, var(--color-surface) 94%, #111c3e 6%);
}
.presets-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-2);
}
.preset-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: border-color var(--transition-fast), transform var(--transition-fast);
  background: color-mix(in srgb, var(--color-surface-overlay) 62%, #ffffff 38%);
}
.preset-card:hover { border-color: color-mix(in srgb, var(--color-primary) 50%, var(--color-border)); transform: translateY(-1px); }
.preset-preview {
  height: 60px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.pp-header { height: 16px; }
.pp-body {
  flex: 1;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.pp-line { height: 4px; border-radius: 2px; width: 80%; }
.pp-accent { height: 6px; }
.preset-name {
  font-size: 9px;
  font-weight: 600;
  text-align: center;
  padding: 3px 4px;
  background: var(--color-surface-overlay);
  color: var(--color-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.theme-fields { display: flex; flex-direction: column; gap: var(--space-3); }
.theme-field { display: flex; flex-direction: column; gap: 4px; }
.chart-palette-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: var(--space-2);
}
.chart-palette-dot {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.12);
}
.chart-palette-actions {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-2);
}
.color-row { display: flex; align-items: center; gap: var(--space-2); }
.color-input-native {
  width: 36px; height: 28px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 2px;
  cursor: pointer;
  background: var(--color-surface-overlay);
  flex-shrink: 0;
}
.theme-preview {
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}
.tp-heading { font-size: 18px; font-weight: 700; }
.tp-body { font-size: 13px; line-height: 1.5; }
.tp-btn {
  display: inline-block;
  color: #fff;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  align-self: flex-start;
}
.tp-badge {
  display: inline-block;
  color: #fff;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  align-self: flex-start;
}
.tp-chart-row {
  display: flex;
  align-items: end;
  gap: 6px;
  min-height: 58px;
}
.tp-chart-bar {
  flex: 1;
  border-radius: 8px 8px 4px 4px;
  min-height: 18px;
}

.apply-theme-btn {
  margin-top: var(--space-3);
}

.apply-message {
  margin: var(--space-2) 0 0;
  font-size: var(--text-xs);
  line-height: 1.4;
}

.apply-message.success {
  color: #57f287;
}

.apply-message.error {
  color: var(--color-danger);
}

@media (max-width: 980px) {
  .presets-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .presets-grid {
    grid-template-columns: 1fr;
  }
}
</style>
