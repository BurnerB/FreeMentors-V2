import db from '../db/sessions';
import BaseClass from './baseclass';

class SessionModel extends BaseClass {
  async requestSession() {
    const session = {
      sessionId: this.payload.sessionId,
      mentorId: this.payload.mentorId,
      menteeId: this.payload.menteeId,
      questions: this.payload.questions,
      menteeEmail: this.payload.menteeEmail,
      status: this.payload.status,
    };
    const obj = db.find((o) => o.mentorId === this.payload.mentorId && o.menteeId === this.payload.menteeId);
    if (!obj) {
      db.push(session);
      return session;
    }
    return false;
  }

  static async wasRequested(sessionId, mentorId) {
    const obj = db.find((o) => o.sessionId === parseInt(sessionId, 10) && o.mentorId === parseInt(mentorId, 10));
    if (!obj) {
      return false;
    }
    return obj;
  }

  static async acceptSession(session) {
    if (session.status !== 'pending') {
      return [false, session];
    }
    const accepted = {
      sessionId: session.sessionId,
      mentorId: session.mentorId,
      menteeId: session.menteeId,
      questions: session.questions,
      menteeEmail: session.menteeEmail,
      status: 'accepted',
    };
    db.splice(session.sessionId - 1, 1, accepted);
    return accepted;
  }

  static async rejectSession(session) {
    if (session.status !== 'pending') {
      return [false, session];
    }
    const rejected = {
      sessionId: session.sessionId,
      mentorId: session.mentorId,
      menteeId: session.menteeId,
      questions: session.questions,
      menteeEmail: session.menteeEmail,
      status: 'rejected',
    };
    db.splice(session.sessionId - 1, 1, rejected);
    return rejected;
  }

  static async findSessions(key, value) {
    const obj = db.filter((o) => o[key] === parseInt(value, 10));
    if (obj) {
      return obj;
    }
    return false;
  }
}
export default SessionModel;
