//TODO add some pool for events
var crypto = require("crypto");

//static const
Event.ADD = 'addevent';
Event.UPDATE = 'updevent';
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
    const allDay = false;//(obj.allday === 'on')? true: false;
    var end = new Date();
    date.setFullYear(obj.year);
    date.setMonth(obj.month);
    date.setDate(obj.date);
    end.setFullYear(obj.year);
    end.setMonth(obj.month);
    end.setDate(obj.date);
    if(allDay) {
        date.setUTCHours(0);
        date.setUTCMinutes(0);
        end.setUTCHours(0);
        end.setUTCMinutes(0);
    } else {
        date.setUTCHours(obj.starthh);
        date.setUTCMinutes(obj.startmm);
        end.setUTCHours(obj.endhh);
        end.setUTCMinutes(obj.endmm);
    }

    return new Event(obj.id, 0, obj.title, obj.description, date, allDay, end);
}

Event.createFromJSON = function createFromJSON(evt) {
    try {
        const evtObj = JSON.parse(evt);
        var userId = (evtObj.userId) ? evtObj.userId : 0;
        return new Event(evtObj.id, userId, evtObj.title, evtObj.description, new Date(evtObj.time), evtObj.allDay, new Date(evtObj.endTime));
    }catch(err){
        return null;
    }
}

//serialize for database
Event.prototype.serialize = function serialize() {
    return {id:this.id,
            userId:this.userId,
            title:this.title,
            description:this.description,
            time:this.time,
            allDay:this.allDay,
            endTime:this.endTime};
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
    return this.time.getUTCHours();
}

Event.prototype.getMinutes = function getMinutes() {
    return this.time.getUTCMinutes();
}

Event.prototype.getEndHours = function getHours() {
    return this.endTime.getUTCHours();
}

Event.prototype.getEndMinutes = function getMinutes() {
    return this.endTime.getUTCMinutes();
}
//event details
Event.prototype.getTitle = function getTitle() {
    return this.title;
}

Event.prototype.getDescription = function getDescription() {
    return this.description;
}
module.exports.Event = Event;