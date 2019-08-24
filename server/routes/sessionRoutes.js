import express from 'express';
import Sessions from '../controllers/session';
import Validations from '../middleware/sessionValidation';
import authToken from '../middleware/authToken';
import Mentor from '../middleware/mentor';


const router = express.Router();

router.post('/sessions', authToken, Validations.validateSessions, Sessions.requestSession);
router.patch('/sessions/:sessionId/accept', [authToken, Mentor], Sessions.chooseSession);
router.patch('/sessions/:sessionId/reject', [authToken, Mentor], Sessions.chooseSession);


export default router;
