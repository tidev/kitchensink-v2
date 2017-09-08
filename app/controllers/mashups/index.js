var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function openComponent(e) {
    var identifier = 'mashups/' + e.section.getItemAt(e.itemIndex).properties.itemId;
    var component = Alloy.createController(identifier).getView();
    
    Alloy.Globals.setAndroidBackButton(component);
    Alloy.CFG.tabGroup.getActiveTab().open(component);
    
    log.args('Ti.UI.TabGroup.activeTab.open', identifier);
}
