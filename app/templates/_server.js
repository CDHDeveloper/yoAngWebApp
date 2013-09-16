var express   = require('express'),
     engine   = require('ejs-locals'),
     util     = require('util'),
     fs       = require('fs'),
     mongoose = require('mongoose'),
     passport = require('passport'),
     auth = require('./config/middlewares/authorization'),    
     loggingHelper = require('./lib/loggingHelper.js');
    

// Get environment currently running under
var env = process.env.NODE_ENV || "dev";

// create our configuration object by calling configure based on the environment desired.
var setup = require('./config/config.js')
setup();
config = setup.configure(env);
config.root = __dirname;

// Create Logger for the system. This will be attached to the Restify Server below
// Note: We might want to attach it to the config as well and thereby have it
// available for any subsystem.
loggingHelper();
var Logger  = loggingHelper.createLogger(config);
// Attach Logger to config
config.Logger = Logger;

// connect Mongoose to server and add that pointer t the config
mongoose.connect(config.mongo.db);
config.mongoose = mongoose;

// Bootstrap models
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  require(models_path+'/'+file)
})

// bootstrap passport config
require('./config/passport')(passport, config);

var app = express();

// Now configure express and any other separate modules

//i18next setings
require('./config/i18next')(app, config)


// use ejs-locals for all ejs templates:
app.engine('ejs', engine);

setup.setupApplication(app, config);

// initialize routing table and attach the routes  to controllers
var routes = require('./routes');
routes(app, config);

console.log("App Name: " + app.name);
console.log("App URL: " + app.url);

var port = process.env.PORT || config.server.port;

app.listen(port, function () {
    console.log('%s listening on port %s', app.name, port);
});