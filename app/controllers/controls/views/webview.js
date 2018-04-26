import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function onBeforeLoad(e) {
	if (!OS_WINDOWS) {
		logger.log('Ti.UI.WebView will start loading content', e);
	} else {
		logger.log('Ti.UI.WebView will start loading content');
	}
}

function onLoad(e) {
	if (!OS_WINDOWS) {
		logger.log('Ti.UI.WebView completed loading content', e);
	} else {
		logger.log('Ti.UI.WebView completed loading content');
	}
}
