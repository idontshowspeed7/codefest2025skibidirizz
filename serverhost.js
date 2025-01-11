const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let posts = [];

app.get('/api/posts', (req, res) => {
    res.send(posts);
});

app.post('/api/posts', (req, res) => {
    const { user, content } = req.body;
    const newPost = { id: posts.length + 1, user, content, comments: [] };
    posts.push(newPost);
    res.status(201).send(newPost);
});

app.post('/api/posts/:id/comments', (req, res) => {
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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
