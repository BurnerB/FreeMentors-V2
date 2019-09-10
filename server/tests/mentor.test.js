import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import Tokengen from '../helpers/tokenGen';
import Token from './mocks/tokenMocks';
import app from '../../app';

const { expect } = chai;

dotenv.config();
chai.should();
chai.use(chaiHttp);

let userToken;
let mentorToken;
let adminToken;

describe('MENTOR', () => {
  before('generate JWT', (done) => {
    userToken = Tokengen.genToken(Token.userinfo);
    mentorToken = Tokengen.genToken(Token.mentorinfo);
    adminToken = Tokengen.genToken(Token.admininfo);
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
          return done();
        });
    });
  
    describe('/get specific mentor', () => {
      it('should successfully return specific mentor', (done) => {
        chai.request(app)
          .get('/api/v1/mentors/1')
          .set('authorization', `Bearer ${userToken}`)
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
          .set('authorization', `Bearer ${mentorToken} `)
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
          .set('authorization', `Bearer ${adminToken} `)
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
