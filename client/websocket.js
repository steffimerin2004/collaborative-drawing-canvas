const socket = io();

// Send drawing
function sendDrawing(data) {
  socket.emit('drawing', data);
}

// Undo/Redo buttons
document.getElementById('undoBtn').addEventListener('click', () => {
  socket.emit('undo');
});

document.getElementById('redoBtn').addEventListener('click', () => {
  socket.emit('redo');
});

// Listen for drawing from others
socket.on('drawing', (data) => {
  if (window.drawFromServer) window.drawFromServer(data);
});

// Load full history (for undo/redo)
socket.on('loadHistory', (history) => {
  if (window.redrawHistory) window.redrawHistory(history);
});

window.sendDrawing = sendDrawing;


