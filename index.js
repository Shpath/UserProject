var express = require('express');
var usersApp = express();

usersApp.use(express.static('client'));

function usersRoute(req, res) {
	res.sendFile(__dirname + '/client/index.html');
}

usersApp.get('/users*', usersRoute);
usersApp.get('/users', usersRoute);

usersApp.get(function(req, res){
	res.send(404);
});

usersApp.listen(80, function () {
	console.log('Listening on port 80');
	console.log('Application is served on http://localhost:80');
});
