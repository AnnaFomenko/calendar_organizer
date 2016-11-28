var userAction = require("../../middleware/userAction");

exports.post = function (req, res, next) {
    const event = Event.createFromJSON(req.body.delete);
    userAction.change(req, res, next, event, Event.DELETE);
}
