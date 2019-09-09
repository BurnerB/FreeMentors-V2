import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Token from './mocks/tokenMocks';
import User from './mocks/userMocks';
import app from '../../app';

dotenv.config();

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

let userToken;
let mentorToken;
let adminToken;

describe('ADMIN', () => {
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
    describe('/patch user to mentor', () => {
    //   it('should successfully sign up a user', (done) => {
    //     chai.request(app)
    //       .post('/api/v1/auth/signup')
    //       .send(User.user1)
    //       .end((err, res) => {
    //         res.should.have.status(201);
    //         expect(res).to.be.an('object');
    //         expect(res.body.message).equals('User created successfully');
    //         if (err) return done();
    //         return done();
    //       });
    //   });
      it('Admin should successfully make user into mentor', (done) => {
        chai.request(app)
          .patch('/api/v1/user/1')
          .set('authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            expect(res).to.be.an('object');
            expect(res.body.error).equals('User account changed to mentor');
            if (err) return done();
            return done();
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
            return done();
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
            return done();
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
            return done();
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
            return done();
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
            return done();
          });
      });
    });
  });
});
