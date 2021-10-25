// All functions below are only used on iOS.

function hideNavBar() {
	if ($.win.navBarHidden === false) {
		$.win.hideNavBar();
		$.win.backgroundColor = 'black';
	}
}

function onSingleTap() {
	if ($.win.navBarHidden) {
		$.win.showNavBar();
		$.win.backgroundColor = 'white';
	} else {
		$.win.hideNavBar();
		$.win.backgroundColor = 'black';
	}
}

function onDoubleTap() {
	const scale = ($.scrollView.zoomScale > 1.0) ? 1.0 : 2.5;
	$.scrollView.setZoomScale(scale, { animated: true });
}

function onScale(e) {
	if (e.scale > 1.0) {
		hideNavBar();
	}
}

function onScroll() {
	hideNavBar();
}
