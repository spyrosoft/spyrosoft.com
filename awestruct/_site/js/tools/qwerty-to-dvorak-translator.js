var previous_input = '';
var dvorak = "',.pyfgcrl/=aoeuidhtns-;qjkxbmwvz[]\"<>PYFGCRL?+AOEUIDHTNS_:QJKXBMWVZ{} ";
var qwerty = "qwertyuiop[]asdfghjkl;'zxcvbnm,./-=QWERTYUIOP{}ASDFGHJKL:\"ZXCVBNM<>?_+ ";

function input_changed()
{
	var input = document.getElementById('input').value;
	if (input == previous_input) {
		return;
	}
	var input_length_difference = input.length - previous_input.length;
	if (input_length_difference >= 0) {
		switch_characters(input, input_length_difference);
	}
	previous_input = document.getElementById('input').value;
}

function switch_characters(input, input_length_difference)
{
	var cursor_position = get_cursor_position();
	var selection_length = get_selection_length();
	var index_of_change = find_index_of_change(input);
	var text_to_change = input.substring(index_of_change, index_of_change + input_length_difference);
	var changed_text = translate_text(text_to_change);
	var output = input.substring(0, index_of_change)
		+ changed_text
		+ input.substring(index_of_change+changed_text.length,input.length);
	document.getElementById('input').value = output;
	set_cursor_position(cursor_position);
}

function find_index_of_change(input)
{
	for (var i = 0; i < input.length; i++) {
		if (input.charAt(i) != previous_input.charAt(i)) {
			return i;
		}
	}
	return 0;
}

function translate_text(text)
{
	var new_text = '';
	for (var i = 0; i < text.length; i++) {
		var index_match;
		if (document.getElementsByName('dvorak-or-qwerty')[0].checked) {
			index_match = qwerty.indexOf(text.charAt(i));
			new_text += dvorak.substring(index_match, index_match + 1);
		} else {
			index_match = dvorak.indexOf(text.charAt(i));
			new_text += qwerty.substring(index_match, index_match + 1);
		}
	}
	return new_text;
}

function get_cursor_position()
{
	if (document.getElementById('input').selectionStart) {
		return document.getElementById('input').selectionStart;
	}
	return 0;
}

function set_cursor_position(position)
{
	if(document.getElementById('input').selectionStart) {
		document.getElementById('input').selectionStart = position;
		document.getElementById('input').selectionEnd = position;
	}
}

function get_selection_length()
{
	if (document.getElementById('input').selectionStart) {
		var start = document.getElementById('input').selectionStart;
		var end = document.getElementById('input').selection;
		return end - start;
	}
	return 0;
}

function translate_again()
{
	previous_input = '';
	input_changed();
}

document.getElementById('input').focus();

document.getElementById('translate').addEventListener('click', translate_again, false);