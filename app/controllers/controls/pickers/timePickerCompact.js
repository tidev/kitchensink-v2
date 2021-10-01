
function onPickerValueChanged() {
	const timeString = $.timePicker.value.toLocaleTimeString();
	$.valueLabel.text = `Selected Time:\n${timeString}`;
}
