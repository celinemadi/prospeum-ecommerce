var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');  
var User = require('./User');
var messages = require('../messages.json');


router.post('/', async function (req, res) {
    try {
        var msg = "";
        var response = {};
        var query = {};
        console.log("BODY \n", req.body);

        //missing fields
        if ((!req.body.phoneNumber && !req.body.email) || !req.body.password) {
            console.log("TWO");
            status = 422;
            msg = messages.en.missingInfo;
            response.message = msg;
            return res.status(status).send(response);
        }
       
        //signing in with email
        if (req.body.email) {
            console.log("Logging in with email");
            req.body.email = req.body.email.toLowerCase();
            query = { email: req.body.email };
        }
        //signing in with phone
        else if (req.body.phoneNumber) {
            console.log("Logging in with phone number");
            query = { phoneNumber: req.body.phoneNumber };
        }
        else {
            console.log("Attention: Neither email nor phoneNumber were sent in the request.")
            status = 422;
            msg = messages.en.invalidCredentials;
            response.message = msg;
            return res.status(status).send(response);
        }

        //getting user
        var user = await User.findOne(query);

        if (user == undefined || user == null) {
            console.log("ERROR -- user not found");
            status = 422;
            msg = messages.en.invalidCredentials;
            response.message = msg;
            return res.status(status).send(response);
        } else {
            console.log("Comparing passwords");
            var password = req.body.password;
            var result = await bcrypt.compare(password, user.password);
            if (result != true) {
                console.log("Password is wrong");
                status = 422;
                response.message = messages.en.invalidCredentials;
                return res.status(status).send(response);
            } else {
                console.log("Passwords match, you're in mabrouk");
                status = 200;
                return res.status(status).send(user);
            }

        }
    } catch (error) {
        console.log("error", error);
        status = 500;
        response.message = messages.en.logInProblem;
        return res.status(status).send(response);
    }
});





module.exports = router;
