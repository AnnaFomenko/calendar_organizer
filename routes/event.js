exports.get = function (req, res) {
    var constants = require("libs/constants");
    var mysql = require("libs/mysql");
    const title = "Event Details";
    const back = "here will be back link"//"&lt;"+date.getDate()+" "+contants.MONTHES[date.getMonth()];
    var id = req.params.id;
    function handleEventDetails(rows){
       if(rows && rows.length>0)
       {
           res.render('event', {title: title, back: back, event: rows[0]});
       }
       else
       {
           //vse propalo
       }
    }

    mysql.getEventById(constants.USER_ID, id, handleEventDetails);

}
