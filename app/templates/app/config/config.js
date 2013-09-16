// Needed Modules
var fs = require('fs'),
    path = require('path'),
	express = require('express');

module.exports = exports = config = function () {

    exports.configure = function(env) {
     var jsonCfg = JSON.parse(loadJSONConfig(env));
	 // setupApplication(app, jsonCfg);
	 return jsonCfg;
    };

    var loadJSONConfig = function (env) {
        var filePath;
        filePath = __dirname + '/' + env + '/' + env + 'config.json';

        return fs.readFileSync(filePath, 'UTF-8');
    };
	
	exports.setupApplication = function(app, config) {
		  console.log("I'm in setupApplication");
		  // launch
		  // app.use(express.logger({ format: ':method :url :status' }));
		  app.use(express.bodyParser());
		  app.use(express.methodOverride());
		  app.use(express.cookieParser());
		  app.use(express.session({ secret: 'helloworld' }));
		  app.use(express.static(config.root + '/public'));  // Before router to enable dynamic routing
		  console.log(config.root + '/public');
		  app.use(app.router);

		  // Example 500 page
		  /*app['error'](function(err, req, res){
			console.log('Internal Server Error: ' + err.message);
			res.render('500');
		  });*/
		  
		  // Example 404 page via simple Connect middleware
		  /*app.use(function(req, res){
			res.render('404');
		  });*/

		 
		  // Setup ejs views as default, with .html as the extension
		  app.set('views', config.root + '/views');
		  //app.register('.html', require('ejs'));
		  app.set('view engine', 'ejs');	
	};
};