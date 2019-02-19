
function onClickLeft() {
	$.drawerLayout.toggleLeft();
}

function onClickRight() {
	$.drawerLayout.toggleRight();
}

function onClickClose() {
	$.drawer.close();
}

$.drawer.addEventListener('open', () => {
	const activity = $.drawer.activity;
	const actionbar = activity.actionBar;

	if (actionbar) {
		actionbar.displayHomeAsUp = true;
		actionbar.onHomeIconItemSelected = () => {
			$.drawerLayout.toggleLeft();
		};
	}
});
