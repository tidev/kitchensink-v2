import Identity from 'ti.identity';

let authPhrase = '';

function handleOpen() {
	$.authenticate.title = 'Tap here to authenticate';

	if (!Identity.isSupported()) {
		return;
	}

	if (OS_IOS) {
		if (Identity.biometryType == Identity.BIOMETRY_TYPE_FACE_ID) {
			authPhrase = 'Face ID';
		} else if (Identity.biometryType == Identity.BIOMETRY_TYPE_TOUCH_ID) {
			authPhrase = 'Touch ID';
		} else {
			authPhrase = '(None available)';
		}
		$.authenticate.title = `Authenticate with: ${authPhrase}`;
	} else if (OS_ANDROID) {
		authPhrase = 'Fingerprint';
	}
}

function validate() {
	if (!Identity.isSupported()) {
		alert('Biometric authentication is not supported on this device or no identities are enrolled!');
		return;
	}

	if (OS_ANDROID) {
		$.androidFingerprint.setReason('Confirm fingerprint to authenticate');
		$.androidFingerprint.setTitle('Identity');
	}

	Identity.authenticate({
		reason: "Please authenticate to continue",
		fallbackTitle: "",
		callback: (e) => {
			if (OS_IOS) {
				Identity.invalidate();
				if (!e.success) {
					alert(e.error);
				} else {
					setTimeout(() => {
						alert('Successfully authenticated!');
					}, 1000);
				}
			} else if (OS_ANDROID) {
				if (e.success) {
					$.androidFingerprint.success();
				} else {
					$.androidFingerprint.failure(e.error);
				}
			}
		}
	});

	if (OS_ANDROID) {
		$.androidFingerprint.show(() => {
			Identity.invalidate();
		});
	}
}
