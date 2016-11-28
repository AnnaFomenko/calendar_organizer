//TODO add some pool for events
var crypto = require("crypto");

//static const
Event.ADD = 'addevent';
Event.UPDATE = 'upevent';
Event.DELETE = 'delevent';

//constructor
function Event(id, userId, title, description, time, allDay, endTime) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.time = time;
    this.allDay = allDay;
    this.endTime = (allDay)? time : endTime;
}

Event.createNew = function createNew(userId, date) {
    var id = crypto.randomBytes(16).toString("hex");
    return new Event(id, userId, 'New Event', 'New Event Description', date, true, date);
}

Event.createFromObj = function createFromObj(obj) {
    const date = new Date();
    const allDay = (obj.allday === 'on')? true: false;
    var end;
    date.setFullYear(obj.year);
    date.setMonth(obj.month);
    date.setDate(obj.date);

    if(allDay) {
        date.setHours(0);
        date.setMinutes(0);
    }
    end = new Date(date.getTime());
    if(!allDay) {
        date.setHours(obj.starthh);
        date.setMinutes(obj.startmm);
        end.setHours(obj.endhh);
        end.setMinutes(obj.endmm);
    }

    return new Event(obj.id, 0, obj.title, obj.description, date, allDay, end);
}

Event.createFromJSON = function createFromJSON(evt) {
    try {
        var evtObj = JSON.parse(evt);
    } catch(err) {
        var userId = (evt.userId)? evt.userId : 0;
        return new Event(evt.id, evt, evt.title, evt.description, evt.time, evt.allDay, evt.edTime);
    }
    return null;
}

Event.validate = function validate(evt) {
     //add some validations
}
//SETTERS
Event.prototype.setUserId = function setUserId(userId) {
    this.userId = userId;
}

//GETTERS
//id
Event.prototype.getId = function getId() {
    return this.id;
}
//event time
Event.prototype.getDate = function getDate() {
    return this.time.getDate();
}

Event.prototype.getMonth = function getMonth() {
    return this.time.getMonth();
}

Event.prototype.getFullYear = function getFullYear() {
    return this.time.getFullYear();
}

Event.prototype.getHours = function getHours() {
    return this.time.getHours();
}

Event.prototype.getMinutes = function getMinutes() {
    return this.time.getMinutes();
}

//event details
Event.prototype.getTitle = function getTitle() {
    return this.title;
}

Event.prototype.getDescription = function getDescription() {
    return this.description;
}
module.exports.Event = Event;