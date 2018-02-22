import { log } from 'log';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function showOptionDialog(e) {
    $.dialog.show();
}

function optionDialogClicked(e) {
    alert('Selected option at index: ' + e.index);
    log.log('Ti.UI.OptionDialog selected option at index: ' + e.index);
}
