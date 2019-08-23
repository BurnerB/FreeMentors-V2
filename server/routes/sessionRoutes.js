import express from 'express';
import Sessions from '../controllers/session';
import Validations from '../middleware/sessionValidation';
import authToken from '../middleware/authToken';


const router = express.Router();

router.post('/sessions', authToken, Validations.validateSessions, Sessions.requestSession);


export default router;
