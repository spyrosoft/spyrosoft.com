var character_frequency = {};
var initial_document_title = document.title;
var escape_pressed = false;
var previous_load_assignments;
var assignments;
var previous_cipher;
var show_unknowns = true;

function initialize() {
	load_assignments();
	//document.getElementById( 'cipher-input' ).focus();
	$( 'html' ).keydown( check_for_hot_key );
	$( '#show-hide-instructions' ).click( show_hide_instructions );
	$( '#save-load-assignments' ).keyup( load_assignments ).change( load_assignments );
	$( '#cipher-input' ).keyup( cipher_changed ).change( cipher_changed ).focus( input_self_select );
	$( '#first-unknown' ).change( display_cipher_output ).focus( input_self_select );
	$( '#second-unknown' ).change( display_cipher_output ).focus( input_self_select );
	$( '#show-hide-unknowns' ).click( toggle_unkowns );
	$( '#assignment-set' ).keyup( assignment_set_event ).focus( input_self_select );
	$( '#assignment-to' ).keyup( assignment_to_event ).focus( input_self_select );
}

function load_assignments() {
	if ( ! validate_load_assignments() ) { return; }
	var new_assignments = $( '#save-load-assignments' ).val();
	var assignment_set_values = '\n' + new_assignments.substring(
		0,
		new_assignments.length/2
	);
	var assignment_to_values = '\n' + new_assignments.substring(
		new_assignments.length/2,
		new_assignments.length
	);
	populate_assignments( assignment_set_values, assignment_to_values );
	assignments_changed();
}

function assignments_changed() {
	//TODO: Are these functions called twice? Once here and once during generate_assignments_select
	//TODO: Walk through the code to make sure
	generate_assignments_select();
	generate_lookup_select();
	//generate_conflicts();
	//generate_conflicts_select();
	//generate_load_assignments();
	display_cipher_output();
}

function validate_load_assignments() {
	var new_assignments = $( '#save-load-assignments' ).val();
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
		add_assignment( set_values[ i ], to_values[ i ] );
	}
}

function generate_select( select_element, inner_function ) {
	var currently_selected_value = select_element.val();
	select_element.html( '' );
	inner_function();
	if ( select_option_value_exists( select_element, currently_selected_value ) ) {
		select_element.val( currently_selected_value );
	}
}

function generate_assignments_select() {
	var inner_function = function() {
		add_characters_from_frequency_to_assignments_select();
		add_remaining_characters_to_assignments_select();
	};
	generate_select( $( '#assignments-select' ), inner_function );
}

function add_characters_from_frequency_to_assignments_select() {
	var assignment_frequency = build_assignment_frequency();
	for ( var i in assignment_frequency ) {
		var assignment_set_with_or_without_to;
		var character = assignment_frequency[ i ][ 0 ];
		if ( get_assignment( character ) ) {
			assignment_set_with_or_without_to
				= character
				+ ' -> '
				+ visible_characters( get_assignment( character ) );
		} else {
			assignment_set_with_or_without_to = character;
		}
		add_option_to_assignments_select(
			assignment_frequency[ i ][ 1 ],
			assignment_set_with_or_without_to
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
			var assignment_set_with_or_without_to;
			if ( get_assignment( character ) ) {
				assignment_set_with_or_without_to
					= visible_characters( character.toUpperCase() )
					+ ' -> '
					+ visible_characters( get_assignment( character ) );
			} else {
				assignment_set_with_or_without_to = character.toUpperCase();
			}
			add_option_to_assignments_select( 0, assignment_set_with_or_without_to );
		}
	}
}

function sort_by_character_frequency( first_comparison, second_comparison ) {
	return second_comparison[ 1 ] - first_comparison[ 1 ];
}

function add_option_to_assignments_select( frequency, assignment ) {
	add_option_to_select(
		$( '#assignments-select' ),
		frequency + ' : ' + visible_characters( assignment ),
		assignment
	);
}

function generate_lookup_select() {
	if ( assignments.length === 1 ) { return; }
	generate_select(
		$( '#lookup-select' ),
		add_characters_from_assignments_to_lookup_select
	);
}

function add_characters_from_assignments_to_lookup_select() {
	var assignment_characters = [];
	for ( var character in assignments ) {
		assignment_characters.push( character );
	}
	assignment_characters.sort();
	for ( var i in assignment_characters ) {
		add_option_to_lookup_select(
			assignment_characters[ i ],
			assignment_characters[ i ]
		);
	}
}

function add_option_to_lookup_select( character, character_assignment ) {
	if ( character === '\n' ) { return; }
	var character_text = character;
	var assignment_value = get_assignment( character );
	add_option_to_select(
		$( '#lookup-select' ),
		visible_characters( character_text )
			+ ' <- '
			+ visible_characters( assignment_value ),
		character
	);
}

function add_option_to_select( select_element, option_text, option_value ) {
	var new_option = document.createElement( 'option' );
	new_option.value = option_value;
	$( new_option ).html( option_text );
	select_element.append( new_option );
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
		var character = cipher[ i ];
		if ( ! document.getElementById( 'case-sensitive' ).checked ) {
			character = cipher[ i ].toUpperCase();
		}
		if ( typeof character_frequency[ character ] === 'undefined' ) {
			character_frequency[ character ] = 1;
		} else {
			character_frequency[ character ]++;
		}
	}
}

//TODO: Add case sensitivity
function display_cipher_output() {
	if ( ! show_unknowns ) {
		document.getElementById( 'cipher-output' ).value
			= document.getElementById( 'cipher-input' ).value;
		return;
	}
	if ( ! validate_unknowns() ) { return; }
	var unknown_next = document.getElementById( 'first-unknown' ).value;
	var unknown_last = document.getElementById( 'second-unknown' ).value;
	var cipher_input = document.getElementById( 'cipher-input' ).value;
	var cipher_output = '';
	var previous_character;
	for ( var i in cipher_input ) {
		var current_character = cipher_input[ i ];
		if ( get_assignment( current_character ) ) {
			cipher_output += get_assignment( current_character );
		} else {
			if ( current_character === previous_character ) {
				cipher_output += unknown_last;
			} else {
				cipher_output += unknown_next;
				var unknown_temp = unknown_next;
				unknown_next = unknown_last;
				unknown_last = unknown_temp;
			}
		}
		previous_character = current_character;
	}
	document.getElementById( 'cipher-output' ).value = cipher_output;
}

function validate_unknowns() {
	var unknown_next = document.getElementById( 'first-unknown' ).value;
	var unknown_last = document.getElementById( 'second-unknown' ).value;
	if ( unknown_next.length == 0 || unknown_last.length == 0 ) {
		alert( 'Both unknowns must have a value.' );
		return false;
	}
	return true;
}

function assignment_set_event() {
	var assignment_set_value = document.getElementById( 'assignment-set' ).value;
	if ( assignment_set_value === '' ) { return; }
	var assignment_to_value = document.getElementById( 'assignment-to' ).value;
	delete_assignment( assignment_set_value );
	if ( assignment_to_value !== '' ) {
		add_assignment( assignment_set_value, assignment_to_value );
	}
	assignments_changed();
	document.getElementById( 'assignment-to' ).select();
}

function assignment_to_event() {
	var assignment_set_value = document.getElementById( 'assignment-set' ).value;
	if ( assignment_set_value === '' ) {
		document.getElementById( 'assignment-set' ).select();
		return;
	}
	var assignment_to_value = document.getElementById( 'assignment-to' ).value;
	if ( assignment_to_value === '' ) {
		delete_assignment( assignment_set_value );
	} else {
		add_assignment( assignment_set_value, assignment_to_value );
	}
	assignments_changed();
	if ( assignment_to_value !== '' ) {
		document.getElementById( 'assignment-set' ).select();
	}
}

function add_assignment( assignment, value ) {
	if ( document.getElementById( 'case-sensitive' ).checked ) {
		assignments[ assignment ] = value;
	} else {
		assignments[ assignment.toUpperCase() ] = value.toUpperCase();
	}
}

function delete_assignment( assignment ) {
	if ( document.getElementById( 'case-sensitive' ).checked ) {
		delete assignments[ assignment ];
	} else {
		delete assignments[ assignment.toUpperCase() ];
	}
}

function get_assignment( assignment ) {
	if ( document.getElementById( 'case-sensitive' ).checked ) {
		return assignments[ assignment ];
	} else {
		return assignments[ assignment.toUpperCase() ];
	}
}


function toggle_unkowns() {
	show_unknowns = ! show_unknowns;
	display_cipher_output();
}

function show_hide_instructions() {
	var instructions_block = $( '#instructions' );
	if ( instructions_block.hasClass( 'display-none' ) ) {
		 instructions_block.removeClass( 'display-none' );
	} else {
		 instructions_block.addClass( 'display-none' );
	}
}


function input_self_select() {
	this.select();
}

function visible_characters( character ) {
	if ( character === ' ' ) { character = "' '"; }
	return character;
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

function check_for_hot_key( key_event ) {
	if ( Utilities.keyCodeLookup( key_event ) == 'escape' ) {
		toggle_escape_pressed();
	} else if ( escape_pressed ) {
		if ( Utilities.keyCodeLookup( key_event ) == 's' ) {
			toggle_show_current_value();
		}
		toggle_escape_pressed();
	}
}

function toggle_escape_pressed() {
	if ( escape_pressed ) {
		document.title = initial_document_title;
	} else {
		document.title = '(Press A Hot Key)';
	}
	escape_pressed = ! escape_pressed;
}

initialize();

/**
 * Case sensitive should matter when setting and when generating drop down lists
 * Make onclick on the select options work
 * Make onpaste work
 * Prevent output from scrolling when regenerating its content
 */