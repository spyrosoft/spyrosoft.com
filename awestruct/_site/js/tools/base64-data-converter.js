$('#base64-or-data').focus();

$('#encode').click(encode);
$('#decode').click(decode);

function encode() {
	if (typeof btoa === 'undefined') {
		alert('Your browser does not support base64 conversion.');
		return;
	}
	$('#base64-or-data').val(btoa($('#base64-or-data').val()));
}

function decode() {
	if (typeof atob === 'undefined') {
		alert('Your browser does not support base64 conversion.');
		return;
	}
	$('#base64-or-data').val(atob($('#base64-or-data').val()));
}