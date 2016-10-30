var log = require("log");

/**
 * The scoped constructor of the controller.
 * @param args {Object} The arguments passed to initialize the controller.
 **/
(function constructor(args) {
    
})(arguments[0] || {});

function sliderValueChanged(e) {
    $.state.setText('Current value: ' + e.value.toFixed(2) + ' / ' + e.source.max);
    log.args('Ti.UI.Slider value changed to ' + e.value)
}
