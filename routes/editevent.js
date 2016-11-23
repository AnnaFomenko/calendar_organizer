const mysql = require('libs/mysql');
const constants= require('libs/constants');
const crypto = require("crypto");

exports.get = function (req, res, next)
{
    //create new event
    const id = crypto.randomBytes(16).toString("hex");

    var date = new Date(req.query.add);
    var event = {"userId":constants.userId,"title":"New Event", "description":"Event Description", "id":id,
        "year":date.getFullYear(),"month":date.getMonth(),"date":date.getDate(),
        "starthh":"00", "startmm":"00", "endhh":"00", "endmm":"00", "time": date};
    req.event = event;
    req.action = "addevent";
    next();
}

exports.post = function (req, res, next) {
    //update event
    req.event = JSON.parse(req.body.edit);
    req.action = "updevent";
    next();
}

exports.all = function (req, res)
{
    var event = req.event;
    const title = event.title;
    var date = new Date();
    date.setFullYear(event.year);
    date.setMonth(event.month);
    date.setDate(event.date);
    const back = "/day/"+event.date+"/"+event.month+"/"+event.year;
    res.render('editevent', {title:title, back:back, event:event, action:req.action});
}