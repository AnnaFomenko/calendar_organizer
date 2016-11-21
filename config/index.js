/**
 * Created by annafomenko on 11/18/16.
 */
var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file({file:path.join(__dirname,'config.json')});

module.exports = nconf;