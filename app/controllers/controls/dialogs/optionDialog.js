import { logger } from 'logger';

function onShowOptionDialog() {
	$.dialog.show();
}

function onOptionDialogClicked(e) {
	$.resultLabel.text = `Selected option at index: ${e.index}`;
	logger.log(`Ti.UI.OptionDialog selected option at index: ${e.index}`);
}
