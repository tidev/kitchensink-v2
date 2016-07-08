var log = require('log');

/**
 * The scoped constructor of the controller.
 * @param args {Object} The arguments passed to initialize the controller.
 **/
(function constructor(args) {
	log.on('change', showLogs);
})(arguments[0] || {});

function showLogs() {
	$.log.setText(log.history);
	$.scrollView.scrollToBottom();
}

function clearLogs() {
	log.history = '';
	showLogs();
}
