import { log } from 'log';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function sayHello(e) {
  alert('Hello from ' + e.source.title);
  log.log('Ti.UI.Toolbar selected button with title: ' + e.source.title);
}

function showWindowWithToolbar() {
  const component = Alloy.createController('controls/toolbarAsActionBar').getView();
  Alloy.CFG.tabGroup.getActiveTab().open(component);
}
