
let timerId = null;

function stopProgress() {
	if (timerId) {
		clearInterval(timerId);
		timerId = null;
	}
}

function startProgress() {
	stopProgress();
	timerId = setInterval(() => {
		if ($.progressBar.value < $.progressBar.max) {
			$.progressBar.value++;
			$.progressBar.message = `Progress at ${$.progressBar.value}%`;
		} else {
			stopProgress();
		}
	}, 50);
}

function onOpen() {
	startProgress();
}

function onClose() {
	stopProgress();
}
