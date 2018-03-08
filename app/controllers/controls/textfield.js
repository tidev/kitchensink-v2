import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

var focussedTextfield;
function textFieldValueChanged(e) {
    logger.args(`${e.source.id} changed value to ${e.value}`);
}

function textFieldFocussed(e) {
    focussedTextfield = e.source.id;
    logger.args(`${e.source.id} focussed!`);
}

function textFieldBlurred(e) {
    focussedTextfield = null;
    logger.args(`${e.source.id} blurred!`);
}

function blurTextfield() {
    if (focussedTextfield) {
        $[focussedTextfield].blur();
    }
}
