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

describe('MENTOR', () => {
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

  describe('/get all mentors', () => {
    it('should return all mentors with no token', (done) => {
      chai.request(app)
        .get('/api/v1/mentors')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data).to.be.an('array');
          if (err) return done();
          done();
        });
    });
  });

  describe('/get specific mentor', () => {
    it('should successfully return specific mentor', (done) => {
      chai.request(app)
        .get('/api/v1/mentors/1')
        .set('authorization', `${userToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully return specific mentor if no token provided', (done) => {
      chai.request(app)
        .get('/api/v1/mentors/1')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should successfully return specific mentor if mentor token provided', (done) => {
      chai.request(app)
        .get('/api/v1/mentors/1')
        .set('authorization', `${mentorToken} `)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should successfully return specific mentor if admin token provided', (done) => {
      chai.request(app)
        .get('/api/v1/mentors/1')
        .set('authorization', `${adminToken} `)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data).to.be.an('object');
          if (err) return done();
          done();
        });
    });
  });
});
