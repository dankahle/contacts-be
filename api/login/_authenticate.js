const base = require('node-base'),
  errorCodes = base.errors.errorCodes,
  BasicError = base.errors.BasicError,
  _ = require('lodash');


module.exports = function(options) {

  return function (req, res, next) {
    if (req.cookies.dkAuth) {
      req.user = req.cookies.dkAuth;
      next();
    } else {
      if (process.env.NODE_ENV === 'unit' && req.url !== '/cause-401-endpoint') {
        const dankId = 'c62dac5b-97d8-53a5-9989-cb2f779bc7e1',
          labelOne = {id: 'c62dac5b-97d8-53a5-9989-cb2f779bc5e1', name: 'label one'};
        req.user = {id: dankId, name: 'dank', company: 'dank co', labels:[labelOne]};
        next();
      } else {
        next(new BasicError('Not authenticated', errorCodes.server_prefix + errorCodes.user_not_authenticated, 401));
      }
    }
  };

}



