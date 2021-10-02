
let timerId = null;

function onWindowClose() {
	if (timerId) {
		clearTimeout(timerId);
		timerId = null;
	}
}

function onShowProgressDialog() {
	$.progressDialog.show();

	timerId = setTimeout(() => {
		timerId = null;
		$.progressDialog.hide();
	}, 2000);
}
