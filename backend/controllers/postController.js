import Post from '../models/Post.js';

// Get all posts
export const getPosts = async (req, res) => {
  try {
      const posts = await Post.findAll();
      res.json(posts); // Ensure this returns an array
  } catch (error) {
      console.error('Error fetching posts:', error.message);
      res.status(500).json({ error: error.message });
  }
};
// Get a single post by ID
export const getPost = async (req, res) => {
  try {
      const post = await Post.findByPk(req.params.id);
      if (!post) {
          return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
// Create a new post
export const postPost = async (req, res) => {
  try {
      const { author, title, content, cover } = req.body;

      // Log the incoming request body for debugging
      console.log('Request body:', req.body);

      const post = await Post.create({ author, title, content, cover });
      res.status(201).json(post);
  } catch (error) {
      console.error('Error creating post:', error.message);
      res.status(500).json({ error: error.message });
  }
};

// Update a post
export const updatePost= async (req, res) => {
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
};
// Delete a post
export const deletePost = async (req, res) => {
  try {
      const deleted = await Post.destroy({ where: { id: req.params.id } });
      if (!deleted) {
          return res.status(404).json({ error: 'Post not found' });
      }
      res.status(204).send(); // No content
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};