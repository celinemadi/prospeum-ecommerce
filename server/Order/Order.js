var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  address: { type: Schema.Types.ObjectId, ref: "addresses" },
  paymentMethod: { type: Schema.Types.ObjectId, ref: "paymentMethods" },
  products: [{ type: Schema.Types.ObjectId, ref: "products" }],
  totalPrice: Number,
  currency: String,
  isCancelled: Boolean
  // hasPromoCode:
}, { timestamps: true });

OrderSchema.methods.setOrder = function (order) {
  this.user = order.user;
  this.address = order.address;
  this.paymentMethod = order.paymentMethod;
  this.products = order.products;
  this.totalPrice = order.totalPrice;
  this.currency =order.currency;
  this.isCancelled = order.isCancelled;
  // hasPromoCode=
};

var Order = mongoose.model('orders', OrderSchema, 'orders');
module.exports = Order;

