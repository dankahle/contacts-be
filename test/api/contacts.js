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


  var labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one'};
  var labelTwo = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e2', name: 'label two'};
  var labelOneCarl = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc4e1', name: 'label one carl'};
  var dankUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e1';
  var dankCompany = 'dank co';
  var carlUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e2';

  var contacts = [
    {
      userId: dankUserId,
      id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1',
      name: 'jane',
      company: 'Jane Co',
      jobTitle: 'Manager',
      labels:[labelOne, labelTwo],
      "emails" : [
        {
          "email" : "jane1@gmail.com",
          "label" : "Work"
        },
        {
          "email" : "jane2@gmail.com",
          "label" : "Home"
        }
      ],
      "phones" : [
        {
          "prefix" : "1",
          "phone" : "111-222-3333",
          "label" : "Work"
        },
        {
          "prefix" : "55",
          "phone" : "112-222-3333",
          "label" : "Mobile"
        }
      ],
      "addresses" : [
        {
          "address" : "952 NE Lovell St. Hillsboro, OR 97124",
          "label" : "Home"
        },
        {
          "address" : "10260 SW Greenburg Rd #600, Tigard, OR 97223",
          "label" : "Work"
        }
      ],
      "websites" : [
        {
          "website" : "https://www.google.com",
          "label" : "google"
        },
        {
          "website" : "www.weather.com",
          "label" : "weather"
        }
      ],
      "notes" : "notes first line\nnotes second line\nnotes third line"
    },
    {
      userId: dankUserId,
      id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2',
      name: 'brenda',
      company: 'Brenda Co',
      jobTitle: 'QA',
      labels:[labelTwo],
      "emails" : [
        {
          "email" : "brenda1@gmail.com",
          "label" : "Work"
        },
        {
          "email" : "brenda2@gmail.com",
          "label" : "Home"
        }
      ],
      "phones" : [
        {
          "prefix" : "1",
          "phone" : "111-222-3333",
          "label" : "Work"
        },
        {
          "prefix" : "55",
          "phone" : "112-222-3333",
          "label" : "Mobile"
        }
      ],
      "addresses" : [
        {
          "address" : "952 NE Lovell St. Hillsboro, OR 97124",
          "label" : "Home"
        },
        {
          "address" : "10260 SW Greenburg Rd #600, Tigard, OR 97223",
          "label" : "Work"
        }
      ],
      "websites" : [
        {
          "website" : "https://www.google.com",
          "label" : "google"
        },
        {
          "website" : "www.weather.com",
          "label" : "weather"
        }
      ],
      "notes" : "notes first line\nnotes second line\nnotes third line"
    },
    {
      userId: dankUserId,
      id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3',
      name: 'martha',
      company: 'Martha Co',
      jobTitle: 'Engineer',
      labels:[labelOne],
      "emails" : [
        {
          "email" : "martha1@gmail.com",
          "label" : "Work"
        },
        {
          "email" : "martha2@gmail.com",
          "label" : "Home"
        }
      ],
      "phones" : [
        {
          "prefix" : "1",
          "phone" : "111-222-3333",
          "label" : "Work"
        },
        {
          "prefix" : "55",
          "phone" : "112-222-3333",
          "label" : "Mobile"
        }
      ],
      "addresses" : [
        {
          "address" : "952 NE Lovell St. Hillsboro, OR 97124",
          "label" : "Home"
        },
        {
          "address" : "10260 SW Greenburg Rd #600, Tigard, OR 97223",
          "label" : "Work"
        }
      ],
      "websites" : [
        {
          "website" : "https://www.google.com",
          "label" : "google"
        },
        {
          "website" : "www.weather.com",
          "label" : "weather"
        }
      ],
      "notes" : "notes first line\nnotes second line\nnotes third line"
    },

    {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc3e1', name: 'carl cont1', labels:[labelOneCarl], emails: [], phones: [], addresses: [], websites: []},
    {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc3e2', name: 'carl cont2', labels:[], emails: [], phones: [], addresses: [], websites: []},
    {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc3e3', name: 'carl cont3', labels:[labelOneCarl], emails: [], phones: [], addresses: [], websites: []},
  ];

  const janeId = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1'
  const id404 = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e9';
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

