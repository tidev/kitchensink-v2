
/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	$.statusLabel.setText('Network type: ' + Ti.Network.networkType + ', online: ' + Ti.Network.online + ', name: ' + Ti.Network.networkTypeName);

	Ti.Network.addEventListener('change', function (e) {
		$.eventLabel.setText('Change fired! Network type: ' + e.networkType + ', online: ' + e.online + ', name: ' + e.networkTypeName);
	});
}());
