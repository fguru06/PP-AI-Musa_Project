export const CONTENT_BLOCK_DRAG_MIME = 'application/x-mediasurf-content-block'

export const BUILT_IN_CONTENT_BLOCKS = [
  {
    id: 'hero-banner',
    scope: 'built-in',
    name: 'Hero Banner',
    category: 'Intro',
    description: 'Large opening section with title, supporting copy, and a call-to-action.',
    accent: '#6c47ff',
    tags: ['intro', 'title', 'cta'],
    elements: [
      {
        type: 'shape',
        x: 0,
        y: 0,
        width: 760,
        height: 290,
        content: { shapeType: 'rectangle', fillColor: '#f3f0ff', borderColor: '#ddd6fe', borderWidth: 1, borderRadius: 26, opacity: 1 },
      },
      {
        type: 'heading',
        x: 44,
        y: 42,
        width: 420,
        height: 88,
        content: { text: 'Start with a strong headline', fontSize: 42, textAlign: 'left', color: '#1a1a2e' },
      },
      {
        type: 'text',
        x: 44,
        y: 142,
        width: 360,
        height: 74,
        content: { text: 'Use this block to introduce the topic, set expectations, or frame the next section.', fontSize: 18, textAlign: 'left', color: '#475569' },
      },
      {
        type: 'button',
        x: 44,
        y: 226,
        width: 170,
        height: 44,
        content: { label: 'Primary action', variant: 'primary', action: 'none', bgColor: '#6c47ff', textColor: '#ffffff' },
      },
      {
        type: 'shape',
        x: 518,
        y: 48,
        width: 184,
        height: 184,
        content: { shapeType: 'circle', fillColor: '#c4b5fd', borderColor: 'transparent', borderWidth: 0, borderRadius: 999, opacity: 0.9 },
      },
      {
        type: 'text',
        x: 530,
        y: 108,
        width: 160,
        height: 58,
        content: { text: 'Visual\nplaceholder', fontSize: 24, fontWeight: '600', textAlign: 'center', color: '#4c1d95', lineHeight: 1.3 },
      },
    ],
  },
  {
    id: 'agenda-steps',
    scope: 'built-in',
    name: 'Agenda Steps',
    category: 'Structure',
    description: 'A clean numbered sequence for outlining the flow of a lesson or presentation.',
    accent: '#0ea5e9',
    tags: ['agenda', 'process', 'steps'],
    elements: [
      { type: 'heading', x: 0, y: 0, width: 720, height: 70, content: { text: 'Agenda', fontSize: 38, textAlign: 'left', color: '#0f172a' } },
      { type: 'text', x: 0, y: 66, width: 540, height: 40, content: { text: 'Walk your audience through the key milestones.', fontSize: 18, textAlign: 'left', color: '#475569' } },
      { type: 'shape', x: 0, y: 132, width: 680, height: 6, content: { shapeType: 'rectangle', fillColor: '#bae6fd', borderRadius: 999, borderColor: 'transparent', borderWidth: 0 } },
      { type: 'shape', x: 18, y: 170, width: 72, height: 72, content: { shapeType: 'circle', fillColor: '#0ea5e9', borderRadius: 999, borderColor: 'transparent', borderWidth: 0 } },
      { type: 'shape', x: 254, y: 170, width: 72, height: 72, content: { shapeType: 'circle', fillColor: '#38bdf8', borderRadius: 999, borderColor: 'transparent', borderWidth: 0 } },
      { type: 'shape', x: 490, y: 170, width: 72, height: 72, content: { shapeType: 'circle', fillColor: '#7dd3fc', borderRadius: 999, borderColor: 'transparent', borderWidth: 0 } },
      { type: 'text', x: 33, y: 188, width: 42, height: 34, content: { text: '1', fontSize: 26, fontWeight: '700', textAlign: 'center', color: '#ffffff' } },
      { type: 'text', x: 269, y: 188, width: 42, height: 34, content: { text: '2', fontSize: 26, fontWeight: '700', textAlign: 'center', color: '#ffffff' } },
      { type: 'text', x: 505, y: 188, width: 42, height: 34, content: { text: '3', fontSize: 26, fontWeight: '700', textAlign: 'center', color: '#0f172a' } },
      { type: 'text', x: 0, y: 258, width: 112, height: 60, content: { text: 'Introduce the topic', fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#0f172a' } },
      { type: 'text', x: 236, y: 258, width: 112, height: 60, content: { text: 'Explore examples', fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#0f172a' } },
      { type: 'text', x: 472, y: 258, width: 112, height: 60, content: { text: 'Wrap with action', fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#0f172a' } },
    ],
  },
  {
    id: 'three-card-grid',
    scope: 'built-in',
    name: 'Three Card Grid',
    category: 'Content',
    description: 'A ready-made trio of cards for benefits, pillars, or key concepts.',
    accent: '#14b8a6',
    tags: ['cards', 'features', 'grid'],
    elements: [
      { type: 'heading', x: 0, y: 0, width: 780, height: 70, content: { text: 'Three key ideas', fontSize: 36, textAlign: 'left', color: '#0f172a' } },
      { type: 'text', x: 0, y: 60, width: 560, height: 36, content: { text: 'Swap each card with a concept, outcome, or talking point.', fontSize: 17, textAlign: 'left', color: '#475569' } },
      { type: 'shape', x: 0, y: 124, width: 220, height: 240, content: { shapeType: 'rectangle', fillColor: '#ecfeff', borderColor: '#99f6e4', borderWidth: 1, borderRadius: 22 } },
      { type: 'shape', x: 246, y: 124, width: 220, height: 240, content: { shapeType: 'rectangle', fillColor: '#f0fdfa', borderColor: '#99f6e4', borderWidth: 1, borderRadius: 22 } },
      { type: 'shape', x: 492, y: 124, width: 220, height: 240, content: { shapeType: 'rectangle', fillColor: '#ecfdf5', borderColor: '#86efac', borderWidth: 1, borderRadius: 22 } },
      { type: 'heading', x: 28, y: 154, width: 164, height: 44, content: { text: 'Card one', fontSize: 26, textAlign: 'left', color: '#134e4a' } },
      { type: 'heading', x: 274, y: 154, width: 164, height: 44, content: { text: 'Card two', fontSize: 26, textAlign: 'left', color: '#134e4a' } },
      { type: 'heading', x: 520, y: 154, width: 164, height: 44, content: { text: 'Card three', fontSize: 26, textAlign: 'left', color: '#166534' } },
      { type: 'text', x: 28, y: 210, width: 164, height: 106, content: { text: 'Add a short description, proof point, or example.', fontSize: 17, textAlign: 'left', color: '#334155' } },
      { type: 'text', x: 274, y: 210, width: 164, height: 106, content: { text: 'Use the middle card for a comparison or supporting detail.', fontSize: 17, textAlign: 'left', color: '#334155' } },
      { type: 'text', x: 520, y: 210, width: 164, height: 106, content: { text: 'Highlight the action, takeaway, or final recommendation.', fontSize: 17, textAlign: 'left', color: '#334155' } },
    ],
  },
  {
    id: 'comparison-columns',
    scope: 'built-in',
    name: 'Comparison Columns',
    category: 'Content',
    description: 'Two balanced panels for before/after, option A/B, or pros/cons slides.',
    accent: '#f59e0b',
    tags: ['comparison', 'pros-cons', 'before-after'],
    elements: [
      { type: 'heading', x: 0, y: 0, width: 760, height: 70, content: { text: 'Compare approaches', fontSize: 36, textAlign: 'left', color: '#111827' } },
      { type: 'shape', x: 0, y: 92, width: 340, height: 290, content: { shapeType: 'rectangle', fillColor: '#fff7ed', borderColor: '#fed7aa', borderWidth: 1, borderRadius: 24 } },
      { type: 'shape', x: 380, y: 92, width: 340, height: 290, content: { shapeType: 'rectangle', fillColor: '#eff6ff', borderColor: '#bfdbfe', borderWidth: 1, borderRadius: 24 } },
      { type: 'heading', x: 28, y: 122, width: 180, height: 44, content: { text: 'Option A', fontSize: 28, textAlign: 'left', color: '#9a3412' } },
      { type: 'heading', x: 408, y: 122, width: 180, height: 44, content: { text: 'Option B', fontSize: 28, textAlign: 'left', color: '#1d4ed8' } },
      { type: 'text', x: 28, y: 188, width: 282, height: 150, content: { text: 'List trade-offs, risks, or legacy constraints here.', fontSize: 18, textAlign: 'left', color: '#7c2d12' } },
      { type: 'text', x: 408, y: 188, width: 282, height: 150, content: { text: 'Call out benefits, improvements, or the preferred state.', fontSize: 18, textAlign: 'left', color: '#1e3a8a' } },
    ],
  },
  {
    id: 'quote-callout',
    scope: 'built-in',
    name: 'Quote Callout',
    category: 'Highlights',
    description: 'Pull quote or testimonial treatment with a supporting byline.',
    accent: '#ec4899',
    tags: ['quote', 'testimonial', 'callout'],
    elements: [
      { type: 'shape', x: 0, y: 0, width: 760, height: 250, content: { shapeType: 'rectangle', fillColor: '#fdf2f8', borderColor: '#fbcfe8', borderWidth: 1, borderRadius: 30 } },
      { type: 'text', x: 44, y: 34, width: 60, height: 60, content: { text: '"', fontSize: 68, fontWeight: '700', textAlign: 'center', color: '#db2777' } },
      { type: 'heading', x: 112, y: 54, width: 560, height: 110, content: { text: 'Use a bold quote to anchor the narrative and break up dense content.', fontSize: 34, textAlign: 'left', color: '#831843', lineHeight: 1.25 } },
      { type: 'text', x: 116, y: 184, width: 360, height: 36, content: { text: 'Name, role, or source', fontSize: 18, fontWeight: '600', textAlign: 'left', color: '#9d174d' } },
    ],
  },
  {
    id: 'metric-strip',
    scope: 'built-in',
    name: 'Metric Strip',
    category: 'Data',
    description: 'Three highlight metrics for KPIs, outcomes, or summary statistics.',
    accent: '#16a34a',
    tags: ['metrics', 'kpi', 'stats'],
    elements: [
      { type: 'heading', x: 0, y: 0, width: 740, height: 64, content: { text: 'Metrics at a glance', fontSize: 34, textAlign: 'left', color: '#111827' } },
      { type: 'shape', x: 0, y: 94, width: 220, height: 170, content: { shapeType: 'rectangle', fillColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: 1, borderRadius: 22 } },
      { type: 'shape', x: 246, y: 94, width: 220, height: 170, content: { shapeType: 'rectangle', fillColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: 1, borderRadius: 22 } },
      { type: 'shape', x: 492, y: 94, width: 220, height: 170, content: { shapeType: 'rectangle', fillColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: 1, borderRadius: 22 } },
      { type: 'text', x: 28, y: 122, width: 164, height: 58, content: { text: '92%', fontSize: 44, fontWeight: '700', textAlign: 'center', color: '#166534' } },
      { type: 'text', x: 274, y: 122, width: 164, height: 58, content: { text: '3.4x', fontSize: 44, fontWeight: '700', textAlign: 'center', color: '#166534' } },
      { type: 'text', x: 520, y: 122, width: 164, height: 58, content: { text: '14d', fontSize: 44, fontWeight: '700', textAlign: 'center', color: '#166534' } },
      { type: 'text', x: 28, y: 188, width: 164, height: 42, content: { text: 'Completion rate', fontSize: 18, textAlign: 'center', color: '#166534' } },
      { type: 'text', x: 274, y: 188, width: 164, height: 42, content: { text: 'Engagement uplift', fontSize: 18, textAlign: 'center', color: '#166534' } },
      { type: 'text', x: 520, y: 188, width: 164, height: 42, content: { text: 'Average ramp time', fontSize: 18, textAlign: 'center', color: '#166534' } },
    ],
  },
  {
    id: 'timeline-ribbon',
    scope: 'built-in',
    name: 'Timeline Ribbon',
    category: 'Structure',
    description: 'A visual milestone layout for rollout plans, project phases, or learning journeys.',
    accent: '#8b5cf6',
    tags: ['timeline', 'milestones', 'journey'],
    elements: [
      { type: 'heading', x: 0, y: 0, width: 760, height: 68, content: { text: 'Project timeline', fontSize: 36, textAlign: 'left', color: '#111827' } },
      { type: 'shape', x: 24, y: 156, width: 640, height: 10, content: { shapeType: 'rectangle', fillColor: '#ddd6fe', borderRadius: 999, borderColor: 'transparent', borderWidth: 0 } },
      { type: 'shape', x: 36, y: 130, width: 56, height: 56, content: { shapeType: 'circle', fillColor: '#8b5cf6', borderRadius: 999, borderColor: '#ffffff', borderWidth: 4 } },
      { type: 'shape', x: 240, y: 130, width: 56, height: 56, content: { shapeType: 'circle', fillColor: '#a78bfa', borderRadius: 999, borderColor: '#ffffff', borderWidth: 4 } },
      { type: 'shape', x: 444, y: 130, width: 56, height: 56, content: { shapeType: 'circle', fillColor: '#c4b5fd', borderRadius: 999, borderColor: '#ffffff', borderWidth: 4 } },
      { type: 'shape', x: 648, y: 130, width: 56, height: 56, content: { shapeType: 'circle', fillColor: '#ede9fe', borderRadius: 999, borderColor: '#ddd6fe', borderWidth: 4 } },
      { type: 'text', x: 0, y: 214, width: 132, height: 60, content: { text: 'Discover\nneeds', fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#4c1d95' } },
      { type: 'text', x: 204, y: 214, width: 132, height: 60, content: { text: 'Design the\nsolution', fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#5b21b6' } },
      { type: 'text', x: 408, y: 214, width: 132, height: 60, content: { text: 'Pilot and\nrefine', fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#6d28d9' } },
      { type: 'text', x: 612, y: 214, width: 132, height: 60, content: { text: 'Launch and\nmeasure', fontSize: 18, fontWeight: '600', textAlign: 'center', color: '#7c3aed' } },
    ],
  },
  {
    id: 'faq-stack',
    scope: 'built-in',
    name: 'FAQ Stack',
    category: 'Highlights',
    description: 'Stacked question-and-answer cards for objections, FAQs, or recap points.',
    accent: '#f97316',
    tags: ['faq', 'accordion', 'questions'],
    elements: [
      { type: 'heading', x: 0, y: 0, width: 760, height: 66, content: { text: 'Frequently asked questions', fontSize: 34, textAlign: 'left', color: '#111827' } },
      { type: 'shape', x: 0, y: 92, width: 720, height: 74, content: { shapeType: 'rectangle', fillColor: '#fff7ed', borderColor: '#fdba74', borderWidth: 1, borderRadius: 18 } },
      { type: 'shape', x: 0, y: 182, width: 720, height: 74, content: { shapeType: 'rectangle', fillColor: '#fff7ed', borderColor: '#fdba74', borderWidth: 1, borderRadius: 18 } },
      { type: 'shape', x: 0, y: 272, width: 720, height: 74, content: { shapeType: 'rectangle', fillColor: '#fff7ed', borderColor: '#fdba74', borderWidth: 1, borderRadius: 18 } },
      { type: 'text', x: 24, y: 114, width: 620, height: 30, content: { text: 'Question one goes here', fontSize: 20, fontWeight: '600', textAlign: 'left', color: '#9a3412' } },
      { type: 'text', x: 24, y: 204, width: 620, height: 30, content: { text: 'Question two goes here', fontSize: 20, fontWeight: '600', textAlign: 'left', color: '#9a3412' } },
      { type: 'text', x: 24, y: 294, width: 620, height: 30, content: { text: 'Question three goes here', fontSize: 20, fontWeight: '600', textAlign: 'left', color: '#9a3412' } },
      { type: 'text', x: 656, y: 112, width: 40, height: 34, content: { text: '+', fontSize: 28, fontWeight: '700', textAlign: 'center', color: '#c2410c' } },
      { type: 'text', x: 656, y: 202, width: 40, height: 34, content: { text: '+', fontSize: 28, fontWeight: '700', textAlign: 'center', color: '#c2410c' } },
      { type: 'text', x: 656, y: 292, width: 40, height: 34, content: { text: '+', fontSize: 28, fontWeight: '700', textAlign: 'center', color: '#c2410c' } },
    ],
  },
  {
    id: 'process-ladder',
    scope: 'built-in',
    name: 'Process Ladder',
    category: 'Content',
    description: 'A vertical process or checklist block for procedures and step-by-step learning.',
    accent: '#06b6d4',
    tags: ['process', 'steps', 'workflow'],
    elements: [
      { type: 'heading', x: 0, y: 0, width: 760, height: 66, content: { text: 'How the process works', fontSize: 34, textAlign: 'left', color: '#111827' } },
      { type: 'shape', x: 38, y: 102, width: 6, height: 254, content: { shapeType: 'rectangle', fillColor: '#bae6fd', borderRadius: 999, borderColor: 'transparent', borderWidth: 0 } },
      { type: 'shape', x: 0, y: 100, width: 80, height: 80, content: { shapeType: 'circle', fillColor: '#0284c7', borderRadius: 999, borderColor: '#ffffff', borderWidth: 4 } },
      { type: 'shape', x: 0, y: 194, width: 80, height: 80, content: { shapeType: 'circle', fillColor: '#0ea5e9', borderRadius: 999, borderColor: '#ffffff', borderWidth: 4 } },
      { type: 'shape', x: 0, y: 288, width: 80, height: 80, content: { shapeType: 'circle', fillColor: '#67e8f9', borderRadius: 999, borderColor: '#ffffff', borderWidth: 4 } },
      { type: 'text', x: 26, y: 122, width: 28, height: 30, content: { text: '1', fontSize: 24, fontWeight: '700', textAlign: 'center', color: '#ffffff' } },
      { type: 'text', x: 26, y: 216, width: 28, height: 30, content: { text: '2', fontSize: 24, fontWeight: '700', textAlign: 'center', color: '#ffffff' } },
      { type: 'text', x: 26, y: 310, width: 28, height: 30, content: { text: '3', fontSize: 24, fontWeight: '700', textAlign: 'center', color: '#0f172a' } },
      { type: 'heading', x: 112, y: 110, width: 220, height: 38, content: { text: 'First step', fontSize: 24, textAlign: 'left', color: '#0c4a6e' } },
      { type: 'heading', x: 112, y: 204, width: 220, height: 38, content: { text: 'Second step', fontSize: 24, textAlign: 'left', color: '#0c4a6e' } },
      { type: 'heading', x: 112, y: 298, width: 220, height: 38, content: { text: 'Third step', fontSize: 24, textAlign: 'left', color: '#0c4a6e' } },
      { type: 'text', x: 112, y: 148, width: 420, height: 40, content: { text: 'Describe the task, decision, or input needed at this stage.', fontSize: 16, textAlign: 'left', color: '#334155' } },
      { type: 'text', x: 112, y: 242, width: 420, height: 40, content: { text: 'Explain how the process continues or what the team should do next.', fontSize: 16, textAlign: 'left', color: '#334155' } },
      { type: 'text', x: 112, y: 336, width: 420, height: 40, content: { text: 'End with the outcome, deliverable, or action the audience should take.', fontSize: 16, textAlign: 'left', color: '#334155' } },
    ],
  },
]

export function getContentBlockBounds(block) {
  const elements = Array.isArray(block?.elements) ? block.elements : []
  if (!elements.length) {
    return { minX: 0, minY: 0, width: 1, height: 1 }
  }

  const minX = Math.min(...elements.map((element) => Number(element.x || 0)))
  const minY = Math.min(...elements.map((element) => Number(element.y || 0)))
  const maxX = Math.max(...elements.map((element) => Number(element.x || 0) + Number(element.width || 0)))
  const maxY = Math.max(...elements.map((element) => Number(element.y || 0) + Number(element.height || 0)))

  return {
    minX,
    minY,
    width: Math.max(1, maxX - minX),
    height: Math.max(1, maxY - minY),
  }
}

export function normalizeContentBlock(block, fallbackId) {
  return {
    id: String(block?.id || fallbackId || `block-${Date.now()}`),
    scope: block?.scope === 'custom' ? 'custom' : 'built-in',
    name: String(block?.name || 'Untitled Block').trim() || 'Untitled Block',
    category: String(block?.category || 'Custom').trim() || 'Custom',
    description: String(block?.description || '').trim(),
    accent: String(block?.accent || '#6c47ff').trim() || '#6c47ff',
    tags: Array.isArray(block?.tags)
      ? block.tags.map((tag) => String(tag).trim()).filter(Boolean)
      : [],
    bindings: Array.isArray(block?.bindings)
      ? block.bindings
          .map((binding, index) => ({
            id: String(binding?.id || `binding-${index + 1}`),
            label: String(binding?.label || `Field ${index + 1}`).trim() || `Field ${index + 1}`,
            defaultValue: String(binding?.defaultValue ?? ''),
            elementIndex: Math.max(0, Number(binding?.elementIndex) || 0),
            contentKey: String(binding?.contentKey || 'text').trim() || 'text',
          }))
      : [],
    elements: Array.isArray(block?.elements)
      ? block.elements.map((element) => ({
          ...element,
          x: Number(element?.x || 0),
          y: Number(element?.y || 0),
          width: Number(element?.width || 120),
          height: Number(element?.height || 60),
          content: { ...(element?.content || {}) },
          styles: { ...(element?.styles || {}) },
          animations: Array.isArray(element?.animations) ? element.animations.map((animation) => ({ ...animation })) : [],
          interactions: Array.isArray(element?.interactions) ? element.interactions.map((interaction) => ({ ...interaction })) : [],
        }))
      : [],
  }
}