const createError = require('http-errors');

const create404 = (req, res, next) => {
  console.log('catch error');
  next(createError(404));
};

const renderError = (err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ error: err });
};

module.exports = { create404, renderError };
