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

function onOpen() {
	if (!Ti.Media.hasAudioRecorderPermissions()) {
		Ti.Media.requestAudioRecorderPermissions((e) => {
			if (e.success) {
				$.startRecordingButton.visible = true;
			} else {
				Ti.API.error('Error: Unable to request audio recorder permissions:');
				Ti.API.error(e);
			}
		});
	} else {
		$.startRecordingButton.visible = true;
	}
}

function onClose() {
	Ti.Media.audioSessionCategory = currentSessionCategory;
}

function startRecording() {
	audioRecorder.start();

	$.startRecordingButton.visible = false;
	$.pauseRecordingButton.visible = true;
	$.stopRecordingButton.visible = true;
}

function pauseRecording() {
	if (audioRecorder.paused) {
		$.pauseRecordingButton.title = 'Pause';
		audioRecorder.resume();
	} else {
		$.pauseRecordingButton.title = 'Resume';
		audioRecorder.pause();
	}
}

function stopRecording() {
	record = audioRecorder.stop();

	$.startRecordingButton.visible = true;
	$.playRecordingButton.visible = true;
	$.pauseRecordingButton.visible = false;
	$.stopRecordingButton.visible = false;
}

function playRecording() {
	const audioPlayer = Ti.Media.createAudioPlayer({
		url: record.nativePath
	});
	audioPlayer.start();
}
