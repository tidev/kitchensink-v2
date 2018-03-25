import { logger } from 'logger';

let soundPlayer;
let playbackInterval;

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	if (!OS_ANDROID) {
		Ti.Media.setAudioSessionCategory(Ti.Media.AUDIO_SESSION_CATEGORY_AMBIENT);
	}

	soundPlayer = Ti.Media.createSound({
		url: 'sounds/cricket.wav'
	});

	soundPlayer.addEventListener('complete', onPlaybackComplete);
	soundPlayer.addEventListener('resume', onPlaybackResume);
}());

// eslint-disable-next-line no-unused-vars
function startPlayback() {
	soundPlayer.play();
	$.playbackProgress.setMax(soundPlayer.getDuration() * 1000);
}

// eslint-disable-next-line no-unused-vars
function stopPlayback() {
	soundPlayer.stop();
	$.playbackProgress.setValue(0);
}

// eslint-disable-next-line no-unused-vars
function pausePlayback() {
	soundPlayer.pause();
}

// eslint-disable-next-line no-unused-vars
function resetPlayback() {
	soundPlayer.reset();
	$.playbackProgress.setValue(0);
}

// eslint-disable-next-line no-unused-vars
function setVolumeUp() {
	if (soundPlayer.getVolume() < 1.0) {
		soundPlayer.setVolume(soundPlayer.volume += 0.1);

		$.buttonVolumeUp.setTitle('Volume++ (' + Math.round(soundPlayer.getVolume() * 1000) / 1000 + ')');
		$.buttonVolumeDown.setTitle('Volume--');
	}
}

// eslint-disable-next-line no-unused-vars
function setVolumeDown() {
	if (soundPlayer.getVolume() > 0.0) {
		// TODO: Too complicated for 1 line? :-)
		soundPlayer.setVolume(soundPlayer.getVolume() < 0.1 ? 0 : (soundPlayer.volume -= 0.1));

		$.buttonVolumeDown.setTitle('Volume-- (' + Math.round(soundPlayer.getVolume() * 1000) / 1000 + ')');
		$.buttonVolumeUp.setTitle('Volume++');
	}
}

// eslint-disable-next-line no-unused-vars
function toggleLooping() {
	soundPlayer.setLooping(!soundPlayer.looping);
	$.buttonLooping.setTitle('Looping (' + soundPlayer.isLooping() + ')');
}

function onPlaybackComplete() {
	$.playbackProgress.setValue(0);
}

function onPlaybackResume() {
	logger.log('Ti.Media.Sound', 'The sound player was resumed!');
}

// eslint-disable-next-line no-unused-vars
function startInterval() {
	playbackInterval = setInterval(() => {
		if (soundPlayer.isPlaying()) {
			$.playbackProgress.setValue(soundPlayer.getTime() * 1000);
			logger.log('Ti.Media.Sound', 'Time: ' + soundPlayer.getTime());
		}
	}, 500);
}

// eslint-disable-next-line no-unused-vars
function stopInterval() {
	clearInterval(playbackInterval);
	soundPlayer.release();
}
