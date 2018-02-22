var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function onBeforeLoad(e) {
	if (!OS_WINDOWS) {
		log.args('Ti.UI.WebView will start loading content', e);
	} else {
		log.args('Ti.UI.WebView will start loading content');
	}
}

function onLoad(e) {
	if (!OS_WINDOWS) {
		log.args('Ti.UI.WebView completed loading content', e);
	} else {
		log.args('Ti.UI.WebView completed loading content');
	}
}
