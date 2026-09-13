export function enableMiddleDragPan({map, draw, windowRef = window}) {
  const canvas = map.getCanvas();
  let drag = null;

  const isDrawing = () => ['draw_line_string', 'draw_polygon'].includes(draw.getMode?.());
  const finish = event => {
    if (!drag || (event.pointerId !== undefined && event.pointerId !== drag.pointerId)) return;
    if (canvas.hasPointerCapture?.(drag.pointerId)) canvas.releasePointerCapture(drag.pointerId);
    drag = null;
    canvas.style.cursor = '';
  };

  canvas.addEventListener('pointerdown', event => {
    if (event.button !== 1 || !isDrawing()) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    map.stop?.();
    drag = {pointerId: event.pointerId, x: event.clientX, y: event.clientY};
    canvas.setPointerCapture?.(event.pointerId);
    canvas.style.cursor = 'grabbing';
  }, true);
  canvas.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const dx = drag.x - event.clientX;
    const dy = drag.y - event.clientY;
    drag.x = event.clientX;
    drag.y = event.clientY;
    if (dx || dy) map.panBy([dx, dy], {animate: false});
  }, true);
  canvas.addEventListener('pointerup', finish, true);
  canvas.addEventListener('pointercancel', finish, true);
  canvas.addEventListener('auxclick', event => {
    if (event.button === 1 && isDrawing()) event.preventDefault();
  }, true);
  windowRef.addEventListener('blur', finish);
}
