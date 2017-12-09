var conn = new Mongo();

var db = conn.getDB('contacts');
db.dropDatabase()

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
var dankContactId = 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1';
var dankUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e1';
var carlUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e2';

var contacts = [
  {userId: dankUserId, id: dankContactId,
    name: 'mary',
    labels:[labelOne, labelTwo],
    phones: [{country: 'usa', phone: '111-222-3333', label: 'my phone'}],
    emails: [{email: 'mary@gmail.com', label: 'mary\'s label'}],
    notes: 'dsfsdaf sdf sadf asdf sdaf asdf sad fasd fa sdf sadfas dfasd ',
  },
  {userId: dankUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'jane', labels:[]},
  {userId: dankUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'martha', labels:[labelOne]},

  {userId: carlUserId, id: dankContactId, name: 'carl cont1', labels:[labelOneCarl]},
  {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl cont2', labels:[]},
  {userId: carlUserId, id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'carl cont3', labels:[labelOneCarl]},
];

var users = [
  {id: dankUserId, name: 'dank', labels:[labelOne, labelTwo, labelThree]},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc7e2', name: 'carl', labels:[]},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc7e3', name: 'jim', labels:[labelOne]},
];

db.contacts.insertMany(contacts);
db.users.insertMany(users);
