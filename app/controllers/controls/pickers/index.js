import { logger } from 'logger';

function openComponent(e) {
	const identifier = 'controls/pickers/' + e.section.getItemAt(e.itemIndex).properties.itemId;
	const component = Alloy.createController(identifier).getView();

	Alloy.Globals.setAndroidBackButton(component);
	Alloy.CFG.tabGroup.activeTab.open(component);

	logger.log('Ti.UI.TabGroup.activeTab.open', identifier);
}
