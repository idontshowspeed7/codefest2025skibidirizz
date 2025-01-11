const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect('mongodb://localhost:27017/postsDB', { useNewUrlParser: true, useUnifiedTopology: true })
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
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Create a new post
app.post('/api/posts', async (req, res) => {
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

const fetchPosts = () => {
    fetch('http://localhost:3000/api/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = '';
            if (Array.isArray(posts) && posts.length > 0) {
                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('row');
                    postElement.innerHTML = `
                        <h3>${post.user}</h3>
                        <p>${post.content}</p>
                    `;
                    postsContainer.appendChild(postElement);
                });
            } else {
                postsContainer.innerHTML = '<p>No posts available</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
        });
};

document.getElementById('create-post-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission
    const user = document.getElementById('post-user').value;
    const content = document.getElementById('post-content').value;

    fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, content }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(post => {
            document.getElementById('post-user').value = '';
            document.getElementById('post-content').value = '';
            fetchPosts(); // Reload posts after adding a new one
        })
        .catch(error => {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
