var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    if (OS_IOS) {
        Ti.App.iOS.addEventListener('shortcutitemclick', handleShortcutItem);
    }

    Alloy.CFG.tabGroup = $.index;
    $.index.open();
})();

function validateDocsInfo() {
    if (!Ti.App.Properties.getBool('noticeShown', false)) {
    	var alertNotice = Ti.UI.createAlertDialog({
    		title: 'Notice',
    		message: 'While this KitchenSink provides an extensive demonstration of the Titanium API, it does not include examples for every available component. Please refer to our documentation for more details.',
        buttonNames: ['Alright!', 'Visit docs', 'Don\'t show again'],
        cancel: 0,
        destructive: 2
    	});

    	alertNotice.addEventListener('click', function(e) {
    		if (e.index === 1) {
    			Ti.Platform.openURL('https://docs.appcelerator.com/platform/latest/');
    		} else if (e.index === 2) {
    			Ti.App.Properties.setBool('noticeShown', true);
    		}
    	});

      alertNotice.show();
    }
}

function handleShortcutItem(e) {
    log.args('Ti.App.iOS.shortcutitemclick', e);
}
