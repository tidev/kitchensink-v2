var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function stepperValueChanged(e) {
    $.state.setText('The stepper value changed to ' + e.value);
    log.args('Ti.UI.Stepper value changed to ' + e.value);
}
