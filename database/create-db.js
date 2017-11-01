
conn = new Mongo();
db = conn.getDB('contacts');
db.dropDatabase()
db.createCollection('contacts');
db.stuff.createIndex({id:1});
db.stuff.createIndex({name:1});
