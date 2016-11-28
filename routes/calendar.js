var constants = require("../libs/constants");

exports.get = function (req, res, next) {
    const userId = req.session.user;
    console.log("userId="+userId);
    if(!userId) {
        return res.render('login');
    }
    var date = new Date();
    var curMonth = true;

    if(req.params.month && req.params.year) {
        curMonth = (date.getMonth() === req.params.month) && (date.getFullYear() === req.params.year);
        date.setMonth(req.params.month);
        date.setFullYear(req.params.year);
    }

    var nextMonth = new Date();
    nextMonth.setFullYear(date.getFullYear());
    nextMonth.setMonth( date.getMonth()+1);

    var prevMonth = new Date();
    prevMonth.setFullYear(date.getFullYear());
    prevMonth.setMonth(date.getMonth()-1);

    function handleMonthEvents(err, rows) {
        if(err) {
            next(err);
        } else {
            res.render('calendar', {user:req.user, date:date, constants:constants,
                nextMonth:nextMonth, prevMonth:prevMonth, curMonth:curMonth,
                monthEvents:rows});
        }

    }
    req.app.locals.dbConnector.getEventsByMonth(userId, date, handleMonthEvents);
}
