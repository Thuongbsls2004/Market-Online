var express = require('express');
var router = express.Router();
const ProductController = require('../../controllers/product.controller')

// Main products
router.get("/", ProductController.getAllProduct);

// Search products by name
router.get('/search/name/:name', ProductController.searchByName);

// Search products by category and name
router.get('/search/category/:category/name/:name', ProductController.searchByCategoryAndName);

// Search products by category, name, and price range
router.get('/search/category/:category/name/:name/price/:min-:max', ProductController.searchByCategoryAndNameAndPriceRange);

module.exports = router;