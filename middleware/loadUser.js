exports.get = function (req, res, next) {
    req.user = res.locals.user = null;
    console.log('current userId = '+req.session.user);
    if(!req.session.user){
        return next();
    }

    req.app.locals.dbConnector.getUserById(req.session.user, function(err, user) {
        if(err)return next(err);
        req.user = res.locals.user  = user;
        next();
    });
}