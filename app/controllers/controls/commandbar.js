var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function sayDelete(e) {
	alert('Hey you just deleted something!');
}

function sayThanks(e) {
	if (e.checked) {
		alert('Thanks for liking!');
	}
}
