import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from './mocks/tokenMocks';
import app from '../../app';
import review from '../tests/mocks/reviewMock';

dotenv.config();

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let userToken;
let mentorToken;
let adminToken;

describe('Review', () => {
  before('generate JWT', (done) => {
    userToken = jwt.sign(Token.userinfo,
      process.env.JWT_KEY, {
        expiresIn: '100d',
      });

    mentorToken = jwt.sign(Token.mentorinfo,
      process.env.JWT_KEY, {
        expiresIn: '100d',
      });
    adminToken = jwt.sign(Token.admininfo,
      process.env.JWT_KEY, {
        expiresIn: '100d',
      });
    done();
  });
  describe('/post a review', () => {
    it('user should unsuccesfully post a that session id doesne exist', (done) => {
      chai.request(app)
        .post('/api/v1/sessions/3/review')
        .set('authorization', `Bearer ${userToken}`)
        .send(review.review1)
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body.error).equals('No Session with that Id exists');
          if (err) return done();
          done();
        });
    });

    it('mentor should unsuccesfully post a review', (done) => {
      chai.request(app)
        .post('/api/v1/sessions/3/review')
        .set('authorization', `Bearer ${mentorToken}`)
        .send(review.review2)
        .end((err, res) => {
          res.should.have.status(403);
          expect(res.body.error).equals('ACCESS DENIED! A mantor cannot review a session');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully post review invalid score', (done) => {
      chai.request(app)
        .post('/api/v1/sessions/3/review')
        .set('authorization', `Bearer ${userToken}`)
        .send(review.review3)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('score is a required field and must be an integer between 0-5');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully post review invalid remarks', (done) => {
      chai.request(app)
        .post('/api/v1/sessions/3/review')
        .set('authorization', `Bearer ${userToken}`)
        .send(review.review4)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('remarks is a required field with a minimum of 5 and maximum number of 100 chars');
          if (err) return done();
          done();
        });
    });
  });
});
