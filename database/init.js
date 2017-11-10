
module.exports = initialize;

var contacts = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim'},
];

var users = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim'},
];

function initialize(req) {
  const collContacts = req.db.collection('contacts');
  const collUsers = req.db.collection('users');
  return Promise.all([
    collContacts.deleteMany({})
      .then(() => collContacts.insertMany(contacts)),
    collUsers.deleteMany({})
      .then(() => collUsers.insertMany(contacts))  ]);
}
