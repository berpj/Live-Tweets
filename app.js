var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: false});
var twitter = require('twitter');

var config = {
	"consumer_key": process.env.consumer_key,
	"consumer_secret": process.env.consumer_secret,
	"access_token_key": process.env.access_token_key,
	"access_token_secret": process.env.access_token_secret
};

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
			stream.on('data', function(tweet) {
				if (tweet.text && tweet.geo && tweet.possibly_sensitive == false)
				{
					var media = (tweet.entities.media ? tweet.entities.media[0].media_url_https : null);

					socket.broadcast.emit('tweet', {twittos: tweet.user.screen_name, tweet: tweet.text, geo: tweet.geo.coordinates, media: media});
					socket.emit('tweet', {twittos: tweet.user.screen_name, tweet: tweet.text, geo: tweet.geo.coordinates, media: media});
				}
			});
		});
	}
});

server.listen(process.env.PORT || 8080);
