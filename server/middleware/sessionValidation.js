import Joi from '@hapi/joi';
import response from '../helpers/responses';

class Validations {
  static validateSessions(req, res, next) {
    try {
      const schema = {
        questions: Joi.string().trim().max(100)
          .required()
          .error(() => 'Question is a required field with a maximum number of 100 chars'),
      };
      const { error } = Joi.validate(req.body, schema);
      if (error) {
        return response.Error(400, error.details[0].message, res);
      }
      return next();
    } catch (error) {
      return response.Error(500, error.toString(), res);
    }
  }
}

export default Validations;
