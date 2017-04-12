## Kitchen Sink 2.0

This project gives an overview of native components available 
in Titanium. The components are grouped into multiple groups
and can be logged in the "Logs" tab.

<img width="976" src="https://abload.de/img/kitchensink-overview1duxu.png">

### Fetaures
- [x] API Logging
- [x] Controls (Switch, Slider, Tabbed Bar, Text Field, Alerts, Dialogs, ...)
- [x] Views (Scroll View, List View, Image View, Blur View, Web View, ...)
- [ ] TODO: Platform API's (HTTP-Requests, Contacts, Camera, Gallery, Geolocation, ...)
- [ ] TODO: Services (Hyperloop, Unit-Testing, Facebook, Maps, OAuth, ...)

### Roadmap

| Release Date | Milestone | Done |
|--------------|-----------| ----|
| November 14, 2016 | Initial Release (Basic support) | ✅ |
| January 05, 2016 | Support for 3D-Touch API’s (Peek and Pop / Shortcut Items) | ✅ |
| April 12 | Support for platform API examples | ✅ |
| Q2, 2017 | Support for platform services examples | 🛠 |

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
