const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, '.')));


mongoose.connect("mongodb+srv://vishakcretaceous:sewey123@cluster0.wzl2g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postSchema = new mongoose.Schema({
    content: String,
    user: String,
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        console.log(posts);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Create a new post
app.post('/posts', async (req, res) => {
    const { content, user } = req.body;
    const newPost = new Post({
        content,
        user
    });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);

});
