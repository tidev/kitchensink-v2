// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var log = require('log');

var accelerometerCallback = function(e) {
	$.accel_x.text = 'x: ' + e.x.toFixed(3);
	$.accel_y.text = 'y: ' + e.y.toFixed(3);
	$.accel_z.text = 'z: ' + e.z.toFixed(3);
};

if (Ti.Platform.model === 'Simulator' || Ti.Platform.model.indexOf('sdk') !== -1) {
	alert('Accelerometer does not work on a virtual device');
} else {
	Ti.Accelerometer.addEventListener('update', accelerometerCallback);
	if (Ti.Platform.name === 'android') {
		$.accelerometer.addEventListener('open', function(e) {
			$.accelerometer.activity.addEventListener('pause', function() {
				log.args('Ti.Accelerometer', 'removing accelerometer callback on pause');
				Ti.Accelerometer.removeEventListener('update', accelerometerCallback);
			});
			$.accelerometer.activity.addEventListener('resume', function() {
				log.args('Ti.Accelerometer', 'adding accelerometer callback on resume');
				Ti.Accelerometer.addEventListener('update', accelerometerCallback);
			});
		});
	}
}
