import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function switchChanged(e) {
    $.state.setText('The switch value changed to ' + e.value);
    logger.log('Ti.UI.Switch value changed to ' + e.value);
}
