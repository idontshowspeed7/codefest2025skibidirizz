const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors()); 


let posts = [];


app.get('/api/posts', (req, res) => {
    res.send(posts);
});


app.post('/api/posts', (req, res) => {
    const { user, content, title } = req.body;

    
    if (!user || !content || !title) {
        return res.status(400).send({ error: 'User, content, and title are required' });
    }

    const newPost = {
        id: Date.now(), 
        user,
        title,
        content,
        comments: [] 
    };

    posts.push(newPost);
    res.status(201).send(newPost);
});

app.get('/api/posts/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).send({ error: 'Post not found' });
    }

    res.send(post);
});


app.post('/api/posts/:id/comments', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const { user, content } = req.body;

 
    if (!user || !content) {
        return res.status(400).send({ error: 'User and content are required' });
    }

    const post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).send({ error: 'Post not found' });
    }

    const newComment = {
        id: post.comments.length + 1,
        user,
        content
    };

    post.comments.push(newComment);
    res.status(201).send(newComment);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
