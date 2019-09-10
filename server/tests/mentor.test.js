import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../../app';

const { expect } = chai;

dotenv.config();
chai.should();
chai.use(chaiHttp);

const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RuYW1lIjoiSm9obiIsImxhc3RuYW1lIjoiRG9lIiwiZW1haWwiOiJqb2huZG9lMTBAZW1haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkWG5VSm9lVnRyb2N4dXNCclhIZUptdWpXc09SMHB6a1FMMG1UZUh6SWFGZWVCRVMvVi5jL3UiLCJhZGRyZXNzIjoiTmFpcm9iaSBLZW55YSIsImJpbyI6InJhcHBlciwgcmVjb3JkIHByb2R1Y2VyLCBhbmQgYWN0b3Igd2hvIHdhcyBrbm93biBhcyBvbmUgb2YgdGhlIG1vc3QtY29udHJvdmVyc2lhbCBhbmQgYmVzdC1zZWxsaW5nIGFydGlzdHMgb2YgdGhlIGVhcmx5IDIxc3QgY2VudHVyeSIsIm9jY3VwYXRpb24iOiJNdXNpY2lhbiIsImV4cGVydGlzZSI6InJhcHBpbmciLCJpc21lbnRvciI6ZmFsc2UsImlzYWRtaW4iOmZhbHNlLCJjcmVhdGVkX29uIjoiMjAxOS0wOS0xMFQxMTo0MToxNi4zMDRaIiwiaWF0IjoxNTY4MTE1Njc2LCJleHAiOjE1NjgyMDIwNzZ9.CgTHaI8vL3qf3M3eDmWIiMwXdlasQxUEGCGY-H5d84Q';
const mentorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3RuYW1lIjoiSm9obiIsImxhc3RuYW1lIjoiRG9lIiwiZW1haWwiOiJqb2huZG9lN0BlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRmVXEvcXVsVW1oY09FMFpSSU5SUUtPNlMvVVhUcmlSSGU1RTI5ZUFsM0xqVFNXMkdiZ3RoLiIsImFkZHJlc3MiOiJOYWlyb2JpIEtlbnlhIiwiYmlvIjoicmFwcGVyLCByZWNvcmQgcHJvZHVjZXIsIGFuZCBhY3RvciB3aG8gd2FzIGtub3duIGFzIG9uZSBvZiB0aGUgbW9zdC1jb250cm92ZXJzaWFsIGFuZCBiZXN0LXNlbGxpbmcgYXJ0aXN0cyBvZiB0aGUgZWFybHkgMjFzdCBjZW50dXJ5Iiwib2NjdXBhdGlvbiI6Ik11c2ljaWFuIiwiZXhwZXJ0aXNlIjoicmFwcGluZyIsImlzbWVudG9yIjp0cnVlLCJpc2FkbWluIjpmYWxzZSwiY3JlYXRlZF9vbiI6IjIwMTktMDktMTBUMDQ6Mjc6MzAuOTU4WiIsImlhdCI6MTU2ODExNjcwNCwiZXhwIjoxNTY4MjAzMTA0fQ.B25DJ0kntXP0q1LFuuCRlac2HSyxLk48D2e77UpLo6w';
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiSW0iLCJsYXN0bmFtZSI6ImFkbWluIiwiZW1haWwiOiJJbUFkbWluQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBGbU1HSkx5NTllR1c4Y2t6bWNMOWVSelBvQy9DZjNCMzNTZjM1aGY3eFdEVmc0SlJiZ2VlIiwiYWRkcmVzcyI6Ik5haXJvYmkgS2VueWEiLCJiaW8iOiJyYXBwZXIsIHJlY29yZCBwcm9kdWNlciwgYW5kIGFjdG9yIHdobyB3YXMga25vd24gYXMgb25lIG9mIHRoZSBtb3N0LWNvbnRyb3ZlcnNpYWwgYW5kIGJlc3Qtc2VsbGluZyBhcnRpc3RzIG9mIHRoZSBlYXJseSAyMXN0IGNlbnR1cnkiLCJvY2N1cGF0aW9uIjoiTXVzaWNpYW4iLCJleHBlcnRpc2UiOiJyYXBwaW5nIiwiaXNtZW50b3IiOnRydWUsImlzYWRtaW4iOnRydWUsImNyZWF0ZWRfb24iOiIyMDE5LTA5LTEwVDAzOjE5OjM1LjgzMVoiLCJpYXQiOjE1NjgxMTY4NjksImV4cCI6MTU2ODIwMzI2OX0.JfqJXO1wlHdHJaTaT-_ieLvxPO8-w8G0p6DFVkWA_QQ';

describe('MENTOR', () => {
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
