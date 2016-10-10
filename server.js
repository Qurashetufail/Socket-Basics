var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
//start a new server and use the app as boiler plate
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

//let us listen for events
io.on('connection',function (){
	console.log('User connectec via socket.io!');
});

http.listen(PORT, function (){
	console.log('Server Started');
});