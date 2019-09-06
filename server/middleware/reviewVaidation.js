import Joi from '@hapi/joi';
import response from '../helpers/responses';

class Validations {
  static validateReview(req, res, next) {
    try {
      const schema = {
        score: Joi.number().min(0).max(5)
          .required()
          .error(() => 'score is a required field and must be an integer between 0-5'),

        remarks: Joi.string().trim().min(5).max(100)
          .required()
          .error(() => 'remarks is a required field with a minimum of 5 and maximum number of 100 chars'),
      };
      const { error } = Joi.validate(req.body, schema);
      if (error) {
        return response.catchError(400, error.details[0].message, res);
      }
      return next();
    } catch (e) {
      return response.catchError(500, e.toString(), res);
    }
  }
}

export default Validations;
