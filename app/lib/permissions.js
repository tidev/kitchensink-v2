exports.checkCameraPermission = (cb) => {
	if (OS_WINDOWS) {
		return cb(true);
	} else {
		const hasCameraPermissions = Ti.Media.hasCameraPermissions();

		if (hasCameraPermissions) {
			cb(true);
			return;
		}

		if (OS_IOS) {
			let map = {};
			map[Ti.Media.CAMERA_AUTHORIZATION_AUTHORIZED] = 'CAMERA_AUTHORIZATION_AUTHORIZED';
			map[Ti.Media.CAMERA_AUTHORIZATION_DENIED] = 'CAMERA_AUTHORIZATION_DENIED';
			map[Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED] = 'CAMERA_AUTHORIZATION_RESTRICTED';
			map[Ti.Media.CAMERA_AUTHORIZATION_NOT_DETERMINED] = 'CAMERA_AUTHORIZATION_NOT_DETERMINED';

			const cameraAuthorization = Ti.Media.cameraAuthorization;
			if (cameraAuthorization === Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED || cameraAuthorization === Ti.Media.CAMERA_AUTHORIZATION_DENIED) {
				cb(false);
				return;
			}
		}

		Ti.Media.requestCameraPermissions((e) => {
			cb(e.success);
		});
	}
};
