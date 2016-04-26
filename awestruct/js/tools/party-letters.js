var party_alphabet_upper = new Array(
	"ȂȀǍĄĂĀÀÁÂÃÄÅȦɅΆΑА",
	"ßƁɃΒВ",
	"ÇĆĈĊČʗϾСƇ",
	"ÐĎĐƉƊ",
	"ÈÉÊËĒĔĖĘĚƎƐȄȨΈΕЕ",
	"Ƒ",
	"ĜĠĢƓǦǴ",
	"ĤǶȞΉΗНҢ",
	"ÌÍÎÏĨĪĬĮİƗǏȈȊΙІ",
	"ĴЈ",
	"ΚЌКҚҜҞҠ",
	"ĹĻĿŁȽ",
	"ΜϺМ",
	"ÑŃŅŇŊƝǸȠΝ",
	"ǪǬǾȌÒÓÔÕÖÖØŌŎŐƟƠǑȎȮʘΘΟОѺ",
	"ƤǷΡРҎ",
	"Qǫ",
	"ŔŖŘƦȐȒɌ",
	"ЅȘŠ§ŚŜŞŠƧ",
	"ŢŤŦƬƮȚΤТҬ",
	"ÙÚÛÜŨŪŬŮŰŲƯƱƲǓǕȔȖɄ",
	"ѴѶ",
	"ŴƜ",
	"ΧХ",
	"Ÿ¥ÝŶŸƔƳȲɎΎΥУҮ",
	"ŽŹŻŽƵȤΖ"
);
var party_alphabet_lower = new Array(
	"àáâãäåāăąǎȁȃȧɑɒά",
	"þƂƃƄƅʙЬ",
	"¢©çćĉċčƈɔϲ",
	"ďđƋƌ",
	"èéêëēĕėęěǝȅȇȩɘə",
	"ƒſƒ",
	"ĝğġģǥǧǵɠɡɢ",
	"ĥƕȟʜ",
	"ìíîïĩīĭįǐȉȋɨɪ",
	"ĵǰɈɉʝʲϳј",
	"ķĸƘƙǩĶǨ",
	"ĺļŀłƖƚƪɫɭʟ",
	"ɱϻ",
	"ñħńņňŉŋƞǹȵɴ",
	"ðòòóôõöøōŏőơǒǫǭǿȍȏȯΦ",
	"þƥƿҏ",
	"ɋʠϤϥ",
	"ŕŗřȑȓɍʀʳ",
	"śŝşšƨșȿš",
	"ťŧțʈ†ţ",
	"ùúûüũūŭůűųưǔȕȗ",
	"ѵѷ",
	"ŵɯώϣѡѿ",
	"×ΧХ",
	"ýÿŷƴȳɏɣʏʸ",
	"žźżžƶȥ"
);
var begin_upper_alpha = 65;
var end_upper_alpha = 90;
var begin_lower_alpha = 97;
var end_lower_alpha = 122;

function convert_to_party_letters(value, event)
{
	var event_key_code = event.keyCode;
	
	if (event_key_code == 9) { //tab
		return;
	}
	
	var output = "";
	
	for (var position = 0; position < value.length; position++) {
		var unicode_value = value.charCodeAt(position);
		if (unicode_value >= begin_upper_alpha && unicode_value <= end_upper_alpha) {
			var party_letter_string = party_alphabet_upper[unicode_value-begin_upper_alpha];
			var random_party_letter = parseInt(Math.random()*party_letter_string.length);
			output += party_letter_string.charAt(random_party_letter);
		} else if (unicode_value >= begin_lower_alpha && unicode_value <= end_lower_alpha) {
			var party_letter_string = party_alphabet_lower[unicode_value-begin_lower_alpha];
			var random_party_letter = parseInt(Math.random()*party_letter_string.length);
			output += party_letter_string.charAt(random_party_letter);
		} else if (value.charAt(position) == "!") {
			output += "ǃ";
		} else if (value.charAt(position) == "?") {
			output += "ʔ";
		} else {
			output += value.charAt(position);
		}
	}
	
	document.getElementById('output').value = output;
}
document.getElementById("input").focus();
$( '#input' ).keydown( function( event ) { convert_to_party_letters(this.value, event); } ).keyup( function( event ) { convert_to_party_letters(this.value, event); } );