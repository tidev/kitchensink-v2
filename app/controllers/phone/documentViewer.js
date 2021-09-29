
function openFile(filePath) {
	const docViewer = Ti.UI.iOS.createDocumentViewer({ url: filePath });
	docViewer.show();
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
