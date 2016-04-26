var color="";

function newColor(color) {
	color = color.toUpperCase();
	if ( color.match( /^[0-9|A-F]+$/ ) && ( color.length === 3 || color.length === 6 ) ) {
		color = '#' + color;
	}
	document.body.style.backgroundColor=color;
	document.getElementById("color").select();
}

function eCheck(event) {
	var val=event.keyCode;
	if(val==13) {
		deleteObtrusivePageElements();
		document.body.style.backgroundImage="none";
		color=document.getElementById("color").value;
		newColor(color);
	}
}

function deleteObtrusivePageElements() {
	$( 'footer, section h2, section hr' ).remove();
}

$( '#color' ).keydown( eCheck ).select();