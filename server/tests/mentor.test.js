import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import Tokengen from '../helpers/tokenGen';
import Token from './mocks/tokenMocks';
import app from '../../app';

const { expect } = chai;

dotenv.config();
chai.should();
chai.use(chaiHttp);

let userToken;

describe('MENTOR', () => {
  before('generate JWT', (done) => {
    userToken = Tokengen.genToken(Token.userinfo);
    done();
  });
  
  describe('/get all mentors', () => {
    it('should return all mentors with no token', (done) => {
      chai.request(app)
        .get('/api/v1/mentors')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data).to.be.an('array');
          if (err) return done();
          return done();
        });
    });
  });
});
