import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import Tokengen from '../helpers/tokenGen';
import Token from './mocks/tokenMocks';
import app from '../../app';
import session from '../tests/mocks/sessionMocks';

const { expect } = chai;

dotenv.config();
chai.should();
chai.use(chaiHttp);

let userToken;
let mentorToken;

describe('MENTOR', () => {
  before('generate JWT', (done) => {
    userToken = Tokengen.genToken(Token.userinfo);
    mentorToken = Tokengen.genToken(Token.mentorinfo);
    done();
  });
  describe('/POST session', () => {
    it('should successfully request a session', (done) => {
      chai.request(app)
        .post('/api/v1/sessions/2')
        .set('authorization', `Bearer ${userToken}`)
        .send(session.session1)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res).to.be.an('object');
          if (err) return done();
          return done();
        });
    });

    it('should Usuccessfully request a session with mentor token', (done) => {
      chai.request(app)
        .post('/api/v1/sessions/2')
        .set('authorization', `Bearer ${mentorToken}`)
        .send(session.session1)
        .end((err, res) => {
          res.should.have.status(403);
          expect(res.body.error).equals('Mentor cant access this route');
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should usuccessfully request a session with already requested', (done) => {
      chai.request(app)
        .post('/api/v1/sessions/2')
        .set('authorization', `Bearer ${userToken}`)
        .send(session.session1)
        .end((err, res) => {
          expect(res.body.error).equals('Session already requested with this mentor and is pending');
          res.should.have.status(400);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully request a session without token', (done) => {
      chai.request(app)
        .post('/api/v1/sessions/2')
        .set('authorization', ' ')
        .send(session.session1)
        .end((err, res) => {
          expect(res.body.error).equals('ACCESS DENIED! No token provided');
          res.should.have.status(401);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully request a session if mentor doesnt exist', (done) => {
      chai.request(app)
        .post('/api/v1/sessions/9')
        .set('authorization', `Bearer ${userToken}`)
        .send(session.session1)
        .end((err, res) => {
          res.should.have.status(404);
          expect(res).to.be.an('object');
          expect(res.body.error).equals('No Mentor with that ID found');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully request a session invalid questions', (done) => {
      chai.request(app)
        .post('/api/v1/sessions/3')
        .set('authorization', `Bearer ${userToken}`)
        .send(session.session6)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Question is a required field with a maximum number of 100 chars');
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully request a session already requested', (done) => {
      chai.request(app)
        .post('/api/v1/sessions/2')
        .set('authorization', `Bearer ${userToken}`)
        .send(session.session1)
        .end((err, res) => {
          expect(res.body.error).equals('Session already requested with this mentor and is pending');
          res.should.have.status(400);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });
  });
});
