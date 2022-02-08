const express = require('express');
const router = express.Router();
const {
  checkUserAndCreateSession,
  createUserAndSession,
  isUser,
  destroySession
} = require("../controllers/authController");

router
  .route('/isAuth')
  .get(isUser);

router
  .route('/register')
  .post(createUserAndSession);

router
  .route('/login')
  .post(checkUserAndCreateSession);

router
  .route('/logout')
  .get(destroySession);

module.exports = router;
