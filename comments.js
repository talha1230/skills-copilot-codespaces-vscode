// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Read from file
function readComments() {
  const comments = fs.readFileSync('comments.json', 'utf8');
  return JSON.parse(comments);
}

// Write to file
function writeComments(comments) {
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
}

// Middleware
app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
  const comments = readComments();
  res.json(comments);
});

// Get a single comment
app.get('/comments/:id', (req, res) => {
  const comments = readComments();
  const comment = comments.find(comment => comment.id === req.params.id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Create a comment
app.post('/comments', (req, res) => {
  const comments = readComments();
  const comment = req.body;
  comment.id = Date.now().toString();
  comments.push(comment);
  writeComments(comments);
  res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const comments = readComments();
  const commentIndex = comments.findIndex(comment => comment.id === req.params.id);
  if (commentIndex >= 0) {
    comments[commentIndex] = req.body;
    writeComments(comments);
    res.json(comments[commentIndex]);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const comments = readComments();
  const commentIndex = comments.findIndex(comment => comment.id === req.params.id);
  if (commentIndex >= 0) {
    const comment = comments.splice(commentIndex, 1)[0];
    writeComments(comments);
    res.json(comment);
  } else {
    res.status(404).json({ error: 'Comment not found' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});