import ReviewModel from '../models/reviewModel';
import sessions from '../db/sessions';
import User from '../db/users';
import decoder from '../helpers/decodeToken';
import response from '../helpers/responses';

class Review {
  static async postReview(req, res) {
    try {
      const { score, remark } = req.body;
      let { sessionId } = req.params;
      sessionId = parseInt(sessionId, 10);

      const sessionInfo = await ReviewModel.findBy('sessionId', sessionId, sessions);
      if (!sessionInfo) {
        return response.handleError(404, 'No Session with that Id exists', res);
      }
      const { mentorId, menteeId } = sessionInfo;
      const decoded = decoder.decodeToken(req.headers.authorization);
      const { userId, firstName, lastName } = decoded;
      const menteeFullName = `${firstName} ${lastName}`;

      if (menteeId !== userId) {
        return response.handleError(404, 'You have no session with  this Id', res);
      }

      const newReview = new ReviewModel({
        sessionId,
        mentorId,
        menteeId,
        score,
        menteeFullName,
        remark,
      });

      const review = await newReview.makeReview();
      if (!review) {
        return response.handleError(409, 'You have already reviewed this  session', res);
      }
      return response.success(200, review, res);
    } catch (error) {
      return response.catchError(500, error.message, res);
    }
  }
}

export default Review;
