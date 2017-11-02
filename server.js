const express = require('express'),
  bodyParser = require('body-parser'),
  apiErrorHandler = require('api-error-handler'),
  docsRouter = require('./docs/_router'),
  contactsRouter = require('./contacts/_router'),
  cors = require('cors'),
  base = require('node-base');

const port = 3005;
const app = express()
app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
})
app.use(cors());
app.use(bodyParser.json());

// routers
app.use('/docs', docsRouter);
app.use('/api/contacts', contactsRouter);


app.use(base.middleware.notFound);
app.use(base.middleware.errorHandler);

app.listen(port, function() {
  console.log(`listening on ${port}`);
});
