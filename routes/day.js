exports.get = function (req, res) {

    var constants = require("libs/constants");
    var mysql = require("libs/mysql");
    var date = new Date();
    date.setDate(req.params.date);
    date.setMonth(req.params.month);
    date.setFullYear(req.params.year);

    const title = constants.FULL_WEEK_DAYS[date.getDay()]+" "+date.getDate()+" "+constants.MONTHES[date.getMonth()]+ " "+date.getFullYear();
    const back = "&lt;"+constants.MONTHES[date.getMonth()];

    function handleDayEvents(rows){
        req.dayEvents = res.locals.dayEvents = rows;
        res.render('day', {title:title, user:req.user, date:date, dayEvents:rows, back:back});

    }

    mysql.getEventsByDate(constants.USER_ID, date.getFullYear(), date.getMonth(), date.getDate(), handleDayEvents);

}

