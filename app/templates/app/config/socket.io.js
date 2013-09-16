/*
* Module dependencies
*/

var i18n = require('i18next')

module.exports = function(server, config){

var io = require('socket.io').listen(server)

//Sockets
io.of(config.socket.ns).on('connection', function(socket){

	//Requests
		socket.on('test/event', function(data){
			//action
		})

	//responses
		socket.emit('test/another/event', {data: i18n.t('world')})

})

}