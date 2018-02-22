import { log } from 'log';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function openComponent(e) {
    var identifier = 'phone/' + e.section.getItemAt(e.itemIndex).properties.itemId;
    var component = Alloy.createController(identifier).getView();
    
    if (OS_ANDROID && identifier !== "phone/drawer") {
        Alloy.Globals.setAndroidBackButton(component);
    }
    Alloy.CFG.tabGroup.getActiveTab().open(component);

    log.log('Ti.UI.TabGroup.activeTab.open', identifier);
}
