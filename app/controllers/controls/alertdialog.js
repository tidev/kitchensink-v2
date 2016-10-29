var log = require("log");

/**
 * The scoped constructor of the controller.
 * @param args {Object} The arguments passed to initialize the controller.
 **/
(function constructor(args) {
    
})(arguments[0] || {});

function showAlertDialog(e) {
    $.alert.show();
}

function alertDialogClicked(e) {
    alert('Selected button at index: ' + e.index);
    log.args('Ti.UI.AlertDialog selected button at index: ' + e.index);
}
