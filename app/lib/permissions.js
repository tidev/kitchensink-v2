exports.checkCameraPermission = function(clb) {
	var hasCameraPermissions = Ti.Media.hasCameraPermissions();

	if (hasCameraPermissions) {
		clb();
		return;
	}

	if (OS_IOS) {
		var map = {};
		map[Ti.Media.CAMERA_AUTHORIZATION_AUTHORIZED] = 'CAMERA_AUTHORIZATION_AUTHORIZED';
		map[Ti.Media.CAMERA_AUTHORIZATION_DENIED] = 'CAMERA_AUTHORIZATION_DENIED';
		map[Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED] = 'CAMERA_AUTHORIZATION_RESTRICTED';
		map[Ti.Media.CAMERA_AUTHORIZATION_NOT_DETERMINED] = 'CAMERA_AUTHORIZATION_NOT_DETERMINED';

		var cameraAuthorizationStatus = Ti.Media.cameraAuthorizationStatus;
		if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_RESTRICTED) {
			return;
		} else if (cameraAuthorizationStatus === Ti.Media.CAMERA_AUTHORIZATION_DENIED) {
			return;
		}
	}

	Ti.Media.requestCameraPermissions(function(e) {
		if (e.success) {
			clb();
			return;
		} else if (OS_ANDROID) {
			return;
		} else {
			return;
		}
	});
};
