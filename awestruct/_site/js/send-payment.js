$('#payment-amount').keyup(check_correct_amount_step_on_enter);
$('.next-step.check-correct-amount').click(check_correct_amount_step);
$('.next-step.submit-payment').click(submit_payment_step);
$('.next-step.payment-amount').click(payment_amount_step);


function check_correct_amount_step() {
	var payment_amount = $('#payment-amount').val().replace(/[^0-9.]/g, '');
	if (payment_amount === '' || !isFinite(payment_amount)) {
		display_error('Please enter a number.');
		payment_amount_step();
		$('#payment-amount').focus();
		return;
	}
	clear_error();
	payment_amount = parseFloat(payment_amount);
	$('#check-correct-amount').html(Utilities.formatHumanReadableDollars(payment_amount));
	generate_payment_button(payment_amount);
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

function payment_amount_step() {
	$('#check-correct-amount').html('');
	show_step('payment-amount');
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
	$('.payment-amount-error').html(message);
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
	var stripe_key = 'pk_live_xLzX0i3m83Yh1b6UeU0uYXas';
	if (window.location.hostname === 'localhost') {
		stripe_key = 'pk_test_H42wl8XKuFa4lIP1JKrUDwFV';
	}
	//THE HORROR
	//Why is it so hard to accomplish this?
	//If I'm missing something obvious, please tell me
	return '<script class="stripe-button" data-bitcoin="true" data-image="/images/spyrosoft-logo.png" data-key="' + stripe_key + '" data-locale="auto" data-name="Send Payment" data-amount="' + data_amount + '" src="https://checkout.stripe.com/checkout.js"></script>';
}