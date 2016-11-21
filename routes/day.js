exports.get = function (req, res) {
    var constants = require("libs/constants");
    var mysql = require("libs/mysql");
    var date = new Date();
    date.setDate(req.params.date);
    date.setMonth(req.params.month);
    date.setFullYear(req.params.year);

    const title = constants.FULL_WEEK_DAYS[date.getDay()]+" "+date.getDate()+" "+constants.MONTHES[date.getMonth()]+ " "+date.getFullYear();
    const month = "&lt;"+constants.MONTHES[date.getMonth()];

    //TODO we can take it from monthEvents
    function handleDayEvents(rows){
        res.render('day', {title:title, user:req.user, date:date, events:[], month:month, dayEvents:rows});
    }
    mysql.getEventsByDate(constants.USER_ID, date.getFullYear(), date.getMonth(),date.getDate(), handleDayEvents);
}

