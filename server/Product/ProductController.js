var express = require('express');
var router = express.Router();
var Product = require('./Product')
var ProductView = require('./ProductFunctions');
// var jwt = require('../../Services/jwtAuthorization');

router.get('/', ProductView.getProducts);

router.get('/:id', ProductView.getProducts);

router.post('/', ProductView.createProduct);

router.put('/:id', ProductView.editProduct);

router.delete('/:id', ProductView.deleteProduct);

module.exports = router;