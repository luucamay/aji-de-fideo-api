const auth = require('./auth');

// TODO: For each route call the function or the callback
module.exports = (app, next) => auth(app, (err) => {
  if (err) {
    return next(err);
  }
});