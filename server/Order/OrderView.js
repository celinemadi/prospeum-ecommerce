var express = require('express');
var router = express.Router();
var Order = require('./Order');

async function createOrder(req, res) {
    var newOrder = new Order();
    newOrder.setOrder(req.body);
    await newOrder.save();
    console.log("Order successfully created");
    res.status(200).send(newOrder);
}


async function getOrders(req, res) {
    var orders;
    try {
        if (req.params.id) {
            var query = { _id: req.params.id };
            orders = await Order.findOne(query);
        }
        else {
            orders = await Order.find({});
        }
        if (orders)
            res.status(200).send(orders);
        else
            res.status(200).send({ "message": "No orders" });
    }
    catch (error) {
        res.status(500).send({ "message": error.message });
    }
};

async function addProduct(req, res) {
    var order = req.body.order;
    var product = req.body.product;
    Order.findOneAndUpdate({ "_id": order }, { $push: { products: product } }, function (err, order) {
        if (err) throw err;
        else {
            res.status(200).send({ order })
        }
    });
};

async function removeProduct(req, res) {
    var order = req.body.order;
    var product = req.body.product;
    Order.findOneAndUpdate({ "_id": order }, { $pull: { products: product } }, function (err, order) {
        if (err) throw err;
        else {
            res.status(200).send({ order })
        }
    });
}


module.exports = { createOrder, getOrders, addProduct, removeProduct };