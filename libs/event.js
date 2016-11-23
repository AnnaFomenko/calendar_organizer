function Event(id, userId, title, description, time) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.time = time;
}
 Event.validate = function(event)
 {
     if(event.starthh.trim().length === 0)
     {
         event.starthh = 0;
     }
     if(event.startmm.trim().length === 0)
     {
         event.startmm = 0;
     }
     if(event.endhh.trim().length === 0)
     {
         event.endhh = 0;
     }
     if(event.endmm.trim().length === 0)
     {
         event.endmm = 0;
     }
     //add some more validations
 }
module.exports.Event = Event;