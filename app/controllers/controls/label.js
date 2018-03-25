
/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

// eslint-disable-next-line no-unused-vars
function changeToCenterAlignment() {
	$.myLabel.setTextAlign('center');
}

// eslint-disable-next-line no-unused-vars
function changeToLeftAlignment() {
	$.myLabel.setTextAlign('left');
}

// eslint-disable-next-line no-unused-vars
function changeToRightAlignment() {
	$.myLabel.setTextAlign('right');
}

// eslint-disable-next-line no-unused-vars
function changeToJustifyAlignment() {
	$.myLabel.setTextAlign(3); // or 'justify' in Titanium 6.1.0 and later (TIMOB-3408)
}

// eslint-disable-next-line no-unused-vars
function changeColor() {
	$.myLabel.setColor('red'); // or: '#ff0', '#ff0000', rgba('255, 0,0 , 1.0')
}
