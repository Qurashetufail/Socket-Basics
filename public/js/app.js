var socket = io();

//when the connection establishes
socket.on('connect', function (){
	console.log('Connected to socket.io server');
});


//listening for the event from server
socket.on('message', function(message){
	console.log('New message:');
	console.log(message.text);

	//target by class
	jQuery('.messages').append('<p>' + message.text + '</p>');
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
		text:$message.val()
	});

	//deleting the value after sending the text
	$message.val('');
});