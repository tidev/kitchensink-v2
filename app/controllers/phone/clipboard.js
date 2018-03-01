
/**
 * The scoped constructor of the controller.
 **/
(function constructor(args) {

})(arguments[0] || {});

function copyText() {
	if ($.copyField.getValue().length > 0) {
		Ti.UI.Clipboard.setText($.copyField.getValue());
		alert('Copied!');
	} else {
		alert('Enter some text before :-)');
	}
}

function pasteText() {
	if (Ti.UI.Clipboard.hasText() === true) {
		$.pasteField.setValue(Ti.UI.Clipboard.getText());
	} else {
		alert('No text on clipboard!');
	}
}
