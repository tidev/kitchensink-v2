var log = require("log");

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function showOptionDialog(e) {
    $.dialog.show();
}

function optionDialogClicked(e) {
    alert('Selected option at index: ' + e.index);
    log.args('Ti.UI.OptionDialog selected option at index: ' + e.index);
}
