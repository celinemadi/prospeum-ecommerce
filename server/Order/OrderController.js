var express = require('express');
var router = express.Router();
var Order = require('./Order')
var XLSX = require('xlsx');
var OrderView = require('./OrderView');


router.get('/', OrderView.getOrders);

router.get('/:id', OrderView.getOrders);

router.post('/', OrderView.createOrder);

router.put('/add', OrderView.addProduct);

router.put('/remove', OrderView.removeProduct);


module.exports = router;
