$.post( '/print-request/' ).success(
	function( response_data ) {
		$( '#output' ).html( 'IP Address: ' + response_data );
	}
);