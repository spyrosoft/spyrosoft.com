function translate_hex() {
	clear_error();
	var hex = document.getElementById( 'hex' ).value;
	if ( hex.length % 6 != 0 ) {
		display_error( 'Hex input must be have a length of a factor of six.' );
	}
	var rgb = [];
	for ( var i = 0; i < hex.length; i+=6 ) {
		var current_rgb = six_hex_to_rgb( hex.substr( i, 6 ) );
		rgb.push( current_rgb.join( ', ' ) );
	}
	document.getElementById( 'rgb' ).value = '[[' + rgb.join( '], [' ) + ']]';
	document.getElementById( 'rgb' ).select();
}

function translate_rgb() {
	clear_error();
	try {
		var rgb_input = document.getElementById( 'rgb' ).value;
		var rgb = JSON.parse( rgb_input );
		var hex = '';
		var rgb_input_error_message = 'RGB needs to be a two dimensional array, the second dimension of length 3.';
		if ( rgb.length === undefined ) { throw rgb_input_error_message; }
		for ( var i = 0; i < rgb.length; i++ ) {
			if ( rgb[i].length === undefined || rgb[i].length !== 3 ) { throw rgb_input_error_message; }
			hex += rgb_to_six_hex( rgb[i] );
		}
		document.getElementById( 'hex' ).value = hex;
		document.getElementById( 'hex' ).select();
	} catch ( error ) {
		display_error( error );
	}
}

function six_hex_to_rgb( six_hex ) {
	var rgb = new Array();
	rgb[ 0 ] = hex_to_decimal( six_hex.substr( 0, 2 ) );
	rgb[ 1 ] = hex_to_decimal( six_hex.substr( 2, 2 ) );
	rgb[ 2 ] = hex_to_decimal( six_hex.substr( 4, 2 ) );
	return rgb;
}

function rgb_to_six_hex( rgb ) {
	var six_hex = '';
	six_hex += decimal_to_hex( rgb[ 0 ] );
	six_hex += decimal_to_hex( rgb[ 1 ] );
	six_hex += decimal_to_hex( rgb[ 2 ] );
	return six_hex;
}

function decimal_to_hex( decimal, pad_length ) {
	var hex = decimal.toString( 16 );
	
	if ( ! pad_length )
	{
		pad_length = 2;
	}
	while ( hex.length < pad_length )
	{
		hex = '0' + hex;
	}
	
	return hex;
}

function hex_to_decimal( hex, pad_length ) {
	return parseInt( hex, 16 );
}

function translate_hex_on_enter( key_event ) {
	if ( check_for_enter_key_event( key_event ) ) {
		translate_hex();
	}
}

function translate_rgb_on_enter( key_event ) {
	if ( check_for_enter_key_event( key_event ) ) {
		translate_rgb();
	}
}

function check_for_enter_key_event( key_event ) {
	if ( typeof key_event.keyCode === 'undefined' ) { return false; }
	if ( key_event.keyCode === 13 ) { return true; }
	return false;
}

function display_error( message ) {
	$( '#error' ).html( message );
}

function clear_error() {
	display_error( '' );
}

$( '#to-hex' ).click( translate_rgb );
$( '#to-rgb' ).click( translate_hex );
$( '#hex' ).keydown( translate_hex_on_enter );
$( '#rgb' ).keydown( translate_rgb_on_enter );

document.getElementById( 'hex' ).select();