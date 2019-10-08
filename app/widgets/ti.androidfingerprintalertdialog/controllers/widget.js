var cancelCallback, usePasswordCallback;

if (OS_ANDROID) {
	$.fingerprintIcon.image = WPATH("android_fingerprint.png");
}

function show(CancelCB, UsePasswordCB) {
    $.fingerprintIcon.image = WPATH("android_fingerprint.png");
	$.fingerprintLabel.color = "#9c9c9c";
	$.fingerprintLabel.text = "Touch sensor";
	$.alertDialog.show();
	cancelCallback = CancelCB || {};
	usePasswordCallback = UsePasswordCB || {};
}

function hide() {
	$.alertDialog.hide();
}

function setTitle(title) {
	$.alertDialog.setTitle(title);
}

function setReason(reason) {
	$.alertDialog.setMessage(reason);
}

function success(duration) {
	duration = duration || 1000;
	$.fingerprintIcon.image = WPATH("android_fingerprint_success.png");
	$.fingerprintLabel.color = "#009689";
	$.fingerprintLabel.text = "Fingerprint recognized";
	setTimeout(function() {
		$.alertDialog.hide();
	}, duration);
}

function failure(message) {
	$.fingerprintIcon.image = WPATH("android_fingerprint_failure.png");
	$.fingerprintLabel.color = "#f4511f";
	$.fingerprintLabel.text = message || "Fingerprint not recognized.\nTry again.";
}

function fingerprintButtonPressed(e) {
	if (e.index === 1) {
		usePasswordCallback();
	} else if (e.index === 0) {
		cancelCallback();
	}
}

exports.show = show;
exports.hide = hide;
exports.setTitle = setTitle;
exports.setReason = setReason;
exports.success = success;
exports.failure = failure;
exports.fingerprintButtonPressed = fingerprintButtonPressed;
