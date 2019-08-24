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
describe('MENTOR', function () {
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
  describe('/get all mentors', function () {
    it('should return all mentors with no token', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/mentors').set('authorization', ' ').end(function (err, res) {
        res.should.have.status(200);
        expect(res.body.data).to.be.an('array');
        if (err) return done();
        done();
      });
    });
  });
  describe('/get specific mentor', function () {
    it('should successfully return specific mentor', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/mentors/1').set('authorization', "".concat(userToken)).end(function (err, res) {
        res.should.have.status(200);
        expect(res.body.data).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should unsuccessfully return specific mentor if no token provided', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/mentors/1').set('authorization', ' ').end(function (err, res) {
        res.should.have.status(200);
        expect(res.body.data).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should successfully return specific mentor if mentor token provided', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/mentors/1').set('authorization', "".concat(mentorToken, " ")).end(function (err, res) {
        res.should.have.status(200);
        expect(res.body.data).to.be.an('object');
        if (err) return done();
        done();
      });
    });
    it('should successfully return specific mentor if admin token provided', function (done) {
      _chai["default"].request(_app["default"]).get('/api/v1/mentors/1').set('authorization', "".concat(adminToken, " ")).end(function (err, res) {
        res.should.have.status(200);
        expect(res.body.data).to.be.an('object');
        if (err) return done();
        done();
      });
    });
  });
});