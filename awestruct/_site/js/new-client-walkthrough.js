var new_client_is_technical = false;
var responses = [];

var next_step = {
	'i-am-non-technical' : function() {
		new_client_is_technical = false;
		responses.push('First off, I consider myself non-technical. Please break down the technical details for me.');
		show_step('do-you-have-an-existing-website');
	},
	'i-am-technical' : function() {
		new_client_is_technical = true;
		responses.push('First off, I consider myself technical. You can give it to me straight.');
		show_step('do-you-have-an-existing-website');
	},
	'yes-existing-website' : function() {
		responses.push('I am looking to change an existing website.');
		show_step('which-platform');
	},
	'no-existing-website' : function() {
		responses.push('I am looking to create a new website.');
		if (new_client_is_technical) {
			show_step('which-type-of-design-do-you-want');
		} else {
			show_step('will-you-be-selling-products');
		}
	},
	'which-platform-next' : function() {
		var platform = $('input[name="which-platform"]:checked').val();
		if (platform === undefined) {
			alert('Please select the platform your current website uses.');
			return;
		}
		if (platform === 'Not Sure') {
			responses.push('I am not sure which platform the current website is using.');
		} else {
			if (platform === 'Other') {
				platform = $('.which-platform-other').val();
				if (platform === '') {
					alert('The Other option is selected. Please let me know which platform it is, otherwise choose Not Sure.');
					$('.which-platform-other').select();
					return;
				}
			}
			responses.push('The current website is running on the ' + platform + ' platform.');
		}
		show_step('what-do-you-have-in-mind');
	},
	'what-do-you-have-in-mind-next' : function() {
		var response_items = add_response_items('.what-do-you-have-in-mind input[type="checkbox"], .what-do-you-have-in-mind textarea');
		if (response_items.length > 0) {
			responses.push('I want the following:\n* ' + response_items.join('\n* '));
		}
		send_message_step();
	},
	'pre-existing-design' : function() {
		responses.push('I am interested in a pre-existing design.');
		show_step('which-type-of-theme-do-you-want');
	},
	'custom-design' : function() {
		responses.push('I am interested in a custom website design.');
		show_step('will-you-be-selling-products');
	},
	'purchase-a-theme' : function() {
		responses.push('Purchasing a pre-built theme sounds great.');
		show_step('will-you-be-selling-products');
	},
	'free-theme' : function() {
		responses.push('A free theme sounds great.');
		show_step('will-you-be-selling-products');
	},
	'yes-selling-products' : function() {
		show_step('how-many-products');
	},
	'no-selling-products' : function() {
		show_step('want-a-blog');
	},
	'fewer-than-ten-products' : function() {
		responses.push('I will be selling fewer than ten products via the website.');
		show_step('what-type-of-products');
	},
	'more-than-ten-products' : function() {
		responses.push('I will be selling more than ten products via the website.');
		show_step('what-type-of-products');
	},
	'object-products' : function() {
		responses.push('I will handle the shipping for any products sold.');
		show_step('want-a-blog');
	},
	'object-and-electronic-products' : function() {
		responses.push('I will handle the shipping for any products sold. There will also be digital downloads.');
		show_step('want-a-blog');
	},
	'electronic-products' : function() {
		responses.push('There will be digital downloads only.');
		show_step('want-a-blog');
	},
	'yes-blog' : function() {
		responses.push('It is important to have a blog on the website.');
		show_step('do-you-want-higher-than-average-security');
	},
	'no-blog' : function() {
		show_step('do-you-want-higher-than-average-security');		
	},
	'security-not-concerned' : function() {
		show_step('what-other-functionality-do-you-want');
	},
	'security-high-priority' : function() {
		responses.push('Security is a high priority.');
		show_step('what-other-functionality-do-you-want');
	},
	'what-other-functionality-next' : function() {
		var response_items = add_response_items('.what-other-functionality-do-you-want input[type="checkbox"]');
		response_items = response_items.concat(add_response_items('.what-other-functionality-do-you-want input[type="text"]'));
		if (response_items.length > 0) {
			responses.push('Additionally, I want the following functionality:\n* ' + response_items.join('\n* '));
		}
		send_message_step();
	}
};

function add_response_items(selector) {
	var response_items = [];
	var elements = $(selector);
	elements.each(
		function() {
			if ((this.type === 'checkbox' || this.type === 'radio') && !this.checked) {return;}
			if ((this.type === 'text' || this.type === 'textarea') && this.value === '') {return;}
			response_items.push(this.value);
		}
	);
	return response_items;
}

function send_message_step() {
	$('#intro').hide();
	show_step('send-message');
	var message = 'Hi Bennett,\n\n';
	message += responses.join('\n');
	$('.send-message .message').val(message);
	$('.send-message .name').focus();
}

function button_clicked(click_event) {
	if (!next_step[this.id] || typeof next_step[this.id] !== 'function') {
		alert('Oh, no! Something is broken in this form. Please contact Bennett to let him know.');
		return;
	}
	next_step[this.id]();
}

function show_step(step) {
	$('.response').hide();
	$('.response.' + step).show();
}

$('.response').hide().first().show();
$('#responses').removeClass('display-none');
$('button').click(button_clicked);

$('.other-platform').click(function() {$('.other-please-specify').removeClass('display-none');});

$('#thank-you-next')
	.click(
		function() {
			if ($('form.contact [name=email]').val() === '') {
				alert('Please fill out your contact information. Otherwise I will not be able to respond to you. :D');
				$('form.contact [name=email]').first().focus();
				return;
			}
			$('#thank-you-message-submission').show();
			$('#thank-you-message-contact-info').hide();
		}
	)
	.removeClass('display-none');
$('#thank-you-message-submission').hide();


setTimeout(function() {$('#i-am-non-technical').focus();}, 200);
setTimeout(function() {$('#i-am-technical').focus();}, 500);
setTimeout(function() {$('nav a').first().focus();}, 800);