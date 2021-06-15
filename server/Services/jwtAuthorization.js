var jwt = require('jsonwebtoken');
var messages = require('../messages.json');
var User = require('../User/User');
// var User = require
var jwt = require('jsonwebtoken');
var permission = require('./permissionService');
var util = require('util');
const secret = "9LRnqXTG${W[="
checkAuth = async function checkAuth(request, response, next) {
  let authHeader = request.headers.authorization;

  try {
    if (!authHeader) { // no authorization header
      response.status(401).json({ 'message': messages.en.missingAuthorizationHeader });
      return;
    }
    console.log(authHeader)
    await jwt.verify(authHeader, secret, async function (err, decoded) {
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
          var currentUser = await User.getUserById(decoded.id);
          console.log("currentUser", currentUser);


          if (currentUser === null || currentUser === undefined) {
            console.log("step1");

            return response.status(422).send({ "message": messages.en.noUserFound });
          }
          
          
          else {
            console.log("step2");

            console.log("----User email---- " + currentUser.email);
 
            
            if (permission.checkPermission(currentUser, request) == true && currentUser.email) {
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


authenticate = function(user){
  const token = jwt.sign({ id: user.id, role:user.role, firstname:user.firstname, lastname:user.lastname, email:user.email }, secret, { expiresIn: '7d' });
  return {
    ...omitPassword(user),
    token
  };        
}
function omitPassword(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

exports.checkAuth = checkAuth;
exports.authenticate = authenticate;