$( 'form.ajax' ).submit( form_ajax_submission );

var form_to_reset;

function form_ajax_submission( submit_event ) {
	submit_event.preventDefault();
	form_to_reset = this;
	var post_data = $( this ).serialize();
	if ( typeof ajax_form_token ) {
		post_data += '&token=' + ajax_form_token;
	}
	$.post( $( this ).attr( 'action' ), post_data )
		.success( ajax_form_success )
		.fail( ajax_form_failure );
}

function ajax_form_success( response_data ) {
	try {
		var response_json = JSON.parse( response_data );
		if ( response_json[ 'success' ] === true ) {
			if ( typeof ajax_form_success_message ) {
				alert( ajax_form_success_message );
			} else {
				alert( 'Thank you, your form has been submitted successfully' );
			}
			if ( typeof ajax_form_redirect_url !== 'undefined' ) {
				window.location = ajax_form_redirect_url;
			} else {
				form_to_reset.reset();
			}
		} else {
			if ( response_json[ 'message' ] ) {
				alert( 'Something went wrong. The server responded with the following error: ' + response_json[ 'message' ] );
			} else {
				alert( 'Something went wrong. If you know Bennett, please contact him and tell him.' );
			}
		}
	} catch ( error ) { alert( 'Something went wrong. Please contact Bennett by some other means and tell him that there was an invalid JSON response.' ); }
}

function ajax_form_failure() {
	alert( 'Connection with the server failed. Please check your internet connection. Otherwise, something is wrong on our end - please try again later.' );
}