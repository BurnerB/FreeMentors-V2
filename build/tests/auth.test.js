"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

describe('AUTH', function () {
  describe('test app', function () {
    it('should successfully test app', function (done) {
      _chai["default"].request(_app["default"]).get('/').end(function (err, res) {
        res.should.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body.message).equals('hello world!! Your app is working');
        if (err) return done();
        done();
      });
    });
  });
  describe('/post signup', function () {
    it('should successfully sign up a user', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: 'password123',
        address: 'Nairobi Kenya',
        bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
        occupation: 'Musician',
        expertise: 'rapping'
      }).end(function (err, res) {
        res.should.have.status(201);
        expect(res).to.be.an('object');
        expect(res.body.message).equals('User created successfully');
        if (err) return done();
        done();
      });
    });
    it('should check if the email has already been used to register', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: 'password123',
        address: 'Nairobi Kenya',
        bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
        occupation: 'Musician',
        expertise: 'rapping'
      }).end(function (err, res) {
        res.should.have.status(409);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.error).equals('The email has already been used to register');
        if (err) return done();
        done();
      });
    });
    it('should check if the email is valid', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoeemail.com',
        password: 'password123',
        address: 'Nairobi Kenya',
        bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
        occupation: 'Musician',
        expertise: 'rapping'
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.error).equals('Email is a required field and must be valid');
        if (err) return done();
        done();
      });
    });
    it('should check if the firstname is valid', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: 'John123',
        lastName: 'Doe',
        email: 'johndoeemail.com',
        password: 'password123',
        address: 'Nairobi Kenya',
        bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
        occupation: 'Musician',
        expertise: 'rapping'
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.error).equals('Firstname is a required field with a min of 3 chars and no special chars or numbers');
        if (err) return done();
        done();
      });
    });
    it('should check if the lastname is valid', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: 'John',
        lastName: 'Doe123',
        email: 'johndoeemail.com',
        password: 'password123',
        address: 'Nairobi Kenya',
        bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
        occupation: 'Musician',
        expertise: 'rapping'
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.error).equals('Lastname is a required field with a min of 3 chars and no special chars or numbers');
        if (err) return done();
        done();
      });
    });
    it('should check if the password is valid', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: new Array(50).join('a'),
        address: 'Nairobi Kenya',
        bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
        occupation: 'Musician',
        expertise: 'rapping'
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
        if (err) return done();
        done();
      });
    });
    it('should check if the address is valid', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: 'password123',
        address: '',
        bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
        occupation: 'Musician',
        expertise: 'rapping'
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.error).equals('Address is a required field with a min of 5 chars and no special chars');
        if (err) return done();
        done();
      });
    });
    it('should check if the bio is valid', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: 'password123',
        address: 'Nairobi @3#$',
        bio: new Array(202).join('a'),
        occupation: 'Musician',
        expertise: 'rapping'
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.error).equals('Bio is a required field with a maximum of 200 chars');
        if (err) return done();
        done();
      });
    });
    it('should check if occupation is valid', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: 'password123',
        address: 'Nairobi Kenya',
        bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
        occupation: ' ',
        expertise: 'rapping'
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.error).equals('Occupation is a required field with minimum of 3 chars maximum of 15 chars');
        if (err) return done();
        done();
      });
    });
    it('should check expertice is valid', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signup').send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@email.com',
        password: 'password123',
        address: 'Nairobi Kenya',
        bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
        occupation: 'Musician',
        expertise: ' '
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body.error).equals('Expertise is a required field with a minimum of 3 chars maximum of 15 chars');
        if (err) return done();
        done();
      });
    });
  });
  describe('/post login', function () {
    it('should successfully login user', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'johndoe@email.com',
        password: 'password123'
      }).end(function (err, res) {
        res.should.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body.message).equals('User is successfully logged in');
        if (err) return done();
        done();
      });
    });
    it('should not login user without email', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: ' ',
        password: 'password123'
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res.body.error).equals('Email is a required field and must be valid');
        if (err) return done();
        done();
      });
    });
    it('should not login user without password', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'johndoe@email.com',
        password: ' '
      }).end(function (err, res) {
        // res.should.have.status(400);
        expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
        if (err) return done();
        done();
      });
    });
    it('should not login user with mismatch password', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'johndoe@email.com',
        password: 'password1234'
      }).end(function (err, res) {
        res.should.have.status(401);
        expect(res.body.error).equals('Incorrect password Email combination');
        if (err) return done();
        done();
      });
    });
    it('should not login user not registered', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'janedoe@email.com',
        password: 'password123'
      }).end(function (err, res) {
        res.should.have.status(404);
        expect(res.body.error).equals('Email not found, sign up to create an account');
        if (err) return done();
        done();
      });
    });
    it('should check if email is valid', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'janedoeemail.com',
        password: 'password123'
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res.body.error).equals('Email is a required field and must be valid');
        if (err) return done();
        done();
      });
    });
    it('should check if password is valid', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/auth/signin').send({
        email: 'johndoe@email.com',
        password: new Array(50).join('a')
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
        if (err) return done();
        done();
      });
    });
  });
});