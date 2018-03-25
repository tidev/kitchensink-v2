import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	const accelerometerCallback = ({ x, y, z }) => {
		$.accel_x.text = `x: ${x.toFixed(3)}`;
		$.accel_y.text = `y: ${y.toFixed(3)}`;
		$.accel_z.text = `z: ${z.toFixed(3)}`;
	};

	if (Ti.Platform.model === 'Simulator' || Ti.Platform.model.indexOf('sdk') !== -1) {
		alert('Accelerometer does not work on a virtual device');
		return;
	}

	Ti.Accelerometer.addEventListener('update', accelerometerCallback);

	if (OS_ANDROID) {
		$.accelerometer.addEventListener('open', () => {
			$.accelerometer.activity.addEventListener('pause', () => {
				logger.log('Ti.Accelerometer', 'removing accelerometer callback on pause');
				Ti.Accelerometer.removeEventListener('update', accelerometerCallback);
			});
			$.accelerometer.activity.addEventListener('resume', () => {
				logger.log('Ti.Accelerometer', 'adding accelerometer callback on resume');
				Ti.Accelerometer.addEventListener('update', accelerometerCallback);
			});
		});
	}

}());
