
Alloy.CFG.tabGroup = {};

Alloy.Globals.setAndroidBackButton = function(_window) {
	if (!OS_ANDROID) { return; }
	
	_window.addEventListener('open', function() {
		var ABH = require('actionbar').actionBarHelper;
		var actionBarHelper = new ABH(_window);

		if(_window.title && _window.title.length > 0)
			actionBarHelper.setTitle(_window.title);

		actionBarHelper.setUpAction(function() {
			_window.close();
		});
	});
};
