
/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function copyText() {
	if ($.copyField.value.length > 0) {
		Ti.UI.Clipboard.setText($.copyField.value);
		alert('Copied!');
	} else {
		alert('Enter some text before :-)');
	}
}

function pasteText() {
	if (Ti.UI.Clipboard.hasText() === true) {
		$.pasteField.value = Ti.UI.Clipboard.getText();
	} else {
		alert('No text on clipboard!');
	}
}
