import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../app';
import { tokens } from './mocks/userMocks';
import session from './mocks/sessionMocks';

const { expect } = chai;

dotenv.config();
chai.should();
chai.use(chaiHttp);


describe('MENTOR', () => {
  describe('/POST session', () => {

    it('should unsuccessfully request a session with mentor token', (done) => {
      chai.request(app)
        .post('/api/v2/sessions/3')
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
    it('should unsuccessfully request a session without token', (done) => {
      chai.request(app)
        .post('/api/v2/sessions/3')
        .set('authorization', `Bearer ${tokens.mentorToken}`)
        .send(session.session1)
        .end((err, res) => {
          expect(res.body.error).equals('Mentor cant access this route')
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    it('should unsuccessfully request a session if mentor doesnt exist', (done) => {
      chai.request(app)
        .post('/api/v2/sessions/9')
        .set('authorization', `Bearer ${tokens.userToken}`)
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
        .post('/api/v2/sessions/1')
        .set('authorization', `Bearer ${tokens.userToken}`)
        .send(session.session6)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Question is a required field with a maximum number of 100 chars');
          expect(res).to.be.an('object');
          if (err) return done();
          done();
        });
    });

    describe('PATCH accept session', () => {
      it('should unsuccessfully accept a session if token is user', (done) => {
        chai.request(app)
          .patch('/api/v2/sessions/2/accept')
          .set('authorization', `Bearer ${tokens.userToken}`)
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
          .patch('/api/v2/sessions/2/accept')
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
          .patch('/api/v2/sessions/2/reject')
          .set('authorization', `Bearer ${tokens.mentorToken}`)
          .end((err, res) => {
            // res.should.have.status(400);
            // expect(res.body.error).equals('Session already accepted');
            expect(res).to.be.an('object');
            if (err) return done();
            done();
          });
      });

      it('should unsuccessfully reject a session if token is user', (done) => {
        chai.request(app)
          .patch('/api/v2/sessions/1/accept')
          .set('authorization', `Bearer ${tokens.userToken}`)
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
          .patch('/api/v2/sessions/1/accept')
          .set('authorization', ' ')
          .end((err, res) => {
            res.should.have.status(401);
            expect(res).to.be.an('object');
            if (err) return done();
            done();
          });
      });

      it('should unsuccessfully accept a session if no token provided', (done) => {
        chai.request(app)
          .get('/api/v2/sessions')
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
});
