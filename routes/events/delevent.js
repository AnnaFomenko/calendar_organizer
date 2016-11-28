var userAction = require("../../middleware/userAction");
var Event = require("../../libs/Event").Event;

exports.post = function (req, res, next) {
    const event = Event.createFromJSON(req.body.delete);
    userAction.change(req, res, next, event, Event.DELETE);
}
