var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function sayHello(e) {
  alert('Hello from ' + e.source.title);
  log.args('Ti.UI.Toolbar selected button with title: ' + e.source.title);
}

function showWindowWithToolbar() {
  var component = Alloy.createController('controls/toolbarAsActionBar').getView();
  Alloy.CFG.tabGroup.getActiveTab().open(component);
}
