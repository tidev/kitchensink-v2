/**
 * Creates an array of ListItem objects to be appended to a ListView section.
 * @param startIndex Starting row number to use as the title.
 * @returns Returns an array of list items to be appended to ListView.
 */
function createListItemsStartingFrom(startIndex) {
	const items = [];
	const maxIndex = startIndex + 49;
	for (var index = startIndex; index <= maxIndex; index++) {
		items.push({ properties: { title: `Row ${index}` } });
	}
	return items;
}

// Add an initial set of items to the ListView.
$.listView.sections = [
	Ti.UI.createListSection({
		items: createListItemsStartingFrom(1),
	})
];

// Set a marker on the last item in the list. (ie: The bottom of the ListView.)
// When the marked item scrolls into view, the "marker" event will fire and invoke below onMarker() function.
$.listView.setMarker({
	sectionIndex: 0,
	itemIndex: $.listView.sections[0].items.length - 1,
});

/** Called when the ListView "marker" event has been fired. */
function onMarker() {
	// Show fullscreen activity indicator before appending new items to ListView.
	$.activityOverlay.visible = true;
	$.activityIndicator.show();
	setTimeout(() => {
		// Append new items to ListView.
		const section = $.listView.sections[0];
		section.appendItems(createListItemsStartingFrom(section.items.length + 1));

		// The last marker has been cleared. Add a new marker set to the last item appended to ListView.
		$.listView.setMarker({
			sectionIndex: 0,
			itemIndex: section.items.length - 1,
		});

		// Hide fullscreen activity indicator.
		$.activityOverlay.visible = false;
	}, 1000);
}
