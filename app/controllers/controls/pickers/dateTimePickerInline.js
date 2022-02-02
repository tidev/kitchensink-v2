
function onPickerValueChanged() {
	const dateString = $.datePicker.value.toLocaleString();
	$.valueLabel.text = `Selected Date and Time:\n${dateString}`;
}
