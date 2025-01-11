const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory storage
let posts = [];

// Homepage
app.get('/', (req, res) => {
    res.send('Welcome to the Forum App!');
});

// Create a new post
app.post('/posts', (req, res) => {
    const { user, content } = req.body;
    const newPost = { id: posts.length + 1, user, content, comments: [] };
    posts.push(newPost);
    res.status(201).send(newPost);
});

// Get all posts
app.get('/posts', (req, res) => {
    res.send(posts);
});

// Add a comment to a post
app.post('/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const { user, content } = req.body;

    const post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).send({ error: 'Post not found' });
    }

    const newComment = { id: post.comments.length + 1, user, content };
    post.comments.push(newComment);
    res.status(201).send(newComment);
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
