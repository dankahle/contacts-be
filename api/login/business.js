const schema = require('./schema/schema.json'),
  chance = new require('chance')(),
  UserData = require('../users/data'),
  base = require('node-base'),
  Validate = base.Validate,
  BasicError = base.errors.BasicError,
  errorCodes = base.errors.errorCodes,
  addDemoData = require('./add-demo-data'),
  errorPrefix = '100-';

let req = null, res = null, next = null, dl = null;

var labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one'};
var labelTwo = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e2', name: 'label two'};
var labelThree = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e3', name: 'label zthree'};
var dankUserId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e1';
var dankCompany = 'dank co';
var unitUser = {id: dankUserId, name: 'dank', company: dankCompany, labels:[labelOne, labelTwo, labelThree], created: '2017-12-07T00:00:00.000Z', modified: '2017-12-08T00:00:00.000Z'};


module.exports = class LoginBusiness {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
    dl = new UserData(req, res, next);
  }

  getCurrentUser() {

    if (process.env.NODE_ENV === 'unit') {
      res.cookie('dkAuth', unitUser, {httpOnly: true});
      res.send(unitUser);
    } else if (req.cookies.dkAuth) {
      const user = req.cookies.dkAuth;
      dl.getOne(user.id)
        .then(_user => {
          if (_user) {
            res.send(_user);
          } else {
            next(new BasicError('User not found', errorCodes.server_prefix + errorCodes.resource_not_found, 404));
          }
        })
        .catch(next);
    } else {
      next(new BasicError('User not found', errorCodes.server_prefix + errorCodes.user_cookie_not_found, 404));
    }
  }

  login() {
    const error = Validate.validateObject(req.body, schema, `${errorPrefix}0021`);
    if (error) {
      next(error);
    } else {
      const user = req.body;
      dl.getOneByQuery({name: user.name, company: user.company})
        .then(_user => {
          if (!_user) {
            next(new BasicError('User not found', errorCodes.server_prefix + errorCodes.user_not_found, 404))
            return;
          }
          const options = {httpOnly: true}
          if (req.query.stayLoggedIn) {
            const dt = new Date();
            dt.setFullYear(dt.getFullYear() + 1);
            options.expires = dt;
          }
          res.cookie('dkAuth', _user, options);
          res.send(_user);
        })
        .catch(next);
    }
  }

  logout() {
    res.clearCookie('dkAuth');
    res.status(204).end();
  }

  register() {
    const error = Validate.validateObject(req.body, schema, `${errorPrefix}0021`);
    if (error) {
      next(error);
    } else {
      const user = req.body;
      dl.getOneByQuery({name: user.name, company: user.company})
        .then(_user => {
          if (_user) {
            next(new BasicError('User already exists', errorCodes.server_prefix + errorCodes.user_already_exists, 400));
            return;
          }
          dl.addOne(user)
            .then(resp => {
              return addDemoData(user, req, res, next);
            })
            .then(() => {
              res.cookie('dkAuth', user, {httpOnly: true});
              res.send(user);
            })
            .catch(next)
        })
        .catch(next);
    }
  }

}


