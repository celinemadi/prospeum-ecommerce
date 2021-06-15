var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');



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


makeRandomId = function makeRandomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 33; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


exports.shuffleArray = shuffleArray;
exports.makeRandomId = makeRandomId;