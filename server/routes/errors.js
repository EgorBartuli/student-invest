const router = require('express').Router();
const { create404, renderError } = require('../controllers/errorController');

router.get(create404, renderError);

module.exports = router;
