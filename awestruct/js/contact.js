$('form.contact').submit( contact_form_submission );

function contact_form_submission( submission_event ) {
	submission_event.preventDefault();
	var contact_sumbission = {
		'name' : $( 'form.contact [name=name]' ).val(),
		'subject' : $( 'form.contact [name=subject]' ).val(),
		'email' : $( 'form.contact [name=email]' ).val(),
		'message' : $( 'form.contact [name=message]' ).val()
	};
	if ( contact_sumbission[ 'message' ] === '' ) {
		alert( 'The Message field is required.' );
		$( 'form.contact [name=message]' ).focus();
		return;
	}
	$.post( '/contact-ajax/', contact_sumbission )
		.done(
			function() {
				$( 'form.contact' )[0].reset();
			}
		)
		.success(
			function( response_data ) {
				var response_json;
				try {
					response_json = JSON.parse( response_data );
					if ( response_json[ 'success' ] ) {
						alert( 'Thank you for your message.'  );
					} else {
						alert( 'Something went wrong. Please contact Bennett by some other means and tell him.' );
					}
				} catch ( error ) { alert( 'Something went wrong. Please contact Bennett by some other means and tell him that there was an invalid JSON response.' ); }
			}
		)
		.fail(
			function() {
				alert( 'Connection with the server failed. Please check your internet connection. Otherwise, something is wrong on our end - please try again later.' );
			}
		);
}

document.getElementsByName('name')[0].focus();