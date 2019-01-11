import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function openComponent(e) {
	const identifier = 'mashups/' + e.section.getItemAt(e.itemIndex).properties.itemId;
	const component = Alloy.createController(identifier).getView();

	Alloy.Globals.setAndroidBackButton(component);
	Alloy.CFG.tabGroup.activeTab.open(component);

	logger.log('Ti.UI.TabGroup.activeTab.open', identifier);
}
