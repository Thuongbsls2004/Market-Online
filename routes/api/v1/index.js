var express = require('express');
var router = express.Router();
const AuthController = require('../../../controllers/auth.controller')
const UserValidator = require('../../../validators/user.validator')
const AuthMiddleware = require('../../../middlewares/auth.middleware')
const UserController = require('../../../controllers/user.controller')
const ProductController = require('../../../controllers/product.controller')

/* GET home page. */
router.post('/auth/login', UserValidator.validateLogin, AuthController.login);
router.post('/auth/register', UserValidator.validateRegister, AuthController.register);

// CRUD users
router.get("/users", AuthMiddleware, UserController.getAll);
router.post("/users", UserValidator.validateCreateUser, UserController.create);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// CRUD products
router.get("/products", ProductController.getAllProduct);
router.post("/products", ProductController.createProduct);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

module.exports = router;

