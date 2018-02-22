import { log } from 'log';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function fetchData() {
    // You would usually fetch your remote data here
    setTimeout(() => {
        $.refresh.endRefreshing();
        log.log('Ti.UI.RefreshControl finished refreshing');
    }, 1000);
}

function handleListViewClick(e) {
    log.log('Ti.UI.ListView clicked cell at index', e.sectionIndex  + ' / ' + e.itemIndex);
    if (OS_IOS) {
        this.deselectItem(e.sectionIndex, e.itemIndex);
    }
}
