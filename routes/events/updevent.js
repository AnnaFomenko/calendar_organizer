const mysql = require("libs/mysql");
const constants = require("libs/constants");
const Event = require("libs/event").Event;
exports.post = function (req, res, next) {
    const event = req.body;
    function handleUpdateEvent(rows) {

    }
    event.userId = constants.USER_ID;
    Event.validate(event);
    mysql.updateEvent(event, handleUpdateEvent);
    res.redirect("/day/"+event.date+"/"+event.month+"/"+event.year);
}
