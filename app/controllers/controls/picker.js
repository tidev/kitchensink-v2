import { log } from 'log';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function pickerValueChanged(e) {
    $.state.setText('Picker value changed to ' + e.selectedValue);
    log.log('Ti.UI.Picker changed value to: ' + e.selectedValue);
}
