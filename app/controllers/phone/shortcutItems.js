import { log } from 'log';
var appShortcuts;

/**
 * The scoped constructor of the controller.
 **/
(function constructor(args) {
	// If supported, create an applicationShortcuts instance
	if (Ti.UI.iOS.forceTouchSupported) {
		appShortcuts = Ti.UI.iOS.createApplicationShortcuts();
	}

})(arguments[0] || {});

/**
 * Event handler set in view to list all static shortcuts
 */
function listStaticShortcuts() {
	if (!appShortcuts) {
		return alert('This device does not support Force Touch');
	}

	log.log('Ti.UI.iOS.ApplicationShortcuts.listStaticShortcuts', appShortcuts.listStaticShortcuts());
}

/**
 * Event handler set in view to list all dynamic shortcuts
 */
function listDynamicShortcuts() {
	if (!appShortcuts) {
		return alert('This device does not support Force Touch');
	}

	var res = appShortcuts.listDynamicShortcuts();

	log.log('Ti.UI.iOS.ApplicationShortcuts.listDynamicShortcuts', res);

	// If don't have any, explain how to create it
	if (res.length === 0) {
		Ti.UI.createAlertDialog({
			title: 'None',
			message: 'Use createDynamicShortcut() to create a dynamic shortcut.'
		}).show();
	}
}

/**
 * Event handler set in view to check if our dynamic shortcut exists
 */
function dynamicShortcutExists() {
	if (!appShortcuts) {
		return alert('This device does not support Force Touch');
	}

	var res = appShortcuts.dynamicShortcutExists('details');

	log.log('Ti.UI.iOS.ApplicationShortcuts.dynamicShortcutExists', 'details', res);

	// If don't have it, explain how to create it
	if (!res) {
		Ti.UI.createAlertDialog({
			title: 'Does not exist',
			message: 'Use createDynamicShortcut() to create a dynamic shortcut.'
		}).show();
	}
}

/**
 * Event handler set in view to get our dynamic shortcut
 */
function getDynamicShortcut() {
	if (!appShortcuts) {
		return alert('This device does not support Force Touch');
	}

	var res = appShortcuts.getDynamicShortcut('details');

	log.log('Ti.UI.iOS.ApplicationShortcuts.getDynamicShortcut', 'details', res);

	// If don't have it, explain how to create it
	if (!res) {
		Ti.UI.createAlertDialog({
			title: 'Does not exist',
			message: 'Use createDynamicShortcut() to create a dynamic shortcut.'
		}).show();
	}
}

/**
 * Event handler set in view to remove our dynamic shortcut
 */
function removeDynamicShortcut() {
	if (!appShortcuts) {
		return alert('This device does not support Force Touch');
	}

	appShortcuts.removeDynamicShortcut('details');

	// Explain how to (re)create it
	Ti.UI.createAlertDialog({
		title: 'Removed',
		message: 'Use createDynamicShortcut() to create a dynamic shortcut.'
	}).show();
}

/**
 * Event handler set in view to create a new dynamic shortcuts
 */
function createDynamicShortcut() {
		if (!appShortcuts) {
			return alert('This device does not support Force Touch');
		}
		
		appShortcuts.addDynamicShortcut({

			// Must be unique to identify it in the shortcutitemclick-listener in index.js
			itemtype: 'details',

			title: 'Titanium rocks!',
			subtitle: '(Dynamically created)',

			// A grey-scale icon of 35x35dp
			icon: 'images/icons/shortcutItemIcon.png',

			// Or a system-provided icon
			// icon: Ti.UI.iOS.SHORTCUT_ICON_TYPE_LOVE,

			// A custom payload
			userInfo: {
				created_at: Date.now()
			}
		});
}

/**
 * Event handler set in view to remove all dynamic shortcuts
 */
function removeAllDynamicShortcuts() {
	if (!appShortcuts) {
		return alert('This device does not support Force Touch');
	}

	appShortcuts.removeAllDynamicShortcuts();

	// Explain how to create our dynamic shortcut
	Ti.UI.createAlertDialog({
		title: 'Removed',
		message: 'Use createDynamicShortcut() to create a dynamic shortcut.'
	}).show();
}
