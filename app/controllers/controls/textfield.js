import { log } from 'log';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function textFieldValueChanged(e) {
    log.log('Ti.UI.TextField changed value to ' + e.value);
}

function textFieldFocussed(e) {
    log.log('Ti.UI.TextField focussed!');
}

function textFieldBlurred(e) {
    log.log('Ti.UI.TextField blurred!');
}
