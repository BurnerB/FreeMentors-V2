import express from 'express';
import Users from '../controllers/user';
import Validations from '../middleware/userValidation';

const router = express.Router();


router.post('/auth/signup', Validations.validateSignup, Users.registerUser);


export default router;
