const request = require('supertest'),
  express = require('express'),
  expect = require('chai').expect,
  _ = require('lodash'),
  server = require('../../server'),
  base = require('node-base'),
  errorCodes = base.errors.errorCodes,
  Validate = base.Validate,
  schema = require('../../api/users/schema/schema.json'),
  errorPrefix = '300-';

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
    labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', label: 'label one'};

  const users = [
    {_id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank', labels: [labelOne]},
    {_id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl', labels: []},
    {_id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim', labels: [labelOne]},
  ];

  const mary = {name: 'mary'};
  const kate = {_id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e4', name: 'kate', labels:[labelOne]};


  it('shows enpoint not found', function(done) {
    request(app)
      .get('/notthere')
      .expect(404)
      .expect(function(res) {
        expect(res.body.errorCode).to.equal(errorCodes.server_prefix + errorCodes.server_endpoint_not_found);
        expect(res.body.message).to.equal('Endpoint not found.')
      })
      .end(done);
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
          expect(Validate.validateObject(user, schema)).to.be.undefined;
        })
      })
      .end(done)
  });

  it('get one', function(done) {
    request(app)
      .get(`/api/users/${dankId}`)
      .expect(200, users[0], done);
  });

  it('get one 404 not found', function(done) {
    request(app)
      .get(`/api/users/${id404}`)
      .expect(404)
      .expect(function(res) {
        expect(res.body.errorCode).to.equal(errorPrefix + errorCodes.resource_not_found)
      })
      .end(done);
  });

  it('post with no _id or labels', function(done) {
    request(app)
      .post(`/api/users`)
      .send(mary)
      .expect(200)
      .expect(function(res) {
        const contact = res.body
        expect(contact.name).to.equal(mary.name);
        expect(Validate.validateGuid(contact._id)).to.be.true;
        expect(Validate.validateObject(contact, schema)).to.be.undefined;
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
        expect(arr[3].name).to.equal(mary.name);
        expect(Validate.validateObject(arr[3], schema)).to.be.undefined;
      })
      .end(done)
  });

  it('post with _id and labels', function(done) {
    request(app)
      .post(`/api/users`)
      .send(kate)
      .expect(200)
      .expect(function(res) {
        expect(res.body).to.eql(_.assign({labels: []}, kate));
        expect(Validate.validateObject(res.body, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('get all after post', function(done) {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect(function(res) {
        const arr = res.body
        expect(arr.length).to.equal(5);
        expect(arr[3].name).to.equal(kate.name);
        expect(Validate.validateObject(arr[3], schema)).to.be.undefined;
      })
      .end(done)
  });

  it('PUT /api/users/:id', function(done) {
    request(app)
      .put(`/api/users/${dankId}`)
      .send({_id: dankId, name: 'dank2'})
      .expect(200)
      .expect(function(res) {
        expect(res.body.name).to.be.equal('dank2');
        expect(res.body._id).to.equal(dankId);
        expect(Validate.validateObject(res.body, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('get one after put', function(done) {
    request(app)
      .get(`/api/users/${dankId}`)
      .expect(200)
      .expect(function(res) {
        expect(res.body.name).to.be.equal('dank2');
        expect(res.body._id).to.equal(dankId);
        expect(Validate.validateObject(res.body, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('delete', function(done) {
    request(app)
      .delete(`/api/users/${dankId}`)
      .expect(204, done);
  });

  it('get all after delete', function(done) {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect(function(res) {
        const arr = res.body
        expect(arr.length).to.be.equal(4);
        expect(_.find(arr, {id: dankId})).to.be.undefined;
        expect(_.map(arr, 'name')).to.be.eql(['carl', 'jim', 'kate', 'mary']);
      })
      .end(done)
  });

})

