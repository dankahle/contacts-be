const express = require('express'),
  bodyParser = require('body-parser'),
  expressMongoDb = require('express-mongo-db'),
  confit = require('confit'),
  process = require('process'),
  exec = require('child_process').exec,
  path = require('path'),
  docsRouter = require('./docs/_router'),
  contactsRouter = require('./api/contacts/_router'),
  usersRouter = require('./api/users/_router'),
  cors = require('cors'),
  base = require('node-base'),
  baseConfig = new base.Config(),
  initialize = require('./database/init');

module.exports = new Promise(function(resolve, reject) {

  var basedir = path.join(__dirname, 'config');
  confit(basedir).create(function (err, config) {
    console.log(`config env: ${config.get('env:env')}`);
    // set the nodebase projects config values from config nodeBase property
    baseConfig.setConfig(config.get('nodeBase'));

    let init = false;

    let port = config.get('port');

    const app = express();
    app.use(expressMongoDb(config.get('database')));

    app.use(cors());
    app.use(bodyParser.json());

// routers
    app.get('/cause-error', function() {
      throw new Error('cause-error');
    })
    app.use('/docs', docsRouter);
    app.use('/api/contacts', contactsRouter);
    app.use('/api/users', usersRouter);

    app.use(base.middleware.notFound);
    app.use(base.middleware.errorHandler);

    app.listen(port, function () {
      console.log(`listening on ${port}`);
      resolve(app);
    });

  });
});

