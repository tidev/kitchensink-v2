/* global ENV_PROD */

class Logger {
	constructor() {
		this.history = '';
		this.logger = _.extend({}, Backbone.Events);
	}

	log(...theArguments) {
		// Stringify non-strings
		let mappedArgs = theArguments.map((argument) => {
			return (typeof argument === 'string') ? argument : JSON.stringify(argument, null, 2);
		});

		const message = mappedArgs.join(' ');
		const timestamp = new Date().toLocaleString('en-US', { hour12: false });

		// Use error-level for production or they will not show in Xcode console
		Ti.API[ENV_PROD ? 'error' : 'info'](message);

		// Add the message to a global constiable for controllers/console.js to use
		this.history = `${this.history} [${timestamp}] ${message}\n\n`;

		// Trigger an event for controllers/console.js to listen to and display the log
		this.logger.trigger('change');
	}

	clearHistory() {
		this.history = '';
	}

	on(event, cb) {
		this.logger.on(event, cb);
	}
}

export const logger = new Logger();
