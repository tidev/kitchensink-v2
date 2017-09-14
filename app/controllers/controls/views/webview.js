var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function onBeforeLoad(e) {
    log.args('Ti.UI.WebView will start loading content', e);
}

function onLoad(e) {
    log.args('Ti.UI.WebView completed loading content', e);
}
