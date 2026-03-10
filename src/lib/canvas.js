export const DEFAULT_CANVAS_WIDTH = 960
export const DEFAULT_CANVAS_HEIGHT = 540

export const CANVAS_SIZE_PRESETS = [
  {
    id: 'landscape',
    label: 'Landscape',
    ratioLabel: '16:9',
    width: 960,
    height: 540,
  },
  {
    id: 'mobile',
    label: 'Mobile',
    ratioLabel: '9:16',
    width: 540,
    height: 960,
  },
  {
    id: 'infographic',
    label: 'Infographics',
    ratioLabel: '1:2',
    width: 800,
    height: 1600,
  },
  {
    id: 'square',
    label: 'Square',
    ratioLabel: '1:1',
    width: 1080,
    height: 1080,
  },
]

const MIN_CANVAS_SIZE = 320
const MAX_CANVAS_SIZE = 4096

function clampCanvasDimension(value, fallback) {
  const parsed = Math.round(Number(value) || 0)
  if (!parsed) return fallback
  return Math.min(MAX_CANVAS_SIZE, Math.max(MIN_CANVAS_SIZE, parsed))
}

export function normalizeCanvasSettings(settings = {}) {
  return {
    slideWidth: clampCanvasDimension(settings.slideWidth, DEFAULT_CANVAS_WIDTH),
    slideHeight: clampCanvasDimension(settings.slideHeight, DEFAULT_CANVAS_HEIGHT),
  }
}

export function getProjectCanvasSize(projectOrSettings = null) {
  const source = projectOrSettings?.settings || projectOrSettings || {}
  const { slideWidth, slideHeight } = normalizeCanvasSettings(source)
  return {
    width: slideWidth,
    height: slideHeight,
    aspectRatio: slideWidth / slideHeight,
  }
}

export function matchCanvasSizePreset(projectOrSettings = null) {
  const { width, height } = getProjectCanvasSize(projectOrSettings)
  return CANVAS_SIZE_PRESETS.find((preset) => preset.width === width && preset.height === height) || null
}

export function formatCanvasAspectRatio(width, height) {
  const a = clampCanvasDimension(width, DEFAULT_CANVAS_WIDTH)
  const b = clampCanvasDimension(height, DEFAULT_CANVAS_HEIGHT)

  function gcd(left, right) {
    let x = left
    let y = right
    while (y) {
      const remainder = x % y
      x = y
      y = remainder
    }
    return x || 1
  }

  const divisor = gcd(a, b)
  return `${a / divisor}:${b / divisor}`
}
