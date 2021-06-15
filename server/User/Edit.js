var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');  
var User = require('./User');
var messages = require('../messages.json');

var jwtService = require('../Services/jwtAuthorization')
router.put('/:id', async function (req, res) {
    try {
        var msg = "";
        var response = {};
        var query = {};
        console.log("BODY \n", req.body);

        //missing fields
        if ((!req.body.firstname) || !req.body.lastname) {
            status = 422;
            msg = messages.en.missingInfo;
            response.message = msg;
            return res.status(status).send(response);
        }
       
        var user = User.getUserById(req.params.id);

        if (user == undefined || user == null) {
            console.log("ERROR -- user not found");
            status = 422;
            msg = messages.en.invalidCredentials;
            response.message = msg;
            return res.status(status).send(response);
        } 
        else {
           var updatedUser = {...user,...req.body}
            var update = User.editUser(req.params.id, updatedUser)
            if(update){
                console.log("User updated!");
                status = 200;
                return res.status(status).send(update);
                
            }
            else{
                console.log("error", error);
                status = 500;
                response.message = messages.en.logInProblem;
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



router.get('/:id', async function (req, res) {
    try {
        var msg = "";
        var response = {};
        var query = {};
        console.log("BODY \n", req.body);
        var user = User.getUserById(req.params.id);

        if (user == undefined || user == null) {
            console.log("ERROR -- user not found");
            status = 422;
            msg = messages.en.invalidCredentials;
            response.message = msg;
            return res.status(status).send(response);
        } 
        else {
            
            status = 200;
            return res.status(status).send(user);

        }
    } catch (error) {
        console.log("error", error);
        status = 500;
        response.message = messages.en.logInProblem;
        return res.status(status).send(response);
    }
});

module.exports = router;
