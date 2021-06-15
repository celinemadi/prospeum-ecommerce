var express = require('express');
var router = express.Router();
const path = require('path');
const ordersFile = path.join(__dirname, './orders.json');
const fs = require('fs')

 function createOrder(req, res) {
    console.log("req.body", req.body);
    //get the existing order data
    const existOrders = getOrderData()

    //get the new order data from post request
    const orderData = req.body

    //append the order data
    existOrders.push(orderData)

    //save the new order data
    saveOrderData(existOrders);
    res.status(200).send({ success: true, msg: 'Order data added successfully' })

}


 function getOrders(req, res) {
    try {
        const orders = getOrderData()
        if (orders)
            res.status(200).send(orders);
        else
            res.status(200).send([]);
    }
    catch (error) {
        res.status(500).send({ "message": "No orders" });
    }

};



function getOrderById(req, res) {
    //get the orderId from url
    const orderId = req.params.id

    //get the existing order data
    const existOrders = getOrderData()

    //check if the ordername exist or not       
    const findExist = existOrders.find(order => order.id === orderId)
    if (!findExist) {
        return res.status(409).send({ error: true, msg: 'order does not exist' })
    }

    res.status(200).send(findExist)
}



const saveOrderData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync( ordersFile, stringifyData)
}

const getOrderData = () => {
    const jsonData = fs.readFileSync(ordersFile, 'utf8')
    return JSON.parse(jsonData)
}
module.exports = { createOrder,getOrderById, getOrders };
