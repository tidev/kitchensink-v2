## KitchenSink 2

This project gives an overview of native components available in Titanium. 
The components are grouped into multiple groups and can be logged in the "Logs" tab. 
It also includes full support for iOS and Android.

![screenshot](screenshot.png)


### Features
- [x] Full ES6+ support
- [x] API Logging
- [x] Controls (Switch, Slider, Tabbed Bar, Text Field, Alerts, Dialogs, ...)
- [x] Views (Scroll View, List View, Image View, Blur View, Web View, ...)
- [x] Services (Facebook)
- [x] Platform (Clipboard, URL-Schemes, Hyperloop, Databases, Geolocation, Camera, Gallery, ...)
- [ ] TODO: More Platform APIs (HTTP-Requests, Contacts, ...)

### Running the KitchenSink App

#### Via Appcelerator Studio

1. Import it via *Dashboard* if available.
2. Or import it via *File > Import... > Git > Git Repository as New Project* with *URI*:

		https://github.com/appcelerator/kitchensink-v2

3. Select a Simulator or Device to build to via *Run > Run As*.

#### Via CLI

1. Clone the repository:

		git clone https://github.com/appcelerator/kitchensink-v2

2. To run it with `appc run` first import it to the platform:

		appc new --import --no-services

3. Build to Simulator or Device:

		[appc run | ti build] -p ios [-T device]

### Contribution

Code contributions are greatly appreciated, please submit a new [pull request](https://github.com/appcelerator/kitchensink-v2/pull/new/master)!

### Legal Stuff

Appcelerator is a registered trademark of Appcelerator, Inc. Titanium is
a registered trademark of Appcelerator, Inc.  Please see the LEGAL information about using our trademarks,
privacy policy, terms of usage and other legal information at [http://www.appcelerator.com/legal](http://www.appcelerator.com/legal).
