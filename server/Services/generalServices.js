var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');


var nodemailer = require('nodemailer');
/*  var location = req.body.location;
    var nbrBedrooms = req.body.nbrBedrooms;
    var phone = req.body.phone;
    var email = req.body.email;
    var name = req.body.name; */

sendEmailToUser = function (emailText, res, thisSubject) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'replyn85@gmail.com',
            pass: 'fadeljoe'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: "Cheez Inquiries <replyn85@gmail.com>",
        to: "info@cheezhospitality.com",
        // to: "vanessa.boghos@cheezhospitality.com",
        subject: thisSubject,
        html: emailText
    };
    

    transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("error in sending email:", error);
            res.status(500).send(error.message);
            
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({"message":"Successfully sent email!"});
        }
    });
}

sendEmailToIskandarUser = function (emailText, res, thisSubject) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'replyn85@gmail.com',
            pass: 'fadeljoe'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: "Cheez Inquiries <replyn85@gmail.com>",
        to: "iskandar@cheezhospitality.com",
        // to: "vanessa.boghos@cheezhospitality.com",
        subject: thisSubject,
        html: emailText
    };
    

    transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("error in sending email:", error);
            res.status(500).send(error.message);
            
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({"message":"Successfully sent email!"});
        }
    });
}


// Visit: fullName, email, phoneNumber, message, formTitle: visit
// Valuation: fullName, email, phoneNumber, message, images = [], formTitle: valuation
// Service: fullName, email, phoneNumber, message, address, formTitle: service, service : 1 2 3 (tuning, maintenance, restoration)
sendPianoEmailToUser = function (emailText, res, containsImage) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'pianosinquiries@gmail.com',
            pass: 'fadeljoe'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: "Piano Inquiries <pianosinquiries@gmail.com>",
        to: "info@pianoskalaydjian.com",
        // to: "vanessaboghos@hotmail.com",
        subject: "New Inquiry",
        html: emailText
    };
    if (containsImage&& containsImage!= null) {
        var attach = [];
        for(var i = 0; i < containsImage.length; i++){
            var object = {
                filename: 'image'+i+".png",
                path: containsImage[i],
                cid: 'attachedImage'+i
            }
            attach.push(object);
        }
        mailOptions.attachments = attach;
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("error in sending email:", error);
            res.status(500).send(error.message);
            
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send({"message":"Successfully sent email!"});
        }
    });
}

shuffleArray = function (a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}



/*
this method make a random combination of numbers and Letters in order to make a code
the result of this function will be saved on sign up and change password to make a jwtToken uniq for the user.
*/
makeRandomId = function makeRandomId(request, response, next) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 33; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


exports.shuffleArray = shuffleArray;
exports.sendEmailToUser = sendEmailToUser;
exports.sendPianoEmailToUser = sendPianoEmailToUser;
exports.sendEmailToIskandarUser = sendEmailToIskandarUser;
exports.makeRandomId = makeRandomId;