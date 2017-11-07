const express = require('express'),
  bodyParser = require('body-parser'),
  expressMongoDb = require('express-mongo-db'),
  confit = require('confit'),
  process = require('process'),
  path = require('path'),
  docsRouter = require('./docs/_router'),
  contactsRouter = require('./api/contacts/_router'),
  usersRouter = require('./api/users/_router'),
  cors = require('cors'),
  base = require('node-base');

var contacts = [
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e1', name: 'dank'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e2', name: 'carl'},
  {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc6e3', name: 'jim'},
]

var basedir = path.join(__dirname, 'config');
confit(basedir).create(function (err, config) {
  console.log(`config env: ${config.get('env:env')}`);

  let init = false;

  let port = config.get('port');

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
  app.use('/api/users', usersRouter);


  app.use(base.middleware.notFound);
  app.use(base.middleware.errorHandler);

  app.listen(port, function () {
    console.log(`listening on ${port}`);
  });

});



function initialize(req) {
  const db = req.db.collection('contacts');
  return db.deleteMany({})
    .then(() => db.insertMany(contacts));
}
