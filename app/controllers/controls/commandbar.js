/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function sayDelete() {
	alert('Hey you just deleted something!');
}

function sayThanks({ checked }) {
	if (checked) {
		alert('Thanks for liking!');
	}
}
