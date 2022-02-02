
function onScaleOptionBarClicked(e) {
	switch (e.index) {
		case 0: // Stretch scale
			$.myImage.scalingMode = Ti.Media.IMAGE_SCALING_FILL;
			break;
		case 1: // Crop scale
			$.myImage.scalingMode = Ti.Media.IMAGE_SCALING_ASPECT_FILL;
			break;
		case 2: // Letterbox scale
			$.myImage.scalingMode = Ti.Media.IMAGE_SCALING_ASPECT_FIT;
			break;
	}
}
