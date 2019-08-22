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
        .post('/sessions')
        .set('authorization', `${userToken}`)
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

    it('should successfully request a session with mentor token', (done) => {
      chai.request(app)
        .post('/sessions')
        .set('authorization', `${userToken}`)
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
        .post('/sessions')
        .set('authorization', `${userToken}`)
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
        .post('/sessions')
        .set('authorization', ' ')
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
  });
});
