const express = require('express'),
  bodyParser = require('body-parser'),
  expressMongoDb = require('express-mongo-db'),
  process = require('process'),
  docsRouter = require('./docs/_router'),
  contactsRouter = require('./api/contacts/_router'),
  cors = require('cors'),
  base = require('node-base');

var contacts = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank', age: 50},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl', age: 60},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim', age: 40},
]

let init = false;

let port = parseInt(process.argv[2]);
port = isNaN(port) ? 3000 : port;

const app = express();
app.use(expressMongoDb('mongodb://localhost/contacts'));

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  if (!init) {
    init = true;
    initialize(req)
      .then(() => next())
  } else {
    next();
  }
});

app.use(cors());
app.use(bodyParser.json());

// routers
app.use('/docs', docsRouter);
app.use('/api/contacts', contactsRouter);


app.use(base.middleware.notFound);
app.use(base.middleware.errorHandler);

app.listen(port, function () {
  console.log(`listening on ${port}`);
});

function initialize(req) {
  const db = req.db.collection('contacts');
  return db.deleteMany({})
    .then(() => db.insertMany(contacts));
}
