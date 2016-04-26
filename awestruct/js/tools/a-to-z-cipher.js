var atoz=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
var AtoZ=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
function update(which) {
	if(which=='input') {change1();}
	else {change0();}
}
function change0() {
	var txt=document.getElementById('output').value;
	var out='';
	for(var i=0;i<txt.length;i++) {
		out+=switchIt(txt.charAt(i));
	}
	document.getElementById('input').value=out;
}
function change1() {
	var txt=document.getElementById('input').value;
	var out='';
	for(var i=0;i<txt.length;i++) {
		out+=switchIt(txt.charAt(i));
	}
	document.getElementById('output').value=out;
}
function switchIt(letter) {
	var num=letter.charCodeAt(0);
	if(65<=num&&90>=num) {
		letter=AtoZ[26-(num-65)-1];
	}
	else if(97<=num&&122>=num) {
		letter=atoz[26-(num-97)-1];
	}
	return letter;
}
function inputKeyEvent() {
	update( this.id );
}
document.getElementById('input').focus();
$( '#input' ).keyup( inputKeyEvent );
$( '#output' ).keyup( inputKeyEvent );