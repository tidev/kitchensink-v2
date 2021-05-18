import Identity from 'ti.identity';

function handleOpen() {
	// Use passcode/pin-number as a fallback in case device doesn't support TouchID/FaceID.
	Identity.authenticationPolicy = Identity.AUTHENTICATION_POLICY_PASSCODE;

	// Do not continue if device does not support authentication.
	if (!Identity.isSupported()) {
		return;
	}

	// On iOS, we know ahead of time which authentication policy is available to us. Show it on button.
	if (OS_IOS) {
		let authPhrase = '';
		if (Identity.biometryType == Identity.BIOMETRY_TYPE_FACE_ID) {
			authPhrase = 'Face ID';
		} else if (Identity.biometryType == Identity.BIOMETRY_TYPE_TOUCH_ID) {
			authPhrase = 'Touch ID';
		} else {
			authPhrase = 'Passcode';
		}
		$.authenticate.title = `Authenticate with: ${authPhrase}`;
	}
}

function validate() {
	if (!Identity.isSupported()) {
		alert('Biometric authentication is not supported on this device or no identities are enrolled!');
		return;
	}

	Identity.authenticate({
		reason: "Please authenticate to continue",
		fallbackTitle: "",
		callback: (e) => {
			Identity.invalidate();
			if (!e.success) {
				alert(e.error);
			} else {
				setTimeout(() => {
					alert('Successfully authenticated!');
				}, 1000);
			}
		}
	});
}
