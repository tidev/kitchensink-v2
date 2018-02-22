import ActionBarHelper from 'actionbar';

Alloy.CFG.tabGroup = {};

Alloy.Globals.setAndroidBackButton = (window) => {
	if (!OS_ANDROID) { return; }
	
	_window.addEventListener('open', () => {
		const actionBarHelper = new ActionBarHelper(window);

		if (window.title && _window.title.length > 0) {
			actionBarHelper.setTitle(window.title);
		}

		actionBarHelper.setUpAction(() => {
			window.close();
		});
	});
};
