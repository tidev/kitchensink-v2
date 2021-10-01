
function onPickerValueChanged(e) {
	$.valueLabel.text = `Selected: ${e.row.title}`;
}
