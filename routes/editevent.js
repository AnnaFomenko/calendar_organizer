const mysql = require('libs/mysql');
const constants= require('libs/constants');
const crypto = require("crypto");

exports.get = function (req, res, next)
{
    const id = crypto.randomBytes(16).toString("hex");
    var date = new Date();
    var event = {"userId":constants.userId,"title":"New Event", "description":"Event Description", "id":id,
        "year":date.getFullYear(),"month":date.getMonth(),"date":date.getDate(),
        "starthh":"00", "startmm":"00", "endhh":"00", "endmm":"00"};
    req.event = event;
    console.log("eexports.get ::"+req.event)
    next();
}

exports.post = function (req, res, next) {
    req.event = req.body;
    next();

}

exports.all = function (req, res)
{
    console.log("exports.all ::"+req.event)
    var event = req.event;
    const title = event.title;
    var date = new Date();
    date.setFullYear(event.year);
    date.setMonth(event.month);
    date.setDate(event.date);
    const back = "&lt;"+date.getDate()+" "+constants.MONTHES[date.getMonth()];
    //new event
    res.render('editevent', {title:title, back:back, event:event});
}