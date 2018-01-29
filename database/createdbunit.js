
var conn = new Mongo();

var db = conn.getDB('unit');
db.dropDatabase()

db.createCollection('contacts');
db.contacts.createIndex({userId: 1, id: 1}, {unique: true});
db.contacts.createIndex({userId: 1, name: 1});

db.createCollection('users');
db.users.createIndex({id: 1}, {unique: true});
db.users.createIndex({name: 1});

var labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one'};
var labelTwo = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e2', name: 'label two'};
var labelThree = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e3', name: 'label zthree'};
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

var users = [
  {id: dankUserId, name: 'dank', company: dankCompany, labels:[labelOne, labelTwo, labelThree], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
  {id: carlUserId, name: 'carl', company: 'carl co', labels:[], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc7e3', name: 'jim', company: 'jim co', labels:[labelOne], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
];

db.contacts.insertMany(contacts);
db.users.insertMany(users);
