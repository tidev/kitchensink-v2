var recorder = null;

function onOpen() {
	if (!Ti.Media.hasAudioPermissions()) {
		Ti.Media.requestAudioPermissions(function(e) {
			if (!e.success) {
				alert('Audio Recording Permissions not granted. Skipping!');
				return;
			}		
			
			Ti.API.info('Audio Recorder Permissions now granted!');
			initializeAudioEvents();
		});
	} else {
		Ti.API.info('Audio Recorder Permissions already granted!');
		initializeAudioEvents();
	}
}
 
function initializeAudioEvents() {
	recorder = Ti.Media.createAudioRecorder();

	Ti.App.addEventListener('resumed', onResume);
	Ti.App.addEventListener('pause', onPause);
}
 
function onResume() {
	if (!recorder) {
		return;
	}
 
	recorder.stop();
 
	Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_PLAYBACK;
	
	log.args('category: ' + Ti.Media.audioSessionCategory);
	log.args('playback: ' + Ti.Media.AUDIO_SESSION_CATEGORY_PLAYBACK);
	
	log.args('onResume');
 
}
 
function onPause() {
	if (!recorder) {
		return;
	}
 
	Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_PLAY_AND_RECORD;
 
	log.args('category: ' + Ti.Media.audioSessionCategory);
  log.args('play_and_record: ' + Ti.Media.AUDIO_SESSION_CATEGORY_PLAY_AND_RECORD);
	log.args('onPause');
    
	recorder.start();
}
