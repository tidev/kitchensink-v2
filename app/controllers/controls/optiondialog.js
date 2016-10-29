var log = require("log");

/**
 * The scoped constructor of the controller.
 * @param args {Object} The arguments passed to initialize the controller.
 **/
(function constructor(args) {
    
})(arguments[0] || {});

function showOptionDialog(e) {
    $.dialog.show();
}

function optionDialogClicked(e) {
    alert('Selected option at index: ' + e.index);
    log.args('Ti.UI.OptionDialog selected option at index: ' + e.index);
}
