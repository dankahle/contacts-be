const express = require('express'),
  bodyParser = require('body-parser'),
  apiErrorHandler = require('api-error-handler'),
  docsRouter = require('./docs/_router'),
  contactsRouter = require('./contacts/_router'),
  cors = require('cors');

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


app.use(function (req, res) {
  res.status(404).send('Oops, file not found')
})

app.use(function(err, req, res, next) {
  const obj = Object.assign({}, err);
  if (err && err.message) {
    obj.message = err.message;
  }
  res.status(err.status || 500).send(obj);
});

app.listen(port, function() {
  console.log(`listening on ${port}`);
});
