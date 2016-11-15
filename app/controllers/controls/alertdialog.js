var log = require("log");

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function showAlertDialog(e) {
    $.alert.show();
}

function alertDialogClicked(e) {
    alert('Selected button at index: ' + e.index);
    log.args('Ti.UI.AlertDialog selected button at index: ' + e.index);
}
