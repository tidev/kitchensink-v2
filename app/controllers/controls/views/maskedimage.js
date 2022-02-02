
function onMaskButtonClicked() {
	const dialog = Ti.UI.createOptionDialog({
		title: "Select Mask",
		options: ['Circular', 'Circular Gradient', 'Linear Gradient' , 'None'],
	});
	dialog.addEventListener('click', (e) => {
		switch (e.index) {
			case 0:
				$.myMaskedImage.mask = '/images/mask-circle.png';
				break;
			case 1:
				$.myMaskedImage.mask = '/images/mask-circle-gradient.png';
				break;
			case 2:
				$.myMaskedImage.mask = '/images/mask-vertical-gradient.png';
				break;
			case 3:
				$.myMaskedImage.mask = null;
				break;
			default:
				return;
		}
		$.maskLabel.text = `Mask: ${dialog.options[e.index]}`;
	});
	dialog.show();
}
