import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function pickerValueChanged(e) {
    $.state.setText('Picker value changed to ' + e.selectedValue);
    logger.log('Ti.UI.Picker changed value to: ' + e.selectedValue);
}
