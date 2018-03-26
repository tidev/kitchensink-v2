let audioRecorder;
let record;
let currentSessionCategory = Ti.Media.audioSessionCategory;

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	audioRecorder = Ti.Media.createAudioRecorder();

	if (OS_IOS) {
		audioRecorder.compression = Ti.Media.AUDIO_FORMAT_ULAW;
		audioRecorder.format = Ti.Media.AUDIO_FILEFORMAT_WAVE;

		Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_PLAY_AND_RECORD;
	}
}());

// eslint-disable-next-line no-unused-vars
function onOpen() {
	if (!Ti.Media.hasAudioRecorderPermissions()) {
		Ti.Media.requestAudioRecorderPermissions((e) => {
			if (e.success) {
				$.startRecordingButton.setVisible(true);
			} else {
				Ti.API.error('Error: Unable to request audio recorder permissions:');
				Ti.API.error(e);
			}
		});
	} else {
		$.startRecordingButton.setVisible(true);
	}
}

// eslint-disable-next-line no-unused-vars
function onClose() {
	Ti.Media.audioSessionCategory = currentSessionCategory;
}

// eslint-disable-next-line no-unused-vars
function startRecording() {
	audioRecorder.start();

	$.startRecordingButton.setVisible(false);
	$.pauseRecordingButton.setVisible(true);
	$.stopRecordingButton.setVisible(true);
}

// eslint-disable-next-line no-unused-vars
function pauseRecording() {
	if (audioRecorder.getPaused()) {
		$.pauseRecordingButton.setTitle('Pause');
		audioRecorder.resume();
	} else {
		$.pauseRecordingButton.setTitle('Resume');
		audioRecorder.pause();
	}
}

// eslint-disable-next-line no-unused-vars
function stopRecording() {
	record = audioRecorder.stop();

	$.startRecordingButton.setVisible(true);
	$.playRecordingButton.setVisible(true);
	$.pauseRecordingButton.setVisible(false);
	$.stopRecordingButton.setVisible(false);
}

// eslint-disable-next-line no-unused-vars
function playRecording() {
	const audioPlayer = Ti.Media.createAudioPlayer({
		url: record.getNativePath()
	});
	audioPlayer.start();
}
