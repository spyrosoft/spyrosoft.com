encrypt_mode();

$('#encrypt-button').click(function() {try {encrypt();} catch(error) {alert(error);}});
$('#decrypt-button').click(function() {try {decrypt();} catch(error) {alert(error);}});

$('#encrypt-mode-button').click(encrypt_mode);
$('#decrypt-mode-button').click(decrypt_mode);

var BASE64_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function encrypt() {
	var plain_text = btoa($('#plain-text-input').val());
	var cipher_text = '';
	var key = '';
	for (var i in plain_text) {
		var current_character_index = BASE64_CHARACTERS.indexOf(plain_text[i]);
		var random_character_index
			= Math.abs(sjcl.random.randomWords(1, 10))
				% BASE64_CHARACTERS.length;
		var random_character = BASE64_CHARACTERS[random_character_index];
		var cipher_index = current_character_index + random_character_index;
		if (cipher_index >= BASE64_CHARACTERS.length) {
			cipher_index -= BASE64_CHARACTERS.length;
		}
		cipher_text += BASE64_CHARACTERS[cipher_index];
		key += random_character;
	}
	$('#cipher-text').val(cipher_text);
	$('#key').val(key);
}

function decrypt() {
	var cipher_text = $('#cipher-text').val();
	var key = $('#key').val();
	if (cipher_text.length !== key.length) {
		alert('The Encrypted Message and Key are not the same length.');
	}
	var plain_text = '';
	for (var i in cipher_text) {
		var current_character_index = BASE64_CHARACTERS.indexOf(cipher_text[i]);
		var cipher_index = BASE64_CHARACTERS.indexOf(key[i]);
		if (isNaN(cipher_index)) {break;}
		var plain_text_index = current_character_index - cipher_index;
		if (plain_text_index < 0) {
			plain_text_index += BASE64_CHARACTERS.length;
		}
		plain_text += BASE64_CHARACTERS[plain_text_index];
	}
	$('#plain-text-output').val(atob(plain_text));
}

function encrypt_mode() {
	$('#plain-text-input-container, #decrypt-mode-button').show();
	$('#plain-text-output-container, #encrypt-mode-button').hide();
}

function decrypt_mode() {
	$('#plain-text-output-container, #encrypt-mode-button').show();
	$('#plain-text-input-container, #decrypt-mode-button').hide();
}