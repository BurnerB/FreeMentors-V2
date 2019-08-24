import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import app from '../../app';

dotenv.config();

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let userToken;
let mentorToken;
let adminToken;

describe('SESSION', () => {
  before('generate JWT', (done) => {
    userToken = jwt.sign({
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      password: 'password123',
      address: 'Nairobi Kenya',
      bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
      occupation: 'Musician',
      expertise: 'rapping',
      isMentor: false,
      isAdmin: false,
    },
    process.env.JWT_KEY, {
      expiresIn: '100d',
    });

    mentorToken = jwt.sign({
      userId: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'janedoe@email.com',
      password: 'password123',
      address: 'Nairobi Kenya',
      bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
      occupation: 'Musician',
      expertise: 'rapping',
      isMentor: true,
      isAdmin: false,
    },
    process.env.JWT_KEY, {
      expiresIn: '100d',
    });

    adminToken = jwt.sign({
      userId: 3,
      firstName: 'Jack',
      lastName: 'Doe',
      email: 'jackdoe@email.com',
      password: 'password123',
      address: 'Nairobi Kenya',
      bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
      occupation: 'Musician',
      expertise: 'rapping',
      isMentor: true,
      isAdmin: true,
    },
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
        .send({
          mentorId: 2,
          questions: 'I wanna be a dj,Help?',
        })
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
        .send({
          mentorId: 1,
          questions: 'I wanna be a dj,Help?',
        })
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
        .send({
          mentorId: 1,
          questions: 'I wanna be a dj,Help?',
        })
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
        .send({
          mentorId: 2,
          questions: 'I wanna be a dj,Help?',
        })
        .end((err, res) => {
          expect(res.body.error).equals('ACCESS DENIED! No token provided');
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
        .send({
          mentorId: 'ab',
          questions: 'I wanna be a dj,Help?',
        })
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
        .send({
          mentorId: 1,
          questions: ' ',
        })
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
        .send({
          mentorId: 2,
          questions: 'I wanna be a dj,Help?',
        })
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
    it('should successfully accept a session', (done) => {
      chai.request(app)
        .patch('/api/v1/sessions/1/reject')
        .set('authorization', `Bearer ${mentorToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data.status).equals('rejected');
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully accept a session if token is user', (done) => {
      chai.request(app)
        .patch('/api/v1/sessions/1/reject')
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
        .patch('/api/v1/sessions/1/reject')
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
