exports.get = function (req, res, next) {
    req.user = res.locals.user = null;
    next();
}