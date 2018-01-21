const request = require('supertest'),
  express = require('express'),
  expect = require('chai').expect,
  _ = require('lodash'),
  _server = require('../../server'),
  base = require('node-base'),
  errorCodes = base.errors.errorCodes,
  Validate = base.Validate,
  schema = require('../../api/contacts/schema/schema.json'),
  errorPrefix = '200-';

let server = null;

describe('/contacts', function () {

  before(function (done) {
    _server.then(function (_server_) {
      server = _server_;
      server.on('close', () => console.log('server closed'))
      done();
    })
  })

  after(function (done) {
    done();
  })

  const dankUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e1',
    janeId = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1',
    id404 = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e9',
    labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one'};

  const contacts = [
    {userId: dankUserId, id: janeId, name: 'jane', labels: [labelOne], emails: [], phones: [], addresses: [], websites: []},
    {userId: dankUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'brenda', labels: [], emails: [], phones: [], addresses: [], websites: []},
    {userId: dankUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'martha', labels: [labelOne], emails: [], phones: [], addresses: [], websites: []},
  ];

  const mary = {name: 'mary'};
  const kate = {userId: dankUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e4', name: 'kate', labels:[labelOne], emails: [], phones: [], addresses: [], websites: []};
  let dankMongoId;

  it('shows endpoint not found', function (done) {
    request(server)
      .get('/notthere')
      .expect(404)
      .expect(function(res) {
        expect(res.body.errorCode).to.equal(errorCodes.server_prefix + errorCodes.server_endpoint_not_found);
        expect(res.body.message).to.equal('Endpoint not found.')
      })
      .end(done);
  });

  it('get all', function (done) {
    request(server)
      .get('/api/contacts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        const arr = res.body
        expect(arr.length).to.be.equal(3);
        expect(_.map(arr, 'name')).to.be.eql(['brenda', 'jane', 'martha']); // should sort
        arr.forEach(contact => {
          expect(Validate.validateObject(contact, schema)).to.be.undefined;
        })
      })
      .end(done)
  });

  it('get by label', function (done) {
    request(server)
      .get(`/api/contacts?label=${labelOne.id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(function (res) {
        const arr = res.body
        expect(arr.length).to.be.equal(2);
        expect(_.map(arr, 'name')).to.be.eql(['jane', 'martha']);
        arr.forEach(contact => {
          expect(Validate.validateObject(contact, schema)).to.be.undefined;
        })
      })
      .end(done)
  });

  it('get one', function (done) {
    request(server)
      .get(`/api/contacts/${janeId}`)
      .expect(200)
      .expect(function(res) {
        const contact = res.body;
        dankMongoId = contact._id;
        delete contact._id;
        expect(contact).to.eql(contacts[0])
      })
      .end(done)
  });

  it('get one 404 not found', function (done) {
    request(server)
      .get(`/api/contacts/${id404}`)
      .expect(404)
      .expect(function (res) {
        expect(res.body.errorCode).to.equal(errorPrefix + errorCodes.resource_not_found)
      })
      .end(done);
  });

  it('post with no id or labels', function(done) {
    request(server)
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

  it('get all after post mary', function(done) {
    request(server)
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
    request(server)
      .post(`/api/contacts`)
      .send(kate)
      .expect(200)
      .expect(function(res) {
        const contact = res.body;
        delete contact._id;
        expect(contact).to.eql(kate);
        expect(Validate.validateObject(res.body, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('get all after post kate', function(done) {
    request(server)
      .get('/api/contacts')
      .expect(200)
      .expect(function(res) {
        const arr = res.body
        expect(arr.length).to.equal(5);
        expect(arr[2].name).to.equal(kate.name);
        expect(Validate.validateObject(arr[2], schema)).to.be.undefined;
      })
      .end(done)
  });

  it('PUT /api/contacts/:id', function (done) {
    request(server)
      .put(`/api/contacts/${janeId}`)
      .send({userId: dankUserId, _id: dankMongoId, id: janeId, name: 'dank2'})
      .expect(200)
      .expect(function (res) {
        expect(res.body.name).to.be.equal('dank2');
        expect(res.body.userId).to.equal(dankUserId);
        expect(res.body.id).to.equal(janeId);
        expect(res.body._id).to.equal(dankMongoId);
        expect(Validate.validateObject(res.body, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('get one after put', function (done) {
    request(server)
      .get(`/api/contacts/${janeId}`)
      .expect(200)
      .expect(function (res) {
        expect(res.body.name).to.be.equal('dank2');
        expect(res.body.userId).to.equal(dankUserId);
        expect(res.body.id).to.equal(janeId);
        expect(res.body._id).to.equal(dankMongoId);
        expect(Validate.validateObject(res.body, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('deleteOne', function (done) {
    request(server)
      .delete(`/api/contacts/${janeId}`)
      .expect(204, done);
  });

  it('get all after delete', function (done) {
    request(server)
      .get('/api/contacts')
      .expect(200)
      .expect(function (res) {
        const arr = res.body
        expect(arr.length).to.be.equal(4);
        expect(_.map(arr, 'name')).to.be.eql(['brenda', 'kate', 'martha', 'mary']);
      })
      .end(done)

  });

  it('delete by label', function (done) {
    request(server)
      .delete(`/api/contacts?label=${labelOne.id}`)
      .set('Accept', 'application/json')
      .expect(204, done)
  });

  it('get all after delete by label', function (done) {
    request(server)
      .get('/api/contacts')
      .expect(200)
      .expect(function (res) {
        const arr = res.body
        expect(arr.length).to.be.equal(2);
        expect(_.map(arr, 'name')).to.be.eql(['brenda', 'mary']);
      })
      .end(done)
  });


})

