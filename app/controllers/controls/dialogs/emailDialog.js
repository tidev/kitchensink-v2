
function onShowEMailDialog() {
	const dialog = Ti.UI.createEmailDialog();
	if (dialog.isSupported()) {
		dialog.subject = 'This is the subject';
		dialog.toRecipients = [ 'john.doe@domain.com', 'jane.doe@domain.com' ];
		dialog.messageBody = 'This is the body.\nThis is the second line.';
		dialog.open();
	} else {
		alert('E-mail app not configured on this device.');
	}
}
