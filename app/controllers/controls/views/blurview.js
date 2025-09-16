
function onOpen() {
	 // Create circular animation to live-test the blur effect
	const density = Ti.Platform.osname === 'android' ? Ti.Platform.displayCaps.logicalDensityFactor : 1;
	const centerX = Ti.Platform.displayCaps.platformWidth / density / 2;
	const centerY = Ti.Platform.displayCaps.platformHeight / density / 3

	const radius = 100;
	let angle = 0;

	const animateCircle = () => {
		angle += 0.1;
		const x = centerX + Math.cos(angle) * radius - 100; // subtract half width
		const y = centerY + Math.sin(angle) * radius - 100; // subtract half height

		$.blurView.animate({
			left: x,
			top: y,
			duration: 50
		}, () => animateCircle());
	};

	animateCircle();
}

function changeBlurEffect({ index }) {
	const effects = [
		Ti.UI.iOS.BLUR_EFFECT_STYLE_LIGHT,
		Ti.UI.iOS.BLUR_EFFECT_STYLE_EXTRA_LIGHT,
		Ti.UI.iOS.BLUR_EFFECT_STYLE_DARK,
	];

	$.glassTabs.index = -1;
	$.blurView.effect = effects[index];
}

function changeGlassEffect({ index }) {
	const effects = [
		Ti.UI.iOS.GLASS_EFFECT_STYLE_REGULAR,
		Ti.UI.iOS.GLASS_EFFECT_STYLE_CLEAR
	];
	
	$.blurTabs.index = -1;
	$.blurView.glassEffect = { style: effects[index], interactive: true }
}

