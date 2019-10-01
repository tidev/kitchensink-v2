[<img src="http://www-static.appcelerator.com/badges/titanium-git-badge-sq@2x.png" height="20">](http://www.appcelerator.com/titanium/)
[<img src="http://www-static.appcelerator.com/badges/alloy-git-badge-sq@2x.png" height="20">](http://www.appcelerator.com/alloy/)
[!["License"](http://img.shields.io/badge/license-Apache%202.0-blue.svg?style=flat)](http://choosealicense.com/licenses/apache-2.0/)

# ti.androidfingerprintalertdialog

Titanium Alloy Widget - Android Fingerprint AlertDialog

The purpose of this widget is to simply apply all [the Material Style Guidelines](https://material.io/guidelines/patterns/fingerprint.html#fingerprint-behavior) for presenting a UI to request fingerprint authentication, failure, and success into a widget that could be added to any Titanium project.

Here is a [detailed Medium article](https://medium.com/adamtarmstrong/https-medium-com-adamtarmstrong-android-fingerprint-authentication-using-axway-titanium-2c73a6c35df1) from [Adam T Armstrong](https://github.com/adamtarmstrong) (the author) about its implementation.

![](/ti.androidfingerprintalertdialog/docs/android_fingerprint_states.png)

### Requirement

**Some form of Android Fingerprint Authentication**

> **NOTE**: The example below is using the opensource Ti.Reprint Hyperloop module (free/open-source from: https://github.com/loop-modules/Ti.Reprint )

### Usage

* Download the latest release of the widget.
* Unzip the folder to your project under `app/widgets/ti.androidfingerprintalertdialog`
* Add the widget as a dependency to your `app/config.json`
* Add widget to your project view (typically a login page)

```js
<Widget id="androidFingerprint" src="ti.androidfingerprintalertdialog" />
```

You can also decide if you want to be able to support the password fallback or not by adding `usePasswordFallback` to your widget instanciation.

```js
<Widget id="androidFingerprint" src="ti.androidfingerprintalertdialog" usePasswordFallback="true" />
```

* Use the `show()` method to display the AlertDialog from the Widget - as well as define the methods to use for click events:
	* 'Cancel'
	* 'Use Password' (optional)

```js
$.androidFingerprint.show(fingerprintCancel, fingerprintUsePassword);
```

* Use the events, `success` or `failure`, to update the AlertDialog UI accordingly.

```js
$.androidFingerprint.success();
```

or

```js
$.androidFingerprint.failure();
```

### Example

#### index.xml

```xml
<Alloy>
	<Window class="container">
		<Label id="label" text="Android Fingerprint AlertDialog Example" />
		<Widget id="androidFingerprint" src="ti.androidfingerprintalertdialog" />
	</Window>
</Alloy>
```

#### index.js

```js
/*
 * Initialize Reprint library
 */
if (OS_ANDROID) {
	var Reprint = require('reprint');
	Reprint.initialize();
}

function postLayout(){
	if (OS_ANDROID) {
		/*
		 * Check for Fingerprint HW as well as registered fingerprints
		 */
		if (!Reprint.isHardwarePresent()) {
		    alert('Your device does not support fingerprint recognition.');
		}
		if (!Reprint.hasFingerprintRegistered()) {
		    alert('You do not have any fingerprint registered in this device.');
		}
		if (Reprint.isHardwarePresent() && Reprint.hasFingerprintRegistered()) {
				/*
				 * Show Alert Dialog and set callbacks for click events 'Use Password' & 'Cancel'
				 * Add Reprint listener for fingerprint authentication
				 */
				Reprint.authenticate(successCallback, failureCallback);
				$.androidFingerprint.show(fingerprintUsePassword, fingerprintCancel);

				/*
				 * Define success | failure | UsePassword | Cancel
				 */
				function successCallback(moduleTag) {
					$.androidFingerprint.success();
					//Continue login process
				}
				function failureCallback(failureReason, fatal, errorMessage, moduleTag, errorCode) {
					$.androidFingerprint.failure();
				}
				function fingerprintUsePassword(){
					Reprint.cancelAuthentication();
				}
				function fingerprintCancel(){
					Reprint.cancelAuthentication();
				}
		}
	}
}

$.index.open();
```

#### config.json

```js
"dependencies": {
        "ti.androidfingerprintalertdialog": "1.0"
    }
```

### Android Theming

As we're using a stock `AlertDialog` from Titanium you can easily theme the look and feel of it buy following
[titanium recommendations]().

Example with a theme called `my_custom_theme` which you might have setup within your `tiapp.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="my_custom_theme" parent="@style/Theme.AppCompat.Light.DarkActionBar">
        ...
        <item name="android:timePickerDialogTheme">@style/AlertDialogCustom</item>
        <item name="android:datePickerDialogTheme">@style/AlertDialogCustom</item>
        <item name="alertDialogTheme">@style/AlertDialogCustom</item>
    </style>
    <style name="AlertDialogCustom" parent="Theme.AppCompat.Light.Dialog.Alert">
        <item name="colorAccent">#F26522</item>
        <item name="colorControlActivated">#F26522</item>
        <item name="android:textColor">#000000</item>
        <item name="android:textColorPrimary">#6f6f6f</item>
    </style>
</resources>
```

This will set the color of the title to `#000000`, the color of the message to `#6f6f6f` and the button color to `#f26522`.
