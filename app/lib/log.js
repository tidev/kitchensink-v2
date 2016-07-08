/* global ENV_PROD */

var moment = require('alloy/moment');

var Log = module.exports = _.extend({}, Backbone.Events);

Log.history = '';

Log.args = function () {
	var args = Array.prototype.slice.call(arguments);

	// Stringify non-strings
	args = args.map(function (arg) {
		return (typeof arg === 'string') ? arg : JSON.stringify(arg, null, 2);
	});

	var message = args.join(' ');

	// Use error-level for production or they will not show in Xcode console
	console[ENV_PROD ? 'error' : 'info'](message);

	// Add the message to a global variable for controllers/console.js to use
	Log.history = (Log.history || '') + '[' + moment().format('HH:mm:ss.SS') + '] ' + message + '\n\n';

	// Trigger an event for controllers/console.js to listen to and display the log
	Log.trigger('change');
};
