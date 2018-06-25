function display_xkcd (callback) {
	$.ajax({
	  dataType: "JSONP",
	  jsonpCallback: 'callback',
	  url: 'http://dynamic.xkcd.com/api-0/jsonp/comic/',
	  type: "GET",
	  success: function (response) {
		var dummyVal = Math.random()
		dummyVal = String(dummyVal);
	  	imgURL = response.img;
  		var pic = $("<img>", {"src": imgURL + '?dummy=' + dummyVal});
		var alt = response.alt
		var title = response.title
  		pic.each(function () {
	  		var tempImg = new Image()
	  		tempImg.onload = function () {
	  			$('#ContentWrapper').empty()
				$('#ContentWrapper').append($("<h1>"+title+"</h1>"));
				$('#ContentWrapper').append($(this));
				$('#ContentWrapper').append($("<p>"+alt+"</p>"))

				callback()
	  		}
	  		tempImg.src = $(this).attr('src');

  		})


	  }
	});
}

function display_spotify (callback) {
	$('#ContentWrapper').empty()
	$('#ContentWrapper').append('<div class="SpotifyWrapper"></div>')

	var playlistCovers = {
		'JAMMERS': $("<img src=../images/SpotifyCovers/Jammers.jpg class=PlaylistCover id=JAMMERS></img>"),
		'DISCOVER WEEKLY': $("<img src=../images/SpotifyCovers/Discover.jpg class=PlaylistCover id=DISCOVER_WEEKLY></img>"),
		'BOY\'S NIGHT': $("<img src=../images/SpotifyCovers/BoysNight.jpg class=PlaylistCover id='BOY\'S NIGHT'></img>"),
		'AFTERNOON ACOUSTIC': $("<img src=../images/SpotifyCovers/AfternoonAcoustic.jpg class=PlaylistCover id='AFTERNOON ACOUSTIC'></img>"),
		'EVENING CHILL': $("<img src=../images/SpotifyCovers/EveningChill.jpg class=PlaylistCover id='EVENING CHILL'></img>"),
		'MORNING VIBES': $("<img src=../images/SpotifyCovers/MorningVibes.jpg class=PlaylistCover id='MORNING VIBES'></img>")
	}
	
	var urls = {
		'JAMMERS':"https://open.spotify.com/embed/user/1288474842/playlist/0ecPvdwX4ej5BGnoBXmwV7",
		'DISCOVER WEEKLY': 'https://embed.spotify.com/?uri=spotify:user:spotify:playlist:37i9dQZEVXcKzTjJup2IgE',
		'BOY\'S NIGHT': "https://open.spotify.com/embed/user/1288474842/playlist/0TqUqsl7o39u0xUgWbWH8e",
		'AFTERNOON ACOUSTIC': "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX4E3UdUs7fUx",
		'EVENING CHILL': "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWZ0OzPeadl0h",
		'MORNING VIBES':"https://open.spotify.com/embed/user/tori_oto28/playlist/11T6luBrXZZYHwuifCjTmt"
	}

	for (var key in playlistCovers){
		$('.SpotifyWrapper').append('<div class="PlaylistWrapper" id="'+ key +'"></div>')
		var wrapper = $('#ContentWrapper').find($('.PlaylistWrapper:last'))
		wrapper.append(playlistCovers[key])
		wrapper.append('<p class="PlaylistTitle">'+key+'</p>')
	}

	$('.PlaylistWrapper').each(function () {
		$(this).click( function () {
			var choice = this.id
			var url = urls[choice]
			var widget = $('<iframe>', {'src': url,
							'frameborder':'0',
							'allowtransparency':"true",
							'height':'300'})
			$('#ContentWrapper').empty()
			$('#ContentWrapper').append(widget)
			callback()
		});
	});

}

function display_calendar (callback){
	var dummyVal = Math.random();
	dummyVal = String(dummyVal);
	var widget = $('<iframe src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;showTz=0&amp;mode=AGENDA&amp;height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=gsivesin%40stanford.edu&amp;color=%2329527A&amp;src=%23contacts%40group.v.calendar.google.com&amp;color=%2328754E&amp;src=stanford.edu_njippr6d9tj3gt86vg8il6hs3s%40group.calendar.google.com&amp;color=%23691426&amp;src=en.usa%23holiday%40group.v.calendar.google.com&amp;color=%23125A12&amp;src=stanford.edu_1ouhajhmmjjc3t3sdle40aq5ps%40group.calendar.google.com&amp;color=%23125A12&amp;src=stanford.edu_5f48obvpd2lcoisjvupcs9g47c%40group.calendar.google.com&amp;color=%23875509&amp;ctz=America/Los_Angeles" ></iframe>');
	widget.height(500)
	$('#ContentWrapper').empty()
	$('#ContentWrapper').append(widget)
	callback()
}

function display_loading (callback) {
	var dummyVal = Math.random();
	dummyVal = String(dummyVal);
	// var loading = $("<img>", {"src": 'Thumbnails/download.png' + '?dummy=' + dummyVal, 'id':'loading'});
	var loading = $("<div>", {'class':"loader"});
	$('#ContentWrapper').append(loading)
	callback()
}

function displayContent (id) {

	if(id === 'close')  {
		$('#ContentWrapper').animate({
			opacity: '0',
			height: '100%'
		})
	}
	else {
		function callback () {	
			$('#ContentWrapper').animate({
				opacity: '1',
				height: '100%'
			})
		}
		display_loading(callback)
		if(id === 'xkcd') display_xkcd(callback);
		if(id === 'spotify') display_spotify(callback);
		if(id === 'calendar') display_calendar(callback);
	}

}


function addContentButtonListeners () {
	$('.ContentButton').each(function () {
		$(this).click( function () {
			$('#ContentWrapper').empty();
			id = this.id;
			displayContent(id)
		})
	});
}