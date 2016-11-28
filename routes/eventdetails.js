var Event = require("../libs/Event").Event;
var constants = require("../libs/constants");

exports.get = function (req, res, next) {
    const userId = req.session.user;
    if(!userId) {
        return res.render('login');
    }
    const title = "Event Details";
    const id = req.params.id;
    function handleEventDetails(err, rows) {
        if(err || !rows || rows.length === 0) {
            err = ( err ) ? err : new Error("Event not found")
            next(err);
        } else {
            const event = Event.createFromJSON(rows[0]);
            const back = "/day/"+event.getDate()+"/"+event.getMonth()+"/"+event.getFullYear();
            res.render('eventdetails', {title: title, back: back, event: event});
        }
    }
    req.app.locals.dbConnector.getEventById(userId, id, handleEventDetails);
}
