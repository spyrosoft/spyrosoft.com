$('form.contact').submit( contact_form_submission );

function contact_form_submission( submission_event )
{
	submission_event.preventDefault();
	var contact_submission_name = $( 'form.contact [name=name]' ).val();
	var contact_submission_subject = $( 'form.contact [name=subject]' ).val();
	var contact_submission_email = $( 'form.contact [name=email]' ).val();
	var contact_submission_message = $( 'form.contact [name=message]' ).val();
	if ( contact_submission_message === '' )
	{
		alert( 'The Message field is required.' );
		$( 'form.contact [name=message]' ).focus();
		return;
	}
	var contact_sumbission_object = new Object;
	contact_sumbission_object[ 'name' ] = contact_submission_name;
	contact_sumbission_object[ 'subject' ] = contact_submission_subject;
	contact_sumbission_object[ 'email' ] = contact_submission_email;
	contact_sumbission_object[ 'message' ] = contact_submission_message;
	$.post( '/contact-ajax/', contact_sumbission_object )
		.done(
			function() {
				$( 'form.contact [name=name]' ).val( '' );
				$( 'form.contact [name=subject]' ).val( '' );
				$( 'form.contact [name=email]' ).val( '' );
				$( 'form.contact [name=message]' ).val( '' );
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
				} catch ( error ) { alert( 'Invalid JSON Response.' ); }
			}
		)
		.fail(
			function() {
				alert( 'Connection with the server failed. Please check your internet connection. Otherwise, something is wrong on our end - please try again later.' );
			}
		);
}

document.getElementsByName('name')[0].focus();