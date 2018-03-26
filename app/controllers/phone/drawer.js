
// eslint-disable-next-line no-unused-vars
function onClickLeft() {
	$.drawerLayout.toggleLeft();
}

// eslint-disable-next-line no-unused-vars
function onClickRight() {
	$.drawerLayout.toggleRight();
}

// eslint-disable-next-line no-unused-vars
function onClickClose() {
	$.drawer.close();
}

$.drawer.addEventListener('open', () => {
	const activity = $.drawer.getActivity();
	const actionbar = activity.getActionBar();

	if (actionbar) {
		actionbar.displayHomeAsUp = true;
		actionbar.onHomeIconItemSelected = () => {
			$.drawerLayout.toggleLeft();
		};
	}
});
