// Assign the 'pop' feature to the button
$.button.previewContext = $.context;

function actionTitle(e) {
    alert("Title: " + e.title + " / Style: " + e.style+" / Index: " + e.index);
}

function action(e) {
    alert("Title: " + e.title + " / Style: " + e.style+" / Index: " + e.index);
}

function subAction(e) {
    alert("Title: " + e.title + " / Style: " + e.style+" / Subindex: " + e.index);
};

// Pop the preview
function pop() {
    $.detailWin.add($.detailText);
    $.detailWin.add($.buttonBack);
    $.detailWin.open();
}

function goBack() {
	$.detailWin.close();
}