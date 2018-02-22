const args = $.args;

function onClickLeft(e) {
	$.drawerLayout.toggleLeft();
}

function onClickRight(e) {
	$.drawerLayout.toggleRight();
}

function onClickClose(e) {
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
