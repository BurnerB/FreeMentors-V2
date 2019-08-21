import express from 'express';
import Admin from '../controllers/admin';
import authToken from '../middleware/authToken';
import admin from '../middleware/admin';

const router = express.Router();


router.patch('/user/:userId', [authToken, admin], Admin.makeMentor);


export default router;
