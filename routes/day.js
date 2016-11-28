var constants = require("../libs/constants");

exports.get = function (req, res, next) {
    const userId = req.session.user;
    if(!userId) {
        return res.render('login');
    }
    var date = new Date();
    date.setDate(req.params.date);
    date.setMonth(req.params.month);
    date.setFullYear(req.params.year);
    const title = constants.FULL_WEEK_DAYS[date.getDay()]+" "+date.getDate()+" "+constants.MONTHES[date.getMonth()]+ " "+date.getFullYear();
    const back = "&lt;"+constants.MONTHES[date.getMonth()];

    function handleDayEvents(err, rows) {
        if(err) {
            next(err);
        } else {
            res.render('day', {title:title, user:req.user, date:date, dayEvents:rows, back:back});
        }
    }
    req.app.locals.dbConnector.getEventsByDate(userId, date, handleDayEvents);
}

