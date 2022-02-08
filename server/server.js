const { sequelize } = require('./db/models');
const app = require('./app.js');
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();
const port = process.env.PORT ?? 3100;
app.listen(port, () => {
  console.log('Server started at http://localhost:%s/', port);
});
