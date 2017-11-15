const request = require('supertest'),
  express = require('express'),
  expect = require('chai').expect,
  _ = require('lodash'),
  server = require('../../server'),
  nodebase = require('file://../node-base'),
  Validate = require('file://../node-base').Validate,
  userSchema = require('../../api/users/schema/schema.json');

let app = null;

describe('/users', function() {

  before(function(done) {
    server.then(function (_app) {
      app = _app;
      done();
    })
  })

  after(function(done) {
    done();
  })

  const dankId = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1',
    id404 = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e9',
    labelId = 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1';

  var users = [
    {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank', labels:[labelId]},
    {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl', labels:[]},
    {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim', labels:[labelId]},
  ];

  const mary = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'mary', labels:[labelId]};


  it('shows enpoint not found', function(done) {
    request(app)
      .get('/notthere')
      .expect(404, {
        errorCode: '000-0105',
        message: 'Endpoint not found.'
      }, done);
  });

  it('get many', function(done) {
    request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function(res) {
        const arr = res.body
        expect(arr.length).to.be.equal(3);
        expect(_.map(arr, 'name')).to.be.eql(['carl', 'dank', 'jim']); // should sort
        arr.forEach(user => {
          expect(Validate.validateObject(user, userSchema)).to.be.undefined;
        })
      })
      .end(done)
  });

  it('get one', function(done) {
    request(app)
      .get(`/api/users/${dankId}`)
      .expect(200, users[0], done);
  });

  it('get one 400 bad request', function(done) {
    request(app)
      .get(`/api/users/not-a-guid`)
      .expect(400)
      .expect(function(res) {
        expect(res.body.errorCode).to.equal('100-0100')
      })
      .end(done);
  });

  it('get one 404 not found', function(done) {
    request(app)
      .get(`/api/users/${id404}`)
      .expect(404)
      .expect(function(res) {
        expect(res.body.errorCode).to.equal('100-0101')
      })
      .end(done);
  });

  it('post', function(done) {
    request(app)
      .post(`/api/users`)
      .send({name: 'mary'})
      .expect(200)
      .expect(function(res) {
        expect(res.body.name).to.be.equal('mary');
        expect(res.body.id).to.exist;
        expect(Validate.validateGuid(res.body.id)).to.be.true;
      })
      .end(done)
  });

  it('get all after post', function(done) {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect(function(res) {
        const arr = res.body
        expect(arr.length).to.be.equal(4);
        expect(arr[3].name).to.equal('mary');
      })
      .end(done)
  });

  it('PUT /api/users/:id', function(done) {
    request(app)
      .put(`/api/users/${dankId}`)
      .send({id: dankId, name: 'dank2'})
      .expect(200)
      .expect(function(res) {
        expect(res.body.name).to.be.equal('dank2');
        expect(res.body.id).to.equal(dankId);
        expect(Validate.validateObject(res.body, userSchema)).to.be.undefined;
      })
      .end(done)
  });

  it('get one after put', function(done) {
    request(app)
      .get(`/api/users/${dankId}`)
      .expect(200)
      .expect(function(res) {
        expect(res.body.name).to.be.equal('dank2');
        expect(res.body.id).to.equal(dankId);
        expect(Validate.validateObject(res.body, userSchema)).to.be.undefined;
      })
      .end(done)
  });

  it('delete', function(done) {
    request(app)
      .delete(`/api/users/${dankId}`)
      .expect(200, done);
  });

  it('get all after delete', function(done) {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect(function(res) {
        const arr = res.body
        expect(arr.length).to.be.equal(3);
        expect(_.find(arr, {id: dankId})).to.be.undefined;
      })
      .end(done)
  });





})

