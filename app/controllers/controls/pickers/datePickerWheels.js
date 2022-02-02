
function onPickerValueChanged() {
	const dateString = $.datePicker.value.toLocaleDateString();
	$.valueLabel.text = `Selected Date:\n${dateString}`;
}
