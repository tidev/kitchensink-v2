import { logger } from 'logger';

let soundPlayer;
let playbackInterval;

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	if (!OS_ANDROID) {
		Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_AMBIENT;
	}

	soundPlayer = Ti.Media.createSound({
		url: '/sounds/cricket.wav'
	});

	soundPlayer.addEventListener('complete', onPlaybackComplete);
	soundPlayer.addEventListener('resume', onPlaybackResume);
}());

function startPlayback() {
	soundPlayer.play();
	if (OS_ANDROID) {
		$.playbackProgress.max = soundPlayer.duration;
	} else {
		$.playbackProgress.max = soundPlayer.duration * 1000;
	}
}

function stopPlayback() {
	soundPlayer.stop();
	$.playbackProgress.value = 0;
}

function pausePlayback() {
	soundPlayer.pause();
}

function resetPlayback() {
	soundPlayer.reset();
	$.playbackProgress.value = 0;
}

function setVolumeUp() {
	if (soundPlayer.volume < 1.0) {
		soundPlayer.volume = soundPlayer.volume += 0.1;

		$.buttonVolumeUp.title = 'Volume++ (' + Math.round(soundPlayer.volume * 1000) / 1000 + ')';
		$.buttonVolumeDown.title = 'Volume--';
	}
}

function setVolumeDown() {
	if (soundPlayer.volume > 0.0) {
		// TODO: Too complicated for 1 line? :-)
		soundPlayer.volume = soundPlayer.volume < 0.1 ? 0 : (soundPlayer.volume -= 0.1);

		$.buttonVolumeDown.title = 'Volume-- (' + Math.round(soundPlayer.volume * 1000) / 1000 + ')';
		$.buttonVolumeUp.title = 'Volume++';
	}
}

function toggleLooping() {
	soundPlayer.setLooping(!soundPlayer.looping);
	$.buttonLooping.title = 'Looping (' + soundPlayer.looping + ')';
}

function onPlaybackComplete() {
	$.playbackProgress.value = 0;
}

function onPlaybackResume() {
	logger.log('Ti.Media.Sound', 'The sound player was resumed!');
}

function startInterval() {
	playbackInterval = setInterval(() => {
		if (soundPlayer.playing) {
			$.playbackProgress.value = soundPlayer.time;
			logger.log('Ti.Media.Sound', 'Time: ' + soundPlayer.time);
		}
	}, 500);
}

function stopInterval() {
	clearInterval(playbackInterval);
	soundPlayer.release();
}
