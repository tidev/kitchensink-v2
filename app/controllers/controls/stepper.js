var log = require("log");

/**
 * The scoped constructor of the controller.
 * @param args {Object} The arguments passed to initialize the controller.
 **/
(function constructor(args) {
    
})(arguments[0] || {});

function stepperValueChanged(e) {
    alert('The stepper value changed to ' + e.value);
    log.args('Ti.UI.Stepper value changed to ' + e.value)
}
