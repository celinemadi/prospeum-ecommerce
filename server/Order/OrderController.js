var express = require('express');
var router = express.Router();
var Order = require('./OrderFunctions');
var jwt = require('../Services/jwtAuthorization');

router.get('/', jwt.checkAuth ,Order.getOrders);

router.get('/:id', jwt.checkAuth, Order.getOrderById);

router.post('/', jwt.checkAuth, Order.createOrder);



module.exports = router;