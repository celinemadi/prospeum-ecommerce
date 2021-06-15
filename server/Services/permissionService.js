var enumerator = require('../role-enumerator');

adminAllowedRoutes = [
        
        //productController
        'POST/v1/api/products',
        'GET/v1/api/products',
        'PUT/v1/api/products',
        'DELETE/v1/api/products',

         //orderController
         'GET/v1/api/orders',
         'PUT/v1/api/user',
         'GET/v1/api/user'
        ],

    clientAllowedRoutes = [
        //productController
        'GET/v1/api/products',

        //orderController
        'POST/v1/api/orders',
       'PUT/v1/api/user',
       'GET/v1/api/user'
    ]




checkPermission = function checkPermission(user, req) {
    console.log(req.method + req.baseUrl)
    console.log("checking permission for user: ", user.firstname);
    var userRole = user.role;
    var havePermission = false;
    if (userRole) {
        if (userRole == enumerator.userRole.ADMIN) {
            adminAllowedRoutes.forEach(element => {
                if (element === req.method + req.baseUrl) {
                    havePermission = true;
                }
            });
        } else if (userRole == enumerator.userRole.CLIENT) {
            clientAllowedRoutes.forEach(element => {
                if (element === req.method + req.baseUrl) {
                    havePermission = true;
                }
            });
        }
    }

    return havePermission;
}
exports.checkPermission = checkPermission;