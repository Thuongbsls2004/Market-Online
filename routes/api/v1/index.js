var express = require('express');
var router = express.Router();
const AuthController = require('../../../controllers/AuthController')
const UserValidator = require('../../../validators/user.validator')

/* GET home page. */
router.post('/auth/login', UserValidator.validateLogin, AuthController.login);
router.post('/auth/register', UserValidator.validateRegister, AuthController.register);

module.exports = router;

