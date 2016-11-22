exports.get = function (req, res) {

    var constants = require("libs/constants");
    var mysql = require("libs/mysql");
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

const crypto = require("crypto");
exports.post = function (req, res, next) {
    console.log(req.body);

    var year = req.body.year;
    var month = req.body.month;
    var date = req.body.date;
    var title = req.body.title;
    var description = req.body.eventdesc;
    var starthh = req.body.starthh;
    var endhh = req.body.endhh;
    var startmm = req.body.startmm;
    var endmm = req.body.endmm;
    var id = req.body.id;
    if(!id)
    {
        id = crypto.randomBytes(16).toString("hex");
    }

    function handleAddEvent(rows){
        /*res.render('calendar', {user:req.user, date:date, constants:constants,
         nextMonth:nextMonth, prevMonth:prevMonth, curMonth:curMonth,
         monthEvents:rows});*/
    }
    mysql.addEvent(constants.USER_ID, id, year, month, date, starthh, startmm, endhh, endmm, title, description, handleAddEvent);
}
