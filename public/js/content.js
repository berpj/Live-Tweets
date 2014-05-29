var socket = io.connect(window.location.hostname);
var markers = [];
var pause = true;
var photo = false;
var total = 0;
var map = null;

function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(25, 0),
		zoom: 3,
		panControl: false,
		streetViewControl: false,
		mapTypeControl: false
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);

function display_tweet(tweet) {
	if (pause === false)
	{
		total = total + 1;
		$('#total').text(total);

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(tweet.geo[0],tweet.geo[1]),
			animation: google.maps.Animation.DROP,
			map: map
		});
		markers.push(marker);

		if (photo)
		{
			var infowindow = new google.maps.InfoWindow({
				content: '<img style="width: 100px" src="' + tweet.media + ':thumb"><br><span style="color: #0084b4"><a href="https://twitter.com/' + tweet.twittos + '" target="_BLANK">@' + tweet.twittos + '</a></span>',
				maxWidth: 140
			});
			infowindow.open(map,marker);
		}
		else
		{
			var infowindow = new google.maps.InfoWindow({
				content: '<span class="text-twittos"><a href="https://twitter.com/' + tweet.twittos + '" target="_BLANK">@' + tweet.twittos + '</a></span><br>' + tweet.tweet,
				maxWidth: 140
			});
		}
		
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	}
};

function reset()
{
	for (var i = 0; i < markers.length; i++ ) {
		markers[i].setMap(null);
	}
	markers.length = 0;
	total = 0;
	$('#total').text(0);
}

socket.on('tweet', function(tweet) {
	if ((photo && tweet.media) || !photo)
		display_tweet(tweet);
});

$('#pause').click(function() {
	if (pause)
		$('#pause').text('STOP');
	else
		$('#pause').text('START');
	pause = !pause;
	return false;
});

$('#reset').click(function() {
	reset();
	return false;
});

$('#type-all').click(function() {
	reset();
	photo = false;
});

$('#type-photos').click(function() {
	reset();
	photo = true;
});
