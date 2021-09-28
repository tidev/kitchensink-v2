
function onColorOptionBarClicked(e) {
	switch (e.index) {
		case 0:
			$.myMaskedImage.tint = 'red';
			break;
		case 1:
			$.myMaskedImage.tint = 'green';
			break;
		case 2:
			$.myMaskedImage.tint = 'blue';
			break;
		case 3:
			$.myMaskedImage.tint = 'black';
			break;
	}
}
