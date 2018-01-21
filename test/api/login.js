const request = require('supertest'),
  chance = new require('chance')(),
  express = require('express'),
  expect = require('chai').expect,
  _ = require('lodash'),
  _server = require('../../server'),
  base = require('node-base'),
  errorCodes = base.errors.errorCodes,
  Validate = base.Validate,
  schema = require('../../api/login/schema/schema.json'),
  errorPrefix = '100-';

let server = null;

describe('login', function () {

  before(function (done) {
    _server.then(function (_server_) {
      server = _server_;
      done();
    })
  })

  after(function (done) {
    done();
  })

  it('should fail authentication initially', function (done) {
    request(server)
      .get('/cause-401-endpoint')
      .expect(401)
      .expect(function (res) {
        expect(res.body.errorCode).to.equal(errorCodes.server_prefix + errorCodes.user_not_authenticated);
      })
      .end(done);
  })

  it('login user', function (done) {
    request(server)
      .post('/api/login')
      .send({name: 'dank', company: 'dank co'})
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
    request(server)
      .post('/api/register')
      .send({name: 'dank', company: 'dank co'})
      .expect(400)
      .expect(function (res) {
        expect(res.body.errorCode).to.equal(errorCodes.server_prefix + errorCodes.user_already_exists);
      })
      .end(done)
  })

  it('register user newreg', function (done) {
    let newUser;
    request(server)
      .post('/api/register')
      .send({name: 'newreg', company: 'newreg co'})
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
          request(server)
            .delete(`/api/users/${newUser.id}`)
            .expect(204, done);
        } catch(e) {
          done(e);
        }
      })
  })

})

