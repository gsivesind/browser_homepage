function redirectPage (id) {
	var url
 	if(id === 'gmail') url = 'http://www.gmail.com';
 	if(id === 'netflix') url = 'http://www.netflix.com';
 	if(id === 'reddit') url = 'http://www.reddit.com/'
 	if(id === 'youtube') url = 'http://www.youtube.com/'
 	console.log(url)
	window.location.replace(url);
}

function addLinkButtonListeners () {
	$('.LinkButton').each(function () {
		$(this).click( function () {
			id = this.id;
			redirectPage(id)
		})
	});
}