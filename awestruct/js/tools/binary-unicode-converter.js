function convert() {
	if (document.getElementById('binary_input').checked) {
		convert_binary_to_unicode();
	} else {
		convert_unicode_to_binary();
	}
}

function convert_binary_to_unicode() {
	var binary_input = document.getElementById('input').value;
	if (binary_input.length % 8 != 0) {
		return;
	}
	var unicode_output = '';
	
	for (var counter = 0; counter < binary_input.length; counter += 8) {
		unicode_output += String.fromCharCode(parseInt(binary_input.substring(counter, counter + 8), 2));
	}
	
	document.getElementById('output').value = unicode_output;
}

function convert_unicode_to_binary() {
	var unicode_input = document.getElementById('input').value;
	if (unicode_input.length == 0) {
		return;
	}
	var binary_output = '';
	
	for (var counter = 0; counter < unicode_input.length; counter++) {
		var binary = unicode_input.charCodeAt(counter).toString(2);
		if (binary.length > 8) {
			binary_output += '00111111';
			continue;
		}
		while (binary.length < 8) {
			binary = '0' + binary;
		}
		binary_output += binary;
	}
	
	document.getElementById('output').value = binary_output;
}

document.getElementById('input').select();
$( '.radios label' ).click(
	function() {
		document.getElementById('input').select();
	}
);