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
        next();
      } else {
        next(new BasicError('Not authenticated', errorCodes.server_prefix + errorCodes.user_not_authenticated, 401));
      }
    }
  };

}



