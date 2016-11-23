const mysql = require("libs/mysql");
const constants = require("libs/constants");
exports.get = function (req, res) {
    var date = new Date();
    var curMonth = true;
    res.locals.monthEvents = [];

    if(req.params.month && req.params.year)
    {
        curMonth = (date.getMonth() == req.params.month) && (date.getFullYear()== req.params.year);
        date.setMonth(req.params.month);
        date.setFullYear(req.params.year);
    }

    var nextMonth = new Date();
    nextMonth.setFullYear(date.getFullYear());
    nextMonth.setMonth( date.getMonth()+1);

    var prevMonth = new Date();
    prevMonth.setFullYear(date.getFullYear());
    prevMonth.setMonth(date.getMonth()-1);

    function handleMonthEvents(rows){
        res.locals.monthEvents = rows;
        res.render('calendar', {user:req.user, date:date, constants:constants,
            nextMonth:nextMonth, prevMonth:prevMonth, curMonth:curMonth,
            monthEvents:rows});

    }
    mysql.getEventsByMonth(constants.USER_ID, date.getFullYear(), date.getMonth(), handleMonthEvents);
}
