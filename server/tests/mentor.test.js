import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import { tokens } from './mocks/userMocks';
import app from '../../app';

const { expect } = chai;

dotenv.config();
chai.should();
chai.use(chaiHttp);
describe('MENTOR', () => {
  describe('/get all mentors', () => {
    it('should return all mentors with no token', (done) => {
      chai.request(app)
        .get('/api/v2/mentors')
        .set('authorization', ' ')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body.data).to.be.an('array');
          if (err) return done();
          return done();
        });
    });
  
    describe('/get specific mentor', () => {
      it('should successfully return specific mentor', (done) => {
        chai.request(app)
          .get('/api/v2/mentors/1')
          .set('authorization', `Bearer ${tokens.userToken}`)
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.data).to.be.an('object');
            if (err) return done();
            done();
          });
      });
  
      it('should unsuccessfully return specific mentor if no token provided', (done) => {
        chai.request(app)
          .get('/api/v2/mentors/1')
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
          .get('/api/v2/mentors/1')
          .set('authorization', `Bearer ${tokens.mentorToken} `)
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.data).to.be.an('object');
            if (err) return done();
            done();
          });
      });
       
      it('should successfully return specific mentor if admin token provided', (done) => {
        chai.request(app)
          .get('/api/v2/mentors/1')
          .set('authorization', `Bearer ${tokens.adminToken} `)
          .end((err, res) => {
            res.should.have.status(200);
            expect(res.body.data).to.be.an('object');
            if (err) return done();
            done();
          });
      });
    });
  });
});
