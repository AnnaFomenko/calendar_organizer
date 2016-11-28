var crypto = require("crypto");
var async = require("async");
var AuthError = require("./errors").AuthError;

function User(login, password) {
    this.userId;
    this.login = login;
    this.salt = Math.random()+"";
    this.hashpassword = this.encryptPassword(password);
    this.time = Date.now;
    this.password = password;
}

module.exports = User;

User.prototype.encryptPassword = function encryptPassword(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
}
//SETTERS
User.prototype.setUserId = function setUserId(userId) {
     this.id = userId;
}
//GETTERS
User.prototype.getLogin = function getLogin() {
    return this.login;
}

User.prototype.getPassword = function getPassword() {
        return this.password;
}

User.prototype.getUserId = function getUserId() {
    return this.id;
}


User.prototype.checkPassword = function checkPassword(password) {
    return this.encryptPassword(password) === this.hashpassword;
}
//serialize for database
User.prototype.serialize = function serialize() {
    return {login:this.login, hashpassword:this.hashpassword, salt:this.salt};
}

//static methods
User.deserialize = function deserialize(obj, password) {
    var user = new User(obj.login, password);
    user.hashpassword = obj.hashpassword;
    user.salt = obj.salt;
    user.time = obj.time;
    user.id = obj.userId;
    return user;
}

User.authorize = function authorize(dbConnector, login, password, callback) {
    var User = this;
    var user;
    async.waterfall([
        function(callback) {
            dbConnector.getUser( login, callback);
        },
        function(results, callback) {
            if(results && results.length>0) {
                user = User.deserialize(results[0], password);
                if(user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new AuthError("Password is incorrect"));
                }
            } else {
                user = new User(login, password);
                dbConnector.registerUser(user, function(err, results) {
                    callback(err, user)});
            }
        },
        function(user, callback) {
            if(!user.userId) {
                dbConnector.getUser( user.getLogin(), function(err, results) {
                    user.setUserId(results[0].userId);
                    callback(err, user)});
            } else {
                callback(null, user);
            }
        }
    ], callback)
}