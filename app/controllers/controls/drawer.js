
function onClickLeft() {
	$.drawerLayout.toggleLeft();
}

function onClickRight() {
	$.drawerLayout.toggleRight();
}

function onClickClose() {
	$.win.close();
}

function onWindowOpen() {
	const actionBar = $.win.activity.actionBar;
	if (actionBar) {
		actionBar.displayHomeAsUp = true;
		actionBar.onHomeIconItemSelected = () => {
			if ($.drawerLayout.isRightOpen) {
				$.drawerLayout.toggleRight();
			} else {
				$.drawerLayout.toggleLeft();
			}
		};
	}
}

function onAndroidBack() {
	if ($.drawerLayout.isLeftOpen) {
		$.drawerLayout.closeLeft();
	} else if ($.drawerLayout.isRightOpen) {
		$.drawerLayout.closeRight();
	} else {
		$.win.close();
	}
}
