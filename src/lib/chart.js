export const DEFAULT_CHART_PALETTE = ['#6c47ff', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6']

const DEFAULT_CHART_ROWS = [
  { id: 'series-0', label: 'Q1', value: 120 },
  { id: 'series-1', label: 'Q2', value: 180 },
  { id: 'series-2', label: 'Q3', value: 150 },
  { id: 'series-3', label: 'Q4', value: 210 },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function parseNumber(value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function normalizeHexColor(color, fallback = '#6c47ff') {
  const value = String(color || '').trim()
  const full = value.match(/^#([0-9a-f]{6})$/i)
  if (full) return `#${full[1].toLowerCase()}`

  const short = value.match(/^#([0-9a-f]{3})$/i)
  if (short) {
    return `#${short[1].split('').map((token) => token + token).join('').toLowerCase()}`
  }

  return fallback
}

function hexToRgb(color) {
  const hex = normalizeHexColor(color).slice(1)
  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  }
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((channel) => clamp(Math.round(channel), 0, 255).toString(16).padStart(2, '0'))
    .join('')}`
}

function mixHexColors(base, target, ratio = 0.5) {
  const safeRatio = clamp(Number(ratio) || 0, 0, 1)
  const from = hexToRgb(base)
  const to = hexToRgb(target)
  return rgbToHex({
    r: from.r + ((to.r - from.r) * safeRatio),
    g: from.g + ((to.g - from.g) * safeRatio),
    b: from.b + ((to.b - from.b) * safeRatio),
  })
}

function extractPaletteTokens(paletteText) {
  return String(paletteText || '')
  .split(/[,\n]/)
    .map((token) => token.trim())
    .filter(Boolean)
}

function parseDelimitedRow(line, index) {
  const csvLike = line.match(/^"?([^",]+(?:""[^",]*)*)"?\s*[,;\t]\s*"?(-?\d+(?:\.\d+)?)"?$/)
  if (csvLike) {
    return {
      id: `series-${index}`,
      label: csvLike[1].replace(/""/g, '"').trim() || `Item ${index + 1}`,
      value: parseNumber(csvLike[2]),
    }
  }

  const delimited = line.match(/^(.*?)(?:\s*[,|:\t;]\s*|\s+)(-?\d+(?:\.\d+)?)$/)
  if (delimited) {
    return {
      id: `series-${index}`,
      label: delimited[1].trim() || `Item ${index + 1}`,
      value: parseNumber(delimited[2]),
    }
  }

  const parts = line.split(/[,	;]/).map((part) => part.trim()).filter(Boolean)
  if (parts.length >= 2) {
    const candidateValue = parts[parts.length - 1]
    if (Number.isFinite(Number(candidateValue))) {
      return {
        id: `series-${index}`,
        label: parts.slice(0, -1).join(' ').trim() || `Item ${index + 1}`,
        value: parseNumber(candidateValue),
      }
    }
  }

  const numeric = Number(line)
  if (Number.isFinite(numeric)) {
    return {
      id: `series-${index}`,
      label: `Item ${index + 1}`,
      value: numeric,
    }
  }

  return null
}

function extractChartSeries(dataText) {
  const lines = String(dataText || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  if (!lines.length) return []

  const headerMatch = lines[0].toLowerCase().match(/label|name|category|item/) && lines[0].toLowerCase().match(/value|amount|count|total/)
  const rows = headerMatch ? lines.slice(1) : lines
  return rows.map((line, index) => parseDelimitedRow(line, index)).filter(Boolean)
}

export function parseChartData(dataText, options = {}) {
  const parsed = extractChartSeries(dataText)
  if (parsed.length) return parsed
  if (options.fallbackToDefault === false) return []
  return DEFAULT_CHART_ROWS
}

export function parseChartPalette(paletteText) {
  const colors = extractPaletteTokens(paletteText)

  return colors.length ? colors : DEFAULT_CHART_PALETTE
}

export function serializeChartData(series) {
  return (Array.isArray(series) ? series : [])
    .map((item, index) => `${String(item?.label || `Item ${index + 1}`).trim() || `Item ${index + 1}`}, ${parseNumber(item?.value)}`)
    .join('\n')
}

export function paletteToText(colors) {
  return (Array.isArray(colors) ? colors : []).map((color) => String(color || '').trim()).filter(Boolean).join(', ')
}

export function buildThemeChartPalette(theme = {}) {
  const customPalette = extractPaletteTokens(theme?.chartPalette)
  if (customPalette.length) return customPalette

  const primary = normalizeHexColor(theme?.primaryColor, DEFAULT_CHART_PALETTE[0])
  const secondary = normalizeHexColor(theme?.secondaryColor, DEFAULT_CHART_PALETTE[1])
  const text = normalizeHexColor(theme?.textColor, '#1a1a2e')
  const background = normalizeHexColor(theme?.bgColor, '#ffffff')

  return [
    primary,
    secondary,
    mixHexColors(primary, secondary, 0.45),
    mixHexColors(secondary, background, 0.22),
    mixHexColors(primary, text, 0.24),
    mixHexColors(text, background, 0.28),
  ]
}

export function buildThemeChartContent(theme = {}) {
  const background = normalizeHexColor(theme?.bgColor, '#ffffff')
  const text = normalizeHexColor(theme?.textColor, '#1a1a2e')
  return {
    paletteText: paletteToText(buildThemeChartPalette(theme)),
    backgroundColor: background,
    textColor: text,
    gridColor: mixHexColors(text, background, 0.76),
    borderColor: mixHexColors(text, background, 0.84),
  }
}

function formatValue(value, decimals = 0) {
  return new Intl.NumberFormat(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180
  return {
    x: cx + (radius * Math.cos(angleInRadians)),
    y: cy + (radius * Math.sin(angleInRadians)),
  }
}

function describeDonutArc(cx, cy, radius, innerRadius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle)
  const end = polarToCartesian(cx, cy, radius, startAngle)
  const innerStart = polarToCartesian(cx, cy, innerRadius, endAngle)
  const innerEnd = polarToCartesian(cx, cy, innerRadius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ')
}

export function buildChartModel(content, width, height, theme = {}) {
  const type = ['bar', 'line', 'circle'].includes(content?.chartType) ? content.chartType : 'bar'
  const palette = content?.paletteText ? parseChartPalette(content?.paletteText) : buildThemeChartPalette(theme)
  const rawSeries = parseChartData(content?.dataText)
  const series = rawSeries.map((item, index) => ({
    ...item,
    value: Math.max(0, parseNumber(item.value)),
    color: palette[index % palette.length],
  }))

  const model = {
    type,
    title: String(content?.title || '').trim(),
    backgroundColor: content?.backgroundColor || theme?.bgColor || '#ffffff',
    textColor: content?.textColor || theme?.textColor || '#1a1a2e',
    gridColor: content?.gridColor || buildThemeChartContent(theme).gridColor || '#dbe3ef',
    borderColor: content?.borderColor || buildThemeChartContent(theme).borderColor || '#e2e8f0',
    borderWidth: Math.max(0, parseNumber(content?.borderWidth || 1)),
    showLegend: content?.showLegend !== false,
    showGrid: content?.showGrid !== false,
    showValues: content?.showValues !== false,
    showArea: Boolean(content?.showArea),
    strokeWidth: clamp(parseNumber(content?.strokeWidth || 3), 1, 8),
    innerRadius: clamp(parseNumber(content?.innerRadius || 62), 20, 85),
    xAxisLabel: String(content?.xAxisLabel || '').trim(),
    yAxisLabel: String(content?.yAxisLabel || '').trim(),
    width,
    height,
    series,
    total: series.reduce((sum, item) => sum + item.value, 0),
  }

  if (type === 'circle') {
    const legendHeight = model.showLegend ? Math.min(74, 18 + (Math.ceil(series.length / 2) * 24)) : 0
    const titleOffset = model.title ? 28 : 0
    const radius = Math.max(28, Math.min(width * 0.28, (height - titleOffset - legendHeight) * 0.28))
    const center = {
      x: width / 2,
      y: (height - legendHeight + titleOffset) / 2 + 8,
    }
    const innerRadius = radius * (model.innerRadius / 100)
    let startAngle = 0
    model.circle = {
      center,
      radius,
      innerRadius,
      slices: series.map((item) => {
        const ratio = model.total > 0 ? item.value / model.total : 0
        const endAngle = startAngle + (ratio * 360)
        const slice = {
          ...item,
          percentage: ratio * 100,
          path: describeDonutArc(center.x, center.y, radius, innerRadius, startAngle, endAngle || startAngle + 0.01),
        }
        startAngle = endAngle
        return slice
      }),
      centerValue: formatValue(model.total, model.total % 1 === 0 ? 0 : 1),
    }
    return model
  }

  const titleHeight = model.title ? 30 : 0
  const legendHeight = model.showLegend ? 34 : 0
  const axisHeight = 34
  const chartPadding = {
    top: titleHeight + 12,
    right: 16,
    bottom: axisHeight + legendHeight,
    left: 42,
  }
  const plotWidth = Math.max(40, width - chartPadding.left - chartPadding.right)
  const plotHeight = Math.max(40, height - chartPadding.top - chartPadding.bottom)
  const maxValue = Math.max(parseNumber(content?.maxValue || 0), ...series.map((item) => item.value), 1)
  const tickCount = 4
  const ticks = Array.from({ length: tickCount + 1 }, (_, index) => {
    const value = (maxValue / tickCount) * index
    const y = chartPadding.top + plotHeight - ((value / maxValue) * plotHeight)
    return {
      value,
      label: formatValue(value, value % 1 === 0 ? 0 : 1),
      y,
    }
  })

  if (type === 'bar') {
    const slotWidth = plotWidth / Math.max(series.length, 1)
    const barWidth = Math.min(58, slotWidth * 0.62)
    model.cartesian = {
      plotWidth,
      plotHeight,
      padding: chartPadding,
      maxValue,
      ticks,
      bars: series.map((item, index) => {
        const barHeight = (item.value / maxValue) * plotHeight
        const x = chartPadding.left + (slotWidth * index) + ((slotWidth - barWidth) / 2)
        const y = chartPadding.top + plotHeight - barHeight
        return {
          ...item,
          x,
          y,
          width: barWidth,
          height: barHeight,
          valueLabel: formatValue(item.value, item.value % 1 === 0 ? 0 : 1),
        }
      }),
    }
    return model
  }

  const stepX = series.length > 1 ? plotWidth / (series.length - 1) : plotWidth / 2
  const points = series.map((item, index) => ({
    ...item,
    x: chartPadding.left + (series.length > 1 ? stepX * index : plotWidth / 2),
    y: chartPadding.top + plotHeight - ((item.value / maxValue) * plotHeight),
    valueLabel: formatValue(item.value, item.value % 1 === 0 ? 0 : 1),
  }))
  model.cartesian = {
    plotWidth,
    plotHeight,
    padding: chartPadding,
    maxValue,
    ticks,
    points,
    linePath: points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' '),
    areaPath: points.length
      ? `${points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ')} L ${points[points.length - 1].x} ${chartPadding.top + plotHeight} L ${points[0].x} ${chartPadding.top + plotHeight} Z`
      : '',
  }
  return model
}
