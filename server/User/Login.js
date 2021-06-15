var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');  
var User = require('./User');
var messages = require('../messages.json');

var jwtService = require('../Services/jwtAuthorization')
router.post('/', async function (req, res) {
    try {
        var msg = "";
        var response = {};
        var query = {};
        console.log("BODY \n", req.body);

        //missing fields
        if ((!req.body.email) || !req.body.password) {
            status = 422;
            msg = messages.en.missingInfo;
            response.message = msg;
            return res.status(status).send(response);
        }
       
        var user = User.findUser(req.body.email.toLowerCase());

        if (user == undefined || user == null) {
            console.log("ERROR -- user not found");
            status = 422;
            msg = messages.en.invalidCredentials;
            response.message = msg;
            return res.status(status).send(response);
        } 
        else {
            console.log("Comparing passwords");
            var password = req.body.password;
            var result = await bcrypt.compare(password, user.password);
            if (result != true) {
                console.log("Password is wrong");
                status = 422;
                response.message = messages.en.invalidCredentials;
                return res.status(status).send(response);
            } else {
                console.log("Passwords match!");
                status = 200;
                let response = jwtService.authenticate(user)

                return res.status(status).send(response);
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
