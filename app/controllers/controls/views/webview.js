import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function onBeforeLoad(e) {
	if (!OS_WINDOWS) {
		logger.log('Ti.UI.WebView will start loading content', e);
	} else {
		logger.log('Ti.UI.WebView will start loading content');
	}
}

// eslint-disable-next-line no-unused-vars
function onLoad(e) {
	if (!OS_WINDOWS) {
		logger.log('Ti.UI.WebView completed loading content', e);
	} else {
		logger.log('Ti.UI.WebView completed loading content');
	}
}
