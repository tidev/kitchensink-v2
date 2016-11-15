var log = require("log");

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function fetchData() {
    // You would usually fetch your remote data here
    setTimeout(function() {
        $.refresh.endRefreshing();
        log.args('Ti.UI.RefreshControl finished refreshing');
    }, 1000);
}

function handleListViewClick(e) {
    log.args('Ti.UI.ListView clicked cell at index', e.sectionIndex  + ' / ' + e.itemIndex);
    if (OS_IOS){
        this.deselectItem(e.sectionIndex, e.itemIndex);
    }
}
