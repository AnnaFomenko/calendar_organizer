exports.get = function (req, res) {
    var constants = require("libs/constants");
    var mysql = require("libs/mysql");
    const title = "Event Details";

    var id = req.params.id;
    function handleEventDetails(rows){
       if(rows && rows.length>0)
       {
           const event = rows[0];
           const back = "/day/"+event.date+"/"+event.month+"/"+event.year;
           res.render('eventdetails', {title: title, back: back, event: event});
       }
       else
       {
           //vse propalo
       }
    }

    mysql.getEventById(constants.USER_ID, id, handleEventDetails);

}
