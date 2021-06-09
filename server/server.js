

var express = require('express');
var path = require('path');
// var jwtAuth = require("./Services/jwtAuthorization");
var cors = require('cors');
var app = express();
app.use(express.json());
app.use(cors());

var v1 = express.Router();

var ProductController = require('./Product/ProductController');
// var OrderController = require('./Order/OrderController');
// var SignUp = require('./Models/User/SignUp');
// var Login = require('./Models/User/Login');

v1.use(function (req, res, next) {
  req.header("Access-Control-Allow-Origin", "*");
  next();
});

v1.use('/products', ProductController);
// v1.use('/order', jwtAuth.checkAuth, OrderController);
// v1.use('/signup', SignUp);
// v1.use('/login', Login);


app.use('/apidoc', express.static(path.join(__dirname, 'apidoc')));
app.use('/v1/api', v1);

app.use((request, response, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  response.status(404).send({ 'error': "Page not found." });
});

app.listen(3000, function () {
  console.log('Express server listening on port:3000');
});