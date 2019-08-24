import db from '../db/sessions';

class SessionModel {
  constructor(mentorId, menteeId, questions, menteeEmail) {
    this.sessionId = db.length + 1;
    this.mentorId = mentorId;
    this.menteeId = menteeId;
    this.questions = questions;
    this.menteeEmail = menteeEmail;
    this.status = 'pending';
  }

  async requestSession() {
    const session = {
      sessionId: this.sessionId,
      mentorId: this.mentorId,
      menteeId: this.menteeId,
      questions: this.questions,
      menteeEmail: this.menteeEmail,
      status: this.status,
    };
    const obj = db.find((o) => o.mentorId === this.mentorId && o.menteeId === this.menteeId);

    if (!obj) {
      db.push(session);
      return session;
    }
    return false;
  }

  static async findById(sessionId) {
    const obj = db.find((o) => o.sessionId === parseInt(sessionId));
    if (!obj) {
      return false;
    }
    return obj;
  }

  static async wasRequested(sessionId, mentorId) {
    const obj = db.find((o) => o.sessionId === parseInt(sessionId) && o.mentorId === parseInt(mentorId));
    if (!obj) {
      return false;
    }
    return obj;
  }

  static async acceptSession(session) {
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
}
export default SessionModel;
