/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
( function() {
	var container, button, menu;

	container = document.getElementById( 'site-navigation' );
	if ( ! container )
		return;

	button = container.getElementsByTagName( 'h1' )[0];
	if ( 'undefined' === typeof button )
		return;

	menu = container.getElementsByTagName( 'ul' )[0];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( -1 === menu.className.indexOf( 'nav-menu' ) )
		menu.className += ' nav-menu';

	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) )
			container.className = container.className.replace( ' toggled', '' );
		else
			container.className += ' toggled';
	};
} )();

function getRandomArbitrary( min, max, not ) {
	digit = Math.floor( Math.random() * (max - min) + min );
	// In theory, we could bring the same post back. This will grab another
	// random value. This doesn't prevent that from going any farther, but
	// hey, I don't think that anyone will notice/mind...
	if ( digit == not ) {
		digit = Math.floor( Math.random() * (max - min) + min );
	};
	return digit;
}

jQuery( document ).ready( function( $ ) {
	var url = 'https://public-api.wordpress.com/rest/v1/sites/makezine.com/posts/?tag=makercon&number=20';
	var jqxhr = $.getJSON( url, function() {
		// Posts...
		var posts = jqxhr.responseJSON.posts;

		// Start the output.
		var html_output = '<h2>News from MakerCon Bay Area</h2><ul class="recent-posts media-list">';

		// Figure out how many posts we have to work with...
		var length = jqxhr.responseJSON.posts.length;

		// Setup the index array.
		index = [];

		// Get the first random number.
		index.push( getRandomArbitrary( 0, length, null ) );
		index.push( getRandomArbitrary( 0, length, index[0] ) );

		// Loop through the new index.
		$( index ).each( function( key, value ) {
			html_output += '<li class="media">';
			html_output += '<a class="pull-left" href="' + posts[ value ].URL + '"><img class="media-object thumbnail" src="' + posts[ value ].featured_image + '?w=125" alt="' + posts[ value ].title + '"></a>';
			html_output += '<h3><a href="' + posts[ value ].URL + '">' + posts[ value ].title + '</a></h3>';
			html_output += posts[ value ].excerpt;
			html_output += '</li>';
		});
		html_output += '</ul>';
		$('.highlights .posts').html( html_output );

	});

	var slides = '';
	var i = 0;
	$( images ).each( function() {
		if ( i === 0 ) {
			slides += '<div class="item active"><img src="' + $(this)[0].path + '?w=520"></div>';
		} else {
			slides += '<div class="item"><img src="' + $(this)[0].path + '?w=520"></div>';
		}
		i++;
	});
	$('.home-slideshow').html( slides );

	var indicators = '';
	var j = 0;
	$( images ).each( function() {
		if ( j === 0 ) {
			indicators += '<li data-target="#carousel-example-generic" data-slide-to="' + j + '" class="active"></li>';
		} else {
			indicators += '<li data-target="#carousel-example-generic" data-slide-to="' + j + '"></li>';
		}
		j++;
	});
	$('.carousel-indicators').html( indicators );

});
