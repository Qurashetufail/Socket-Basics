var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
//start a new server and use the app as boiler plate
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

//let us listen for events
// io.on('connection',function (){
// 	console.log('User connectec via socket.io!');
// });

//single event
io.on('connection',function (socket){
	console.log('User connectec via socket.io!');

	socket.on('message', function(message){
		console.log('Message received:'+ message.text);

		io.emit('message',message);
		// socket.broadcast.emit('message',message);
	});

	socket.emit('message',{
		text: 'Welcome to the chat application!'
	});
});

http.listen(PORT, function (){
	console.log('Server Started');
});