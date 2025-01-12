const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;
const path = require('path');

app.use(express.static(path.join(__dirname, '.')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://vishakcretaceous:sewey123@cluster0.wzl2g.mongodb.net/postsdb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const postSchema = new mongoose.Schema({
    content: String,
    user: String,
    createdAt: { type: Date, default: Date.now },
    comments: [
        {
            user: String,
            content: String,
            createdAt: { type: Date, default: Date.now }
        }
    ]
});

const Post = mongoose.model('Post', postSchema);

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});

// Get a single post by ID
app.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch the post' });
    }
});

// Create a new post
app.post('/posts', async (req, res) => {
    const { content, user } = req.body;
    const newPost = new Post({ content, user });

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create post' });
    }
});


app.post('/posts/:id/comments', async (req, res) => {
    const { user, content } = req.body;

    try {
        const post = await Post.findById(req.params.id);
        post.comments.push({ user, content });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});

const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyB-9MXnBD-l0mmAGvV-KBv_k-rn2-Mn8lE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



app.use(bodyParser.json()); 


app.get("/test", async (req, res) => {
  const prompt = "Explain how AI works";

  try {
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

// Route to accept dynamic prompts
app.post("/generate", async (req, res) => {
  const { prompt } = req.body; // Extract prompt from request body

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const result = await model.generateContent(prompt);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
