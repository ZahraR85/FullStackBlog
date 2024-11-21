import express from 'express';
import cors from 'cors';
import db from './db/index.js'; // Database and models
//import debug from 'debug';
//debug.enable('startup');
const { Post } = db; // Destructure Post model
const app = express();
app.use(cors());
app.use(express.json());

//const startupDebug = debug("startup"); 

// Get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//startupDebug("hi"); 
// Get a single post by ID
app.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new post
app.post('/posts', async (req, res) => {
    try {
        const { author, title, content, cover } = req.body;
        const post = await Post.create({ author, title, content, cover });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a post
app.put('/posts/:id', async (req, res) => {
    try {
        const { author, title, content, cover } = req.body;
        const [updated] = await Post.update(
            { author, title, content, cover },
            { where: { id: req.params.id } }
        );
        if (!updated) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const updatedPost = await Post.findByPk(req.params.id);
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
    try {
        const deleted = await Post.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const port = 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
