var express = require('express');
var app = express();
var moment = require('moment');
var now = moment();
var PORT = process.env.PORT || 3000;

//start a new server and use the app as boiler plate
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

//let us listen for events
// io.on('connection',function (){
// 	console.log('User connectec via socket.io!');
// });

var clientInfo = {};

//single event
io.on('connection',function (socket){
	console.log('User connectec via socket.io!');

	socket.on('disconnect',function () {
		var userData = clientInfo[socket.id];
		
		if (typeof userData !== 'undefined') {
			socket.leave(userData.room);
			io.to(userData.room).emit('message',{
				name: 'System',
				text: userData.name + ' has left',
				timestamp: moment().valueOf()
			});

			delete clientInfo[socket.id];
		}
	});

	socket.on('joinRoom', function (req){
		//for dynamic attribute name
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',{
			name: 'System',
			text: req.name + ' has joined',
			timestamp: moment().valueOf()
		})
	});

	socket.on('message', function(message){
		console.log('Message received:'+message.text);

		//resetting time values
		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message',message);
		// socket.broadcast.emit('message',message);
	});

	socket.emit('message',{
		name: 'System',
		text: 'Welcome to the chat application!',
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function (){
	console.log('Server Started');
});