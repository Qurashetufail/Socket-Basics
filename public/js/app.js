var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

console.log(name + ' wants to join ' + room);
jQuery('.room-title').text(room);
//when the connection establishes
socket.on('connect', function (){
	console.log('Connected to socket.io server');
	socket.emit('joinRoom',{
		name: name,
		room: room
	});
});


//listening for the event from server
socket.on('message', function(message){
	var momentTimestamp=moment.utc(message.timestamp);
	var $message = jQuery('.messages');
	console.log('New message:'+message.text);

	//target by class
	$message.append('<p><strong>'+ message.name+ ' ' + momentTimestamp.local().format('h:mm a') + ': </strong></p>');
	$message.append('<p>'+ message.text +'</p>');
});

//handles submitting of new message

//store jquery instance of an element
//target by id
var $form = jQuery('#message-form');

$form.on('submit',function (event) {
	//handle form submission
	event.preventDefault();

	var $message=$form.find('input[name=message]');
	
	socket.emit('message',{
		name: name,
		text:$message.val()
	});

	//resetting the value after sending the text
	$message.val('');
});