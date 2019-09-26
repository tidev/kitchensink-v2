import { logger } from 'logger';
import Map from 'ti.map';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
	Ti.Geolocation.distanceFilter = 10;

	// Check for Google Play Services. In order to view maps, Google Play services needs to be installed on the device
	if (OS_ANDROID) {
		Ti.Geolocation.preferredProvider = Ti.Geolocation.Android.PROVIDER_GPS;
		const rc = Map.isGooglePlayServicesAvailable();
		switch (rc) {
			case Map.SUCCESS:
				Ti.API.info('Google Play services is installed.');
				break;
			case Map.SERVICE_MISSING:
				alert('Google Play services is missing. Please install Google Play services from the Google Play store.');
				break;
			case Map.SERVICE_VERSION_UPDATE_REQUIRED:
				alert('Google Play services is out of date. Please update Google Play services.');
				break;
			case Map.SERVICE_DISABLED:
				alert('Google Play services is disabled. Please enable Google Play services.');
				break;
			case Map.SERVICE_INVALID:
				alert('Google Play services cannot be authenticated. Reinstall Google Play services.');
				break;
			default:
				alert('Unknown error.');
		}
	}

	// Checks for location service available
	if (Ti.Geolocation.locationServicesEnabled) {
		Ti.Geolocation.requestLocationPermissions(Ti.Geolocation.AUTHORIZATION_WHEN_IN_USE, (event) => {
			console.log(event);
			if (!event.success) {
				alert(`Error granting location permissions: ${event.error}`);
				return;
			}

			getCurrentPosition();
		});

		Ti.Geolocation.addEventListener('location', updatePosition);
	} else {
		Ti.API.error('Your device has GPS turned off. Please turn it on.');
	}
}());

function updatePosition(e) {
	if (!e.success || e.error) {
		Ti.API.debug(JSON.stringify(e));
		Ti.API.debug(e);
		return;
	}

	const geoPackage = JSON.stringify(e),
		latitude = e.coords.latitude,
		longitude = e.coords.longitude;

	$.geoloc.value = geoPackage;
	$.geo_lat.text = 'Latitude: ' + latitude;
	$.geo_long.text = 'Longitude: ' + longitude;

	logger.log('Ti.Geolocation', 'location: ' + geoPackage);
}

function getCurrentPosition() {
	Ti.Geolocation.getCurrentPosition((e) => {
		if (!e.success || e.error) {
			Ti.API.debug(JSON.stringify(e));
			Ti.API.debug(e);
			alert('Error getting current position');
			return;
		}
		const latitude = e.coords.latitude,
			longitude = e.coords.longitude;

		const mapview = Map.createView({
			userLocation: true,
			mapType: Map.NORMAL_TYPE,
			animate: true,
			region: {
				latitude: latitude,
				longitude: longitude,
				latitudeDelta: 0.1,
				longitudeDelta: 0.1
			},
			regionFit: true,
		});

		$.map.add(mapview);

		// Handle click events on any annotations on this map.
		mapview.addEventListener('click', (e) => {
			Ti.API.info('Clicked ' + e.clicksource + ' on ' + e.latitude + ',' + e.longitude);
		});
	});
}
