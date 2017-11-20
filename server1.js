const express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  https = require('https'),
  http = require('http'),
  fs = require('fs'),
  cookieParser = require('cookie-parser');


const app = express(),
  port = 3001;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function (req, res, next) {
  if (!req.cookies.dkAuth) {
    res.cookie('dkcontacts', 'lala');
  } else {
    console.log('cookie', res.cookie.dkAuth);
  }
  next();
});

/*
    app.use(function (req, res, next) {
      if (req.cookies && !req.cookies.dkAuth) {
        res.cookie('dkAuth', {id: 'xxx', name: 'dank'});
        console.log('setcookie');
      } else {
        console.log('foundcookie', req.cookies.dkAuth._id);
      }
      next();
    });
*/


app.use(express.static('public'))

app.listen(port, () => console.log(`listening on ${port}`));
