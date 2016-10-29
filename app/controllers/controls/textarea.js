var log = require("log");

/**
 * The scoped constructor of the controller.
 * @param args {Object} The arguments passed to initialize the controller.
 **/
(function constructor(args) {
    
})(arguments[0] || {});

function textAreaValueChanged(e) {
    log.args('Ti.UI.TextArea changed value to ' + e.value);
}

function textAreaFocussed(e) {
    log.args('Ti.UI.TextArea focussed!');
}

function textAreaBlurred(e) {
    log.args('Ti.UI.TextArea blurred!');
}
