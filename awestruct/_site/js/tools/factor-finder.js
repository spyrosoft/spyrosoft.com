function runIt() {
	var outLeft="";
	var outRight="";
	var inTxt=parseFloat(document.getElementById("in").value);
	if(inTxt>1000000000) return;
	for(var i=inTxt;i>0;i--) {
		if(inTxt%i==0) {
			outLeft+=i+"<br />";
			outRight=i+"<br />"+outRight;
		}
	}
	document.getElementById('outLeft').innerHTML=outLeft;
	document.getElementById('outRight').innerHTML=outRight;
}

document.getElementById('in').focus();
document.getElementById('in').addEventListener( 'keyup', runIt, false );