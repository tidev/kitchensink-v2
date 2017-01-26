var log = require("log");
var Map = require('ti.map');

Titanium.Geolocation.preferredProvider = Titanium.Geolocation.PROVIDER_GPS;
Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
Titanium.Geolocation.distanceFilter = 10;

//Check for Google Play Services. In order to view maps, Google Play services needs to be installed on the device
if (OS_ANDROID) {
    var rc = Map.isGooglePlayServicesAvailable();
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


//checks for location service available
if (Titanium.Geolocation.locationServicesEnabled) {
    
    //adds listener to app and pops alert when location found
    Ti.App.addEventListener("app:got.location", function(d) {

        var geoPackage = JSON.stringify(d),
            latitude = d.coords.latitude,
            longitude = d.coords.longitude;

        $.geoloc.value = geoPackage;
        $.geo_lat.text = "Latitude: " + latitude;
        $.geo_long.text = "Longitude: " + longitude;

        log.args('Titanium.Geolocation', 'location: ' + geoPackage);
    });

    function updatePosition(e) {

        if (!e.success || e.error) {
            Ti.API.debug(JSON.stringify(e));
            Ti.API.debug(e);
            return;
        }

        Ti.App.fireEvent("app:got.location", {
            "coords" : e.coords
        });
    }


    Titanium.Geolocation.getCurrentPosition(function(e) {

        if (Ti.Network.online) {

            var geoPackage = JSON.stringify(e),
                latitude = e.coords.latitude,
                longitude = e.coords.longitude;

            var mapview = Map.createView({
                userLocation : true,
                mapType : Map.NORMAL_TYPE,
                animate : true,
                region : {
                    latitude : latitude,
                    longitude : longitude,
                    latitudeDelta : 0.1,
                    longitudeDelta : 0.1
                },
                animate : true,
                regionFit : true,
                userLocation : true
            });

            $.map.add(mapview);

            //Handle click events on any annotations on this map.
            mapview.addEventListener('click', function(evt) {
                Ti.API.info("Clicked " + evt.clicksource + " on " + evt.latitude + "," + evt.longitude);
            });

        }
    });

    Titanium.Geolocation.addEventListener('location', updatePosition);
} else {
    Ti.API.debug('Your device has GPS turned off. Please turn it on.');
}

