const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
window.canvasContext = ctx;

let drawing = false;
let current = { x: 0, y: 0 };

const colorPicker = document.getElementById('colorPicker');
const strokeWidthInput = document.getElementById('strokeWidth');

canvas.addEventListener('mousedown', (e) => {
  drawing = true;
  current.x = e.offsetX;
  current.y = e.offsetY;
});

canvas.addEventListener('mouseup', () => { drawing = false; });
canvas.addEventListener('mouseout', () => { drawing = false; });

canvas.addEventListener('mousemove', (e) => {
  if (!drawing) return;

  const x0 = current.x;
  const y0 = current.y;
  const x1 = e.offsetX;
  const y1 = e.offsetY;

  const strokeColor = colorPicker.value;
  const strokeWidth = parseInt(strokeWidthInput.value);

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y1);
  ctx.stroke();

  if (window.sendDrawing) {
    window.sendDrawing({ x0, y0, x1, y1, color: strokeColor, strokeWidth });
  }

  current.x = x1;
  current.y = y1;
});

// Redraw the canvas from history
function redrawHistory(history) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  history.forEach(line => {
    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.strokeWidth;
    ctx.beginPath();
    ctx.moveTo(line.x0, line.y0);
    ctx.lineTo(line.x1, line.y1);
    ctx.stroke();
  });
}

window.redrawHistory = redrawHistory;

// Draw data from other users
function drawFromServer(data) {
  ctx.strokeStyle = data.color;
  ctx.lineWidth = data.strokeWidth;
  ctx.beginPath();
  ctx.moveTo(data.x0, data.y0);
  ctx.lineTo(data.x1, data.y1);
  ctx.stroke();
}

window.drawFromServer = drawFromServer;
