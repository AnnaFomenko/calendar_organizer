const mysql = require("libs/mysql");
const constants = require("libs/constants");

exports.post = function (req, res, next) {
    const event = JSON.parse(req.body.delete);
    function handleDeleteEvent(rows) {
        ///do something special
        console.log("handleDeleteEvent:"+JSON.stringify(rows));
    }
    event.userId = constants.USER_ID;
    mysql.deleteEvent(event.id, handleDeleteEvent);
    res.redirect("/day/"+event.date+"/"+event.month+"/"+event.year);
}
