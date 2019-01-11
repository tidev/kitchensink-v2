import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	logger.on('change', showLogs);
}());

function showLogs() {
	$.log.text = logger.history;
	$.scrollView.scrollToBottom();
}

function clearLogs() {
	logger.clearHistory();
	showLogs();
}
