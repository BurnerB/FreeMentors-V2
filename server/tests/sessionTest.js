// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// import app from '../../app';
// import Token from './mocks/tokenMocks';
// import Session from './mocks/sessionMocks';


// dotenv.config();
// chai.should();
// chai.use(chaiHttp);

// let userToken;
// let mentorToken;
// let adminToken;

// describe('SESSION', () => {
//   before('generate JWT', (done) => {
//     userToken = jwt.sign(Token.userinfo,
//       process.env.JWT_KEY, {
//         expiresIn: '100d',
//       });

//     mentorToken = jwt.sign(Token.mentorinfo,
//       process.env.JWT_KEY, {
//         expiresIn: '100d',
//       });

//     adminToken = jwt.sign(Token.admininfo,
//       process.env.JWT_KEY, {
//         expiresIn: '100d',
//       });
//     done();
//   });
//   describe('/POST session', () => {
//     it('should successfully request a session', (done) => {
//       chai.request(app)
//         .post('/api/v1/sessions')
//         .set('authorization', `Bearer ${userToken}`)
//         .send(Session.session1)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });

//     it('should successfully request a session with mentor token', (done) => {
//       chai.request(app)
//         .post('/api/v1/sessions')
//         .set('authorization', `Bearer ${mentorToken}`)
//         .send(Session.session2)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });

//     it('should successfully request a session with Admin token', (done) => {
//       chai.request(app)
//         .post('/api/v1/sessions')
//         .set('authorization', `Bearer ${adminToken}`)
//         .send(Session.session3)
//         .end((err, res) => {
//           res.should.have.status(201);
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });

//     it('should unsuccessfully request a session without token', (done) => {
//       chai.request(app)
//         .post('/api/v1/sessions')
//         .set('authorization', ' ')
//         .send(Session.session4)
//         .end((err, res) => {
//           res.should.have.status(401);
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });

//     it('should unsuccessfully request a session invalid id', (done) => {
//       chai.request(app)
//         .post('/api/v1/sessions')
//         .set('authorization', `Bearer ${userToken}`)
//         .send(Session.session5)
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });

//     it('should unsuccessfully request a session invalid questions', (done) => {
//       chai.request(app)
//         .post('/api/v1/sessions')
//         .set('authorization', `Bearer ${mentorToken}`)
//         .send(Session.session6)
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.body.error.should.equal('Question is a required field with a maximum number of 100 chars');
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });

//     it('should unsuccessfully request a session already requested', (done) => {
//       chai.request(app)
//         .post('/api/v1/sessions')
//         .set('authorization', `Bearer ${userToken}`)
//         .send(Session.session1)
//         .end((err, res) => {
//            res.body.error.should.equal('Session already requested with this mentor');
//           res.should.have.status(400);
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });
//   });

//   describe('PATCH accept session', () => {
//     it('should successfully accept a session', (done) => {
//       chai.request(app)
//         .patch('/api/v1/sessions/1/accept')
//         .set('authorization', `Bearer ${mentorToken}`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.data.status.should.equal('accepted');
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });

//     it('should unsuccessfully accept a session if token is user', (done) => {
//       chai.request(app)
//         .patch('/api/v1/sessions/1/accept')
//         .set('authorization', `Bearer ${userToken}`)
//         .end((err, res) => {
//           res.should.have.status(403);
//           res.body.error.should.equal('ACCESS DENIED! Not a Mentor');
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });

//     it('should unsuccessfully accept a session if no token provided', (done) => {
//       chai.request(app)
//         .patch('/api/v1/sessions/1/accept')
//         .set('authorization', ' ')
//         .end((err, res) => {
//           res.should.have.status(401);
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });
//   });

//   describe('PATCH reject session', () => {
//     it("shouldn't reject a session already accepted", (done) => {
//       chai.request(app)
//         .patch('/api/v1/sessions/1/reject')
//         .set('authorization', `Bearer ${mentorToken}`)
//         .end((err, res) => {
//           res.should.have.status(400);
//           res.body.error.should.equal('Session already accepted');
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });

//     it('should unsuccessfully reject a session if token is user', (done) => {
//       chai.request(app)
//         .patch('/api/v1/sessions/1/accept')
//         .set('authorization', `Bearer ${userToken}`)
//         .end((err, res) => {
//           res.should.have.status(403);
//           res.body.error.should.equal('ACCESS DENIED! Not a Mentor');
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });

//     it('should unsuccessfully reject a session if no token provided', (done) => {
//       chai.request(app)
//         .patch('/api/v1/sessions/1/accept')
//         .set('authorization', ' ')
//         .end((err, res) => {
//           res.should.have.status(401);
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });
//   });

//   describe('GET sessions', () => {
//     it('should get all sessions', (done) => {
//       chai.request(app)
//         .get('/api/v1/sessions')
//         .set('authorization', `Bearer ${mentorToken}`)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });

//     it('should unsuccessfully accept a session if no token provided', (done) => {
//       chai.request(app)
//         .get('/api/v1/sessions')
//         .set('authorization', ' ')
//         .end((err, res) => {
//           res.should.have.status(401);
//           res.body.should.be.a('object');
//           if (err) return done();
//           return done();
//         });
//     });
//   });
// });
