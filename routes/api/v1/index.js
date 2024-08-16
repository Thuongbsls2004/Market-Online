var express = require('express');
var router = express.Router();
const AuthController = require('../../../controllers/auth.controller')
const UserValidator = require('../../../validators/user.validator')
const AuthMiddleware = require("../../../middlewares/auth.middleware");
const UserController = require('../../../controllers/user.controller')

/* GET home page. */
router.post('/auth/login', UserValidator.validateLogin, AuthController.login);
router.post('/auth/register', UserValidator.validateRegister, AuthController.register);

// CRUD users
router.get("/users", AuthMiddleware, UserController.getAll);
router.post("/users", UserValidator.validateCreateUser, UserController.create);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// CRUD products


module.exports = router;

