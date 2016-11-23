const mysql = require("libs/mysql");
const constants = require("libs/constants");
const Event = require("libs/event").Event;
exports.post = function (req, res, next) {
    const event = req.body;
    function handleAddEvent(rows) {
        //do something special
        console.log("handleAddEvent:"+JSON.stringify(rows));
    }
    event.userId = constants.USER_ID;
    Event.validate(event);
    mysql.addEvent(event, handleAddEvent);
    res.redirect("/day/"+event.date+"/"+event.month+"/"+event.year);
}