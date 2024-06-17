import express from 'express';
import {getFeedPosts,getuserPosts,likePost} from '../controllers/posts.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// read
router.get('/',verifyToken,getFeedPosts);
router.get('/:id/posts',verifyToken,getuserPosts);

// update
router.patch('/:id/like',verifyToken,likePost);

export default router;