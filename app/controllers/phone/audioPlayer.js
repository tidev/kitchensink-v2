let closingWindow = false;

if (OS_IOS) {
	Ti.Media.audioSessionCategory = Ti.Media.AUDIO_SESSION_CATEGORY_PLAYBACK;
}

function handleOpen() {
	audioProgression({
		progress: 0
	});
	$.player.start();
}

function handleClose() {
	closingWindow = true;
	if ($.player.playing || $.player.paused) {
		$.player.stop();
	}
}

function toggleBattle() {
	// Ignore button if already playing
	if ($.battlePlayer.playing) {
		$.battlePlayer.stop();
		$.toggleBattle.title = 'Play battle sounds';
	} else {
		$.battlePlayer.start();
		$.toggleBattle.title = 'Stop battle sounds';
	}
}

function changeVolume(e) {
	// Both slider & volume is ranged from 0-1
	$.player.volume = e.value;
}

// Android only because STATE_STOPPED doesn't fire there
function handleMusicComplete() {
	if (!OS_ANDROID) {
		return;
	}
	changeMusic({ state: Ti.Media.AUDIO_STATE_STOPPED });
}

function changeMusic(e) {
	// Restart player when play is stopped
	if (e.state === Ti.Media.AUDIO_STATE_STOPPED && !closingWindow) {
		$.player.start();
	}
}

function audioProgression(e) {
	$.progress.text = timeFormat(e.progress) + '/' + timeFormat($.player.duration);
}

// Android only because STATE_STOPPING/STATE_STOPPED doesn't fire there
function handleBattleComplete() {
	if (!OS_ANDROID) {
		return;
	}
	completeBattle({ state: Ti.Media.AUDIO_STATE_STOPPING });
	completeBattle({ state: Ti.Media.AUDIO_STATE_STOPPED });
}

function completeBattle(e) {
	if (e.state === Ti.Media.AUDIO_STATE_STOPPING) {
		$.applause.start();
	} else if (e.state === Ti.Media.AUDIO_STATE_STOPPED) {
		$.toggleBattle.title = 'Play battle sounds';
	}
}

function timeFormat(time) {
	time = Math.round(time / 1000);
	// Hours, minutes and seconds
	const hrs = ~~(time / 3600);
	const mins = ~~((time % 3600) / 60);
	const secs = time % 60;

	// Output like "1:01" or "4:03:59" or "123:03:59"
	let result = '';

	if (hrs > 0) {
		result += String(hrs) + ':' + (mins < 10 ? '0' : '');
	}

	result += String(mins) + ':' + (secs < 10 ? '0' : '');
	result += String(secs);

	return result;
}
