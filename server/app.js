const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
let cors = require('cors');

const session = require('./middleware/createSession');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const isAuth = require('./middleware/isAuth');
const errorRouter = require('./routes/errors');



const app = express();

// configure the app to use bodyParser()
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'storage')));
app.use(express.json());

app.use(session);
//app.use(isAuth); //Validation

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use(errorRouter);

module.exports = app;
