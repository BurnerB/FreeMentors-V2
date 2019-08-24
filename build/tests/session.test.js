"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("../../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var expect = _chai["default"].expect;

_chai["default"].should();

_chai["default"].use(_chaiHttp["default"]);

var userToken;
var mentorToken;
var adminToken;
describe('SESSION', function () {
  before('generate JWT', function (done) {
    userToken = _jsonwebtoken["default"].sign({
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
      isAdmin: false
    }, process.env.JWT_KEY, {
      expiresIn: '100d'
    });
    mentorToken = _jsonwebtoken["default"].sign({
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
      isAdmin: false
    }, process.env.JWT_KEY, {
      expiresIn: '100d'
    });
    adminToken = _jsonwebtoken["default"].sign({
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
      isAdmin: true
    }, process.env.JWT_KEY, {
      expiresIn: '100d'
    });
    done();
  });
  describe('/POST session', function () {
    it('should successfully request a session', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/sessions').set('authorization', "Bearer ".concat(userToken)).send({
        mentorId: 2,
        questions: 'I wanna be a dj,Help?'
      }).end(function (err, res) {
        res.should.have.status(201);
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should successfully request a session with mentor token', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/sessions').set('authorization', "Bearer ".concat(mentorToken)).send({
        mentorId: 1,
        questions: 'I wanna be a dj,Help?'
      }).end(function (err, res) {
        res.should.have.status(201);
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should successfully request a session with Admin token', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/sessions').set('authorization', "Bearer ".concat(adminToken)).send({
        mentorId: 1,
        questions: 'I wanna be a dj,Help?'
      }).end(function (err, res) {
        res.should.have.status(201);
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should unsuccessfully request a session without token', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/sessions').set('authorization', ' ').send({
        mentorId: 2,
        questions: 'I wanna be a dj,Help?'
      }).end(function (err, res) {
        expect(res.body.error).equals('ACCESS DENIED! No token provided');
        res.should.have.status(401);
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should unsuccessfully request a session invalid id', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/sessions').set('authorization', "Bearer ".concat(userToken)).send({
        mentorId: 'ab',
        questions: 'I wanna be a dj,Help?'
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should unsuccessfully request a session invalid questions', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/sessions').set('authorization', "Bearer ".concat(mentorToken)).send({
        mentorId: 1,
        questions: ' '
      }).end(function (err, res) {
        res.should.have.status(400);
        expect(res.body.error).equals('Question is a required field with a maximum number of 100 chars');
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should unsuccessfully request a session already requested', function (done) {
      _chai["default"].request(_app["default"]).post('/api/v1/sessions').set('authorization', "Bearer ".concat(userToken)).send({
        mentorId: 2,
        questions: 'I wanna be a dj,Help?'
      }).end(function (err, res) {
        expect(res.body.error).equals('Session already requested with this mentor');
        res.should.have.status(400);
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
  });
  describe('PATCH accept session', function () {
    it('should successfully accept a session', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/sessions/1/accept').set('authorization', "Bearer ".concat(mentorToken)).end(function (err, res) {
        res.should.have.status(200);
        expect(res.body.data.status).equals('accepted');
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should unsuccessfully accept a session if token is user', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/sessions/1/accept').set('authorization', "Bearer ".concat(userToken)).end(function (err, res) {
        res.should.have.status(403);
        expect(res.body.error).equals('ACCESS DENIED! Not a Mentor');
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should unsuccessfully accept a session if no token provided', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/sessions/1/accept').set('authorization', ' ').end(function (err, res) {
        res.should.have.status(401);
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
  });
  describe('PATCH reject session', function () {
    it("shouldn't reject a session already accepted", function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/sessions/1/reject').set('authorization', "Bearer ".concat(mentorToken)).end(function (err, res) {
        res.should.have.status(400);
        expect(res.body.error).equals('Session already accepted');
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should unsuccessfully reject a session if token is user', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/sessions/1/accept').set('authorization', "Bearer ".concat(userToken)).end(function (err, res) {
        res.should.have.status(403);
        expect(res.body.error).equals('ACCESS DENIED! Not a Mentor');
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should unsuccessfully reject a session if no token provided', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/sessions/1/accept').set('authorization', ' ').end(function (err, res) {
        res.should.have.status(401);
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
  });
  describe('GET sessions', function () {
    it('should get all sessions', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/sessions').set('authorization', "Bearer ".concat(mentorToken)).end(function (err, res) {
        res.should.have.status(200);
        expect(res.body.data).to.be.an('array');
        if (err) return done();
        done();
      });
    });
    it('should unsuccessfully accept a session if no token provided', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/sessions').set('authorization', ' ').end(function (err, res) {
        res.should.have.status(401);
        expect(res).to.be.an('object');
        if (err) return done();
        done();
      });
    });
  });
});