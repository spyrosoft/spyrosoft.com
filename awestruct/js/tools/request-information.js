$.post( '/what-is-my-ip-address/' ).success(
	function( response_data ) {
		$( '#output' ).html( 'IP Address: ' + response_data );
	}
);