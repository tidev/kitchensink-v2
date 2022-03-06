import { logger } from 'logger';

function handleMapClick(e) {
	let clickedAnnotation = null;

	// check if annotation was clicked
	if (e.hasOwnProperty('annotation')) {

		// check if the annotation was selected or deselected based on previous state
		if (e.annotation.id === clickedAnnotation) {
			logger.log('annotation deselected', e.annotation);
			clickedAnnotation = null;
		} else {
			logger.log('annotation selected', e.annotation);
			clickedAnnotation = e.annotation.id;
		}
	} else if (e.clicksource === 'circle') {
		logger.log('circle clicked', e.latitude, e.longitude);
	}
}

/* Right now Alloy doesn't add circles/polylines/polygons to map properly when they're created in Alloy
 * See https://jira-archive.titaniumsdk.com/ALOY/ALOY-1608
 * For now, either create them in the controller or add them manually
 */
$.mapview.addCircle($.mapCircle);
$.mapview.addPolylines([$.mapLineOne, $.mapLineTwo, $.mapLineThree]);
$.mapview.addPolygon($.mapPolygon);
