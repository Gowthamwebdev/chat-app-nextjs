import express from 'express';
import { acceptFriendRequest, createUser, getFriendsList, getPendingFriendRequests, sendFriendRequest } from '../controller/userController.js';

const router = express.Router();

router.post('/create', createUser);
router.post('/send-request', sendFriendRequest);
router.get('/:userId/pending-requests', getPendingFriendRequests);
router.get('/:userId/friendlist', getFriendsList);
router.put('/accept-request', acceptFriendRequest);
export default router;