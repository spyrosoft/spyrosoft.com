var previous_start_range_input;
var previous_limit_range_input;

function text_input_changed(event)
{
	if (enter_key_pressed(event)) {
		decode_input();
	}
}

function decode_input()
{
	hide_message();
	hide_next_and_last_buttons();
	var display_output = '';
	var text_input = document.getElementById('text_input').value;
	for (var i = 0; i <= text_input.length - 1; i++) {
		display_output
			+= '<p>'
			+ text_input.charAt(i)
			+ ' => '
			+ text_input.charCodeAt(i)
			+ '</p>';
	}
	document.getElementById('display_output').innerHTML = display_output;
	document.getElementById('text_input').select();
}

function number_input_changed(event)
{
	if (enter_key_pressed(event)) {
		encode_input();
	}
}

function encode_input() {
	hide_message();
	hide_next_and_last_buttons();
	var display_output = '';
	var compilation = '';
	var number_input = document.getElementById('number_input').value.split(' ');
	for (var i = 0; i < number_input.length; i++) {
		if ( ! isNaN(number_input[i]) && parseInt(number_input[i]).toString() == number_input[i]) {
			display_output
				+= '<p>'
				+ number_input[i]
				+ ' => '
				+ String.fromCharCode(parseInt(number_input[i]))
				+ '</p>';
			compilation += String.fromCharCode(parseInt(number_input[i]));
		} else {
			show_message('Some of the input was not in the form of a number.');
		}
	}
	display_output += '<p>' + compilation + '</p>';
	document.getElementById('display_output').innerHTML = display_output;
	document.getElementById('number_input').select();
}

function start_range_text_changed(event)
{
	if (enter_key_pressed(event)) {
		display_range();
	} else {
		var start_range_input = document.getElementById('start_range_input').value;
		if (start_range_input != previous_start_range_input && parseInt(start_range_input).toString() == start_range_input) {
			var limit_range_input = parseInt(start_range_input) + 10;
			document.getElementById('limit_range_input').value = limit_range_input;
			previous_start_range_input = start_range_input;
		}
	}
}

function limit_range_text_changed(event)
{
	if (enter_key_pressed(event)) {
		display_range();
	}
}

function display_range()
{
	var display_output = '';
	hide_message();
	var start_range_input = document.getElementById('start_range_input').value;
	var limit_range_input = document.getElementById('limit_range_input').value;
	var start_range_messages = '';
	var limit_range_messages = '';
	if (start_range_input == '') {
		start_range_messages += '<p>Enter the number you would like to go up to in the "Start from" text box.</p>';
	}
	if (limit_range_input == '') {
		limit_range_messages += '<p>Enter the number you would like to go up to in the "limit_range_input" text box.</p>';
	}
	if (isNaN(start_range_input)) {
		start_range_messages += '<p>Enter an integer you would like to start your range at.</p>';
	}
	if (isNaN(limit_range_input)) {
		limit_range_messages += '<p>Enter an integer you would like to limit your range to.</p>';
	}
	start_range_input = parseInt(start_range_input);
	limit_range_input = parseInt(limit_range_input);
	document.getElementById('start_range_input').value = start_range_input;
	document.getElementById('limit_range_input').value = limit_range_input;
	if (start_range_input < limit_range_input - 10000) {
		limit_range_messages += '<p>A range this large will crash your browser. Please decrease your range.</p>';
	}
	if (start_range_input < limit_range_input - 1500) {
		if( ! confirm('Are you sure? This is a very large range.')) {
			return;
		}
	}
	if (start_range_input < 0) {
		start_range_messages += '<p>The starting number must be greater than or equal to zero.</p>';
	}
	if (limit_range_input < 0) {
		limit_range_messages += '<p>The range limit must be greater than or equal to zero.</p>';
	}
	if (start_range_input > limit_range_input) {
		limit_range_messages += '<p>The range limit must be greater than or equal to the initial range value.</p>';
	}
	if (start_range_messages != '') {
		show_message(start_range_messages);
		document.getElementById('start_range_input').focus();
		return;
	}
	if (limit_range_messages != '') {
		show_message(limit_range_messages);
		document.getElementById('limit_range_input').focus();
		return;
	}
	for (var i = start_range_input; i <= limit_range_input; i++) {
		display_output
			+= '<p>'
			+ i
			+ ' &#'
			+ i
			+';</p>';
	}
	previous_start_range_input = start_range_input;
	previous_limit_range_input = limit_range_input;
	document.getElementById('display_output').innerHTML = display_output;
	show_next_and_last_buttons();
}

function display_range_last()
{
	var range_difference = previous_limit_range_input - previous_start_range_input;
	var new_start_range_input = previous_start_range_input - range_difference;
	if (new_start_range_input < 0) {
		new_start_range_input = 0;
	}
	var new_limit_range_input = previous_limit_range_input - range_difference;
	if (new_limit_range_input < 0) {
		new_limit_range_input = 0;
	}
	document.getElementById('start_range_input').value = new_start_range_input;
	document.getElementById('limit_range_input').value = new_limit_range_input;
	display_range();
}

function display_range_next()
{
	var range_difference = previous_limit_range_input - previous_start_range_input;
	var new_start_range_input = previous_start_range_input + range_difference;
	var new_limit_range_input = previous_limit_range_input + range_difference;
	document.getElementById('start_range_input').value = new_start_range_input;
	document.getElementById('limit_range_input').value = new_limit_range_input;
	display_range();
}

function change_font()
{
	document.getElementById('display_output').style.fontFamily = document.getElementById( 'font-family' ).value;
}

function change_font_size(new_font_size)
{
	document.getElementById('display_output').style.fontSize = new_font_size + 'px';
}

function enter_key_pressed(event)
{
	var key_code = event.keyCode;
	if (key_code == 13) {
		return true;
	} else {
		return false;
	}
}

function hide_message()
{
	document.getElementById('message').style.display = 'none';
}

function show_message(message)
{
	document.getElementById('message').style.display = 'block';
	document.getElementById('message').innerHTML = message;
}

function hide_next_and_last_buttons()
{
	document.getElementById('next_and_last_buttons').style.display = 'none';
}

function show_next_and_last_buttons()
{
	document.getElementById('next_and_last_buttons').style.display = 'block';
}

document.getElementById('text_input').select();
document.getElementById('font_size')[5].selected = 'selected';