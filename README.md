Collaborative Drawing Canvas
Project Overview

This project is a real-time collaborative drawing application built with vanilla JavaScript, HTML5 Canvas, Node.js, and Socket.io. Multiple users can draw simultaneously on the same canvas, see each other’s cursors, and choose brush colors and stroke widths.

✅ Features Implemented

Real-time drawing synchronization across multiple users

Brush color selection

Stroke width adjustment

Display of other users’ cursor positions

Multi-user support

⚠️ Known Issues / Limitations

Undo/Redo functionality is not fully working: Undo may not erase correctly on all clients.

Mobile touch support is not implemented.

Drawing history is maintained only on the server; complex redraws may not always reflect correctly.

💻 Setup Instructions

Clone the repository:

git clone <your-repo-link>


Navigate to the project folder:

cd collaborative-canvas


Install dependencies:

npm install


Start the server:

node server/server.js


Open your browser at:

http://localhost:3000


Open multiple tabs to test real-time collaboration.

Time Spent

Approximately X hours/days (replace with your actual time).

📝 Notes for Reviewers

Focused on real-time synchronization and vanilla Canvas API skills.

Undo/Redo was attempted, but the main priority was real-time multi-user drawing.

Architecture supports future improvements like fully working undo/redo, mobile support, and multiple rooms.
