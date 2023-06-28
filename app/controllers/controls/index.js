import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function onFocus() {
	$.window.removeEventListener('focus', onFocus);
	validateDocsInfo();
}


function validateDocsInfo() {
	if (!Ti.App.Properties.getBool('noticeShown', false)) {
		const alertNotice = Ti.UI.createAlertDialog({
			title: 'Notice',
			message: 'While this KitchenSink provides an extensive demonstration of the Titanium API, it does not include examples for every available component. Please refer to our documentation for more details.',
			buttonNames: [ 'Alright!', 'Visit docs', 'Don\'t show again' ],
			cancel: 0,
			destructive: 2
		});

		alertNotice.addEventListener('click', ({ index }) => {
			if (index === 1) {
				Ti.Platform.openURL('https://titaniumsdk.com');
			} else if (index === 2) {
				Ti.App.Properties.setBool('noticeShown', true);
			}
		});

		alertNotice.show();
	}
}


function openComponent(e) {
	const identifier = `controls/${e.section.getItemAt(e.itemIndex).properties.itemId}`;
	const component = Alloy.createController(identifier).getView();

	if (OS_ANDROID && identifier !== 'controls/drawer') {
		Alloy.Globals.setAndroidBackButton(component);
	}
	Alloy.CFG.tabGroup.activeTab.open(component);

	logger.log('Ti.UI.TabGroup.activeTab.open', identifier);
}
