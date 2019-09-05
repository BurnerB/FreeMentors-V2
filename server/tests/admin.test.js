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
let expiredToken;

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
    expiredToken = jwt.sign({
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
      expiresIn: '1s',
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
  describe('/patch user to mentor', () => {
    it('should successfully sign up a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe6@email.com',
          password: 'password123',
          address: 'Nairobi Kenya',
          bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
          occupation: 'Musician',
          expertise: 'rapping',
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res).to.be.an('object');
          expect(res.body.message).equals('User created successfully');
          if (err) return done();
          done();
        });
    });
    it('Admin should successfully make user into mentor', (done) => {
      chai.request(app)
        .patch('/api/v1/user/3')
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.data.message).equals('User account changed to mentor');
          if (err) return done();
          done();
        });
    });

    it('Admin should unsuccessfully make mentor into mentor', (done) => {
      chai.request(app)
        .patch(`/api/v1/user/${2}`)
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(409);
          expect(res).to.be.an('object');
          expect(res.body.error).equals('User is already a mentor');
          if (err) return done();
          done();
        });
    });

    it("Mentor should'nt successfully make user into mentor", (done) => {
      chai.request(app)
        .patch('/api/v1/user/2')
        .set('authorization', `Bearer ${mentorToken}`)
        .end((err, res) => {
          res.should.have.status(403);
          expect(res).to.be.an('object');
          expect(res.body.error).equals('ACCESS DENIED! Not an Admin');
          if (err) return done();
          done();
        });
    });

    it("User should'nt successfully make user into mentor", (done) => {
      chai.request(app)
        .patch('/api/v1/user/2')
        .set('authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          res.should.have.status(403);
          expect(res).to.be.an('object');
          expect(res.body.error).equals('ACCESS DENIED! Not an Admin');
          if (err) return done();
          done();
        });
    });

    it('Token is required make user into mentor', (done) => {
      chai.request(app)
        .patch('/api/v1/user/2')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(401);
          expect(res).to.be.an('object');
          expect(res.body.error).equals('ACCESS DENIED! No token provided');
          if (err) return done();
          done();
        });
    });

    it('Token is required make user into mentor', (done) => {
      chai.request(app)
        .patch('/api/v1/user/1')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(401);
          expect(res).to.be.an('object');
          expect(res.body.error).equals('ACCESS DENIED! No token provided');
          if (err) return done();
          done();
        });
    });
  });
});
