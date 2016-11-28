var Event = require("../libs/Event").Event;
var constants = require("../libs/constants");

exports.get = function (req, res, next) {
    const userId = req.session.user;
    if(!userId) {
        return res.render('login');
    }
    //create new event
    const date = new Date(req.query.add);
    const event = Event.createNew(userId, date);
    req.event = event;
    req.action = Event.ADD;
    next();
}

exports.post = function (req, res, next) {
    //update event
    req.event = Event.createFromJSON(req.body.edit);
    req.action = Event.UPDATE;
    next();
}

exports.all = function (req, res) {
    const event = req.event;
    const title = event.getTitle();
    var date = new Date();
    date.setFullYear(event.getFullYear());
    date.setMonth(event.getMonth());
    date.setDate(event.getDate());
    const back = "/day/"+event.getDate()+"/"+event.getMonth()+"/"+event.getFullYear();
    res.render('editevent', {title:title, back:back, event:event, action:req.action});
}