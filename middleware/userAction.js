var Event = require("../libs/Event").Event;

exports.change = function (req, res, next, event, action) {
    function handleChangeEvent(err, rows) {
        if(err){
            next(err);
        } else {
            console.log(event);
            res.redirect("/day/"+event.getDate()+"/"+event.getMonth()+"/"+event.getFullYear());
        }
    }
    switch (action) {
        case Event.ADD:
            req.app.locals.dbConnector.addEvent(event, handleChangeEvent);
            break;
        case Event.UPDATE:
            req.app.locals.dbConnector.updateEvent(event, handleChangeEvent);
            break;
        case Event.DELETE:
            req.app.locals.dbConnector.deleteEvent(event.getId(), handleChangeEvent);
            break;
    }


}
