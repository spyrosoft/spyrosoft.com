var variables = [];
var variable_values = [];

if ( test_browser_compatibility() ) {
	document.getElementById( 'add-new-variable' ).addEventListener( 'click', add_new_variable );
	document.getElementById( 'new-variable' ).addEventListener( 'keydown', focus_new_value );
	document.getElementById( 'new-value' ).addEventListener( 'keydown', add_new_variable_on_enter );
	document.getElementById( 'submit-button' ).addEventListener( 'click', submit_form );
	document.getElementById( 'save-or-load-data-textarea' ).addEventListener( 'keydown', load_save_data_on_enter );
	document.getElementById( 'load-data-button' ).addEventListener( 'click', load_save_data );
	document.getElementById( 'where-to-send-the-data' ).addEventListener( 'keyup', focus_new_variable );
} else {
	alert( 'I\'m afraid your browser isn\'t supported, sorry!' );
}

document.getElementById( 'where-to-send-the-data' ).select();

function add_new_variable()
{
	var variable_name = document.getElementById( 'new-variable' ).value;
	if ( variable_name == '' ) {
		alert( 'Please enter a variable name' );
		return;
	}
	
	var variable_value = document.getElementById( 'new-value' ).value;
	
	var index_of_existing_variable_name = variables.indexOf( variable_name );
	if ( index_of_existing_variable_name >= 0 ) {
		variable_values[ index_of_existing_variable_name ] = variable_value;
	} else {
		variables.push( variable_name );
		variable_values.push( variable_value );
	}
	
	document.getElementById( 'new-variable' ).value = '';
	document.getElementById( 'new-value' ).value = '';
	refresh_variables_display();
	
	generate_save_data();
	
	document.getElementById( 'new-variable' ).select();
}

function refresh_variables_display()
{
	document.getElementById( 'variables-display' ).innerHTML = '';
	
	for ( var variable_index = 0; variable_index < variables.length; variable_index++ ) {
		var new_row = document.createElement( 'div' );
		new_row.className = 'bordered';
		
		var new_variable = document.createElement( 'h4' );
		new_variable.className = 'scroll';
		var new_variable_text_node = document.createTextNode( variables[ variable_index ] );
		new_variable.appendChild( new_variable_text_node );
		new_row.appendChild( new_variable );
		
		var new_variable_value = document.createElement( 'p' );
		new_variable_value.className = 'scroll';
		new_variable_value.innerHTML = variable_values[ variable_index ].replace( /\n/g, '<br />' );
		new_row.appendChild( new_variable_value );
		
		var new_delete_row_button = document.createElement( 'div' );
		
		var delete_this_row_node = document.createElement( 'input' );
		delete_this_row_node.type = 'button';
		delete_this_row_node.className = 'button no-margin';
		delete_this_row_node.value = 'Delete';
		delete_this_row_node.onclick = delete_this_row;
		new_delete_row_button.appendChild( delete_this_row_node );
		
		var delete_this_variable_node = document.createElement( 'input' );
		delete_this_variable_node.type = 'hidden';
		delete_this_variable_node.name = variables[ variable_index ];
		delete_this_variable_node.value = variable_values[ variable_index ];
		
		new_delete_row_button.appendChild( delete_this_variable_node );
		new_row.appendChild( new_delete_row_button );
		
		document.getElementById( 'variables-display' ).appendChild( new_row );
	}
}

function delete_this_row()
{
	var variable_to_remove = this.parentNode.childNodes[ 1 ].name;
	var index_of_variable_to_remove = variables.indexOf( variable_to_remove );
	variables.splice( index_of_variable_to_remove, 1 );
	variable_values.splice( index_of_variable_to_remove, 1 );
	
	var node_to_remove = this.parentNode.parentNode;
	this.parentNode.parentNode.parentNode.removeChild( node_to_remove );
	
	generate_save_data();
}

function submit_form()
{
	var where_to_send_the_data = document.getElementById( 'where-to-send-the-data' ).value;
	if ( where_to_send_the_data == '' ) {
		alert( 'Please fill out where to send the data.' );
		return;
	} else {
		document.getElementById( 'arbitrary-data-form' ).action = where_to_send_the_data;
	}
	if ( document.getElementById( 'post-for-post-or-get' ).checked ) {
		document.getElementById( 'arbitrary-data-form' ).method = 'post';
	} else {
		document.getElementById( 'arbitrary-data-form' ).method = 'get';
	}
	document.getElementById( 'arbitrary-data-form' ).submit();
}

function generate_save_data()
{
	var where_to_send_the_data = document.getElementById( 'where-to-send-the-data' ).value;
	var save_data = {
		'where-to-send-the-data' : where_to_send_the_data,
		'variables' : variables,
		'variable_values' : variable_values
	};
	document.getElementById( 'save-or-load-data-textarea' ).value = JSON.stringify( save_data );
}

function load_save_data()
{
	var data_textarea_value = document.getElementById( 'save-or-load-data-textarea' ).value;
	try {
		var load_data = JSON.parse( data_textarea_value );
	} catch ( error ) {
		alert( 'Please enter valid data to be loaded.' );
		return;
	}
	if ( ! load_data[ 'where-to-send-the-data' ] ) {
		alert( 'The URL is missing from the load data.' );
		return;
	}
	if ( ! load_data[ 'variables' ] ) {
		alert( 'The variables are missing from the load data.' );
		return;
	}
	if ( ! load_data[ 'variable_values' ] ) {
		alert( 'The variable values are missing from the load data.' );
		return;
	}
	
	document.getElementById( 'where-to-send-the-data' ).value = load_data[ 'where-to-send-the-data' ];
	variables = load_data[ 'variables' ];
	variable_values = load_data[ 'variable_values' ];
	refresh_variables_display();
}

function load_save_data_on_enter( key_event )
{
	if ( test_for_enter( key_event ) ) {
		key_event.preventDefault();
		load_save_data();
	}
}

function focus_new_value( event )
{
	if ( test_for_enter( event ) ) {
		event.preventDefault();
		document.getElementById( 'new-value' ).select();
	}
}

function add_new_variable_on_enter( event )
{
	if ( test_for_enter( event )
		 && ! event.shiftKey ) {
			 event.preventDefault();
			 add_new_variable();
		 }
}

function focus_new_variable( event )
{
	if ( test_for_enter( event ) ) {
		event.preventDefault();
		document.getElementById( 'new-variable' ).select();
	}
}

function test_for_enter( event )
{
	if ( get_key_code( event ) == 13 ) {
		return true;
	}
	return false;
}

function get_key_code( event ) {
	if ( typeof event == "undefined" ) { event = window.event; }
	var event_key_code = event.keyCode;
	return event_key_code;
}

function test_browser_compatibility()
{
	var test_array = [ 0, 1, 'aoeu' ];
	if ( test_array.indexOf( 'aoeu' ) != 2 ) {
		return false;
	}
	return true;
}