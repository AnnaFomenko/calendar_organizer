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

User.prototype.getPassword = function getPassword() {
        return this.password;
}

User.prototype.getUserId = function getUserId() {
    return this.id;
}

User.prototype.checkPassword = function checkPassword(password) {
    return this.encryptPassword(password) === this.hashpassword;
}

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
        function(rows, callback) {
            if(rows && rows.length>0) {
                user = User.deserialize(rows[0], password);
                if(user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new AuthError("Password is incorrect"));
                }
            } else {
                user = new User(login, password);
                dbConnector.registerUser(user, function(err, user) {
                    callback(err, user)});
            }
        }
    ], callback)
}