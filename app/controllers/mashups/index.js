import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function openComponent(e) {
	const identifier = 'mashups/' + e.section.getItemAt(e.itemIndex).properties.itemId;
	const component = Alloy.createController(identifier).getView();

	Alloy.Globals.setAndroidBackButton(component);
	Alloy.CFG.tabGroup.getActiveTab().open(component);

	logger.log('Ti.UI.TabGroup.activeTab.open', identifier);
}
