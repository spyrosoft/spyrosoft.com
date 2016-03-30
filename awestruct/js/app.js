$(document).foundation();

if ( document.getElementById('this-year') ) {
	var date_today = new Date();
	document.getElementById('this-year').innerHTML = date_today.getFullYear();
}

$('.contact form').submit( contact_form_submission );

function contact_form_submission( submission_event )
{
	submission_event.preventDefault();
	var contact_submission_name = $( '.contact form [name=name]' ).val();
	var contact_submission_subject = $( '.contact form [name=subject]' ).val();
	var contact_submission_email = $( '.contact form [name=email]' ).val();
	var contact_submission_message = $( '.contact form [name=message]' ).val();
	if ( contact_submission_message === '' )
	{
		alert( 'The Message field is required.' );
		$( '.contact form [name=message]' ).focus();
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
				$( '.contact form [name=name]' ).val( '' );
				$( '.contact form [name=subject]' ).val( '' );
				$( '.contact form [name=email]' ).val( '' );
				$( '.contact form [name=message]' ).val( '' );
			}
		)
		.success(
			function( response_data ) {
				var response_json;
				try {
					response_json = JSON.parse( response_data );
					if ( response_json[ 'success' ] ) {
						alert( 'We got your message. Thank you for your contact.'  );
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