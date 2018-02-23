import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function textFieldValueChanged(e) {
    logger.log('Ti.UI.TextField changed value to ' + e.value);
}

function textFieldFocussed(e) {
    logger.log('Ti.UI.TextField focussed!');
}

function textFieldBlurred(e) {
    logger.log('Ti.UI.TextField blurred!');
}
