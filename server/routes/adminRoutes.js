import express from 'express';
import Admin from '../controllers/admin';
import authToken from '../middleware/authToken';
import admin from '../middleware/admin';
import alreadyMentor from '../middleware/alreadyMentor';


const router = express.Router();


router.patch('/user/:userId', [authToken, admin, alreadyMentor], Admin.makeMentor);

export default router;
