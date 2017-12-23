const express = require('express'),
  bodyParser = require('body-parser'),
  expressMongoDb = require('express-mongo-db'),
  confit = require('confit'),
  morgan = require('morgan'),
  process = require('process'),
  exec = require('child_process').exec,
  path = require('path'),
  https = require('https'),
  http = require('http'),
  fs = require('fs'),
  cookieParser = require('cookie-parser'),
  docsRouter = require('./docs/_router'),
  contactsRouter = require('./api/contacts/_router'),
  usersRouter = require('./api/users/_router'),
  loginRouter = require('./api/login/_loginRouter'),
  registerRouter = require('./api/login/_registerRouter'),
  authenticate = require('./api/login/_authenticate'),
  cors = require('cors'),
  base = require('node-base'),
  baseConfig = new base.Config(),
  errorCodes = base.errors.errorCodes,
  errorPrefix = '000-';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

module.exports = new Promise(function (resolve, reject) {

  var basedir = path.join(__dirname, 'config');
  confit(basedir).create(function (err, config) {
    console.log(`config env: ${config.get('env:env')}`);
    // set the nodebase projects config values from config nodeBase property
    baseConfig.setConfig(config.get('nodeBase'));

    let init = false;
    let port = process.env.PORT || config.get('port');

    const app = express();
    app.use(expressMongoDb(config.get('database')));

    var corsOptions = {
      origin: config.get('corsDomain'),
      credentials: true
    }
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(morgan('dev'));

    app.get('/cause-error', function (req, res) {
      throw new Error('cause-error message');
    })

    app.use('/docs', docsRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/register', registerRouter);
    app.use(authenticate());
    app.use('/api/contacts', contactsRouter);
    app.use('/api/users', usersRouter);

    app.use(base.middleware.notFound());
    app.use(base.middleware.errorHandler());

    let server = null;
    if (config.get('ssl')) {
      const options = {
        key: fs.readFileSync(path.join(__dirname, 'keys/key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'keys/server.crt'))
      };
      server = https.createServer(options, app)
        .listen(port, function (err) {
          if (err) {
            reject(err);
          }
          console.log(`https server listening on ${port}`);
          resolve(server);
        })
    } else {
      server = http.createServer(app)
        .listen(port, function (err) {
          if (err) {
            reject(err);
          }
          console.log(`http server listening on ${port}`);
          resolve(server);
        });
    }
  });
});
