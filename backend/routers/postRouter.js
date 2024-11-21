import express from 'express';
import { getPosts, getPost, postPost, updatePost, deletePost } from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/posts', getPosts);
postRouter.get('/posts/:id', getPost);
postRouter.post('/posts', postPost);
postRouter.put('/posts/:id', updatePost);
postRouter.delete('/posts/:id', deletePost);

export default postRouter;