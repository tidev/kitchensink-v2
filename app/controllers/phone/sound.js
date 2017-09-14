var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function openSoundComponent(e) {
    var identifier = 'phone/' + e.section.getItemAt(e.itemIndex).properties.itemId;
    var component = Alloy.createController(identifier).getView();
    
    Alloy.CFG.tabGroup.getActiveTab().open(component);
    log.args('Ti.UI.TabGroup.activeTab.open', identifier);
}
