var mysql = require("mysql");
var config = require("../config");
var util = require("util");
var async = require("async");
var EventEmitter = require("events").EventEmitter;

module.exports = DBConnector;

function DBConnector() {
    EventEmitter.call(this);
    this.connection = mysql.createConnection({
        host: config.get("mysql:host"),
        user: config.get("mysql:user"),
        password: config.get("mysql:password")
    });

    this.initialize(this.handleInitialization);
}

util.inherits(DBConnector, EventEmitter);
DBConnector.INITIALIZE = 'initialize';

//private section
DBConnector.prototype.initialize = function initialize (callback) {
    var dbConnector = this;
    async.series([
        //connect
        function connect(callback) {
            dbConnector.connection.connect(callback);
        },
        //create db
        function createDB(callback) {
            dbConnector.connection.query('CREATE DATABASE IF NOT EXISTS ' + config.get("mysql:database"), callback);
        },
        //use db
        function useDB(callback) {
            dbConnector.connection.query('USE ' + config.get("mysql:database"), callback);
        },
        //create tables
        //events table
        function createEventsTable (callback) {
            dbConnector.connection.query('CREATE TABLE IF NOT EXISTS '+ config.get("mysql:events")+
                ' (id VARCHAR(32) NOT NULL PRIMARY KEY,' +
                'userId BIGINT NOT NULL,' +
                'time TIMESTAMP DEFAULT NOW(),' +
                'title VARCHAR(64),' +
                'description VARCHAR(1024),' +
                'allDay TINYINT(1),' +
                'endTime TIMESTAMP DEFAULT NOW())',
                callback);
        },
        //users table
        function createUsersTable (callback) {
            dbConnector.connection.query('CREATE TABLE IF NOT EXISTS ' + config.get("mysql:users")+
                ' (userId BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,' +
                'time TIMESTAMP DEFAULT NOW(),' +
                'login VARCHAR(32) NOT NULL UNIQUE,' +
                'hashpassword VARCHAR(64),'+
                'salt VARCHAR(32))',
                callback);
        },
    ], function (err) {
        if(err) {
            //TODO use logger
            console.log(err);
        }
        callback.apply(dbConnector, err);
    });
}

DBConnector.prototype.handleInitialization = function handleInitialization(err) {
    if(err) {
        //TODO use logger
        console.log("DBConnectionManager ERROR: "+err.message);
    } else {
        this.emit(DBConnector.INITIALIZE);
    }
}
//public section
DBConnector.prototype.getAllEvents = function getAllEvents(userId, callback) {
    connection.query('SELECT * from events WHERE userId = "'+userId+'", ORDER BY time',
        function handleGetAllEvents(err, rows, fields) {
            //TODO do I need to close connection?
            //connection.end();
            callback(err, rows);
        });
}

DBConnector.prototype.getEventsByDate = function getEventsByDate(userId, date, callback) {
    this.connection.query('SELECT * from events  WHERE userId = "'+userId+ '"' +
        ' AND YEAR(time) = "'+date.getFullYear()+ '"' +
        ' AND MONTH(time) = "'+(date.getMonth()+1)+ '"' +
        ' AND DAY(time) = "'+date.getDate()+'" ORDER BY time',
        function handleGetEventsByDate(err, rows, fields) {
            callback(err, rows);
        });
}

DBConnector.prototype.getEventsByMonth = function getEventsByMonth(userId, date, callback) {
    this.connection.query('SELECT * from events WHERE userId = "'+userId+'"' +
        ' AND YEAR(time) = "'+date.getFullYear()+'"'+
        ' AND MONTH(time) = "'+(date.getMonth()+1)+'"',
        function handleGetEventsByMonth(err, rows, fields) {
            callback(err, rows);
        });
}

DBConnector.prototype.getEventById = function getEventById(userId, id, callback) {
    this.connection.query('SELECT * from events WHERE userId = "'+userId+'" AND id="'+id+'"',
        function handleGetEventById(err, rows, fields) {
            callback(err, rows);
        });
}

DBConnector.prototype.addEvent = function addEvent (event, callback) {
    this.connection.query('INSERT INTO events SET ?', event,
        function handleAddEvent(err, rows, fields) {
            callback(err, rows);
        });
}

DBConnector.prototype.deleteEvent = function deleteEvent (id, callback) {
    this.connection.query('DELETE from events WHERE id = ?', id,
        function handleDeleteEvent(err, rows, fields) {
            callback(err, rows);
        });
}

DBConnector.prototype.updateEvent = function updateEvent(event, callback) {
    this.connection.query('UPDATE events SET ? WHERE id = ?', [event, event.id],
        function handleUpdateEvent(err, rows, fields) {
            callback(err, rows);
        });
}

//user
DBConnector.prototype.getUser = function getUser(login, callback) {
    this.connection.query('SELECT * FROM users WHERE login = "'+login+'"',
        function handleGetUser(err, rows, fields) {
            callback(err, rows);
        });
}

DBConnector.prototype.registerUser = function registerUser(user, callback) {
    this.connection.query('INSERT INTO users SET ?', user.serialize(),
        function handleRegisterUser(err, rows, fields) {
            callback(err, rows);
        });
}

DBConnector.prototype.getUserById = function getUserById(userId, callback) {
    this.connection.query('SELECT * FROM users WHERE userId = "'+userId+'"',
        function handleGetUserById(err, rows, fields) {
            callback(err, rows);
        });
}
