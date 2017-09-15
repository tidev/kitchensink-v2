var args = $.args;

function onClickLeft(e) {
	$.drawerLayout.toggleLeft();
}

function onClickRight(e) {
	$.drawerLayout.toggleRight();
}

function onClickClose(e) {
	$.drawer.close();
}

$.drawer.addEventListener('open', function() {
	var activity = $.drawer.getActivity();
	var actionbar = activity.getActionBar();

	if (actionbar) {
		actionbar.displayHomeAsUp = true;
		actionbar.onHomeIconItemSelected = function() {
			$.drawerLayout.toggleLeft();
		};
	}
});
