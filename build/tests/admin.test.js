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
var expiredToken;
describe('ADMIN', function () {
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
    expiredToken = _jsonwebtoken["default"].sign({
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
      expiresIn: '1'
    });
    done();
  });
  describe('/patch user to mentor', function () {
    it('Admin should successfully make user into mentor', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/user/1').set('authorization', "Bearer ".concat(adminToken)).end(function (err, res) {
        res.should.have.status(200);
        expect(res).to.be.an('object');
        expect(res.body.data.message).equals('User account changed to mentor');
        if (err) return done();
        done();
      });
    });
    it("Mentor should'nt successfully make user into mentor", function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/user/2').set('authorization', "Bearer ".concat(mentorToken)).end(function (err, res) {
        res.should.have.status(403);
        expect(res).to.be.an('object');
        expect(res.body.error).equals('ACCESS DENIED! Not an Admin');
        if (err) return done();
        done();
      });
    });
    it("User should'nt successfully make user into mentor", function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/user/2').set('authorization', "Bearer ".concat(userToken)).end(function (err, res) {
        res.should.have.status(403);
        expect(res).to.be.an('object');
        expect(res.body.error).equals('ACCESS DENIED! Not an Admin');
        if (err) return done();
        done();
      });
    });
    it('Token is required make user into mentor', function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/user/2').set('authorization', ' ').end(function (err, res) {
        res.should.have.status(401);
        expect(res).to.be.an('object');
        expect(res.body.error).equals('ACCESS DENIED! No token provided');
        if (err) return done();
        done();
      });
    });
    it("shouldn't work with an expired token", function (done) {
      _chai["default"].request(_app["default"]).patch('/api/v1/user/1').set('authorization', "Bearer ".concat(expiredToken)).end(function (err, res) {
        res.should.have.status(500);
        expect(res).to.be.an('object');
        expect(res.body.error).equals('TokenExpiredError: jwt expired');
        if (err) return done();
        done();
      });
    });
  });
});