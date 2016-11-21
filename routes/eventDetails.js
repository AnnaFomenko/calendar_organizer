exports.get = function (req, res) {
    const title = "Event Details";
    const back = "&lt;"+date.getDate()+" "+MONTHES[date.getMonth()];
    res.render('eventDetails', {title:title, back:back});
}

