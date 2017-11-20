const request = require('supertest'),
  chance = new require('chance')(),
  express = require('express'),
  expect = require('chai').expect,
  _ = require('lodash'),
  server = require('../../server'),
  base = require('node-base'),
  errorCodes = base.errors.errorCodes,
  Validate = base.Validate,
  schema = require('../../api/login/schema/schema.json'),
  errorPrefix = '100-';

let app = null;

describe('login', function () {

  before(function (done) {
    server.then(function (_app) {
      app = _app;
      done();
    })
  })

  after(function (done) {
    done();
  })

  it('should fail authentication initially', function (done) {
    request(app)
      .get('/cause-401-endpoint')
      .expect(401)
      .expect(function (res) {
        expect(res.body.errorCode).to.equal(errorCodes.server_prefix + errorCodes.user_not_authenticated);
      })
      .end(done);
  })

  it('login user', function (done) {
    request(app)
      .post('/api/login')
      .send({name: 'dank'})
      .expect(200)
      .expect('set-cookie', /dkAuth=/)
      .expect(function (res) {
        expect(res.headers['set-cookie']).to.match(/dkAuth/)
        expect(res.body.name).to.equal('dank');
        expect(Validate.validateGuid(res.body.id)).to.be.true;
      })
      .end(done)
  })

  it('register user already exists', function (done) {
    request(app)
      .post('/api/register')
      .send({name: 'dank'})
      .expect(400)
      .expect(function (res) {
        expect(res.body.errorCode).to.equal(errorCodes.server_prefix + errorCodes.user_already_exists);
      })
      .end(done)
  })

  it('register user newreg', function (done) {
    let newUser;
    request(app)
      .post('/api/register')
      .send({name: 'newreg'})
      .expect(200)
      .expect('set-cookie', /dkAuth=/)
      .expect(function (res) {
        newUser = res.body;
        expect(res.headers['set-cookie']).to.match(/dkAuth/)
        expect(res.body.name).to.equal('newreg');
        expect(Validate.validateGuid(res.body.id)).to.be.true;
      })
      .end(function(err, res) {
        // cleanup added newreg user
        if (err) done(err);
        try {
          request(app)
            .delete(`/api/users/${newUser.id}`)
            .expect(204, done);
        } catch(e) {
          done(e);
        }
      })
  })

})

