var HttpError = require("../libs/errors").HttpError;
var AuthError =  require("../libs/errors").AuthError;
var User = require("../libs/User");

exports.get = function (req,res) {
    res.render("login");
}

exports.post = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.authorize(req.app.locals.dbConnector, username, password, function(err, user) {
       if(err) {
           if(err instanceof AuthError) {
                return next(new HttpError(403, err.message));
           } else {
                return next(err);
           }
       }
       if(user) {
           req.session.user = user.getUserId();
       }
       res.end();
    });
}