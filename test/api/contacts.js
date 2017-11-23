const request = require('supertest'),
  express = require('express'),
  expect = require('chai').expect,
  _ = require('lodash'),
  server = require('../../server'),
  base = require('node-base'),
  errorCodes = base.errors.errorCodes,
  Validate = base.Validate,
  schema = require('../../api/contacts/schema/schema.json'),
  errorPrefix = '200-';

let app = null;

describe('/contacts', function () {

  before(function (done) {
    server.then(function (_app) {
      app = _app;
      done();
    })
  })

  after(function (done) {
    done();
  })

  const dankId = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1',
    id404 = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e9',
    labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one'};

  const contacts = [
    {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank', labels: [labelOne]},
    {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl', labels: []},
    {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim', labels: [labelOne]},
  ];

  const mary = {name: 'mary'};
  const kate = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e4', name: 'kate', labels:[labelOne]};

  it('shows endpoint not found', function (done) {
    request(app)
      .get('/notthere')
      .expect(404)
      .expect(function(res) {
        expect(res.body.errorCode).to.equal(errorCodes.server_prefix + errorCodes.server_endpoint_not_found);
        expect(res.body.message).to.equal('Endpoint not found.')
      })
      .end(done);
  });

  it('get all', function (done) {
    request(app)
      .get('/api/contacts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        const arr = res.body
        expect(arr.length).to.be.equal(3);
        expect(_.map(arr, 'name')).to.be.eql(['carl', 'dank', 'jim']); // should sort
        arr.forEach(contact => {
          expect(Validate.validateObject(contact, schema)).to.be.undefined;
        })
      })
      .end(done)
  });

  it('get by label', function (done) {
    request(app)
      .get(`/api/contacts?label=${labelOne.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        const arr = res.body
        expect(arr.length).to.be.equal(2);
        expect(_.map(arr, 'name')).to.be.eql(['dank', 'jim']);
        arr.forEach(contact => {
          expect(Validate.validateObject(contact, schema)).to.be.undefined;
        })
      })
      .end(done)
  });

  it('get one', function (done) {
    request(app)
      .get(`/api/contacts/${dankId}`)
      .expect(200, contacts[0], done);
  });

  it('get one 404 not found', function (done) {
    request(app)
      .get(`/api/contacts/${id404}`)
      .expect(404)
      .expect(function (res) {
        expect(res.body.errorCode).to.equal(errorPrefix + errorCodes.resource_not_found)
      })
      .end(done);
  });

  it('post with no id or labels', function(done) {
    request(app)
      .post(`/api/contacts`)
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
      .get('/api/contacts')
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
      .post(`/api/contacts`)
      .send(kate)
      .expect(200)
      .expect(function(res) {
        expect(res.body).to.eql(kate);
        expect(Validate.validateObject(res.body, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('get all after post', function(done) {
    request(app)
      .get('/api/contacts')
      .expect(200)
      .expect(function(res) {
        const arr = res.body
        expect(arr.length).to.equal(5);
        expect(arr[3].name).to.equal(kate.name);
        expect(Validate.validateObject(arr[3], schema)).to.be.undefined;
      })
      .end(done)
  });

  it('PUT /api/contacts/:id', function (done) {
    request(app)
      .put(`/api/contacts/${dankId}`)
      .send({id: dankId, name: 'dank2'})
      .expect(200)
      .expect(function (res) {
        expect(res.body.name).to.be.equal('dank2');
        expect(res.body.id).to.equal(dankId);
        expect(Validate.validateObject(res.body, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('get one after put', function (done) {
    request(app)
      .get(`/api/contacts/${dankId}`)
      .expect(200)
      .expect(function (res) {
        expect(res.body.name).to.be.equal('dank2');
        expect(res.body.id).to.equal(dankId);
        expect(Validate.validateObject(res.body, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('deleteOne', function (done) {
    request(app)
      .delete(`/api/contacts/${dankId}`)
      .expect(204, done);
  });

  it('get all after delete', function (done) {
    request(app)
      .get('/api/contacts')
      .expect(200)
      .expect(function (res) {
        const arr = res.body
        expect(arr.length).to.be.equal(4);
        expect(_.map(arr, 'name')).to.be.eql(['carl', 'jim', 'kate', 'mary']);
      })
      .end(done)

  });

  it('delete by label', function (done) {
    request(app)
      .delete(`/api/contacts?label=${labelOne.id}`)
      .set('Accept', 'application/json')
      .expect(204, done)
  });

  it('get all after delete by label', function (done) {
    request(app)
      .get('/api/contacts')
      .expect(200)
      .expect(function (res) {
        const arr = res.body
        expect(arr.length).to.be.equal(2);
        expect(_.map(arr, 'name')).to.be.eql(['carl', 'mary']);
      })
      .end(done)
  });


})

