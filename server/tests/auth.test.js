import chai from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import app from '../../app';
import User from './mocks/userMocks';

chai.should();
chai.use(chaiHttp);

describe('AUTH', () => {
  describe ('test app',()=>{
    it('should successfully test app', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.message).equals('hello world!! Your app is working');
          if (err) return done();
          return done();
        });
    });
  })
  describe('/post signup', () => {
    it('should successfully sign up a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(User.user)
        .end((err, res) => {
          res.should.have.status(201);
          expect(res).to.be.an('object');
          expect(res.body.message).equals('User created successfully');
          if (err) return done();
          return done();
        });
    });

    it('should unsuccessfully sign up a user twice', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(User.user1)
        .end((err, res) => {
          res.should.have.status(409);
          expect(res).to.be.an('object');
          expect(res.body.error).equals('The email has already been used to register');
          if (err) return done();
          return done();
        });
    });

    it('should check if the email has already been used to register', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(User.user1)
        .end((err, res) => {
          res.should.have.status(409);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.error).equals('The email has already been used to register');
          if (err) return done();
          return done();
        });
    });

    it('should check if the email is valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(User.user2)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.error).equals('Email is a required field and must be valid');
          if (err) return done();
          return done();
        });
    });

    it('should check if the firstname is valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(User.user3)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.error).equals('Firstname is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          return done();
        });
    });

    it('should check if the lastname is valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(User.user4)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.error).equals('Lastname is a required field with a min of 3 chars and no special chars or numbers');
          if (err) return done();
          return done();
        });
    });

    it('should check if the password is valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(User.user5)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          return done();
        });
    });

    it('should check if the address is valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(User.user6)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.error).equals('Address is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          return done();
        });
    });

    it('should check if the bio is valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(User.user7)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.error).equals('Bio is a required field with a maximum of 200 chars');
          if (err) return done();
          return done();
        });
    });

    it('should check if occupation is valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(User.user8)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.error).equals('Occupation is a required field with minimum of 3 chars maximum of 15 chars');
          if (err) return done();
          return done();
        });
    });

    it('should check expertice is valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(User.user9)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res).to.be.an('object');
          expect(res.body).to.have.property('status');
          expect(res.body.error).equals('Expertise is a required field with a minimum of 3 chars maximum of 15 chars');
          if (err) return done();
          return done();
        });
    });
  });

  describe('/post login', () => {
    it('should successfully login user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(User.user10)
        .end((err, res) => {
          res.should.have.status(200);
          expect(res).to.be.an('object');
          expect(res.body.message).equals('User is successfully logged in');
          if (err) return done();
          return done();
        });
    });

    it('should not login user without email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(User.user11)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Email is a required field and must be valid');
          if (err) return done();
          return done();
        });
    });

    it('should not login user without password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(User.user12)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          return done();
        });
    });

    it('should not login user with mismatch password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(User.user13)
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body.error).equals('Incorrect password Email combination');
          if (err) return done();
          return done();
        });
    });

    it('should not login user not registered', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(User.user14)
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body.error).equals('Email not found, sign up to create an account');
          if (err) return done();
          return done();
        });
    });

    it('should check if email is valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(User.user15)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Email is a required field and must be valid');
          if (err) return done();
          return done();
        });
    });

    it('should check if password is valid', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send(User.user16)
        .end((err, res) => {
          res.should.have.status(400);
          expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
          if (err) return done();
          return done();
        });
    });
  });
});
