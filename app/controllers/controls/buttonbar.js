import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function onTextButtonBarClicked(e) {
	const message = `Clicked on button: ${e.source.labels[e.index].title}`;
	alert(message);
	logger.log(message);
}

function onImageButtonBarClicked({ index }) {
	const message = `Clicked on image button index: ${index}`;
	alert(message);
	logger.log(message);
}
