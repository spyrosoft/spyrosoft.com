/* --------------------Init-------------------- */

var app_client_id = '00a584eac19a89b7591e31afc8b5e2df';
var clementine_app_client_id = '2add0f709fcfae1fd7a198ec7573d2d4';

var artist_info = new Object;

$( document ).ready(
	function()
	{
		$(document).foundation();
		$( '#user-search' ).select();
		$( '#user-search' ).keydown( user_search_keydown );
		$( '#get-user-tracks' ).click( get_user_tracks );
		$( '.generated-playlist' ).click( function() { this.select(); } );
		
		SC.initialize({
			client_id: app_client_id
		});
	}
);

/* --------------------Init-------------------- */


function get_user_tracks()
{
	var user_id = lookup_user_id();
}

function lookup_user_id()
{
	var user_search = $( '#user-search' ).val();
	
	SC.get(
		'/resolve',
		{
			url: 'https://soundcloud.com/' + user_search
		},
		look_up_tracks
	);
}

function look_up_tracks( user_results )
{
	if ( ! user_results.id )
	{
		alert( 'Lookup failed.' );
		return;
	}
	
	artist_info.username = user_results.username;
	
	SC.get(
		'/resolve',
		{
			url: 'https://soundcloud.com/' + $( '#user-search' ).val() + '/tracks'
		},
		compile_playlist
	);
}

function compile_playlist( search_results )
{
	var track_xml = '<?xml version="1.0" encoding="UTF-8"?><playlist xmlns="http://xspf.org/ns/0/" version="1"><trackList>';
	for ( var i = 0; i < search_results.length; i++ )
	{
		track_xml += generate_track_xml( search_results[ i ] );
	}
	track_xml += '</trackList></playlist>';
	$( '.generated-playlist' ).val( track_xml );
}

function generate_track_xml( track_result )
{
	var track = new Object;
	
	track.location
		= 'https://api.soundcloud.com/tracks/'
		+ track_result.id
		+ '/stream?client_id='
		+ clementine_app_client_id;
	
	track.title = encode_xml_entities( track_result.title );
	track.creator = encode_xml_entities( artist_info.username );
	track.duration = encode_xml_entities( track_result.duration );
	track.image = encode_xml_entities( track_result.artwork_url );
	
	return '<track>' + json_to_xml( track ) + '</track>';
}



function user_search_keydown( key_event )
{
	if ( key_event_is_enter( key_event ) )
	{
		get_user_tracks();
	}
}


/* --------------------Utilities-------------------- */

function key_event_is_enter( key_event )
{
	var enter_key_code = 13;
	return key_event_code_matches_key_code( key_event, enter_key_code );
}

function key_event_code_matches_key_code( key_event, key_code )
{
	if ( key_event.keyCode === key_code )
	{
		return true;
	}
	else
	{
		return false;
	}
}

function json_to_xml( json_input )
{
	var xml_output = '';
	$.each(
		json_input,
		function( key, value )
		{
			xml_output
				+= '<' + key + '>'
				+ value
				+ '</' + key + '>';
		}
	);
	return xml_output;
}

function encode_xml_entities( text_input )
{
	return String( text_input ).replace( /&/g, '&amp;' ).replace( /</g, '&lt;' ).replace( />/g, '&gt;' ).replace( /"/g, '&quot;' );
}

/* --------------------Utilities-------------------- */