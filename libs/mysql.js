/**
 * Created by annafomenko on 11/18/16.
 */
var mysql = require("mysql");
var config = require("config");

var connection = mysql.createConnection({
    host     : config.get("mysql:host"),
    user     : config.get("mysql:user"),
    password : config.get("mysql:password"),
    database : config.get("mysql:database")
});

connection.connect(function(err){
    if(!err) {
        console.log("Database "+config.get("mysql:database")+" is connected");
    } else {
        console.log("Error connecting database. ERROR MESSAGE="+ err.message);
    }
});

function getAllEvents (userId, callback){
    connection.query('SELECT * from events WHERE userId = "'+userId+'"', function(err, rows, fields) {
        //TODO do I need to close connection?
        //connection.end();
        if (err)
        {
            console.log('Error while performing Query "getAllEvents":' + err.message);
        }
        else
        {
            callback(rows);
        }
    });
}

function getEventsByDate(userId, year, month, date, callback){
    connection.query('SELECT * from events  WHERE userId = "'+userId+'" AND year="'+year+'" AND month= "'+month+'" AND date="'+date+'"',
        function(err, rows, fields) {
            if (err)
            {
                console.log('Error while performing Query "getEventsByDate":' + err.message);
            }
            else
            {
                callback(rows);
            }
    });
}

function getEventsByMonth(userId, year, month, callback){
    connection.query('SELECT * from events WHERE userId = "'+userId+'" AND year="'+year+'" AND month= "'+month+'"' , function(err, rows, fields) {
        if (err)
        {
            console.log('Error while performing Query "getEventsByMonth":' + err.message);
        }
        else
        {
            callback(rows);
        }
    });
}
function addEvent (userId, date, callback){
    connection.query('SELECT * from events LIMIT 2', function(err, rows, fields) {
        if (err)
        {
            console.log('Error while performing Query "addEvent":' + err.message);
        }
        else if (callback)
        {
            callback(rows);
        }
    });
}
function deleteEvent (userId, eventId, callback){
    connection.query('SELECT * from events LIMIT 2', function(err, rows, fields) {
        if (err)
        {
            console.log('Error while performing Query "deleteEvent":' + err.message);
        }
        else if (callback)
        {
            callback(rows);
        }
    });
}
function updateEvent (userId, date, callback){
    connection.query('SELECT * from events LIMIT 2', function(err, rows, fields) {
        if (err)
        {
            console.log('Error while performing Query "updateEvent":' + err.message);
        }
        else if (callback)
        {
            callback(rows);
        }
    });
}


module.exports.getAllEvents = getAllEvents;
module.exports.getEventsByDate = getEventsByDate;
module.exports.getEventsByMonth = getEventsByMonth;
module.exports.addEvent = addEvent;
module.exports.updateEvent = updateEvent;
