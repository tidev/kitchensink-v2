
/**
 * Creates a ListView section with the given number of row items.
 * @param sectionTitle The name to be shown in section's header title.
 * @param rowCount Number of rows to create in section.
 */
function createListSection(sectionTitle, rowCount) {
	const items = [];
	for (let index = 1; index <= rowCount; index++) {
		items.push({
			properties: {
				title: `Row ${index}`,
				// This property normally enables swipe-to-delete,
				// but on iOS this shows a checkbox if ListView property "showSelectionCheck" is true.
				canEdit: OS_IOS ? true : false,
			}
		});
	}
	const section = Ti.UI.createListSection({
		headerTitle: sectionTitle,
		items: items,
	});
	return section;
}

/** Enables ListView's editing mode for multi-selection, if not done already. */
function enableSelectionMode() {
	// Do not continue if already in edit mode.
	if ($.listView.editing) {
		return;
	}

	// Enable edit mode.
	$.listView.editing = true;

	// Show selection options in top title bar.
	const selectedMessage = `${$.listView.selectedItems.length} Selected`;
	if (OS_IOS) {
		$.itemsSelectedLabel.text = selectedMessage;
		$.editToolbar.height = Ti.UI.SIZE;
		$.editToolbar.visible = true;
		$.mainToolbar.height = 0;
		$.mainToolbar.visible = false;
		$.win.leftNavButton = $.selectAllButton;
		$.win.rightNavButton = $.cancelButton;
	} else if (OS_ANDROID) {
		$.editToolbar.title = selectedMessage;
		$.editToolbar.visible = true;
		$.mainToolbar.visible = false;
		$.win.activity.setSupportActionBar($.editToolbar);
	}
}

/** Disables ListView's editing mode, if not done already. */
function disableSelectionMode() {
	// Do not continue if edit mode is already disabled.
	if ($.listView.editing === false) {
		return;
	}

	// Disable edit mode.
	$.listView.editing = false;

	// Hide selection options in top title bar.
	if (OS_IOS) {
		$.editToolbar.height = 0;
		$.editToolbar.visible = false;
		$.mainToolbar.height = Ti.UI.SIZE;
		$.mainToolbar.visible = true;
		$.win.leftNavButton = null;
		$.win.rightNavButton = $.editButton;
	} else if (OS_ANDROID) {
		$.editToolbar.visible = false;
		$.mainToolbar.visible = true;
		$.win.activity.setSupportActionBar($.mainToolbar);
	}
}

/** Enables ListView edit mode and selects all items. */
function selectAll() {
	enableSelectionMode();
	for (let sectionIndex = 0; sectionIndex < $.listView.sectionCount; sectionIndex++) {
		const section = $.listView.sections[sectionIndex];
		for (let itemIndex = 0; itemIndex < section.itemCount; itemIndex++) {
			$.listView.selectItem(sectionIndex, itemIndex);
		}
	}
	if (OS_IOS) {
		onItemsSelected({ selectedItems: $.listView.selectedItems });
	}
}

/** Asks user if okay to delete, then deletes all selected items, and disables edit mode. */
function deleteSelectedItems() {
	// Fetch all selected items. Do not continue if no selection was made.
	const selectedItems = $.listView.selectedItems;
	if (selectedItems.length <= 0) {
		return;
	}

	// Ask the end-user if it's okay to delete the selected items.
	const dialog = Ti.UI.createAlertDialog({
		message: 'Are you sure you want to delete the selected items?',
		buttonNames: [ 'Yes', 'No' ],
	});
	dialog.addEventListener("click", function(e) {
		// Do not continue unless "Yes" was selected.
		if (e.index != 0) {
			return;
		}

		// Reverse sort the selected items.
		selectedItems.sort((item1, item2) => {
			if (item1.sectionIndex != item2.sectionIndex) {
				return item2.sectionIndex - item1.sectionIndex;
			}
			return item2.itemIndex - item1.itemIndex;
		});

		// Delete all selected items.
		for (const nextItem of selectedItems) {
			nextItem.section.deleteItemsAt(nextItem.itemIndex, 1, { animated: false });
		}

		// Remove empty sections.
		for (let sectionIndex = $.listView.sectionCount - 1; sectionIndex >= 0; sectionIndex--) {
			const section = $.listView.sections[sectionIndex];
			if (section.itemCount <= 0) {
				$.listView.deleteSectionAt(sectionIndex);
			}
		}

		// Disable selection mode.
		disableSelectionMode();
	});
	dialog.show();
}

/** Displays a dialog listing all selected items in ListView. */
function shareSelectedItems() {
	// Fetch all selected items. Do not continue if no selection was made.
	const selectedItems = $.listView.selectedItems;
	if (selectedItems.length <= 0) {
		return;
	}

	// Display a dialog listing all selected items.
	let message = 'Sharing selected items:';
	for (const nextItem of selectedItems) {
		const section = nextItem.section;
		message += `\n- ${section.headerTitle}: ${section.getItemAt(nextItem.itemIndex).properties.title}`
	}
	alert(message);
}

/** Called when the window has been opened. */
function onWindowOpen() {
	if (OS_ANDROID) {
		$.win.activity.actionBar.displayHomeAsUp = true;
		$.win.activity.actionBar.onHomeIconItemSelected = () => {
			if ($.mainToolbar.visible) {
				$.win.close();
			} else {
				disableSelectionMode();
			}
		};
	}
}

/** Called when the window's size/layout and safe-area padding has changed. */
function onWindowPostLayout() {
	if (OS_IOS) {
		// Re-layout views to compensate for bottom safe-area padding such as iOS' bottom home indicator bar.
		// Note: We do this because our toolbar is docked to the bottom of the window.
		$.listView.height = $.win.size.height - ($.editToolbar.size.height + $.win.safeAreaPadding.bottom);
		$.bottomPaddingView.height = $.win.safeAreaPadding.bottom;
	}
}

/** Called when the Android back button was pressed. */
function onAndroidBack() {
	if ($.listView.editing) {
		disableSelectionMode();
	} else {
		$.win.close();
	}
}

/** Called on Android when ListView has been long-pressed. Enables "edit" mode. */
function onLongPressed(e) {
	if (OS_ANDROID && e.section && !$.listView.editing) {
		enableSelectionMode();
		$.listView.selectItem(e.sectionIndex, e.itemIndex);
	}
}

/** Called when a ListView item has been selected/checked in "edit" mode. */
function onItemsSelected(e) {
	const message = `${e.selectedItems.length} Selected`;
	if (OS_IOS) {
		$.itemsSelectedLabel.text = message;
	} else if (OS_ANDROID) {
		// Update selection count in top toolbar.
		$.editToolbar.title = message;

		// Disable "edit" mode once all items have been unselected.
		if (e.selectedItems.length <= 0) {
			disableSelectionMode();
		}
	}
}

/** Called when a ListView item has been tapped on while "edit" mode is disabled. */
function onItemClicked(e) {
	if (!$.listView.editing) {
		alert(`Tapped on...\n${e.section.headerTitle}: ${e.section.getItemAt(e.itemIndex).properties.title}`);
	} else if (OS_IOS) {
		onItemsSelected({ selectedItems: $.listView.selectedItems });
	}
}

// Add sections/rows to the ListView.
$.listView.sections = [
	createListSection('Section 1', 10),
	createListSection('Section 2', 10),
	createListSection('Section 3', 10),
	createListSection('Section 4', 10),
];

// Initialize iOS buttons to be used in navigation bar.
if (OS_IOS) {
	$.selectAllButton = Ti.UI.createButton({ title: 'Select All' });
	$.selectAllButton.addEventListener('click', selectAll);
	$.editButton = Ti.UI.createButton({ systemButton: Ti.UI.iOS.SystemButton.EDIT });
	$.editButton.addEventListener('click', enableSelectionMode);
	$.cancelButton = Ti.UI.createButton({ systemButton: Ti.UI.iOS.SystemButton.CANCEL });
	$.cancelButton.addEventListener('click', disableSelectionMode);
	$.win.rightNavButton = $.editButton;
}

// Initialize Android ActionBar, Toolbars, and menu items.
if (OS_ANDROID) {
	$.win.activity.supportToolbar = $.mainToolbar;
	$.editToolbar.navigationIcon = Ti.App.Android.R.drawable.ic_baseline_close_24;
	$.win.activity.onCreateOptionsMenu = (e) => {
		if ($.mainToolbar.visible) {
			const selectMenuItem = e.menu.add({
				title: 'Select',
				showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER,
			});
			selectMenuItem.addEventListener('click', enableSelectionMode);
		} else {
			const shareMenuItem = e.menu.add({
				title: 'Share',
				titleCondensed: '',
				icon: Ti.App.Android.R.drawable.ic_baseline_share_24,
				showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
			});
			shareMenuItem.addEventListener('click', shareSelectedItems);
			const deleteMenuItem = e.menu.add({
				title: 'Delete',
				titleCondensed: '',
				icon: Ti.App.Android.R.drawable.ic_baseline_delete_24,
				showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM,
			});
			deleteMenuItem.addEventListener('click', deleteSelectedItems);
		}
		const selectAllMenuItem = e.menu.add({
			title: 'Select All',
			showAsAction: Ti.Android.SHOW_AS_ACTION_NEVER,
		});
		selectAllMenuItem.addEventListener('click', selectAll);
	};
}
