import express from 'express';
import Users from '../controllers/user';
import Mentors from '../controllers/mentor';
import Validations from '../middleware/userValidation';
import alreadyRegistered from '../middleware/alreadyRegistered';


const router = express.Router();


router.post('/auth/signup', [alreadyRegistered], Validations.validateSignup, Users.registerUser);
router.post('/auth/signin', Validations.validateLogin, Users.userLogin);
router.get('/mentors', Mentors.getAllMentors);
// router.get('/mentors/:mentorId', Mentors.getSpecificMentors);

export default router;
