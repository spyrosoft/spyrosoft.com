var morse_code = new Array(".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--..","-----",".----","..---","...--","....-",".....","-....","--...","---..","----.",".-.-.-","--..--","..--..",".----.","-.-.--","-..-.","-.--.","-.--.-",".-...","---...","-.-.-.","-....-",".-.-.","-.....-","..--.-",".-..-.","...-..-",".--.-.",'\n',"");

var english_characters = new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9",".",",","?","'","!","/","(",")","&",":",";","=","+","-","_",'"',"$","@",'\n'," ");

function translate() {
	var input;
	var output = "";
	var trailing_spaces = 0;
	
	if (document.getElementById('to_text').checked) {
		input = document.getElementById("input").value;
		if (input.length == 0) {
			document.getElementById("output").value = "";
			return;
		}
		while (input.substring(input.length - 1, input.length) == " ") {
			input = input.substring(0, input.length - 1);
			trailing_spaces++;
		}
		var translation;
		if (input.indexOf(" ") != -1) {
			translation = input.split(" ");
		} else {
			translation = new Array(input);
		}
		for (var i = 0; i < translation.length; i++) {
			var index_match = morse_code.indexOf(translation[i]);
			if (index_match == -1) {
				output += "[????]";
			} else {
				output += english_characters[index_match];
			}
		}
		while (trailing_spaces > 0) {
			output += " ";
			trailing_spaces--;
		}
	} else if (document.getElementById('to_morse_code').checked) {
		input = document.getElementById("input").value.toUpperCase();
		for (var character_counter = 0; character_counter < input.length; character_counter++) {
			var index_match = english_characters.indexOf(input.charAt(character_counter));
			if (index_match == -1) {
				output+="[????] ";
			} else {
				output += morse_code[index_match] + " ";
			}
		}
		output = output.substring(0, output.length - 1);
	}
	document.getElementById("output").value = output.toLowerCase();
}

function switch_input_and_output() {
	var temporary_input = document.getElementById('input').value;
	document.getElementById('input').value = document.getElementById('output').value;
	document.getElementById('output').value = temporary_input;
	document.getElementById('input').select();
}

if( ! Array.prototype.indexOf) {
	Array.prototype.indexOf = function(item) {
		for (var counter = 0; counter < this.length; counter++) {
			if (this[counter] == item) {
				return counter;
			}
		}
		return -1;
	};
}

document.getElementById("input").select();

$( '#input' ).keyup( translate );
$( '#output' ).focus( function() { this.select(); } );
$( '#to_morse_code' ).click( switch_input_and_output );
$( '#to_text' ).click( switch_input_and_output );