var conn;

print('db init env=' + env + ' start');

if (env === 'dev') {
  conn = new Mongo();
  var db = conn.getDB('contacts');
} else if (env === 'prod') {
  const connstr = `mongodb://${user}:${pass}@ds030817.mongolab.com:30817/dankdb`;
  conn = new Mongo(connstr);
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

print('db init complete');
