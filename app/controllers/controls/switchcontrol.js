import { log } from 'log';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function switchChanged(e) {
    $.state.setText('The switch value changed to ' + e.value);
    log.log('Ti.UI.Switch value changed to ' + e.value);
}
