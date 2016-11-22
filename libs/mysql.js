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

function getEventById(userId, id, callback){
    connection.query('SELECT * from events WHERE userId = "'+userId+'" AND id="'+id+'"' , function(err, rows, fields) {
        if (err)
        {
            console.log('Error while performing Query "getEventById":' + err.message);
        }
        else
        {
            console.log(userId+"  id="+id+"   "+rows);
            callback(rows);
        }
    });
}

function addEvent (userId, id, year, month, date, start, end, title, description,  callback){
    connection.query('INSERT INTO events (id, userId, year, month, date, starthh, endhh, startmm, endmm, title, description) VALUES('+id, userId, year, month, date, starthh, endhh, startmm, endmm, title, description+')', function(err, rows, fields) {
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
/*
 UPDATE Customers
 SET ContactName='Alfred Schmidt', City='Hamburg'
 WHERE CustomerName='Alfreds Futterkiste';
 //
 INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
 VALUES ('Cardinal','Tom B. Erichsen','Skagen 21','Stavanger','4006','Norway');
* */
function deleteEvent (userId, id, callback){
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
function updateEvent (userId, id, callback){
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
module.exports.getEventsByMonth = getEventsByMonth;
module.exports.getEventsByDate = getEventsByDate;
module.exports.getEventById = getEventById;
module.exports.addEvent = addEvent;
module.exports.updateEvent = updateEvent;
module.exports.deleteEvent = deleteEvent;
