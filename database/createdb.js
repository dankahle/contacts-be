var conn;

// print('env: ' + env);

if (env === 'dev') {
  conn = new Mongo();
  var db = conn.getDB('contacts');
} else if (env === 'prod') {
  conn = new Mongo('mongodb://dankman:password@ds030817.mongolab.com:30817/dankdb');
  var db = conn.getDB('dankdb');
}
db.contacts.drop();
db.users.drop();

db.createCollection('contacts');
db.contacts.createIndex({userId: 1, id: 1}, {unique: true});
db.contacts.createIndex({userId: 1, name: 1});

db.createCollection('users');
db.users.createIndex({id: 1}, {unique: true});
db.users.createIndex({name: 1});

var labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label1 really long name one two three', icon: 'label'};
var labelTwo = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e2', name: 'label2', icon: 'label'};
var labelThree = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e3', name: 'label3', icon: 'label'};
var labelOneCarl = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc4e1', name: 'label one carl'};
var janeContactId = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1';
var dankUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e1';
var dankCompany = 'dank co';
var carlUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e2';

var contacts = [
  {userId: dankUserId, id: janeContactId,
    name: 'jane',
    company: 'Intel',
    jobTitle: 'manager',
    labels:[labelOne, labelTwo],
    "emails" : [
      {
        "email" : "jane1@gmail.com",
        "label" : "jane's label1"
      },
      {
        "email" : "jane2@gmail.com",
        "label" : "jane's label2"
      },
      {
        "email" : "jane3@gmail.com",
        "label" : "jane's label3"
      }
    ],
    "phones" : [
      {
        "prefix" : "1",
        "phone" : "111-222-3333",
        "label" : "my phone1"
      },
      {
        "prefix" : "55",
        "phone" : "112-222-3333",
        "label" : "my phone2"
      }
    ],
    "addresses" : [
      {
        "address" : "952 NE Lovell St. Hillsboro, OR 97124",
        "label" : "home"
      },
      {
        "address" : "One microsoft way, Seattle, WA 91111",
        "label" : "work"
      }
    ],
    "websites" : [
      {
        "website" : "https://www.google.com/maps/place/Little+Sheep/@45.4925665,-122.803217,15z/data=!4m8!1m2!2m1!1srestaurants!3m4!1s0x0:0x25b94f115926d8d2!8m2!3d45.4915305!4d-122.8001332",
        "label" : "google"
      },
      {
        "website" : "http://www.weather.com",
        "label" : "weather"
      },
      {
        "website" : "www.weather.com",
        "label" : "no protocol"
      }
    ],
    "notes" : "dsfsdaf sdf sadf asdf sdaf asdf sad fasd fa sdf sadfas dfasd ds sdfsdaf sdaf sdafsda f sda f sadf sadf asd f asdfas df asd f asdfsdfsdfsd\none\ntwo\nthree\n"
  },
  {userId: dankUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'brenda', labels:[], emails: [], phones: [], addresses: [], websites: []},
  {userId: dankUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'martha', labels:[labelOne], emails: [], phones: [], addresses: [], websites: []},

  {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc3e1', name: 'carl cont1', labels:[labelOneCarl], emails: [], phones: [], addresses: [], websites: []},
  {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc3e2', name: 'carl cont2', labels:[], emails: [], phones: [], addresses: [], websites: []},
  {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc3e3', name: 'carl cont3', labels:[labelOneCarl], emails: [], phones: [], addresses: [], websites: []},
];

var users = [
  {id: dankUserId, name: 'dank', company: dankCompany, labels:[labelOne, labelTwo, labelThree], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc7e2', name: 'carl', company: 'carl co', labels:[], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc7e3', name: 'jim', company: 'jim co', labels:[labelOne], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'},
];

db.contacts.insertMany(contacts);
db.users.insertMany(users);

print('db init env=' + env + ' complete');
