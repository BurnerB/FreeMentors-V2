import Joi from '@hapi/joi';
import response from '../helpers/responses';

class Validations {
  static validateSignup(req, res, next) {
    try {
      const schema = {
        firstName: Joi.string().trim().min(3).max(15)
          .regex(/^[a-zA-Z]*$/)
          .required()
          .error(() => 'Firstname is a required field with a min of 3 chars and no special chars or numbers'),

        lastName: Joi.string().trim().min(3).max(15)
          .regex(/^[a-zA-Z]*$/)
          .required()
          .error(() => 'Lastname is a required field with a min of 3 chars and no special chars or numbers'),

        email: Joi.string().trim().email({ minDomainSegments: 2 }).required()
          .error(() => 'Email is a required field and must be valid'),

        password: Joi.string().trim().min(5).max(15)
          .alphanum()
          .required()
          .error(() => 'Password is a required field with a min of 5 chars and no special chars'),

        address: Joi.string().min(5).max(20)
          .required()
          .error(() => 'Address is a required field with a min of 5 chars and no special chars'),

        bio: Joi.string().trim().max(200)
          .required()
          .error(() => 'Bio is a required field with a maximum of 200 chars'),

        occupation: Joi.string().trim().min(3).max(15)
          .alphanum()
          .required()
          .error(() => 'Occupation is a required field with minimum of 3 chars maximum of 15 chars'),

        expertise: Joi.string().trim().min(3).max(15)
          .alphanum()
          .required()
          .error(() => 'Expertise is a required field with a minimum of 3 chars maximum of 15 chars'),
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

  static validateLogin(req, res, next) {
    try {
      const schema = {
        email: Joi.string().trim().email({ minDomainSegments: 2 }).required()
          .error(() => 'Email is a required field and must be valid'),
        password: Joi.string().trim().min(5).max(15)
          .alphanum()
          .required()
          .error(() => 'Password is a required field with a min of 5 chars and no special chars'),
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
