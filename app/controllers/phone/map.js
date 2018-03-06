var log = require('log');

var clickedAnnotation = null;
function handleMapClick(e) {
    // check if annotation was clicked
    if (e.hasOwnProperty('annotation')) {
        
        // check if the annotation was selected or deselected based on previous state
        if (e.annotation.id == clickedAnnotation) {
            log.args('annotation deselected', e.annotation);
            clickedAnnotation = null;
        } else {
            log.args('annotation selected', e.annotation);
            clickedAnnotation = e.annotation.id;
        }
    } else {
        if (e.clicksource == 'circle') {
            log.args('circle clicked', e.latitude, e.longitude);
        }
    }
}

/* Right now Alloy doesn't add circles/polylines/polygons to map properly when they're created in Alloy
 * See https://jira.appcelerator.org/browse/ALOY-1608 for more info
 * For now, either create them in the controller or add them manually
 */
$.mapview.addCircle($.mapCircle);
$.mapview.addPolylines([$.mapLineOne, $.mapLineTwo, $.mapLineThree]);
$.mapview.addPolygon($.mapPolygon);
