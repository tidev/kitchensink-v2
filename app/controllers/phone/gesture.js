
function getNameFromOrientationId(orientationId) {
	switch (orientationId) {
		case Ti.UI.PORTRAIT:
			return 'Portrait Upright';
		case Ti.UI.UPSIDE_PORTRAIT:
			return 'Portrait Upside-Down';
		case Ti.UI.LANDSCAPE_LEFT:
			return 'Landscape Left';
		case Ti.UI.LANDSCAPE_RIGHT:
			return 'Landscape Right';
		case Ti.UI.FACE_UP:
			return 'Face Up';
		case Ti.UI.FACE_DOWN:
			return 'Face Down';
	}
	return 'Unknown';
}

// Called when the device orientation changes. (This is not the window's orientation.)
function onOrientationChanged(e) {
	$.orientationLabel.text = `Device Orientation:\n${getNameFromOrientationId(e.orientation)}`;
}

// Called when the device has been shaked.
function onShake() {
	$.shakeLabel.opacity = 1;
	$.shakeLabel.animate(Ti.UI.createAnimation({
		opacity: 0,
		duration: 2000
	}));
}

// Resume listening when the app has returned to the foreground from the background.
function onAppResumed() {
	Ti.Gesture.addEventListener('orientationchange', onOrientationChanged);
	Ti.Gesture.addEventListener('shake', onOrientationChanged);
}

// Stop listening when the app has been backgrounded.
function onAppPaused() {
	Ti.Gesture.removeEventListener('orientationchange', onOrientationChanged);
	Ti.Gesture.removeEventListener('shake', onOrientationChanged);
}

// Start listening when this window opens.
function onWindowOpen() {
	onOrientationChanged({ orientation: Ti.Gesture.orientation });
	Ti.Gesture.addEventListener('orientationchange', onOrientationChanged);
	Ti.Gesture.addEventListener('shake', onShake);
	Ti.App.addEventListener('resumed', onAppResumed);
	Ti.App.addEventListener('paused', onAppPaused);
}

// Stop listening when this window closes.
function onWindowClose() {
	Ti.Gesture.removeEventListener('orientationchange', onOrientationChanged);
	Ti.Gesture.removeEventListener('shake', onShake);
	Ti.App.removeEventListener('resumed', onAppResumed);
	Ti.App.removeEventListener('paused', onAppPaused);
}
