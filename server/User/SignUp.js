var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('./User');
var messages = require('../messages.json');



/* CREATES A NEW USER*/
router.post('/', async function (req, res) {
    var status;
    var msg; 
    try {

        console.log("\n\n----- sign up request -----\n", req.body);
        var role = req.body.role;
        // if(req.body=={}){
        //     console.log()
        // }
        var newUser = new User();
        newUser.setUser(req.body);

        console.log("newUser", newUser);
        var exists = await User.findOne({ phoneNumber: req.body.phoneNumber });
        if(!exists){
            await newUser.save();
            msg = newUser;
            status = 200;
        }
        else{
            msg = "User with this phone number exists"
            status = 401;
        }
        return res.status(status).send(msg);
        
        // var result = await createAuthorization(userAndPhone, newUser, req);

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