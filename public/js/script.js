var app = {};

var MainView = Backbone.View.extend({
	el: 'body',
	markers: [],
	pause: true,
	mode: 3, //1: tweets, 2: photos, 3: heatmap
	map: null,
	tweets: [],
	heatmap: null,
	style1: [{"stylers": [{ "weight": 0.1 }, { "visibility": "simplified" }]}],
	style2: [{"stylers":[{"visibility":"simplified"}]},{"stylers":[{"color":"#020f19"}]},{"featureType":"water","stylers":[{"color":"#07304b"},{"lightness":7}]},{"elementType":"labels.text.fill","stylers":[{"visibility":"simplified"},{"lightness":25}]}],

	events: {
		'click #reset' : 'reset',
		'click #type-photos' : 'typePhotos',
		'click #type-tweets' : 'typeTweets',
		'click #type-heatmap' : 'typeHeatMap',
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
			mapTypeControl: false,
		};
		this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		this.tweets = new google.maps.MVCArray();
		this.heatmap = new google.maps.visualization.HeatmapLayer({
			data: this.tweets,
			radius: 30
		});
		this.heatmap.setMap(this.map);

		if (this.mode == 3)
			this.map.setOptions({styles: this.style2});
		else
			this.map.setOptions({styles: this.style1});

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

		this.tweets = new google.maps.MVCArray();
		this.heatmap.setMap(null);
		this.heatmap = new google.maps.visualization.HeatmapLayer({
			data: this.tweets,
			radius: 30
		});
		this.heatmap.setMap(this.map);

		if (this.mode == 3)
		{
			$('#buttons').css('color', '#eee');
			this.map.setOptions({styles: this.style2});
		}
		else
		{
			$('#buttons').css('color', '#333333');
			this.map.setOptions({styles: this.style1});
		}

		$('#total').text(0);
	},

	typeTweets: function() {
		this.mode = 1;
		this.reset();
	},

	typePhotos: function() {
		this.mode = 2;
		this.reset();
	},

	typeHeatMap: function() {
		this.mode = 3;
		this.reset();
	},

	pause: function() {
		if (this.pause)
		$('#pause').text('STOP');
		else
		$('#pause').text('START');
		this.pause = !this.pause;
	},

	displayTweet: function(tweet) {
		if (this.pause === false && ((this.mode == 2 && tweet.media) || this.mode != 2))
		{
			$('#total').text(parseInt($('#total').text()) + 1);

			if (this.mode == 1 || this.mode == 2)
			{
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(tweet.geo[0],tweet.geo[1]),
					animation: google.maps.Animation.DROP,
					map: this.map
				});
				this.markers.push(marker);
			}

			if (this.mode == 1)
			{
				var infowindow = new google.maps.InfoWindow({
					content: '<span class="text-twittos"><a href="https://twitter.com/' + tweet.twittos + '" target="_BLANK">@' + tweet.twittos + '</a></span><br>' + tweet.tweet,
					maxWidth: 140
				});
			}
			else if (this.mode == 2)
			{
				var infowindow = new google.maps.InfoWindow({
					content: '<img style="width: 100px" src="' + tweet.media + ':thumb"><br><span style="color: #0084b4"><a href="https://twitter.com/' + tweet.twittos + '" target="_BLANK">@' + tweet.twittos + '</a></span>',
					maxWidth: 140
				});
				infowindow.open(this.map, marker);
			}
			else
			{
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(tweet.geo[0],tweet.geo[1]),
					map: this.map,
					icon: "img/dot.png"
				});

				setTimeout(function(){
					marker.setMap(null);
				}, 750);

				this.tweets.push(new google.maps.LatLng(tweet.geo[0],tweet.geo[1]));

				if (this.tweets.length > 1000)
				this.tweets.removeAt(0);
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
