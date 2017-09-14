var args = $.args;

$.btn_left.addEventListener('click', function(e) {
	$.drawerLayout.toggleLeft();
});
$.btn_right.addEventListener('click', function(e) {
	$.drawerLayout.toggleRight();
});
$.close.addEventListener("click", function(e) {
	$.drawer.close();
})
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
