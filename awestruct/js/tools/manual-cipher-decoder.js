//TODO: Replace underscores in ids with dashes

var character_frequency = {};
var initial_document_title = document.title;
var escape_pressed = false;
var previous_load_assignments;
var assignments;
var previous_cipher;
var unknown_last;
var unknown_next;

function initialize() {
	load_assignments();
	document.getElementById( 'cipher-input' ).focus();
	$( 'html' ).keydown( check_for_hot_key );
	$( '#show_hide_instructions' ).click( show_hide_instructions );
	$( '#save_load_assignments' ).keyup( load_assignments ).change( load_assignments );
	$( '#cipher-input' ).keyup( cipher_changed ).change( cipher_changed );
}

function load_assignments() {
	if ( ! validate_load_assignments() ) { return; }
	var new_assignments = $( '#save_load_assignments' ).val();
	var assignment_set_values = '\n' + new_assignments.substring(
		0,
		new_assignments.length/2
	);
	var assignment_to_values = '\n' + new_assignments.substring(
		new_assignments.length/2,
		new_assignments.length
	);
	populate_assignments( assignment_set_values, assignment_to_values );
	//TODO: Are these functions called twice? Once here and once during generate_assignments_select
	//TODO: Walk through the code to make sure
	generate_assignments_select();
	//generate_lookup_select();
	//generate_conflicts();
	//generate_conflicts_select();
	display_cipher_output();
	document.getElementById( 'assignment-set' ).select();
}

function validate_load_assignments() {
	var new_assignments = $( '#save_load_assignments' ).val();
	if ( new_assignments == previous_load_assignments ) {
		return false;
	}
	if ( new_assignments.length % 2 != 0 ) {
		$( '#save_load_error' ).html( 'Invalid Load Data' );
		return false;
	}
	$( '#save_load_error' ).html( '' );
	return true;
}

function populate_assignments( set_values, to_values ) {
	if ( typeof set_values != 'string' || typeof to_values != 'string' || set_values.length != to_values.length ) { throw 'Invalid input for the populate_assignments function; must be two strings of equal length.'; }
	assignments = { '\n' : '\n' };
	for ( var i in set_values ) {
		assignments[ set_values[ i ] ] = to_values[ i ];
	}
}

function generate_assignments_select() {
	var assignments_select = $( '#assignments-select' );
	var currently_selected_value = assignments_select.val();
	assignments_select.html( '' );
	add_characters_from_frequency_to_assignments_select();
	add_remaining_characters_to_assignments_select();
	if ( select_option_value_exists( assignments_select, currently_selected_value ) ) {
		$( '#assignments-select' ).val( currently_selected_value );
	}
}

function add_characters_from_frequency_to_assignments_select() {
	var assignment_frequency = build_assignment_frequency();
	for ( var i in assignment_frequency ) {
		add_option_to_assignments_select(
			assignment_frequency[ i ][ 1 ],
			assignment_frequency[ i ][ 0 ]
		);
	}
}

function build_assignment_frequency() {
	var assignment_frequency = [];
	for ( var character_frequency_value in character_frequency ) {
		var new_frequency_value = [];
		new_frequency_value.push( character_frequency_value );
		new_frequency_value.push( character_frequency[ character_frequency_value ] );
		assignment_frequency.push( new_frequency_value );
	}
	assignment_frequency.sort( sort_by_character_frequency );
	return assignment_frequency;
}

function add_remaining_characters_to_assignments_select() {
	for ( var character in assignments ) {
		if ( character === '\n' ) { continue; }
		if ( typeof character_frequency[ character ] === 'undefined' ) {
			add_option_to_assignments_select( 0, character );
		}
	}
}

function sort_by_character_frequency( first_comparison, second_comparison ) {
	return second_comparison[ 1 ] - first_comparison[ 1 ];
}

function add_option_to_assignments_select( frequency, character ) {
	var assignment_option = document.createElement( 'option' );
	assignment_option.value = character;
	if ( character === ' ' ) { character = "' '"; }
	$( assignment_option ).html( frequency + ' : ' + character );
	$( '#assignments-select' ).append( assignment_option );
}

function add_to_frequency(character)
{
	if (character == '\n' ) {
		return;
	}
	var character_frequency_index = character_frequency.characters.indexOf(character);
	if (character_frequency_index != -1) {
		character_frequency.values[character_frequency_index]++;
	} else {
		character_frequency.characters = character_frequency.characters + character;
		character_frequency.values[character_frequency.characters.length - 1] = 1;
	}
}

function cipher_changed() {
	if ( previous_cipher === document.getElementById( 'cipher-input' ).value ) { return; }
	previous_cipher = document.getElementById( 'cipher-input' ).value;
	generate_character_frequency();
	generate_assignments_select();
	display_cipher_output();
}

function generate_character_frequency() {
	character_frequency = {};
	var cipher = document.getElementById( 'cipher-input' ).value;
	for ( var i in cipher ) {
		if ( typeof character_frequency[ cipher[ i ] ] === 'undefined' ) {
			character_frequency[ cipher[ i ] ] = 1;
		} else {
			character_frequency[ cipher[ i ] ]++;
		}
	}
}

function display_cipher_output() {
	var cipher_input = document.getElementById( 'cipher-input' ).value;
	var cipher_output = '';
	unknown_next = document.getElementById( 'first-unknown' );
	unknown_last = document.getElementById( 'second-unknown' );
	
	
}


function show_hide_instructions()
{
	var instructions_block = $( '#instructions' );
	if ( instructions_block.hasClass( 'display-none' ) ) {
		 instructions_block.removeClass( 'display-none' );
	} else {
		 instructions_block.addClass( 'display-none' );
	}
}


function select_option_value_exists( select_element, option_value ) {
	var option_value_exists = false;
	select_element.find( 'option' ).each(
		function() {
			if ( this.value == option_value ) {
				option_value_exists = true;
				return;
			}
		}
	);
	return option_value_exists;
}

function check_for_hot_key( key_event )
{
	if ( Utilities.keyCodeLookup( key_event ) == 'escape' ) {
		toggle_escape_pressed();
	} else if ( escape_pressed ) {
		if ( Utilities.keyCodeLookup( key_event ) == 's' ) {
			toggle_show_current_value();
		}
		toggle_escape_pressed();
	}
}

function toggle_escape_pressed()
{
	if ( escape_pressed ) {
		document.title = initial_document_title;
	} else {
		document.title = '(Press A Hot Key)';
	}
	escape_pressed = ! escape_pressed;
}

initialize();