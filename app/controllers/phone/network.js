
/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	$.statusLabel.text = `Network type: ${Ti.Network.networkType}, online: ${Ti.Network.online}, name: ${Ti.Network.networkTypeName}`;

	Ti.Network.addEventListener('change', (e) => {
		$.eventLabel.text = `Change fired! Network type: ${e.networkType}, online: ${e.online}, name: ${e.networkTypeName}`;
	});
}());
