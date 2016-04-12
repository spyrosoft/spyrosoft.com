document.getElementById("in").select();

var showRow=true;
var showHand=false;
var showFinger=false;
var rowId="row";
var handId="hand";
var fingerId="finger";
var tempKey;

var qupr=0;
var qmid=0;
var qbot=0;
var dupr=0;
var dmid=0;
var dbot=0;
var cupr=0;
var cmid=0;
var cbot=0;
var qpupr=0;
var qpmid=0;
var qpbot=0;
var dpupr=0;
var dpmid=0;
var dpbot=0;
var cpupr=0;
var cpmid=0;
var cpbot=0;

var qtopMat="qwertyuiop[{]}\\";
var qmidMat="asdfghjkl;:'\"";
var qbotMat="zxcvbnm,<.>/?";
var dtopMat="'\",<.>pyfgcrl";
var dmidMat="aoeuidhtns-_";
var dbotMat=";:qjkxbmwvz";
var ctopMat="qwfpgjluy;:[{]}\\";
var cmidMat="arstdhneio'\"";
var cbotMat="zxcvbkm,<.>/?";

var lineBreak = "<br />";
var space="&nbsp;&nbsp;";
var pt1="Top Row:"+space;
var pt2=lineBreak+"<span style='font-weight:bold;'>Middle Row:</span>"+space;
var pt3=lineBreak+"Bottom Row:"+space;
var sSpace="&nbsp;";

var dlHand=0;
var drHand=0;
var qlHand=0;
var qrHand=0;
var dlsHand=0;
var drsHand=0;
var qlsHand=0;
var qrsHand=0;
var clsHand=0;
var crsHand=0;
var clHand=0;
var crHand=0;

var dlHandMat="'\",<.>pyaoeui;:qjkx";
var drHandMat="fgcrl/?=+\\|dhtns-_bmwvz";
var qlHandMat="qwertasdfgzxcvb";
var qrHandMat="yuiop[{]}\\|hjkl;:'\"nm,<.>/?";
var clHandMat="qwfpgarstdzxcvb";
var crHandMat="jluy;[{]}hneio'\"km,<.>/?";

var lHand="Left Hand:"+space;
var rHand=lineBreak+"Right Hand:"+space;
var shcTotal=lineBreak+lineBreak+"<span style='font-weight:bold;'>Total:</span>"+space;

var qlIndex=0;
var qlMiddle=0;
var qlRing=0;
var qlPinky=0;
var qrIndex=0;
var qrMiddle=0;
var qrRing=0;
var qrPinky=0;
var dlIndex=0;
var dlMiddle=0;
var dlRing=0;
var dlPinky=0;
var drIndex=0;
var drMiddle=0;
var drRing=0;
var drPinky=0;
var clIndex=0;
var clMiddle=0;
var clRing=0;
var clPinky=0;
var crIndex=0;
var crMiddle=0;
var crRing=0;
var crPinky=0;

var qlIndexMat="rtfgvb";
var qlMiddleMat="edc";
var qlRingMat="wsx";
var qlPinkyMat="qaz";
var qrIndexMat="yuhjnm";
var qrMiddleMat="ik,<";
var qrRingMat="ol.>";
var qrPinkyMat="p;:/?[{'\"]}\\";
var dlIndexMat="pyuikx";
var dlMiddleMat=".>ej";
var dlRingMat=",<oq";
var dlPinkyMat="'\"a;:";
var drIndexMat="fgdhbm";
var drMiddleMat="ctw";
var drRingMat="rnv";
var drPinkyMat="lsz/?-_=+\\";
var clIndexMat="ptvgdb";
var clMiddleMat="fsc";
var clRingMat="wrx";
var clPinkyMat="qaz";
var crIndexMat="jhklnm";
var crMiddleMat="ue,<";
var crRingMat="yi.>";
var crPinkyMat=";:o/?[{'\"]}";

var sindexf="Index:"+space;
var smiddlef=lineBreak+"Middle:"+space;
var sringf=lineBreak+"Ring:"+space;
var spinkyf=lineBreak+"Pinky:"+space;
var sleftf="<span style='font-weight:bold;'>Left:</span>";
var srightf=lineBreak+lineBreak+"<span style='font-weight:bold;'>Right:</span>";
var stotalf=lineBreak+lineBreak+"<span style='font-weight:bold;'>Total:</span>"+space;

function compare() {
	switchComparison();
	if (showRow) {
		qupr=0;qmid=0;qbot=0;
		dupr=0;dmid=0;dbot=0;
		cupr=0;cmid=0;cbot=0;
	} else if (showHand) {
		qlHand=0;qrHand=0;
		dlHand=0;drHand=0;
		clHand=0;crHand=0;
		qlsHand=0;qrsHand=0;
		dlsHand=0;drsHand=0;
		clsHand=0;crsHand=0;
	} else {
		qlIndex=0;qlMiddle=0;qlRing=0;qlPinky=0;
		qrIndex=0;qrMiddle=0;qrRing=0;qrPinky=0;
		dlIndex=0;dlMiddle=0;dlRing=0;dlPinky=0;
		drIndex=0;drMiddle=0;drRing=0;drPinky=0;
		clIndex=0;clMiddle=0;clRing=0;clPinky=0;
		crIndex=0;crMiddle=0;crRing=0;crPinky=0;
	}
	var inTxt=document.getElementById("in").value;
	if (inTxt.length==0) {
		hideAll();
		return;
	}
	for (var compi=0; compi<inTxt.length; compi++) {
		add(inTxt.charAt(compi).toLowerCase());
		if (showFinger||showHand) {
			if (compi>=1) {
				sCompare(
					inTxt.charAt(compi-1).toLowerCase(),
					inTxt.charAt(compi).toLowerCase()
				);
			}
		}
	}
	display();
}

function add(txt) {
	if (showRow) {
		if (contains(txt,qtopMat)) {qupr++;}
		else if (contains(txt,qmidMat)) {qmid++;}
		else if (contains(txt,qbotMat)) {qbot++;}
		if (contains(txt,dtopMat)) {dupr++;}
		else if (contains(txt,dmidMat)) {dmid++;}
		else if (contains(txt,dbotMat)) {dbot++;}
		if (contains(txt,ctopMat)) {cupr++;}
		else if (contains(txt,cmidMat)) {cmid++;}
		else if (contains(txt,cbotMat)) {cbot++;}
	} else if (showHand) {
		if (contains(txt,qlHandMat)) {qlHand++;}
		else if (contains(txt,qrHandMat)) {qrHand++;}
		if (contains(txt,dlHandMat)) {dlHand++;}
		else if (contains(txt,drHandMat)) {drHand++;}
		if (contains(txt,clHandMat)) {clHand++;}
		else if (contains(txt,crHandMat)) {crHand++;}
	}
}

function contains(txt,string) {
	for (var i=0;i<string.length;i++) {
		if (txt==string.charAt(i)) {
			return true;
		}
	}
	return false;
}

function display() {
	if (showRow) {
		var total=qupr+qmid+qbot;
		qpupr=parseInt(qupr/total*100);
		qpmid=parseInt(qmid/total*100);
		qpbot=parseInt(qbot/total*100);
		if (qpupr<10) {qpupr="&nbsp;"+qpupr;}
		if (qpmid<10) {qpmid="&nbsp;"+qpmid;}
		if (qpbot<10) {qpbot="&nbsp;"+qpbot;}
		total=dupr+dmid+dbot;
		dpupr=parseInt(dupr/total*100);
		dpmid=parseInt(dmid/total*100);
		dpbot=parseInt(dbot/total*100);
		if (dpupr<10) {dpupr="&nbsp;"+dpupr;}
		if (dpmid<10) {dpmid="&nbsp;"+dpmid;}
		if (dpbot<10) {dpbot="&nbsp;"+dpbot;}
		total=cupr+cmid+cbot;
		cpupr=parseInt(cupr/total*100);
		cpmid=parseInt(cmid/total*100);
		cpbot=parseInt(cbot/total*100);
		if (cpupr<10) {cpupr="&nbsp;"+cpupr;}
		if (cpmid<10) {cpmid="&nbsp;"+cpmid;}
		if (cpbot<10) {cpbot="&nbsp;"+cpbot;}
		spaceRowNums();
		out=pt1+space+sSpace+qpupr+"%"+space+qupr+pt2+qpmid+"%"+space+qmid+pt3+qpbot+"%"+space+qbot;
		document.getElementById("qrow").innerHTML=out;
		out=pt1+space+sSpace+dpupr+"%"+space+dupr+pt2+dpmid+"%"+space+dmid+pt3+dpbot+"%"+space+dbot;
		document.getElementById("drow").innerHTML=out;
		out=pt1+space+sSpace+cpupr+"%"+space+cupr+pt2+cpmid+"%"+space+cmid+pt3+cpbot+"%"+space+cbot;
		document.getElementById("crow").innerHTML=out;
	}
	if (showFinger) {
		out=sleftf+space+sSpace+lineBreak+sindexf+sSpace+qlIndex+smiddlef+qlMiddle+sringf+space+qlRing+spinkyf+sSpace+qlPinky+srightf+lineBreak+sindexf+sSpace+qrIndex+smiddlef+qrMiddle+sringf+space+qrRing+spinkyf+sSpace+qrPinky+stotalf+sSpace+(qlIndex+qlMiddle+qlRing+qlPinky+qrIndex+qrMiddle+qrRing+qrPinky);
		document.getElementById("qsf").innerHTML=out;
		out=sleftf+space+sSpace+lineBreak+sindexf+sSpace+dlIndex+smiddlef+dlMiddle+sringf+space+dlRing+spinkyf+sSpace+dlPinky+srightf+lineBreak+sindexf+sSpace+drIndex+smiddlef+drMiddle+sringf+space+drRing+spinkyf+sSpace+drPinky+stotalf+sSpace+(dlIndex+dlMiddle+dlRing+dlPinky+drIndex+drMiddle+drRing+drPinky);
		document.getElementById("dsf").innerHTML=out;
		out=sleftf+space+sSpace+lineBreak+sindexf+sSpace+clIndex+smiddlef+clMiddle+sringf+space+clRing+spinkyf+sSpace+clPinky+srightf+lineBreak+sindexf+sSpace+crIndex+smiddlef+crMiddle+sringf+space+crRing+spinkyf+sSpace+crPinky+stotalf+sSpace+(clIndex+clMiddle+clRing+clPinky+crIndex+crMiddle+crRing+crPinky);
		document.getElementById("csf").innerHTML=out;
	}
	if (showHand) {
		out=lHand+qlHand+rHand+qrHand;
		document.getElementById("qsh").innerHTML=out;
		out=lHand+qlsHand+rHand+qrsHand+shcTotal+(qlsHand+qrsHand);
		document.getElementById("qshc").innerHTML=out;
		out=lHand+dlHand+rHand+drHand;
		document.getElementById("dsh").innerHTML=out;
		out=lHand+dlsHand+rHand+drsHand+shcTotal+(dlsHand+drsHand);
		document.getElementById("dshc").innerHTML=out;
		out=lHand+clHand+rHand+crHand;
		document.getElementById("csh").innerHTML=out;
		var out=lHand+clsHand+rHand+crsHand+shcTotal+(clsHand+crsHand);
		document.getElementById("cshc").innerHTML=out;
	}
}

function sCompare(stLast,last) {
	if(stLast==last) {return;}
	if(showFinger) {
		if(contains(stLast,qlIndexMat)) {if(contains(last,qlIndexMat)) {qlIndex++;}}
		else if(contains(stLast,qlMiddleMat)) {if(contains(last,qlMiddleMat)) {qlMiddle++;}}
		else if(contains(stLast,qlRingMat)) {if(contains(last,qlRingMat)) {qlRing++;}}
		else if(contains(stLast,qlPinkyMat)) {if(contains(last,qlPinkyMat)) {qlPinky++;}}
		else if(contains(stLast,qrIndexMat)) {if(contains(last,qrIndexMat)) {qrIndex++;}}
		else if(contains(stLast,qrMiddleMat)) {if(contains(last,qrMiddleMat)) {qrMiddle++;}}
		else if(contains(stLast,qrRingMat)) {if(contains(last,qrRingMat)) {qrRing++;}}
		else if(contains(stLast,qrPinkyMat)) {if(contains(last,qrPinkyMat)) {qrPinky++;}}
		if(contains(stLast,dlIndexMat)) {if(contains(last,dlIndexMat)) {dlIndex++;}}
		else if(contains(stLast,dlMiddleMat)) {if(contains(last,dlMiddleMat)) {dlMiddle++;}}
		else if(contains(stLast,dlRingMat)) {if(contains(last,dlRingMat)) {dlRing++;}}
		else if(contains(stLast,dlPinkyMat)) {if(contains(last,dlPinkyMat)) {dlPinky++;}}
		else if(contains(stLast,drIndexMat)) {if(contains(last,drIndexMat)) {drIndex++;}}
		else if(contains(stLast,drMiddleMat)) {if(contains(last,drMiddleMat)) {drMiddle++;}}
		else if(contains(stLast,drRingMat)) {if(contains(last,drRingMat)) {drRing++;}}
		else if(contains(stLast,drPinkyMat)) {if(contains(last,drPinkyMat)) {drPinky++;}}
		if(contains(stLast,clIndexMat)) {if(contains(last,clIndexMat)) {clIndex++;}}
		else if(contains(stLast,clMiddleMat)) {if(contains(last,clMiddleMat)) {clMiddle++;}}
		else if(contains(stLast,clRingMat)) {if(contains(last,clRingMat)) {clRing++;}}
		else if(contains(stLast,clPinkyMat)) {if(contains(last,clPinkyMat)) {clPinky++;}}
		else if(contains(stLast,crIndexMat)) {if(contains(last,crIndexMat)) {crIndex++;}}
		else if(contains(stLast,crMiddleMat)) {if(contains(last,crMiddleMat)) {crMiddle++;}}
		else if(contains(stLast,crRingMat)) {if(contains(last,crRingMat)) {crRing++;}}
		else if(contains(stLast,crPinkyMat)) {if(contains(last,crPinkyMat)) {crPinky++;}}
	}
	else {
		if(contains(stLast,qlHandMat)) {if(contains(last,qlHandMat)) {qlsHand++;}}
		else if(contains(stLast,qrHandMat)) {if(contains(last,qrHandMat)) {qrsHand++;}}
		if(contains(stLast,dlHandMat)) {if(contains(last,dlHandMat)) {dlsHand++;}}
		else if(contains(stLast,drHandMat)) {if(contains(last,drHandMat)) {drsHand++;}}
		if(contains(stLast,clHandMat)) {if(contains(last,clHandMat)) {clsHand++;}}
		else if(contains(stLast,crHandMat)) {if(contains(last,crHandMat)) {crsHand++;}}
	}
}

function spaceRowNums() {
	var duprNum=dupr;
	var dmidNum=dmid;
	var dbotNum=dbot;
	dupr=dupr.toString();
	dmid=dmid.toString();
	dbot=dbot.toString();
	while(dupr.length<dmidNum.toString().length) {dupr=sSpace+dupr;}
	while(dupr.length<dbotNum.toString().length) {dupr=sSpace+dupr;}
	while(dmid.length<duprNum.toString().length) {dmid=sSpace+dmid;}
	while(dmid.length<dbotNum.toString().length) {dmid=sSpace+dmid;}
	while(dbot.length<duprNum.toString().length) {dbot=sSpace+dbot;}
	while(dbot.length<dmidNum.toString().length) {dbot=sSpace+dbot;}
}

function keyedup(event) {
	if(typeof event=="undefined")
	{event=window.event;}
	var val=event.keyCode;
	if(val==222) {dim("'");}
	else if(val==188) {dim(",");}
	else if(val==190) {dim(".");}
	else if(val==80) {dim("p");}
	else if(val==89) {dim("y");}
	else if(val==70) {dim("f");}
	else if(val==71) {dim("g");}
	else if(val==67) {dim("c");}
	else if(val==82) {dim("r");}
	else if(val==76) {dim("l");}
	else if(val==191) {dim("/");}
	else if(val==61) {dim("=");}
	else if(val==220) {dim("\\");}
	else if(val==65) {dim("a");}
	else if(val==79) {dim("o");}
	else if(val==69) {dim("e");}
	else if(val==85) {dim("u");}
	else if(val==73) {dim("i");}
	else if(val==68) {dim("d");}
	else if(val==72) {dim("h");}
	else if(val==84) {dim("t");}
	else if(val==78) {dim("n");}
	else if(val==83) {dim("s");}
	else if(val==109) {dim("-");}
	else if(val==59) {dim(";");}
	else if(val==81) {dim("q");}
	else if(val==74) {dim("j");}
	else if(val==75) {dim("k");}
	else if(val==88) {dim("x");}
	else if(val==66) {dim("b");}
	else if(val==77) {dim("m");}
	else if(val==87) {dim("w");}
	else if(val==86) {dim("v");}
	else if(val==90) {dim("z");}
	else if(val==219) {dim("[");}
	else if(val==221) {dim("]");}
}

function keyeddown(event) {
	if(typeof event=="undefined")
	{event=window.event;}
	var val=event.keyCode;
	if(val==222) {lightUp("'");}
	else if(val==188) {lightUp(",");}
	else if(val==190) {lightUp(".");}
	else if(val==80) {lightUp("p");}
	else if(val==89) {lightUp("y");}
	else if(val==70) {lightUp("f");}
	else if(val==71) {lightUp("g");}
	else if(val==67) {lightUp("c");}
	else if(val==82) {lightUp("r");}
	else if(val==76) {lightUp("l");}
	else if(val==191) {lightUp("/");}
	else if(val==61) {lightUp("=");}
	else if(val==220) {lightUp("\\");}
	else if(val==65) {lightUp("a");}
	else if(val==79) {lightUp("o");}
	else if(val==69) {lightUp("e");}
	else if(val==85) {lightUp("u");}
	else if(val==73) {lightUp("i");}
	else if(val==68) {lightUp("d");}
	else if(val==72) {lightUp("h");}
	else if(val==84) {lightUp("t");}
	else if(val==78) {lightUp("n");}
	else if(val==83) {lightUp("s");}
	else if(val==109) {lightUp("-");}
	else if(val==59) {lightUp(";");}
	else if(val==81) {lightUp("q");}
	else if(val==74) {lightUp("j");}
	else if(val==75) {lightUp("k");}
	else if(val==88) {lightUp("x");}
	else if(val==66) {lightUp("b");}
	else if(val==77) {lightUp("m");}
	else if(val==87) {lightUp("w");}
	else if(val==86) {lightUp("v");}
	else if(val==90) {lightUp("z");}
	else if(val==219) {lightUp("[");}
	else if(val==221) {lightUp("]");}
}

function lightUp(key) {
	try {
		document.getElementById("q"+key).style.backgroundColor="#0F0";
	} catch(e) {}
	try {
		document.getElementById("d"+key).style.backgroundColor="#0F0";
	} catch(e) {}
	try {
		document.getElementById("c"+key).style.backgroundColor="#0F0";
	} catch(e) {}
	try {
		document.getElementById("q"+key).style.borderColor="#F00";
	} catch(e) {}
	try {
		document.getElementById("d"+key).style.borderColor="#F00";
	} catch(e) {}
	try {
		document.getElementById("c"+key).style.borderColor="#F00";
	} catch(e) {}
	tempKey=key;
	setTimeout("dim(tempKey)",1000);
}

function dim(key) {
	try {
		document.getElementById("q"+key).style.backgroundColor="";
	} catch(e) {}
	try {
		document.getElementById("d"+key).style.backgroundColor="";
	} catch(e) {}
	try {
		document.getElementById("c"+key).style.backgroundColor="";
	} catch(e) {}
	try {
		document.getElementById("q"+key).style.borderColor="";
	} catch(e) {}
	try {
		document.getElementById("d"+key).style.borderColor="";
	} catch(e) {}
	try {
		document.getElementById("c"+key).style.borderColor="";
	} catch(e) {}
}

function switchComparison() {
	var whichComp = document.getElementById("what-to-compare");
	showRow=whichComp[0].selected;
	showHand=whichComp[1].selected;
	showFinger=whichComp[2].selected;
	hideAll();
	if(showRow) {show(rowId);}
	else if(showHand) {show(handId);}
	else if(showFinger) {show(fingerId);}
	document.getElementById("in").focus();
}

function hideAll() {
	hide(rowId);
	hide(handId);
	hide(fingerId);
}

function hide(id) {
	document.getElementById(id).style.display="none";
}

function show(id) {
	document.getElementById(id).style.display="block";
}

function toggleFalse() {
	showRow=false;
	showHand=false;
	showFinger=false;
}

$( '#in' ).keydown(
	function(keyEvent) {
		compare();
		keyeddown(keyEvent);
	}
).keyup(
	function(keyEvent) {
		keyedup(keyEvent);
	}
);

$( '#what-to-compare' ).change( compare );