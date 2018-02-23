import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function stepperValueChanged(e) {
    $.state.setText('The stepper value changed to ' + e.value);
    logger.log('Ti.UI.Stepper value changed to ' + e.value);
}
