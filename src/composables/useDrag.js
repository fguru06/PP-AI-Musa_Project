import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Provides drag-to-move functionality for canvas elements.
 * Returns an onMouseDown handler to attach to the element.
 */
export function useDrag({ onMove, onEnd, snapToGrid, gridSize, canvasRef }) {
  const dragging = ref(false)
  let startX = 0, startY = 0
  let startElX = 0, startElY = 0
  let scale = 1

  function getCanvasScale() {
    if (!canvasRef?.value) return 1
    const rect = canvasRef.value.getBoundingClientRect()
    return rect.width / (canvasRef.value.offsetWidth || rect.width)
  }

  function snap(val, grid) {
    return Math.round(val / grid) * grid
  }

  function onMouseDown(e, elX, elY) {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    dragging.value = true
    scale = getCanvasScale()
    startX = e.clientX
    startY = e.clientY
    startElX = elX
    startElY = elY

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  function onMouseMove(e) {
    if (!dragging.value) return
    const dx = (e.clientX - startX) / scale
    const dy = (e.clientY - startY) / scale
    let newX = startElX + dx
    let newY = startElY + dy
    if (snapToGrid?.value && gridSize?.value) {
      newX = snap(newX, gridSize.value)
      newY = snap(newY, gridSize.value)
    }
    onMove?.({ x: newX, y: newY, dx, dy })
  }

  function onMouseUp() {
    if (!dragging.value) return
    dragging.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    onEnd?.()
  }

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  })

  return { dragging, onMouseDown }
}

/**
 * Provides resize handle functionality for canvas elements.
 */
export function useResize({ onResize, onEnd, snapToGrid, gridSize, canvasRef }) {
  const resizing = ref(false)
  let handle = ''
  let startX = 0, startY = 0
  let startW = 0, startH = 0, startElX = 0, startElY = 0

  function getCanvasScale() {
    if (!canvasRef?.value) return 1
    const rect = canvasRef.value.getBoundingClientRect()
    return rect.width / (canvasRef.value.offsetWidth || rect.width)
  }

  function snap(val, grid) {
    return Math.round(val / grid) * grid
  }

  function onMouseDown(e, h, el) {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    resizing.value = true
    handle = h
    startX = e.clientX
    startY = e.clientY
    startW = el.width
    startH = el.height
    startElX = el.x
    startElY = el.y

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  function onMouseMove(e) {
    if (!resizing.value) return
    const scale = getCanvasScale()
    const dx = (e.clientX - startX) / scale
    const dy = (e.clientY - startY) / scale
    const MIN = 20

    let newX = startElX, newY = startElY
    let newW = startW, newH = startH

    if (handle.includes('e')) newW = Math.max(MIN, startW + dx)
    if (handle.includes('s')) newH = Math.max(MIN, startH + dy)
    if (handle.includes('w')) {
      const w = Math.max(MIN, startW - dx)
      newX = startElX + (startW - w)
      newW = w
    }
    if (handle.includes('n')) {
      const h = Math.max(MIN, startH - dy)
      newY = startElY + (startH - h)
      newH = h
    }

    const g = snapToGrid?.value ? gridSize?.value : 1
    if (g > 1) {
      newW = snap(newW, g); newH = snap(newH, g)
      newX = snap(newX, g); newY = snap(newY, g)
    }

    onResize?.({ x: newX, y: newY, width: newW, height: newH, handle })
  }

  function onMouseUp() {
    resizing.value = false
    handle = ''
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    onEnd?.()
  }

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  })

  return { resizing, onMouseDown }
}

/**
 * Keyboard shortcut handler for the editor.
 */
export function useKeyboardShortcuts(handlers) {
  function onKeyDown(e) {
    const ctrl = e.ctrlKey || e.metaKey
    const key = e.key.toLowerCase()
    const tag = e.target.tagName.toLowerCase()
    const isInput = tag === 'input' || tag === 'textarea' || e.target.isContentEditable

    // Allow default browser behavior for text inputs
    if (isInput && (ctrl && ['c', 'v', 'x', 'a', 'z', 'y'].includes(key))) {
      return
    }

    if (ctrl && key === 'z' && !e.shiftKey) { e.preventDefault(); handlers.undo?.() }
    else if (ctrl && (key === 'y' || (key === 'z' && e.shiftKey))) { e.preventDefault(); handlers.redo?.() }
    else if (ctrl && key === 'c') { e.preventDefault(); handlers.copy?.() }
    else if (ctrl && key === 'v') { e.preventDefault(); handlers.paste?.() }
    else if (ctrl && key === 'x') { e.preventDefault(); handlers.cut?.() }
    else if (ctrl && key === 'd') { e.preventDefault(); handlers.duplicate?.() }
    else if (ctrl && key === 'a') { e.preventDefault(); handlers.selectAll?.() }
    else if (key === 'delete' || key === 'backspace') {
      if (!isInput) {
        e.preventDefault(); handlers.delete?.()
      }
    }
    else if (key === 'escape') { handlers.escape?.() }
    else if (ctrl && key === 'g') { e.preventDefault(); handlers.toggleGrid?.() }
    else if (ctrl && key === '=' || (ctrl && key === '+')) { e.preventDefault(); handlers.zoomIn?.() }
    else if (ctrl && key === '-') { e.preventDefault(); handlers.zoomOut?.() }
    else if (ctrl && key === '0') { e.preventDefault(); handlers.zoomReset?.() }
    else if (key === 'arrowleft')  { handlers.nudge?.(-1, 0) }
    else if (key === 'arrowright') { handlers.nudge?.(1, 0) }
    else if (key === 'arrowup')    { handlers.nudge?.(0, -1) }
    else if (key === 'arrowdown')  { handlers.nudge?.(0, 1) }
  }

  onMounted(() => window.addEventListener('keydown', onKeyDown))
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown))
}
