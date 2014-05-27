var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var util = require('util');
var twitter = require('twitter');
var config = require('./config/config.json');

var twit = new twitter(config);
var streaming = null;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/views/index.html');
});

io.sockets.on('connection', function(socket) {
	if (streaming === null) {
		twit.stream('statuses/filter', {'locations':'-180,-90,180,90'}, function(stream) {
			streaming = true;
			stream.on('data', function(data) {
				tweet = data;
				if (tweet.text && tweet.geo)
				{
				//console.log(util.inspect(tweet));
				socket.broadcast.emit('tweet', {twittos: tweet.user.screen_name, tweet: tweet.text, geo: tweet.geo.coordinates});
				socket.emit('tweet', {twittos: tweet.user.screen_name, tweet: tweet.text, geo: tweet.geo.coordinates});
				}
			});
		});
	}
});

server.listen(8080);
