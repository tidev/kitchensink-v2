
// Create global items array this view will add, delete, and move items from via ListView events.
if (!Alloy.Globals.listViewEditData) {
	const itemArray = [ 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6' ];
	Alloy.Globals.listViewEditData = {
		itemNames: itemArray,
		lastItemNumber: itemArray.length,
	};
}
const globalData = Alloy.Globals.listViewEditData;

/**
 * Creates an array of ListItem objects from the given name array.
 * @param nameArray Array of names to create ListItems from.
 * @returns Returns an array of ListItem objects.
 */
function createListItemsFromArray(nameArray) {
	const items = [];
	for (const nextName of nameArray) {
		items.push({
			properties: {
				title: nextName,
				canEdit: true,
				canMove: true,
			}
		});
	}
	return items;
}

/** Called when user has deleted an item from the ListView. */
function onDeletedItem(e) {
	globalData.itemNames.splice(e.itemIndex, 1);
}

/** Called when user has moved an item to a different position in the ListView via drag-and-drop. */
function onMovedItem(e) {
	if (OS_ANDROID) {
		// Android does not support "e.target*" event properties telling us where item was moved to.
		// So, fetch all ListView items (with new positions) and replace old global items with it.
		globalData.itemNames = $.listView.sections[0].items.map((nextItem) => {
			return nextItem.properties.title;
		});
	} else {
		// "e.itemIndex" was the moved item's old index position in list.
		// "e.targetItemIndex" is the moved item's new insert index position in list.
		const movedItemName = globalData.itemNames[e.itemIndex];
		globalData.itemNames.splice(e.itemIndex, 1);
		globalData.itemNames.splice(e.targetItemIndex, 0, movedItemName);
	}
}

/** Called when user has tapped on the "Add" button in the top title bar. */
function onAddItem() {
	globalData.lastItemNumber++;
	const newItemName = `Item ${globalData.lastItemNumber}`;
	globalData.itemNames.push(newItemName);
	$.listView.sections[0].appendItems(createListItemsFromArray([ newItemName ]));
}

// Add global items to ListView.
$.listView.sections = [
	Ti.UI.createListSection({
		items: createListItemsFromArray(globalData.itemNames),
	}),
];

// Set up Android "Add" menu item in ActionBar.
if (OS_ANDROID) {
	$.win.activity.onCreateOptionsMenu = (e) => {
		const addMenuItem = e.menu.add({
			title: 'Add',
			showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
		});
		addMenuItem.addEventListener('click', onAddItem);
	};
}
