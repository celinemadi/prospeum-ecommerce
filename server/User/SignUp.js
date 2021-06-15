var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var User = require('./User');
var messages = require('../messages.json');
var generalService = require('../Services/generalServices')

/* CREATES A NEW USER*/
router.post('/', async function (req, res) {
    var status;
    var msg; 
    try {

        console.log("\n\n----- sign up request -----\n", req.body);
        var newUser = req.body;
        console.log("newUser", newUser);
        var exists = User.findUser(req.body.email);
        if(!exists){
            newUser.password=  bcrypt.hashSync(newUser.password, salt);
            newUser.id = generalService.makeRandomId()
            var createdMessage = User.createUser(newUser);
            if(createdMessage.success){
                msg = newUser;
                status = 200;
            }
            else{
                msg = {error:"Error creating user"}
                status = 500; 
            }
           
        }
        else{
            msg = {error:"User with this email  exists"}
            status = 401;
        }
        return res.status(status).send(msg);
        
    }
    catch (error) {
        if (!error.status) {
            console.log("error in creating new user: ", error);
            status = 500;
            msg = error;
        }

        else {
            status = error.status;
            msg = error.msg;
        }
        return res.status(status).send(msg);
    }

});

module.exports = router;