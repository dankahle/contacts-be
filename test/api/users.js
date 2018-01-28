const request = require('supertest'),
  express = require('express'),
  expect = require('chai').expect,
  _ = require('lodash'),
  _server = require('../../server'),
  base = require('node-base'),
  errorCodes = base.errors.errorCodes,
  Validate = base.Validate,
  schema = require('../../api/users/schema/schema.json'),
  errorPrefix = '300-';

let server = null;

describe('/users', function() {

  before(function(done) {
    _server.then(function (_server_) {
      server = _server_;
      done();
    })
  })

  after(function(done) {
    server.close(done);
  })

  var labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one'};
  var dankUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e1';
  var dankCompany = 'dank co';
  var carlUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e2';

  var users = [
    {id: dankUserId, name: 'dank', company: dankCompany, labels:[labelOne], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
    {id: carlUserId, name: 'carl', company: 'carl co', labels:[], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
    {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc7e3', name: 'jim', company: 'jim co', labels:[labelOne], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
  ];

  const id404 = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e9';
  let dankMongoId;
  const steve = {name: 'steve', company: 'steve co'};
  const john = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e4', name: 'john', company: 'john co', labels:[labelOne]};


  it('shows enpoint not found', function(done) {
    request(server)
      .get('/notthere')
      .expect(404)
      .expect(function(res) {
        expect(res.body.errorCode).to.equal(errorCodes.server_prefix + errorCodes.server_endpoint_not_found);
        expect(res.body.message).to.equal('Endpoint not found.')
      })
      .end(done);
  });

  it('get many', function(done) {
    request(server)
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
    request(server)
      .get(`/api/users/${dankUserId}`)
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
    request(server)
      .get(`/api/users/${id404}`)
      .expect(404)
      .expect(function(res) {
        expect(res.body.errorCode).to.equal(errorPrefix + errorCodes.resource_not_found)
      })
      .end(done);
  });

  it('post with no id or labels', function(done) {
    request(server)
      .post(`/api/users`)
      .send(steve)
      .expect(200)
      .expect(function(res) {
        const contact = res.body
        expect(contact.name).to.equal(steve.name);
        expect(contact.company).to.equal(steve.company);
        expect(Validate.validateGuid(contact.id)).to.be.true;
        expect(Validate.validateObject(contact, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('get all after post steve', function(done) {
    request(server)
      .get('/api/users')
      .expect(200)
      .expect(function(res) {
        const arr = res.body
        expect(arr.length).to.be.equal(4);
        expect(arr[3].name).to.equal(steve.name);
        expect(arr[3].company).to.equal(steve.company);
        expect(arr[3].created).to.exist;
        expect(arr[3].modified).to.exist;
        expect(Validate.validateObject(arr[3], schema)).to.be.undefined;
      })
      .end(done)
  });

  it('post with id and labels', function(done) {
    request(server)
      .post(`/api/users`)
      .send(john)
      .expect(200)
      .expect(function(res) {
        const user = res.body;
        delete user._id;
        expect(user.name).to.equal('john');
        expect(user.company).to.equal('john co');
        expect(user.created).to.exist;
        expect(user.modified).to.exist;
        expect(user.labels).to.exist;
        expect(Validate.validateObject(user, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('get all after post john', function(done) {
    request(server)
      .get('/api/users')
      .expect(200)
      .expect(function(res) {
        const arr = res.body
        expect(arr.length).to.equal(5);
        expect(arr[3].name).to.equal(john.name);
        expect(arr[3].company).to.equal(john.company);
        expect(arr[3].created).to.exist;
        expect(arr[3].modified).to.exist;
        expect(arr[3].labels[0]).to.eql(labelOne);
        expect(Validate.validateObject(arr[3], schema)).to.be.undefined;
      })
      .end(done)
  });

  let lastModifiedTime;
  it('get one before put', function(done) {
    request(server)
      .get(`/api/users/${dankUserId}`)
      .expect(200)
      .expect(function(res) {
        lastModifiedTime = new Date(res.body.modified).getTime();
      })
      .end(done)
  });

  it('PUT /api/users/:id', function(done) {
    request(server)
      .put(`/api/users/${dankUserId}`)
      .send({_id: dankMongoId, id: dankUserId, name: 'dank2', company: 'dank co'})
      .expect(200)
      .expect(function(res) {
        const user = res.body;
        expect(user.name).to.be.equal('dank2');
        expect(user.id).to.equal(dankUserId);
        expect(user._id).to.equal(dankMongoId);
        expect(new Date(user.modified).getTime()).to.be.greaterThan(lastModifiedTime)
        expect(Validate.validateObject(res.body, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('get one after put', function(done) {
    request(server)
      .get(`/api/users/${dankUserId}`)
      .expect(200)
      .expect(function(res) {
        expect(res.body.name).to.be.equal('dank2');
        expect(res.body.id).to.equal(dankUserId);
        expect(res.body._id).to.equal(dankMongoId);
        expect(Validate.validateObject(res.body, schema)).to.be.undefined;
      })
      .end(done)
  });

  it('delete', function(done) {
    request(server)
      .delete(`/api/users/${dankUserId}`)
      .expect(204, done);
  });

  it('get all after delete', function(done) {
    request(server)
      .get('/api/users')
      .expect(200)
      .expect(function(res) {
        const arr = res.body
        expect(arr.length).to.be.equal(4);
        expect(_.find(arr, {id: dankUserId})).to.be.undefined;
        expect(_.map(arr, 'name')).to.be.eql(['carl', 'jim', 'john', 'steve']);
      })
      .end(done)
  });

})

