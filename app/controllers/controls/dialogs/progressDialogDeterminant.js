
let timerId = null;

function onShowProgressDialog() {
	$.progressIndicator.value = 0;
	$.progressIndicator.show();
	timerId = setInterval(() => {
		if ($.progressIndicator.value < $.progressIndicator.max) {
			$.progressIndicator.value++;
		} else {
			$.progressIndicator.hide();
			clearInterval(timerId);
		}
	}, 50);
}
