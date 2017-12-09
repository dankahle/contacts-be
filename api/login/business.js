const schema = require('./schema/schema.json'),
  chance = new require('chance')(),
  UserData = require('../users/data'),
  base = require('node-base'),
  Validate = base.Validate,
  BasicError = base.errors.BasicError,
  errorCodes = base.errors.errorCodes,
  errorPrefix = '100-';

let req = null, res = null, next = null, dl = null;

module.exports = class LoginBusiness {

  constructor(_req, _res, _next) {
    req = _req;
    res = _res;
    next = _next;
    dl = new UserData(req, res, next);
  }

  getCurrentUser() {
    if (req.cookies.dkAuth) {
      const user = req.cookies.dkAuth;
      dl.getOne(user.id)
        .then(_user => {
          if (_user) {
            res.send(this.removeProps(_user));
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
    const error = Validate.validateObject(req.body, schema);
    if (error) {
      next(error);
    } else {
      const user = req.body;
      dl.getOneByName(req.body.name)
        .then(_user => {
          if (!_user) {
            next(new BasicError('User not found', errorCodes.server_prefix + errorCodes.user_not_found, 404))
            return;
          }
          res.cookie('dkAuth', _user, {httpOnly: true});
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
    const error = Validate.validateObject(req.body, schema);
    if (error) {
      next(error);
    } else {
      const user = req.body;
      dl.getOneByName(user.name)
        .then(_user => {
          if (_user) {
            next(new BasicError('User already exists', errorCodes.server_prefix + errorCodes.user_already_exists, 400));
            return;
          }
          dl.addOne(user)
            .then(resp => {
              if(resp.insertedCount === 1) {
                res.cookie('dkAuth', user, {httpOnly: true});
                res.send(user);
              } else {
                next(new BasicError('User not registered', errorCodes.server_prefix + errorCodes.user_not_registered))
              }
            })
            .catch(next)
        })
        .catch(next);
    }
  }

}


