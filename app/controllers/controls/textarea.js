import { log } from 'log';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function textAreaValueChanged(e) {
    log.log('Ti.UI.TextArea changed value to ' + e.value);
}

function textAreaFocussed(e) {
    log.log('Ti.UI.TextArea focussed!');
}

function textAreaBlurred(e) {
    log.log('Ti.UI.TextArea blurred!');
}
