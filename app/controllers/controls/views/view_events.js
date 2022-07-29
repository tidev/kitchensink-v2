function onSwipe(e) {
	$.lbl_swipe_event.text = "Swipe: direction " + e.direction;
}

function onTouchstart(e) {
	$.lbl_touch_event.text = "Touch (start): x=" + e.x + ", y=" + e.y;
}

function onTouchend(e) {
	$.lbl_touch_event.text = "Touch (end): x=" + e.x + ", y=" + e.y;
}

function onTouchmove(e) {
	$.lbl_touch_move_event.text = "Touch (move): x=" + e.x + ", y=" + e.y;
}

function onClick(e) {
	$.lbl_click_event.text = "Click: x=" + e.x + ", y=" + e.y;
}

function onSingleTap(e) {
	$.lbl_tap_event.text = "Single tap: x=" + e.x + ", y=" + e.y;
}

function onDbltap(e) {
	$.lbl_tap_event.text = "Double tap: x=" + e.x + ", y=" + e.y;
}

function onDblclick(e) {
	$.lbl_click_event.text = "Double click: x=" + e.x + ", y=" + e.y;
}
