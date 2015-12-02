var socket = io();

var username = '';

$('#join-btn').on('click', function(){
	username = $('#username').val();
	$('#username').val('');
	
	$('#join-btn').addClass('disabled');
	$('#send-btn').removeClass('disabled');
	
	socket.emit('user-joined', username);	
});

socket.on('user-joined', function(users){
	var usersHTML = '';
	for (var user in users){
		usersHTML += '<a>' + users[user] + '</a>';
	}
	$('#users-container').html(usersHTML);
});

$('#send-btn').on('click', function(){
	var message = $('#msg-box').val();
	$('#msg-box').val('');
	socket.emit('message', {user: username, msg: message});
});

socket.on('message', function(data){
	var msgHTML = '<li><a>' + data.user + ': </a>' + data.msg + '</li>';
	$('#chat-container .list').append(msgHTML);
});

$('#msg-box').on('keypress', function(e){
	if (e.which == 13){
		$('#send-btn').click();
	}
});