var jwt = require('jsonwebtoken');
var messages = require('../messages.json');
var User = require('../User/User');
// var User = require
var jwt = require('jsonwebtoken');
var permission = require('./permissionService');
var util = require('util');

checkAuth = async function checkAuth(request, response, next) {
  let authHeader = request.headers.authorization;

  try {
    if (!authHeader) { // no authorization header
      response.status(401).json({ 'message': messages.en.missingAuthorizationHeader });
      return;
    }
    await jwt.verify(authHeader, "9LRnqXTG${W[="    , async function (err, decoded) {
      try {
        if (err) {
          response.status(403).json({
            message: err.message
          });
        }
        else if (decoded) {
          request.decoded = decoded;
          console.log("------------- JWTDecoded -------------");
          console.log(util.inspect(decoded));
          console.log("------------- End JWTDecoded -------------");
          var currentUser = await User.getCurrentUser(decoded.id);
          console.log("currentUser", currentUser);


          if (currentUser == null) {
            console.log("step1");

            return response.status(422).send({ "message": messages.en.noUserFound });
          }
          // comparing current JWT code with the one existing in the Databse.
          if (currentUser.codeforJWT != decoded.codeforJWT) {
            console.log("step2");
            
            return response.status(401).send({ "message": messages.en.forbidden });

          }
          console.log("currentUser: " + currentUser.fullName);
          if (currentUser === null || currentUser === undefined) {
            console.log("step3");

            return response.status(422).send({ "message": messages.en.noUserFound });
          }
          else {
            console.log("step4");

            response.locals.user = currentUser;
            console.log("----User phoneNumber---- " + currentUser.phoneNumber);
 
            
            if (permission.checkPermission(currentUser, request) == true && currentUser.phoneNumber) {
              console.log("----Checking user permission----");
              next();
            }

            else {
              console.log("jwt FORBIDDEN");
              return response.status(401).send({ "message": messages.en.forbidden });
            }
          }
        }
        else {
          return response.status(401).send({ "message": messages.en.forbidden });
        }
      } catch (err) {
        console.log("err", err);
      }
    });

  }
  catch (error) {
    console.log("Error:", error);
    response.status(401).send({ 'message': messages.en.invalidAuthorizationHeader });
  }
}


exports.checkAuth = checkAuth;