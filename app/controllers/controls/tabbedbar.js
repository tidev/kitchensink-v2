var log = require("log");

/**
 * The scoped constructor of the controller.
 * @param args {Object} The arguments passed to initialize the controller.
 **/
(function constructor(args) {
    
})(arguments[0] || {});

function tabbedBarSelectedIndex(e) {
	log.args('Ti.UI.iOS.TabbedBar changed to index: ', e.index);
}
