var log = require("log");

/**
 * The scoped constructor of the controller.
 * @param args {Object} The arguments passed to initialize the controller.
 **/
(function constructor(args) {
    
})(arguments[0] || {});

function onBeforeLoad(e) {
    log.args('Ti.UI.WebView will start loading content', e);
}

function onLoad(e) {
    log.args('Ti.UI.WebView completed loading content', e);
}
