const auth = require('./auth');
const register = (app, next) => {
  auth(app, (err) => {
    if (err) {
      return next(err);
    }
  });
  app.get('/', (req, res) => res.json({ name: "aji de fideo" }));
  app.all('*', (req, resp, nextAll) => nextAll(404));
  return next();
}
// TODO: For each route call the function or the callback
module.exports = (app, next) => register(app, next);