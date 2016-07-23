$('#how-much').keyup(check_correct_amount_step_on_enter);
$('.next-step.check-correct-amount').click(check_correct_amount_step);
$('.next-step.submit-payment').click(submit_payment_step);
$('.next-step.how-much').click(how_much_step);


function check_correct_amount_step() {
	var how_much = $('#how-much').val().replace(/[^0-9.]/g, '');
	if (how_much === '' || !isFinite(how_much)) {
		display_error('Please enter a number.');
		how_much_step();
		$('#how-much').focus();
		return;
	}
	clear_error();
	how_much = parseFloat(how_much);
	$('#check-correct-amount').html(Utilities.formatHumanReadableDollars(how_much));
	generate_payment_button(how_much);
	show_step('check-correct-amount');
}

function check_correct_amount_step_on_enter(key_event) {
	if (Utilities.isEnter(key_event)) {
		check_correct_amount_step();
	}
}

function submit_payment_step() {
	show_step('submit-payment');
}

function how_much_step() {
	$('#check-correct-amount').html('');
	show_step('how-much');
}

function generate_payment_button(payment_amount) {
	$('#stripe-payment').html(get_stripe_html(payment_amount));
	var stripe_payment_content = $('.stripe-payment').html();
	$('.stripe-payment').html('').html(stripe_payment_content);
	setTimeout(reset_stripe_button_styles, 500);
}

function show_step(which_step) {
	$('.step').addClass('display-none');
	$('.step.' + which_step).removeClass('display-none');
}

function display_error(message) {
	$('.how-much-error').html(message);
}

function clear_error() {
	display_error('');
}

function reset_stripe_button_styles() {
	$('.stripe-button-el')
		.addClass('button pay-with-card no-margin large')
		.removeClass('stripe-button-el');
	$('.pay-with-card span').attr('style', '');
	$('.pay-with-card span').html('Pay with Stripe');
}

function get_stripe_html(payment_amount) {
	var data_amount = payment_amount*100;
	//THE HORROR
	//Why is it so hard to accomplish this?
	//If I'm missing something obvious, please tell me
	return '<script class="stripe-button" data-bitcoin="true" data-image="/images/spyrosoft-logo.png" data-key="pk_live_xLzX0i3m83Yh1b6UeU0uYXas" data-locale="auto" data-name="Send Payment" data-amount="' + data_amount + '" src="https://checkout.stripe.com/checkout.js"></script>';
}