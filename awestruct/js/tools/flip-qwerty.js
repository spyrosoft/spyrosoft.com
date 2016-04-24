/*
	` -> backspace
	shift ~ -> '
	space ` -> \n
	space shift ~ -> "
	esc -> \
	space esc -> =
	shift esc -> -
	space shift esc -> +
*/

var previousInput="";
var keyboardNormal   = " qwertyuiopQWERTYUIOPasdfghjkl;ASDFGHJKL:zxcvbnm,./ZXCVBNM<>?1234567890!@#$%^&*()`";
var keyboardMirrored = " poiuytrewqPOIUYTREWQ;lkjhgfdsa:LKJHGFDSA/.,mnbvcxz?><MNBVCXZ0987654321)(*&^%$#@!\n\"";

var spaceDown = false;
var otherKeyPressed = false;
var input;
var inputID = "input";
var charactersFewer;

var cursorPosition, selectionLength, indexOfChange;

var instructions_displayed = true;

function keyedDown(event) {
	if (typeof event == "undefined") event=window.event;
	if (event.altKey || event.ctrlKey || event.metaKey) return true;
	var val=event.keyCode;
	if (val == 32) {
		spaceDown=true;
		otherKeyPressed=false;
		return false;
	}
	return true;
}

function keyedUp(event) {
	if (typeof event == "undefined") event=window.event;
	var val=event.keyCode;
	if (val == 32) {
		spaceDown=false;
		addNecessarySpace();
	}
	else if (val == 192 && !spaceDown) removeText();
	else if (val == 27) addEscapeCharacters(event);
	else if (spaceDown) updateText();
	checkForTildeAndChangeIt();
	if (val != 32) otherKeyPressed=true;
	previousInput=document.getElementById(inputID).value;
}

function updateText() {
	input=document.getElementById(inputID).value;
	if (input == previousInput) return; //In order to be able to use keyboard text selection.
	var lengthDifference=input.length-previousInput.length;
	if (lengthDifference > 0) switchCharacters(lengthDifference);
}

function removeText() {
	input=document.getElementById(inputID).value;
	deleteCharacters();
}

function switchCharacters(lengthDifference) {
	prepareCursorEditing();
	var textToChange=input.substring(indexOfChange,indexOfChange+lengthDifference);
	var changedText=translateText(textToChange);
	var output=
		input.substring(0,indexOfChange)
		+ changedText
		+ input.substring(indexOfChange+changedText.length+charactersFewer,input.length);
	document.getElementById(inputID).value=output;
	setCursorPosition(cursorPosition);
}

function deleteCharacters() {
	prepareCursorEditing();
	var backspaces=countBackspaces();
	var output=
		input.substring(0,(cursorPosition-(backspaces*2)))
		+ input.substring(cursorPosition,input.length);
	document.getElementById(inputID).value=output;
	setCursorPosition(cursorPosition-(backspaces*2));
}

function addCharacter(character) {
	cursorPosition=getCursorPosition();
	var output=
		input.substring(0,cursorPosition)
		+ character
		+ input.substring(cursorPosition,input.length);
	document.getElementById(inputID).value=output;
	setCursorPosition(cursorPosition+1);
}

function translateText(text) {
	var newText="";
	charactersFewer=0;
	for (var i=0; i<text.length; i++) {
		if (text.charAt(i) == " ") {
			charactersFewer++;
			continue;
		}
		var indexMatch=keyboardNormal.indexOf(text.charAt(i));
		newText+=keyboardMirrored.charAt(indexMatch);
	}
	return newText;
}

function addEscapeCharacters(event) {
	input=document.getElementById("input").value;
	if (!event.shiftKey && !spaceDown) addCharacter("\\");
	if (!event.shiftKey && spaceDown) addCharacter("=");
	if (event.shiftKey && !spaceDown) addCharacter("-");
	if (event.shiftKey && spaceDown) addCharacter("+");
}

function addNecessarySpace() {
	if (otherKeyPressed) return;
	input=document.getElementById("input").value;
	if (input == previousInput) addCharacter(" ");
}

function checkForTildeAndChangeIt() {
	input=document.getElementById(inputID).value;
	cursorPosition=getCursorPosition();
	if (input.charAt(cursorPosition-1) == "~") {
		var output=
			input.substring(0,cursorPosition-1)
			+ "'"
			+ input.substring(cursorPosition,input.length);
		document.getElementById(inputID).value=output;
		setCursorPosition(cursorPosition);
	}
}

function prepareCursorEditing() {
	cursorPosition=getCursorPosition();
	selectionLength=getSelectionLength();
	indexOfChange=findIndexOfChange();
}

function getCursorPosition() {
	if (document.getElementById(inputID).selectionStart)
		return document.getElementById(inputID).selectionStart;
	return 0;
}

function setCursorPosition(position) {
	if (document.getElementById(inputID).selectionStart) {
		document.getElementById(inputID).selectionStart=position;
		document.getElementById(inputID).selectionEnd=position;
	}
}

function getSelectionLength() {
	if (document.getElementById(inputID).selectionStart) {
		var start=document.getElementById(inputID).selectionStart;
		var end=document.getElementById(inputID).selection;
		return end-start;
	}
	return 0;
}

function findIndexOfChange() {
	for (var i=0; i < input.length; i++) {
		if (input.charAt(i) != previousInput.charAt(i)) return i;
	}
	return 0;
}

function countBackspaces() {
	var backspaces=0;
	for (var i=cursorPosition-1; i > 0; i--) {
		if (input.charAt(i) != "`") return backspaces;
		backspaces++;
	}
	return backspaces;
}

function display_instructions() {
	if (instructions_displayed) {
		document.getElementById('instructions').style.display = 'none';
	} else {
		document.getElementById('instructions').style.display = 'block';
	}
	instructions_displayed = !instructions_displayed;
	return false;
}

document.getElementById(inputID).focus();
$( '#input' ).keydown( keyedDown ).keyup( keyedUp );