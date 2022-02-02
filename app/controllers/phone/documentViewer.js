
function openFile(filePath) {
	if (OS_IOS) {
		// Display given file in-app.
		// Note: This won't show *.png and *.jpg files unless you disable app thinning.
		const docViewer = Ti.UI.iOS.createDocumentViewer({ url: filePath });
		docViewer.show();
	} else {
		// Display file via another app installed on this device, such as a PDF Reader.
		// - Use canOpenURL() to detect if there are any installed apps that can show given file.
		// - Must define a <queries/> intent for every mime-type passed to canOpenURL(). See "tiapp.xml" file.
		// - openURL() method can only open external files or non-compressed files within APK.
		// - See "./platform/android/build.gradle" file on how to use "noCompress" per file extension.
		if (Ti.Platform.canOpenURL(filePath)) {
			Ti.Platform.openURL(filePath, (e) => {
				if (!e.success) {
					alert('Failed to open PDF file.');
				}
			});
		} else {
			const fileExtension = Ti.Filesystem.getFile(filePath).extension();
			alert(`Please install a ${fileExtension.toUpperCase()} viewer app to open this file.`);
		}
	}
}

function onOpenTxtFile() {
	openFile('/docs/test.txt');
}

function onOpenRtfFile() {
	openFile('/docs/test.rtf');
}

function onOpenPdfFile() {
	openFile('/docs/test.pdf');
}

function onOpenJpegFile() {
	openFile('/images/cloud-wallpaper.jpg');
}
