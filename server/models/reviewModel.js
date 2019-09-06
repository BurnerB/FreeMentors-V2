import BaseClass from './baseclass';
import db from '../db/reviews';
import sessions from '../db/sessions';

class ReviewModel extends BaseClass {
  async makeReview() {
    const review = {
      sessionId: this.payload.sessionId,
      mentorId: this.payload.mentorId,
      menteeId: this.payload.menteeId,
      score: this.payload.score,
      menteeFullName: this.payload.menteeFullName,
      remark: this.payload.remark,
    };
    const obj = db.find((o) => o.menteeFullName === this.payload.menteeFullName);
    if (!obj) {
      return false;
    }
    db.push(review);
    return review;
  }
}

export default ReviewModel;
