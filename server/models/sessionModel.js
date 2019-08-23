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

  requestSession() {
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
}
export default SessionModel;
