var log = require("log");

/**
 * The scoped constructor of the controller.
 * @param args {Object} The arguments passed to initialize the controller.
 **/
(function constructor(args) {
    
})(arguments[0] || {});

function fetchData() {
    // You would usually fetch your remote data here
    setTimeout(function() {
        $.refresh.endRefreshing();
    }, 2000);
}

function handleListViewClick(e) {
    log.args('Ti.UI.ListView clicked cell at index', e.sectionIndex  + ' / ' + e.itemIndex);
    this.deselectItem(e.sectionIndex, e.itemIndex);
}
