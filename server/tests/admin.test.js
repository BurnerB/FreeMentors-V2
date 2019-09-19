import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { User, tokens } from './mocks/userMocks';
import app from '../../app';

const { expect } = chai;

dotenv.config();
chai.should();
chai.use(chaiHttp);

describe('ADMIN', () => {
  it('should successfully sign up a second user', (done) => {
    chai.request(app)
      .post('/api/v2/auth/signup')
      .send(User.user0)
      .end((err, res) => {
        res.should.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body.message).equals('User created successfully');
        if (err) return done();
        return done();
      });
  });

  describe('/patch user to mentor', () => {
    it('Admin should successfully make user into mentor', (done) => {
      chai.request(app)
        .patch('/api/v2/user/1')
        .set('authorization', `Bearer ${tokens.adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.message).equals('User account changed to mentor');
          expect(res.body.data.ismentor).equals(true);
          if (err) return done();
          return done();
        });
    });

    it('Admin should usuccessfully make user into mentor with expired token', (done) => {
      chai.request(app)
        .patch('/api/v2/user/1')
        .set('authorization', `Bearer ${tokens.expiredToken}`)
        .end((err, res) => {
          res.should.have.status(500);
          expect(res).to.be.an('object');
          expect(res.body.error).equals('TokenExpiredError: jwt expired');
          if (err) return done();
          return done();
        });
    });

    it('Admin should usuccessfully make user into mentor with malformed token', (done) => {
      chai.request(app)
        .patch('/api/v2/user/1')
        .set('authorization', 'Bearer ujufhjfojifijijn')
        .end((err, res) => {
          res.should.have.status(500);
          expect(res).to.be.an('object');
          expect(res.body.error).equals('JsonWebTokenError: jwt malformed');
          if (err) return done();
          return done();
        });
    });

    it('Admin should unsuccessfully make mentor into mentor', (done) => {
      chai.request(app)
        .patch('/api/v2/user/1')
        .set('authorization', `Bearer ${tokens.adminToken}`)
        .end((err, res) => {
          res.should.have.status(409);
          expect(res).to.be.an('object');
          expect(res.body.error).equals('The user is  already a mentor');
          if (err) return done();
          return done();
        });
    });

    it("Mentor should'nt successfully make user into mentor", (done) => {
      chai.request(app)
        .patch('/api/v2/user/2')
        .set('authorization', `Bearer ${tokens.mentorToken}`)
        .end((err, res) => {
          expect(res.body.error).equals('ACCESS DENIED! Not an Admin');
          res.should.have.status(403);
          expect(res).to.be.an('object');
          if (err) return done();
          return done();
        });
    });

    it("User should'nt successfully make user into mentor", (done) => {
      chai.request(app)
        .patch('/api/v2/user/2')
        .set('authorization', `Bearer ${tokens.userToken}`)
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
        .patch('/api/v2/user/2')
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
        .patch('/api/v2/user/1')
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
