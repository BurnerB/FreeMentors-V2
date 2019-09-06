import express from 'express';
import Review from '../controllers/review';
import noMentor from '../middleware/notMentor';
import authToken from '../middleware/authToken';
import Validations from '../middleware/reviewVaidation';


const router = express.Router();

router.post('/sessions/:sessionId/review', [authToken, noMentor], Validations.validateReview, Review.postReview);


export default router;
