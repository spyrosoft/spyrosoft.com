var assignment_set_values = '\n ,.?!\'"';
var assignment_to_values = '\n ,.?!\'"';
var frequency;
var cipher_conflicts = '';
var key_conflicts = '';
var first_unknown = '~';
var previous_first_unknown = '~';
var second_unknown = '=';
var previous_second_unknown = '=';
var current_unknown = first_unknown;
var next_unknown = second_unknown;
var unknown_index = 0;

var previous_input = '';

var previous_assignment_set = '';
var previous_assignment_to = '';

var show_current_value = false;

var continuous_cycle_values = '-\\|/';
var continuous_cycle_index = 0;
var continuous_cycle_timeout;
var continuous_cycle_time = 200;

var escape_pressed = false;

function update_cipher_text()
{
	var cipher_input = document.getElementById( 'cipher-input' ).value;
	var cipher_output = '';
	unknown_index = 0;
	current_unknown = first_unknown;
	next_unknown = second_unknown;
	frequency = new frequency_tracker;
	for (var counter = 0; counter < cipher_input.length; counter++) {
		cipher_output += get_cipher_translation(cipher_input.charAt(counter));
		add_to_frequency(cipher_input.charAt(counter).toLowerCase());
		unknown_index++;
	}
	generate_set_lists();
	document.getElementById( 'cipher-output' ).value = cipher_output;
}

function assign_key()
{
	var cipher_input = document.getElementById( 'assignment-set' ).value;
	var key_input = document.getElementById( 'assignment-to' ).value;
	if (cipher_input == '' && key_input == '' ) {
		return;
	} else if (cipher_input == '' ) {
		return;
	} else if (key_input == '' ) {
		remove_cipher_value(cipher_input);
	} else {
		remove_cipher_value(cipher_input);
		add_to_cipher_and_key(cipher_input, key_input);
	}
	update_cipher_text();
}

function add_to_cipher_and_key(cipher_value, key_value)
{
	add_to_conflicts_if_needed(cipher_value, key_value);
	assignment_set_values += cipher_value;
	assignment_to_values += key_value;
	generate_set_lists();
}

function remove_cipher_value(value)
{
	var index_of_value = assignment_set_values.indexOf(value);
	if (index_of_value != -1) {
		assignment_set_values = assignment_set_values.substring(0, index_of_value) + assignment_set_values.substring(index_of_value + 1, assignment_set_values.length);
		assignment_to_values = assignment_to_values.substring(0, index_of_value) + assignment_to_values.substring(index_of_value + 1, assignment_to_values.length);
		try_to_remove_from_conflicts(value);
		generate_set_lists();
		return true;
	}
	return false;
}

function show_matching_value(key_value)
{
	var key_index = assignment_to_values.indexOf(key_value);
	if (key_index != -1) {
		document.getElementById( 'assignment-set' ).value = assignment_set_values.charAt(key_index);
		document.getElementById( 'assignment-to' ).value = key_value;
	} else {
		document.getElementById( 'assignment-set' ).value = '';
		document.getElementById( 'assignment-to' ).value = '';
	}
	previous_assignment_set = document.getElementById( 'assignment-set' ).value;
	previous_assignment_to = document.getElementById( 'assignment-to' ).value;
	document.getElementById( 'assignment-to' ).select();
	assign_key();
}

function add_to_frequency(character)
{
	if (character == '\n' ) {
		return;
	}
	var character_frequency_index = frequency.characters.indexOf(character);
	if (character_frequency_index != -1) {
		frequency.values[character_frequency_index]++;
	} else {
		frequency.characters = frequency.characters + character;
		frequency.values[frequency.characters.length - 1] = 1;
	}
}

function get_cipher_translation(character_to_test)
{
	for (var counter = 0; counter<assignment_set_values.length; counter++) {
		if (document.getElementById( 'case_sensitive' ).checked) {
			if (assignment_set_values.charAt(counter) == character_to_test) {
				return assignment_to_values.charAt(counter);
			}
		} else {
			if (assignment_set_values.charAt(counter).toLowerCase() == character_to_test.toLowerCase()) {
				var upper_case = (character_to_test != character_to_test.toLowerCase());
				return upper_case ? assignment_to_values.charAt(counter).toUpperCase() : assignment_to_values.charAt(counter).toLowerCase();
			}
		}
	}
	if (show_current_value) {
		return character_to_test;
	}
	return get_next_unknown();
}

function get_next_unknown()
{
	var cipher_input = document.getElementById( 'cipher_input' ).value;
	if (cipher_input.charAt(unknown_index - 1) != cipher_input.charAt(unknown_index)) {
		var temporary_unknown = current_unknown;
		current_unknown = next_unknown;
		next_unknown = temporary_unknown;
	}
	return current_unknown;
}

function add_to_conflicts_if_needed(cipher_value, key_value)
{	
	if (assignment_to_values.indexOf(key_value) != -1) {
		if (assignment_to_values.indexOf(key_value) == assignment_to_values.lastIndexOf(key_value)) {
			cipher_conflicts += assignment_set_values.charAt(assignment_to_values.indexOf(key_value));
			key_conflicts += assignment_to_values.charAt(assignment_to_values.indexOf(key_value));
		}
		cipher_conflicts += cipher_value;
		key_conflicts += key_value;
	}
	generate_conflicts_list();
}

function try_to_remove_from_conflicts(cipher_value)
{
	var index_to_remove = cipher_conflicts.indexOf(cipher_value);
	if (index_to_remove != -1) {
		var corresponding_key = key_conflicts.charAt(index_to_remove);
		cipher_conflicts = cipher_conflicts.substring(0, index_to_remove)
							+ cipher_conflicts.substring(index_to_remove + 1, cipher_conflicts.length);
		key_conflicts = key_conflicts.substring(0, index_to_remove)
						+ key_conflicts.substring(index_to_remove + 1, key_conflicts.length);
		var first_key_conflict = key_conflicts.indexOf(corresponding_key);
		var last_key_conflict = key_conflicts.lastIndexOf(corresponding_key);
		if (first_key_conflict == last_key_conflict
			&& first_key_conflict != -1) {
			try_to_remove_from_conflicts(cipher_conflicts.charAt(first_key_conflict));
		}
	}
	generate_conflicts_list();
}

function generate_conflicts_list()
{
	if (cipher_conflicts == '' ) { return; }
	document.getElementById( 'conflicts_select' ).innerHTML = '';
	for (var counter = cipher_conflicts.length - 1; counter >= 0; counter--) {
		var set_character = cipher_conflicts.charAt(counter) == ' '
				? '\' \''
				: cipher_conflicts.charAt(counter);
		var to_character = key_conflicts.charAt(counter) == ' '
				? '\' \''
				: key_conflicts.charAt(counter);
		
		add_select_option( 'conflicts_select',
						  set_character
						  + ' -> '
						  + to_character,
						  counter,
						  use_set_and_to_conflicts
						 );
	}
}

function generate_set_lists()
{
	generate_set_list();
	generate_to_list();
	generate_conflicts_list();
}

function generate_set_list()
{
	var currently_selected = document.getElementById( 'assignments-select' ).value;
	document.getElementById( 'assignments-select' ).innerHTML = '';
	frequency = merge_sort_frequency(frequency);
	add_frequency_items_to_select();
	add_non_frequency_items_to_select();
	attempt_to_select_option( 'assignments-select', currently_selected);
}

function generate_to_list()
{
	if (assignment_set_values == '\n' ) { return; }
	var currently_selected_value = null;
	if (document.getElementById( 'to_list_select' ).value !== '' ) {
		currently_selected_value = document.getElementById( 'to_list_select' ).getSelected()[0].value;
	}
	document.getElementById( 'to_list_select' ).innerHTML = '';
	var cipher_array = [];
	var key_array = [];
	for (var counter = 0; counter < assignment_set_values.length; counter++) {
		cipher_array.push(assignment_set_values.charAt(counter));
		key_array.push(assignment_to_values.charAt(counter));
	}
	var to_list = new associated_arrays();
	to_list.array_to_sort = key_array.slice(1, key_array.length);
	to_list.associated_array = cipher_array.slice(1, cipher_array.length);
	to_list = to_list.merge_sort();
	add_cipher_items_to_select(to_list);
	attempt_to_select_option( 'to_list_select', currently_selected);
}

function add_frequency_items_to_select()
{
	for (var counter = frequency.characters.length - 1; counter >= 0; counter--) {
		var cipher_index = assignment_set_values.indexOf(frequency.characters.charAt(counter));
		if (cipher_index != -1) {
			var set_character = assignment_set_values.charAt(cipher_index) == ' '
								? '\' \''
								: assignment_set_values.charAt(cipher_index);
			var to_character = assignment_to_values.charAt(cipher_index) == ' '
								? '\' \''
								: assignment_to_values.charAt(cipher_index);
			
			add_select_option( 'assignments-select',
							  frequency.values[counter]
							  + ' : '
							  + set_character
							  + ' -> '
							  + to_character,
							  assignment_set_values.charAt(cipher_index),
							  use_set_and_to_list
							  );
		} else {
			add_select_option( 'assignments-select',
							  frequency.values[counter]
							  + ' : '
							  + frequency.characters.charAt(counter),
							  frequency.characters.charAt(counter),
							  use_set_and_to_list
							  );
		}
	}
}

function add_non_frequency_items_to_select()
{
	for (var counter = assignment_set_values.length - 1; counter >= 1; counter--) {
		if (frequency.characters.indexOf(assignment_set_values.charAt(counter)) == -1) {
			var set_character = assignment_set_values.charAt(counter) == ' '
								? '\' \''
								: assignment_set_values.charAt(counter);
			var to_character = assignment_to_values.charAt(counter) == ' '
									? '\' \''
									: assignment_to_values.charAt(counter);
			
			add_select_option( 'assignments-select',
							  '0 : '
							  + set_character
							  + ' -> '
							  + to_character,
							  assignment_set_values.charAt(counter),
							  use_set_and_to_list
							  );
		}
	}
}

function add_cipher_items_to_select(sorted_to_list)
{
	for (var counter = sorted_to_list.array_to_sort.length - 1; counter >= 0; counter--) {
		var to_character = sorted_to_list.array_to_sort[counter] == ' '
						   ? '\' \''
						   : sorted_to_list.array_to_sort[counter];
		var set_character = sorted_to_list.associated_array[counter] == ' '
							? '\' \''
							: sorted_to_list.associated_array[counter];
		
		add_select_option( 'to_list_select',
						  to_character
						  + ' <- '
						  + set_character,
						  sorted_to_list.array_to_sort[counter],
						  use_to_and_set_list
						  );
	}
}

function merge_sort_frequency(frequency_to_sort)
{
	if (frequency_to_sort.values.length <= 1) {
		return frequency_to_sort;
	}
	var left = new frequency_tracker();
	var right = new frequency_tracker();
	var middle_of_array = Math.floor(frequency_to_sort.values.length / 2);
	left.values = frequency_to_sort.values.slice(0, middle_of_array);
	left.characters = frequency_to_sort.characters.slice(0, middle_of_array);
	right.values = frequency_to_sort.values.slice(middle_of_array,
												  frequency_to_sort.values.length);
	right.characters = frequency_to_sort.characters.slice(middle_of_array,
														  frequency_to_sort.characters.length);
	var merged_left = merge_sort_frequency(left);
	var merged_right = merge_sort_frequency(right);
	return merge_frequency(merged_left, merged_right);
}

function merge_frequency(left, right)
{
	var merged_frequency = new frequency_tracker();
	while (left.values.length > 0 || right.values.length > 0) {
		if (left.values.length > 0 && right.values.length > 0) {
			if (left.values[0] <= right.values[0]) {
				merged_frequency.values.push(left.values.shift());
				merged_frequency.characters += left.characters.charAt(0);
				left.characters = left.characters.substring(1, left.characters.length);
			} else {
				merged_frequency.values.push(right.values.shift());
				merged_frequency.characters += right.characters.charAt(0);
				right.characters = right.characters.substring(1, right.characters.length);
			}
		} else if (left.values.length > 0) {
			merged_frequency.values = merged_frequency.values.concat(left.values);
			merged_frequency.characters += left.characters;
			break;
		} else if (right.values.length > 0) {
			merged_frequency.values = merged_frequency.values.concat(right.values);
			merged_frequency.characters += right.characters;
			break;
		}
	}
	return merged_frequency;
}

function associated_arrays()
{
	this.array_to_sort = [];
	this.associated_array = [];
	
	this.merge_sort = function()
	{
		if (this.array_to_sort.length <= 1) {
			return this;
		}
		var left = new associated_arrays();
		var right = new associated_arrays();
		var middle_of_array = Math.floor(this.array_to_sort.length / 2);
		left.array_to_sort = this.array_to_sort.slice(0, middle_of_array);
		left.associated_array = this.associated_array.slice(0, middle_of_array);
		right.array_to_sort = this.array_to_sort.slice(middle_of_array,
													   this.array_to_sort.length);
		right.associated_array = this.associated_array.slice(middle_of_array,
															 this.associated_array.length);
		var merged_left = left.merge_sort();
		var merged_right = right.merge_sort();
		return this.merge(merged_left, merged_right);
	};
	
	this.merge = function(left, right)
	{
		var merged = new associated_arrays();
		while (left.array_to_sort.length > 0 || right.array_to_sort.length > 0) {
			if (left.array_to_sort.length > 0 && right.array_to_sort.length > 0) {
				if (left.array_to_sort[0] >= right.array_to_sort[0]) {
					merged.array_to_sort.push(left.array_to_sort.shift());
					merged.associated_array.push(left.associated_array.shift());
				} else {
					merged.array_to_sort.push(right.array_to_sort.shift());
					merged.associated_array.push(right.associated_array.shift());
				}
			} else if (left.array_to_sort.length > 0) {
				merged.array_to_sort = merged.array_to_sort.concat(left.array_to_sort);
				merged.associated_array = merged.associated_array.concat(left.associated_array);
				break;
			} else if (right.array_to_sort.length > 0) {
				merged.array_to_sort = merged.array_to_sort.concat(right.array_to_sort);
				merged.associated_array = merged.associated_array.concat(right.associated_array);
				break;
			}
		}
		return merged;
	};
}

function frequency_tracker()
{
	this.characters = '';
	this.values = [];
}

function select_assignment_input() {
	var assignment_set = document.getElementById( 'assignment-set' ).value;
	var assignment_to = document.getElementById( 'assignment-to' ).value;
	if (previous_assignment_set != assignment_set) {
		if (assignment_set == '' ) {
			return;
		}
		document.getElementById( 'assignment-to' ).select();
	} else if (previous_assignment_to != assignment_to) {
		if (assignment_to == '' ) {
			return;
		}
		document.getElementById( 'assignment-set' ).select();
	}
	previous_assignment_set = assignment_set;
	previous_assignment_to = assignment_to;
}

function use_set_and_to_list()
{
	var selected_option_value = document.getElementById( 'assignments-select' ).getSelected()[0].value;
	var new_cipher_value = selected_option_value;
	var cipher_index = assignment_set_values.indexOf(selected_option_value);
	if (cipher_index != -1) {
		var new_key_value = assignment_to_values.charAt(cipher_index);
	} else {
		var new_key_value = '';
	}
	previous_assignment_set
				= document.getElementById( 'assignment-set' ).value
				= new_cipher_value;
	previous_assignment_to
				= document.getElementById( 'assignment-to' ).value
				= new_key_value;
	document.getElementById( 'assignment-to' ).value = new_key_value;
	document.getElementById( 'assignment-to' ).select();
}

function use_to_and_set_list()
{
	var selected_option_value = document.getElementById( 'to_list_select' ).getSelected()[0].value;
	var key_index = assignment_to_values.indexOf(selected_option_value);
	var new_key_value = selected_option_value;
	var new_cipher_value = assignment_set_values.charAt(key_index);
	previous_assignment_set
				= document.getElementById( 'assignment-set' ).value
				= new_cipher_value;
	previous_assignment_to
				= document.getElementById( 'assignment-to' ).value
				= new_key_value;
	document.getElementById( 'assignment-to' ).select();
}

function use_set_and_to_conflicts()
{
	var selected_option_value = document.getElementById( 'conflicts_select' ).getSelected()[0].value;
	var new_cipher_value = cipher_conflicts.charAt(selected_option_value);
	var new_key_value = key_conflicts.charAt(selected_option_value);
	previous_assignment_set
				= document.getElementById( 'assignment-set' ).value
				= new_cipher_value;
	previous_assignment_to
				= document.getElementById( 'assignment-to' ).value
				= new_key_value;
	document.getElementById( 'assignment-to' ).select();
}

function change_unknowns()
{
	first_unknown = current_unknown = document.getElementById( 'first_unknown' ).value;
	second_unknown = next_unknown = document.getElementById( 'second_unknown' ).value;
	if (first_unknown == '' ) {
		document.getElementById( 'first_unknown' ).value = first_unknown
													   = previous_first_unknown;
		document.getElementById( 'first_unknown' ).select();
	} else if (second_unknown == '' ) {
		document.getElementById( 'second_unknown' ).value = second_unknown
														= previous_second_unknown;
		document.getElementById( 'second_unknown' ).select();
	}
	update_cipher_text();
}

function toggle_show_current_value()
{
	show_current_value = ! show_current_value;
	if (show_current_value) {
		document.getElementById( 'show_current_value_button' ).value = 'Hide Current Value';
	} else {
		document.getElementById( 'show_current_value_button' ).value = 'Show Current Value';
	}
	update_cipher_text();
	document.getElementById( 'assignment-set' ).select();
}

function continuous_cycle()
{
	if (document.getElementById( 'continuous_cycle' ).checked) {
		start_continuous_cycle();
	} else {
		stop_continuous_cycle();
	}
}

function start_continuous_cycle()
{
	previous_first_unknown = document.getElementById( 'first_unknown' ).value;
	previous_second_unknown = document.getElementById( 'second_unknown' ).value;
	next_continuous_cycle();
}
function stop_continuous_cycle()
{
	clearTimeout(continuous_cycle_timeout);
	first_unknown = current_unknown = previous_first_unknown;
	second_unknown = next_unknown = previous_second_unknown;
	document.getElementById( 'first_unknown' ).value = previous_first_unknown;
	document.getElementById( 'second_unknown' ).value = previous_second_unknown;
	update_cipher_text();
}

function next_continuous_cycle()
{
	continuous_cycle_index++;
	if (continuous_cycle_index == continuous_cycle_values.length) {
		continuous_cycle_index = 0;
	}
	first_unknown = current_unknown
					= document.getElementById( 'first_unknown' ).value
					= continuous_cycle_values.charAt(continuous_cycle_index);
	second_unknown = next_unknown
					= document.getElementById( 'second_unknown' ).value
					= continuous_cycle_values.charAt(
						(continuous_cycle_index - 2 < 0
						 ? continuous_cycle_index + 2
						 : continuous_cycle_index - 2)
					  );
	update_cipher_text();
	continuous_cycle_timeout = setTimeout( 'next_continuous_cycle();', continuous_cycle_time);
}

function cycle_faster()
{
	continuous_cycle_time -= 50;
	if (continuous_cycle_time == 50) {
		document.getElementById( 'cycle_faster_button' ).style.display = 'none';
	}
}
function cycle_slower()
{
	continuous_cycle_time += 50;
	if (continuous_cycle_time > 50) {
		document.getElementById( 'cycle_faster_button' ).style.display = 'inline';
	}
}

function show_save_cipher()
{
	document.getElementById( 'save_input' ).value = assignment_set_values.substring(1, assignment_set_values.length)
		+ assignment_to_values.substring(1, assignment_to_values.length);
	document.getElementById( 'save_input' ).select();
}
//TODO: Save and load have been combined
function load_cipher_value()
{
	var load_input = document.getElementById( 'load_input' ).value;
	if (load_input.length % 2 == 0) {
		var load_input_length = load_input.length;
		assignment_set_values = '\n' + load_input.substring(load_input, load_input_length / 2);
		assignment_to_values = '\n' + load_input.substring(load_input_length / 2, load_input_length);
		document.getElementById( 'input_comment' ).innerHTML = '';
		generate_set_lists();
		reset_conflicts();
		generate_conflicts_list();
		update_cipher_text();
		document.getElementById( 'assignment-set' ).select();
	} else {
		document.getElementById( 'input_comment' ).innerHTML = 'Corrupt load input.';
	}
}
function check_load_for_enter(event)
{
	var event_value = event.keyCode;
	if (event_value == 13) {
		load_cipher_value();
	}
}

function reset_conflicts()
{
	cipher_conflicts = key_conflicts = '';
	for (var counter = 1; counter < assignment_set_values.length; counter++) {
		var current_key = assignment_to_values.charAt(counter);
		if (assignment_set_values.indexOf(current_key) != counter) {
			var first_key_conflict = key_conflicts.indexOf(current_key);
			if (first_key_conflict == -1) {
				var first_key_index = assignment_to_values.indexOf(current_key);
				cipher_conflicts += assignment_set_values.charAt(first_key_index);
				key_conflicts += assignment_to_values.charAt(first_key_index);
			}
			cipher_conflicts += assignment_set_values.charAt(counter);
			key_conflicts += assignment_to_values.charAt(counter);
		}
	}
}

function add_select_option(select_id, text, value, onclick_function)
{
	var new_option = new Option(text, value);
	//new_option.onclick = onclick_function;
	try {
		document.getElementById(select_id).add(new_option, null);
	} catch (err) {
		document.getElementById(select_id).add(new_option);
	}
}

function attempt_to_select_option(select_id, value)
{
	if ( ! value) {
		return;
	}
	var select_object = document.getElementById(select_id);
	for (var counter = 0;
		 counter < select_object.options.length;
		 counter++) {
		if (select_object.options[counter].value == value) {
			select_object.options[counter].selected = true;
			break;
		}
	}
}

function check_for_hot_key(event)
{
	var event_key_code = event.keyCode;
	if (event_key_code == 27) { //escape
		toggle_escape_pressed();
	} else if (escape_pressed) {
		if (event_key_code == 83) { //s
			toggle_show_current_value();
		}
		toggle_escape_pressed();
		return false;
	}
	return true;
}

function toggle_escape_pressed()
{
	if (escape_pressed) {
		document.title = 'Manual Cipher Decoder';
	} else {
		document.title = 'Manual Cipher Decoder (Press a Key)';
	}
	escape_pressed = ! escape_pressed;
}

function toggle_instructions()
{
	var instructions_block = $( '#instructions' );
	if ( instructions_block.hasClass( 'display-none' ) ) {
		instructions_block.removeClass( 'display-none' );
	} else {
		instructions_block.addClass( 'display-none' );
	}
}


$( window ).keydown( check_for_hot_key );

$( '#cipher-input' )
	.keydown( update_cipher_text )
	.keyup( update_cipher_text );
$( '#assignment-set' )
	.focus( function() { this.select(); } )
	.keyup( function() { assign_key(); select_assignment_input(); } );
$( '#assignment-to' )
	.focus( function() { this.select(); } )
	.keyup( function() { assign_key();select_assignment_input(); } );
$( '#assignments-select' ).change( use_set_and_to_list );
$( '#to_list_select' ).change( use_to_and_set_list );
$( '#conflicts_select' ).change( use_set_and_to_conflicts );
$( '#first_unknown' )
	.focus( function() { this.select(); } )
	.keyup( change_unknowns );
$( '#second_unknown' )
	.focus( function() { this.select(); } )
	.keyup( change_unknowns );
$( '#show_current_value_button' ).click( toggle_show_current_value );
$( '#instructions_button' ).click( toggle_instructions );
$( '#cycle_slower_button' ).click( cycle_slower );
$( '#cycle_faster_button' ).click( cycle_faster );
$( '#case_sensitive' ).click( update_cipher_text );
$( '#continuous_cycle' ).click( continuous_cycle );


document.getElementById( 'first_unknown' ).value = first_unknown;
document.getElementById( 'second_unknown' ).value = second_unknown;
document.getElementById( 'assignment-set' ).value = '';
document.getElementById( 'assignment-to' ).value = '';
document.getElementById( 'continuous_cycle' ).checked = false;
document.getElementById( 'cipher-input' ).focus();
update_cipher_text();
generate_set_lists();

/**
 * Case sensitive should matter when setting and when generating drop down lists
 * Make onclick on the select options work
 * Make onpaste work
 * Make text areas content editable divs
 */