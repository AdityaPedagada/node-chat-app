var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

var users = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

io.on('connection', function(socket){
	
	socket.on('user-joined', function(username){
		users.push(username);
		io.emit('user-joined', users)
	});
	
	socket.on('message', function(data){
		io.emit('message', data);
	});
	
});

server.listen(3000, function(){
	console.log('server started on port 3000')
});