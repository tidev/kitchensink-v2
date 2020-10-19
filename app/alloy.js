import ActionBarHelper from 'actionbar';

Alloy.CFG.tabGroup = {};
Alloy.Globals.Map = require('ti.map');

Alloy.Globals.setAndroidBackButton = (window) => {
	if (!OS_ANDROID) {
		return;
	}

	window.addEventListener('open', () => {
		const actionBarHelper = new ActionBarHelper(window);

		if (window.title && window.title.length > 0) {
			actionBarHelper.title = window.title;
		}

		actionBarHelper.setUpAction(() => {
			window.close();
		});
	});
};
