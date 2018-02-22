var log = require('log'),
	audioRecorder,
	record,
	currentSessionCategory = Ti.Media.audioSessionCategory;

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

function onOpen() {
	if (!Ti.Media.hasAudioRecorderPermissions()) {
		Ti.Media.requestAudioRecorderPermissions(function (e) {
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

function onClose() {
	Ti.Media.audioSessionCategory = currentSessionCategory;
}

function startRecording() {
	audioRecorder.start();

	$.startRecordingButton.setVisible(false);
	$.pauseRecordingButton.setVisible(true);
	$.stopRecordingButton.setVisible(true);
}

function pauseRecording() {
	if (audioRecorder.getPaused()) {
		$.pauseRecordingButton.setTitle('Pause');
		audioRecorder.resume();
	} else {
		$.pauseRecordingButton.setTitle('Resume');
		audioRecorder.pause();
	}
}

function stopRecording() {
	record = audioRecorder.stop();

	$.startRecordingButton.setVisible(true);
	$.playRecordingButton.setVisible(true);
	$.pauseRecordingButton.setVisible(false);
	$.stopRecordingButton.setVisible(false);
}

function playRecording() {
	var audioPlayer = Ti.Media.createAudioPlayer({
		url: record.getNativePath()
	});
	audioPlayer.start();
}
