import BaseClass from './baseclass';
import Db from '../db/Db';

class SessionModel extends BaseClass {
  async requestSession() {
    const sql = 'INSERT INTO sessions(mentorId, menteeId, questions, menteeEmail, status) VALUES($1, $2, $3, $4, $5) returning *';
    const values = [this.payload.mentorId, this.payload.menteeId, this.payload.questions, this.payload.menteeEmail, this.payload.status];
    const { rows } = await Db.query(sql, values);
    return rows[0];
  }

  static async wasRequested(menteeId, mentorId) {
    const sql = `SELECT * FROM sessions WHERE menteeid='${menteeId}' and mentorId='${mentorId}'`;
    const { rows } = await Db.query(sql);
    if (rows.length === 0) {
      return false;
    }
    return rows[0];
  }

  static async acceptSession(sessionId) {
    const { rows } = await Db.query(`UPDATE sessions SET status='accepted' WHERE id='${sessionId}' RETURNING *`);
    return rows[0];
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
