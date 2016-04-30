window.addEventListener( 'keydown', lookUpKeyCode );

function lookUpKeyCode( keyEvent ) {
	hide_instructions();
	if ( ! keyEvent.ctrlKey ) {
		keyEvent.preventDefault();
	}
	var keyCode = keyEvent.keyCode;
	document.getElementById( 'output' ).innerHTML = keyCode;
	console.log( keyEvent );
}

function hide_instructions() {
	document.getElementById( 'instructions' ).style.display = 'none';
	document.getElementById( 'output' ).style.display = 'block';
}