var userAction = require("../../middleware/userAction");
var constants = require("../../libs/constants");
var Event = require("../../libs/Event").Event;

exports.post = function (req, res, next) {
    const event = Event.createFromObj(req.body);
    const userId = req.session.user;
    event.setUserId(userId);
    userAction.change(req, res, next, event, Event.UPDATE);
}
