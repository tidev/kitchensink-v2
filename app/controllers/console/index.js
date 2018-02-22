import { log } from 'log';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	Ti.API.info(log);
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
