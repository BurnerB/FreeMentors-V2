import express from 'express';
import Users from '../controllers/user';
import Validations from '../middleware/userValidation';

const router = express.Router();


router.post('/auth/signup', Validations.validateSignup, Users.registerUser);
router.post('/auth/signin', Validations.validateLogin, Users.userLogin);


export default router;
