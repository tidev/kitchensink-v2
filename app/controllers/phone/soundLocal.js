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
})();

function startPlayback() {
    soundPlayer.play();
    $.playbackProgress.setMax(soundPlayer.getDuration() * 1000);
}

function stopPlayback() {
    soundPlayer.stop();
    $.playbackProgress.setValue(0);
}

function pausePlayback() {
    soundPlayer.pause();
}

function resetPlayback() {
    soundPlayer.reset();
    $.playbackProgress.setValue(0);
}

function setVolumeUp() {
    if (soundPlayer.getVolume() < 1.0) {
        soundPlayer.setVolume(soundPlayer.volume += 0.1);

        $.buttonVolumeUp.setTitle('Volume++ (' + Math.round(soundPlayer.getVolume() * 1000) / 1000 + ')');
        $.buttonVolumeDown.setTitle('Volume--');
	}
}

function setVolumeDown() {
    if (soundPlayer.getVolume() > 0.0) {
         // TODO: Too complicated for 1 line? :-)
        soundPlayer.setVolume(soundPlayer.getVolume() < 0.1 ? 0 : (soundPlayer.volume -= 0.1));

        $.buttonVolumeDown.setTitle('Volume-- (' + Math.round(soundPlayer.getVolume() * 1000) / 1000 + ')');
        $.buttonVolumeUp.setTitle('Volume++');
    }
}

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

function startInterval() {
    playbackInterval = setInterval(() => {
		if (soundPlayer.isPlaying()) {
			$.playbackProgress.setValue(soundPlayer.getTime() * 1000);
            logger.log('Ti.Media.Sound', 'Time: ' + soundPlayer.getTime());
		}
	}, 500);
}

function stopInterval() {
    clearInterval(playbackInterval);
    soundPlayer.release();
}
