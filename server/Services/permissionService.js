var enumerator = require('../role-enumerator');

adminAllowedRoutes = [
        
        //productController
        'POST/v1/api/products',
        'GET/v1/api/products',
        'GET/v1/api/products/:id',
        'PUT/v1/api/products/:id',
        'DELETE/v1/api/products',
        'DELETE/v1/api/products/:id',

    ],

    clientAllowedRoutes = [
        

        //productController
        'GET/v1/api/products',
        'GET/v1/api/products/:id',

        //orderController
        'GET/v1/api/order',
        'GET/v1/api/order/:id',
        'POST/v1/api/order',

    ]




checkPermission = function checkPermission(user, req) {
    console.log(req.method + req.baseUrl)
    console.log("checking permission for user: ", user.fullName);
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