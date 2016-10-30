var log = require("log");

/**
 * The scoped constructor of the controller.
 * @param args {Object} The arguments passed to initialize the controller.
 **/
(function constructor(args) {
    
})(arguments[0] || {});

function pickerValueChanged(e) {
    $.state.setText('Picker value changed to ' + e.selectedValue);
    log.args('Ti.UI.Picker changed value to: ' + e.selectedValue);
}
