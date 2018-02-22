function onClickLeft() {
	$.drawerLayout.toggleLeft();
}

function onClickRight() {
	$.drawerLayout.toggleRight();
}

function onClickClose() {
	$.drawer.close();
}

$.drawer.addEventListener('open', function () {
	var activity = $.drawer.getActivity();
	var actionbar = activity.getActionBar();

	if (actionbar) {
		actionbar.displayHomeAsUp = true;
		actionbar.onHomeIconItemSelected = function () {
			$.drawerLayout.toggleLeft();
		};
	}
});
