/*
	` -> backspace
	shift ~ -> ?
	space ` -> \n
	space shift ~ -> -
	esc -> \
	space esc -> =
	shift esc -> /
	space shift esc -> +
*/

var previousInput = "";
var keyboardNormal = " ',.pyfgcrl\"<>PYFGCRLaoeuidhtnsAOEUIDHTNS;qjkxbmwvz:QJKXBMWVZ1234567890!@#$%^&*()`~";
var keyboardMirrored = " lrcgfyp.,'LRCGFYP><\"snthdiueoaSNTHDIUEOAzvwmbxkjq;ZVWMBXKJQ:0987654321)(*&^%$#@!\n-";

var spaceDown = false;
var otherKeyPressed = false;
var input;
var inputElement = document.getElementById("input");
var charactersFewer;

var cursorPosition, selectionLength, indexOfChange;

function keyedDown(event) {
	if (event.altKey || event.ctrlKey || event.metaKey) return true;
	var val = event.keyCode;
	if (val == 32) {
		spaceDown = true;
		otherKeyPressed = false;
		return false;
	}
	return true;
}

function keyedUp(event) {
	var val = event.keyCode;
	if (val == 32) {
		spaceDown = false;
		addNecessarySpace();
	} else if (val == 192 && !spaceDown) {
		removeText();
	} else if (val == 27) {
		addEscapeCharacters(event);
	} else if (spaceDown) {
		updateText();
	}
	checkForTildeAndChangeIt();
	if (val != 32) {
		otherKeyPressed = true;
	}
	previousInput = inputElement.value;
}

function updateText() {
	input = inputElement.value;
	if (input == previousInput) return; //In order to be able to use keyboard text selection.
	var lengthDifference = input.length-previousInput.length;
	if (lengthDifference > 0) switchCharacters(lengthDifference);
}

function removeText() {
	input = inputElement.value;
	deleteCharacters();
}

function switchCharacters(lengthDifference) {
	prepareCursorEditing();
	var textToChange = input.substring(indexOfChange,indexOfChange+lengthDifference);
	var changedText = translateText(textToChange);
	var output = input.substring(0,indexOfChange)
		+ changedText
		+ input.substring(indexOfChange+changedText.length+charactersFewer,input.length);
	inputElement.value = output;
	setCursorPosition(cursorPosition);
}

function deleteCharacters() {
	prepareCursorEditing();
	var backspaces = countBackspaces();
	var output = input.substring(0,(cursorPosition-(backspaces*2)))
		+ input.substring(cursorPosition,input.length);
	inputElement.value = output;
	setCursorPosition(cursorPosition-(backspaces*2));
}

function addCharacter(character) {
	cursorPosition = getCursorPosition();
	var output = input.substring(0,cursorPosition)
		+ character
		+ input.substring(cursorPosition,input.length);
	inputElement.value = output;
	setCursorPosition(cursorPosition+1);
}

function translateText(text) {
	var newText = "";
	charactersFewer = 0;
	for (var i = 0; i < text.length; i++) {
		if (text.charAt(i) == " ") {
			charactersFewer++;
			continue;
		}
		var indexMatch = keyboardNormal.indexOf(text.charAt(i));
		newText += keyboardMirrored.charAt(indexMatch);
	}
	return newText;
}

function addEscapeCharacters(event) {
	input = document.getElementById("input").value;
	if (!event.shiftKey && !spaceDown) addCharacter("\\");
	if (!event.shiftKey && spaceDown) addCharacter("=");
	if (event.shiftKey && !spaceDown) addCharacter("/");
	if (event.shiftKey && spaceDown) addCharacter("+");
}

function addNecessarySpace() {
	if (otherKeyPressed) return;
	input = document.getElementById("input").value;
	if (input == previousInput) {
		addCharacter(" ");
	}
}

function checkForTildeAndChangeIt() {
	input = inputElement.value;
	cursorPosition = getCursorPosition();
	if (input.charAt(cursorPosition-1) == "~") {
		var output = input.substring(0,cursorPosition-1)
			+ "?"
			+ input.substring(cursorPosition,input.length);
		inputElement.value = output;
		setCursorPosition(cursorPosition);
	}
}

function prepareCursorEditing() {
	cursorPosition = getCursorPosition();
	selectionLength = getSelectionLength();
	indexOfChange = findIndexOfChange();
}

function getCursorPosition() {
	if (inputElement.selectionStart)
		return inputElement.selectionStart;
	return 0;
}

function setCursorPosition(position) {
	if (inputElement.selectionStart) {
		inputElement.selectionStart = position;
		inputElement.selectionEnd = position;
	}
}

function getSelectionLength() {
	if (inputElement.selectionStart) {
		var start = inputElement.selectionStart;
		var end = inputElement.selection;
		return end-start;
	}
	return 0;
}

function findIndexOfChange() {
	for (var i = 0; i < input.length; i++) {
		if (input.charAt(i) != previousInput.charAt(i)) return i;
	}
	return 0;
}

function countBackspaces() {
	var backspaces = 0;
	for (var i = cursorPosition - 1; i > 0; i--) {
		if (input.charAt(i) != "`") return backspaces;
		backspaces++;
	}
	return backspaces;
}

inputElement.focus();
$( inputElement ).keydown( keyedDown ).keyup( keyedUp );