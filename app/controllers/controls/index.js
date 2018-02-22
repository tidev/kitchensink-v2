import { log } from 'log';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function openComponent(e) {
    const identifier = 'controls/' + e.section.getItemAt(e.itemIndex).properties.itemId;
    const component = Alloy.createController(identifier).getView();
    
    Alloy.Globals.setAndroidBackButton(component);
    Alloy.CFG.tabGroup.getActiveTab().open(component);
    
    log.log('Ti.UI.TabGroup.activeTab.open', identifier);
}
