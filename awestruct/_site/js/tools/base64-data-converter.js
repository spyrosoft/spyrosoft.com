$('#base64-or-data').focus();

$('#to-data').click(to_data);
$('#to-base64').click(to_base64);

function to_data() {
	if (typeof btoa === 'undefined') {
		alert('Your browser does not support base64 conversion.');
		return;
	}
	$('#base64-or-data').val(btoa($('#base64-or-data').val()));
}

function to_base64() {
	if (typeof atob === 'undefined') {
		alert('Your browser does not support base64 conversion.');
		return;
	}
	$('#base64-or-data').val(atob($('#base64-or-data').val()));
}