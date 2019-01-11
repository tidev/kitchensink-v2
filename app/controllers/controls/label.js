
/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function changeToCenterAlignment() {
	$.myLabel.textAlign = 'center';
}

function changeToLeftAlignment() {
	$.myLabel.textAlign = 'left';
}

function changeToRightAlignment() {
	$.myLabel.textAlign = 'right';
}

function changeToJustifyAlignment() {
	$.myLabel.textAlign = 3; // or 'justify' in Titanium 6.1.0 and later (TIMOB-3408)
}

function changeColor() {
	$.myLabel.color = 'red'; // or: '#ff0', '#ff0000', rgba('255, 0,0 , 1.0')
}
