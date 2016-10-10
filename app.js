var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
//start a new server and use the app as boiler plate
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function (){
	console.log('Server Started');
});