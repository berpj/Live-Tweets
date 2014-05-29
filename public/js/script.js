var app = {};

var MainView = Backbone.View.extend({
	el: 'body',
	markers: [],
	pause: true,
	photo: false,
	total: 0,
	map: null,

	events: {
		'click #reset' : 'reset',
		'click #type-photos' : 'typePhotos',
		'click #type-all' : 'typeAll',
		'click #pause' : 'pause',
		'displayTweet': function(tweet) {this.displayTweet(tweet)}
	},

	initialize: function(){
		_.extend(this, Backbone.Events);
		var self = this;

		var mapOptions = {
			center: new google.maps.LatLng(25, 0),
			zoom: 3,
			panControl: false,
			streetViewControl: false,
			mapTypeControl: false
		};
		this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		var socket = io.connect();

		socket.on('tweet', function(tweet) {
			
			self.displayTweet(tweet);
		});

		this.render();
	},

	reset: function() {
		for (var i = 0; i < this.markers.length; i++ ) {
			this.markers[i].setMap(null);
		}
		this.markers.length = 0;
		this.total = 0;
		$('#total').text(0);
	},

	typePhotos: function() {
		this.reset();
		this.photo = true;
	},

	typeAll: function() {
		this.reset();
		this.photo = false;
	},

	pause: function() {
		if (this.pause)
			$('#pause').text('STOP');
		else
			$('#pause').text('START');
		this.pause = !this.pause;
	},

	displayTweet: function(tweet) {
		if (this.pause === false && ((this.photo && tweet.media) || !this.photo))
		{
			this.total = this.total + 1;
			$('#total').text(this.total);

			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(tweet.geo[0],tweet.geo[1]),
				animation: google.maps.Animation.DROP,
				map: this.map
			});
			this.markers.push(marker);

			if (this.photo)
			{
				var infowindow = new google.maps.InfoWindow({
					content: '<img style="width: 100px" src="' + tweet.media + ':thumb"><br><span style="color: #0084b4"><a href="https://twitter.com/' + tweet.twittos + '" target="_BLANK">@' + tweet.twittos + '</a></span>',
					maxWidth: 140
				});
				infowindow.open(this.map,marker);
			}
			else
			{
				var infowindow = new google.maps.InfoWindow({
					content: '<span class="text-twittos"><a href="https://twitter.com/' + tweet.twittos + '" target="_BLANK">@' + tweet.twittos + '</a></span><br>' + tweet.tweet,
					maxWidth: 140
				});
			}

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(this.map, marker);
			});
		}
	},

	render: function(){
		;
	}
})

var mainView = new MainView();
