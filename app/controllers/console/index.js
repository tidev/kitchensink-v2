var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	log.on('change', showLogs);
})();

function showLogs() {
	$.log.setText(log.history);
	$.scrollView.scrollToBottom();
}

function clearLogs() {
	log.history = '';
	showLogs();
}
