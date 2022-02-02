import { logger } from 'logger';

function onTextOptionBarClicked(e) {
	const message = `Clicked on text-only button: ${e.source.labels[e.index].title}`;
	alert(message);
	logger.log(message);
}

function onImageOptionBarClicked({ index }) {
	const message = `Clicked on image-only button index: ${index}`;
	alert(message);
	logger.log(message);
}

function onImageTextOptionBarClicked(e) {
	const message = `Clicked on image/text button: ${e.source.labels[e.index].title}`;
	alert(message);
	logger.log(message);
}

function onVerticalOptionBarClicked(e) {
	const message = `Clicked on vertical button: ${e.source.labels[e.index].title}`;
	alert(message);
	logger.log(message);
}
