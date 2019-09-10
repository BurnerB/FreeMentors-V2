import express from 'express';
import Sessions from '../controllers/session';
import Validations from '../middleware/sessionValidation';
import authToken from '../middleware/authToken';
import Mentor from '../middleware/mentor';
import alreadyRequested from '../middleware/alreadyRequested';
import notUser from '../middleware/notUser';


const router = express.Router();

router.post('/sessions/:mentorId', [authToken, notUser, alreadyRequested], Validations.validateSessions, Sessions.requestSession);
router.patch('/sessions/:sessionId/accept', [authToken, Mentor], Sessions.chooseSession);
router.patch('/sessions/:sessionId/reject', [authToken, Mentor], Sessions.chooseSession);
router.get('/sessions', [authToken], Sessions.getallSessions);


export default router;
