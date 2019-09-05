import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../../app';
import Token from './mocks/tokenMocks';
import Session from './mocks/sessionMocks';


dotenv.config();

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let userToken;
let mentorToken;
let adminToken;

describe('SESSION', () => {
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
  describe('/POST session', () => {
    it('should successfully request a session', (done) => {
      chai.request(app)
        .post('/api/v1/sessions')
        .set('authorization', `Bearer ${userToken}`)
        .send(Session.session1)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should successfully request a session with mentor token', (done) => {
      chai.request(app)
        .post('/api/v1/sessions')
        .set('authorization', `Bearer ${mentorToken}`)
        .send(Session.session2)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should successfully request a session with Admin token', (done) => {
      chai.request(app)
        .post('/api/v1/sessions')
        .set('authorization', `Bearer ${adminToken}`)
        .send(Session.session3)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully request a session without token', (done) => {
      chai.request(app)
        .post('/api/v1/sessions')
        .set('authorization', ' ')
        .send(Session.session4)
        .end((err, res) => {
          res.should.have.status(401);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully request a session invalid id', (done) => {
      chai.request(app)
        .post('/api/v1/sessions')
        .set('authorization', `Bearer ${userToken}`)
        .send(Session.session5)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully request a session invalid questions', (done) => {
      chai.request(app)
        .post('/api/v1/sessions')
        .set('authorization', `Bearer ${mentorToken}`)
        .send(Session.session6)
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
        .post('/api/v1/sessions')
        .set('authorization', `Bearer ${userToken}`)
        .send(Session.session1)
        .end((err, res) => {
          expect(res.body.error).equals('Session already requested with this mentor');
          res.should.have.status(400);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });
  });

  describe('PATCH accept session', () => {
    it('should successfully accept a session', (done) => {
      chai.request(app)
        .patch('/api/v1/sessions/1/accept')
        .set('authorization', `Bearer ${mentorToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data.status).equals('accepted');
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully accept a session if token is user', (done) => {
      chai.request(app)
        .patch('/api/v1/sessions/1/accept')
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(403);
          expect(res.body.error).equals('ACCESS DENIED! Not a Mentor');
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully accept a session if no token provided', (done) => {
      chai.request(app)
        .patch('/api/v1/sessions/1/accept')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(401);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });
  });

  describe('PATCH reject session', () => {
    it("shouldn't reject a session already accepted", (done) => {
      chai.request(app)
        .patch('/api/v1/sessions/1/reject')
        .set('authorization', `Bearer ${mentorToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Session already accepted');
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully reject a session if token is user', (done) => {
      chai.request(app)
        .patch('/api/v1/sessions/1/accept')
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(403);
          expect(res.body.error).equals('ACCESS DENIED! Not a Mentor');
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully reject a session if no token provided', (done) => {
      chai.request(app)
        .patch('/api/v1/sessions/1/accept')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(401);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });
  });

  describe('GET sessions', () => {
    it('should get all sessions', (done) => {
      chai.request(app)
        .get('/api/v1/sessions')
        .set('authorization', `Bearer ${mentorToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data).to.be.an('array');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully accept a session if no token provided', (done) => {
      chai.request(app)
        .get('/api/v1/sessions')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(401);
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });
  });
});
