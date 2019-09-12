import BaseClass from './baseclass';
import Db from '../db/Db';

class SessionModel extends BaseClass {
  async requestSession() {
    const sql = 'INSERT INTO sessions(mentorId, menteeId, questions, menteeEmail, status) VALUES($1, $2, $3, $4, $5) returning *';
    const values = [this.payload.mentorId, this.payload.menteeId, this.payload.questions, this.payload.menteeEmail, this.payload.status];
    const { rows } = await Db.query(sql, values);
    return rows[0];
  }

  static async wasRequested(sessionId, mentorId) {
    const sql = `SELECT * FROM sessions WHERE id='${sessionId}' and mentorId='${mentorId}'`;
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

  static async rejectSession(sessionId) {
    const { rows } = await Db.query(`UPDATE sessions SET status='rejected' WHERE id='${sessionId}' RETURNING *`);
    return rows[0];
  }

  static async getUserSessions(menteeId) {
    const sql = `SELECT * FROM sessions WHERE menteeid='${menteeId}'`;
    const { rows } = await Db.query(sql);
    if (rows.length === 0) {
      return false;
    }
    return rows[0];
  }

  static async getMentorSessions(mentorId) {
    const sql = `SELECT * FROM sessions WHERE mentorid='${mentorId}'`;
    const { rows } = await Db.query(sql);
    if (rows.length === 0) {
      return false;
    }
    return rows;
  }
}
export default SessionModel;
