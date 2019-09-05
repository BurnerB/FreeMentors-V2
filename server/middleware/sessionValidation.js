import Joi from '@hapi/joi';
import response from '../helpers/responses';

class Validations {
  static validateSessions(req, res, next) {
    try {
      const schema = {
        mentorId: Joi.number().integer()
          .required()
          .error(() => 'MentorId is a required field and must be an integer'),

        questions: Joi.string().trim().max(100)
          .required()
          .error(() => 'Question is a required field with a maximum number of 100 chars'),
      };
      const { error } = Joi.validate(req.body, schema);
      if (error) {
        return response.catchError(400, error.details[0].message, res);
      }
      next();
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }
}

export default Validations;
