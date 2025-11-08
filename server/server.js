const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '../client')));

const drawingHistory = [];
const redoStack = [];

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  // Send current history to new user
  socket.emit('loadHistory', drawingHistory);

  // Drawing data from client
  socket.on('drawing', (data) => {
    drawingHistory.push(data);
    redoStack.length = 0; // clear redo stack
    socket.broadcast.emit('drawing', data);
  });

  // Undo
  socket.on('undo', () => {
    if (drawingHistory.length === 0) return;
    const last = drawingHistory.pop();
    redoStack.push(last);
    io.emit('loadHistory', drawingHistory);
  });

  // Redo
  socket.on('redo', () => {
    if (redoStack.length === 0) return;
    const redoAction = redoStack.pop();
    drawingHistory.push(redoAction);
    io.emit('loadHistory', drawingHistory);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 3000;
http.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));



