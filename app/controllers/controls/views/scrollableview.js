var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function scrollToView() {
    $.scrollable.scrollToView(1); // Index or view
}

function addNewView() {
    var newView = Ti.UI.createView({
        backgroundColor: 'rgba(' + _.random(0,255) + ',' + _.random(0,255) + ',' + _.random(0,255) + ', 1.0)' // Generate rgba-color
    });
        
    $.scrollable.addView(newView);
    log.args('Ti.UI.ScrollableView added new view at index ' + ($.scrollable.views.length - 1));

    validateButtons();
}

function removeLastView() {
    $.scrollable.removeView($.scrollable.views[$.scrollable.views.length - 1]);
    log.args('Ti.UI.ScrollableView deleted last view');
    
    validateButtons();
}

function scrollableViewDidScroll(e) {
    log.args('Ti.UI.ScrollableView did scroll to index ' + e.currentPage);
}

function validateButtons() {
    $.remove.setEnabled($.scrollable.views.length > 0);
    $.scrollTo.setEnabled($.scrollable.views.length >= 2);
}
