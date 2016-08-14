$('.question').click(question_clicked);
$('.answer').hide();
$( window ).on('hashchange', hash_changed);
window.addEventListener('popstate', hash_changed);

hash_changed();

function hash_changed() {
	var current_hash = window.location.hash.replace('#', '');
	if (current_hash != '') {
		show_answer(current_hash);
	}
}

function question_clicked() {
	$('.question').removeClass('italics bold');
	$(this).addClass('italics bold');
	show_answer(this.id);
}

function show_answer(question_id) {
	$('.answer').hide();
	$('#' + question_id + '-answer').show();
}