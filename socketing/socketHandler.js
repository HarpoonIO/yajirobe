var io = require('socket.io')();
var p2p = require('socket.io-p2p-server').Server;
var socketHandler = new Object();
socketHandler.io = io;
socketHandler.p2p = p2p;
var colour = require('colour');

// Local instances
var users = [];

io.on('connection', function(socket){
	addUser(socket);
	console.log("Client connected".cyan);
	printNumberOfUsers();
	
	socket.on('disconnect', function(){
		console.log("Client disconnected".red);
		removeUser(socket);
		printNumberOfUsers();
	});

	socket.on('peer-msg', function(data){
		socket.broadcast.emit('peer-msg', data);
	});
	
	socket.on('go-private', function(data){
		// io.sockets.connected[users[1]].emit('go-private', 'Is working yaa?');
		// socket.broadcast.emit('go-private', data);
	});
	
});

function removeUser(socket){
	var index = users.indexOf(socket.id);
	if(index > -1){
		users.splice(index, 1);
	}
}

function addUser(socket){
	users.push(socket.id);
}

function printNumberOfUsers(){
	console.log(("Number of users: " + users.length + "").green);
}

module.exports = socketHandler;