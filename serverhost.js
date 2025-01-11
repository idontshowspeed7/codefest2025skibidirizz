const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to serve static files
app.use(express.json());
app.use(express.static('public'));

// Routes for handling posts and comments
const posts = [];

// Route to fetch all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Route to create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content, comments: [] };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Route to add a comment to a post
app.post('/posts/:id/comments', (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const post = posts.find((p) => p.id === parseInt(id));
  if (post) {
    post.comments.push(comment);
    res.status(201).json(post);
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
