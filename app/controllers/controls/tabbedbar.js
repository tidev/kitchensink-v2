var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function tabbedBarSelectedIndex(e) {
	log.args('Ti.UI.iOS.TabbedBar changed to index: ', e.index);
}
