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
    labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one'};
  let dankMongoId;

  const users = [
    {id: dankId, name: 'dank', labels: [labelOne]},
    {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl', labels: []},
    {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim', labels: [labelOne]},
  ];

  const mary = {name: 'mary'};
  const kate = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e4', name: 'kate', labels:[labelOne]};


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
      .expect(200)
      .expect(function(res) {
        const user = res.body;
        dankMongoId = user._id;
        delete user._id;
        expect(user).to.eql(users[0])
      })
      .end(done)
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

  it('post with no id or labels', function(done) {
    request(app)
      .post(`/api/users`)
      .send(mary)
      .expect(200)
      .expect(function(res) {
        const contact = res.body
        expect(contact.name).to.equal(mary.name);
        expect(Validate.validateGuid(contact.id)).to.be.true;
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

  it('post with id and labels', function(done) {
    request(app)
      .post(`/api/users`)
      .send(kate)
      .expect(200)
      .expect(function(res) {
        const user = res.body;
        delete user._id;
        expect(user).to.eql(_.assign({labels: []}, kate));
        expect(Validate.validateObject(user, schema)).to.be.undefined;
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
      .send({_id: dankMongoId, id: dankId, name: 'dank2'})
      .expect(200)
      .expect(function(res) {
        expect(res.body.name).to.be.equal('dank2');
        expect(res.body.id).to.equal(dankId);
        expect(res.body._id).to.equal(dankMongoId);
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
        expect(res.body.id).to.equal(dankId);
        expect(res.body._id).to.equal(dankMongoId);
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

