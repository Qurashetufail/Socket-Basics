var socket = io();

//when the connection establishes
// socket.on('connect', function (){
// 	console.log('Connected to socket.io server');
// });


//listening for the event from server
socket.on('message', function(message){
	var momentTimeStamp=moment.utc(message.timeStamp);
	console.log('New message:'+message.text);

	//target by class
	jQuery('.messages').append('<p><strong>' + momentTimeStamp.format('h:mm a') + '</strong> ' + message.text + '</p>');
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

	//resetting the value after sending the text
	$message.val('');
});