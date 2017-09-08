var log,
		audioRecorder,
		record;

/**
 * The scoped constructor of the controller.
 **/
(function constructor(args) {
		log = require('log');
		audioRecorder = Ti.Media.createAudioRecorder();
})(arguments[0] || {});

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

function startRecording() {
    audioRecorder.start();

		$.startRecordingButton.setVisible(false);
		$.pauseRecordingButton.setVisible(true);
		$.stopRecordingButton.setVisible(true);
}

function pauseRecording() {
    if (audioRecorder.getPaused()) {
        $.pauseRecordingButton.setTitle('Pause');
        audioRecorder.resume()
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
