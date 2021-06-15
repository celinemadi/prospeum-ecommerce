var express = require('express');
var router = express.Router();
var ProductView = require('./ProductFunctions');
var jwt = require('../Services/jwtAuthorization');

router.get('/', jwt.checkAuth, ProductView.getProducts);

router.get('/:id', jwt.checkAuth, ProductView.getProductById);

router.post('/', jwt.checkAuth,  ProductView.createProduct);

router.put('/:id', jwt.checkAuth, ProductView.editProduct);

router.delete('/:id', jwt.checkAuth, ProductView.deleteProduct);

module.exports = router;