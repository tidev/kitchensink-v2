
[![Greenkeeper badge](https://badges.greenkeeper.io/appcelerator/babel-plugin-transform-titanium.svg)](https://greenkeeper.io/)

This is a babel plugin intended to optimize Titanium SDK applications by inlining various static values. Once inlined, Other babel plugins may performa additional optimizations to help strip away "dead code".

Information about the current Titanium application build should be passed to the plugin's options object.

## Plugin Options

```javascript
const options = {
	deploytype: 'development', // one of 'development', 'test', 'production'
	platform: undefined, // one of 'android', 'ios', 'windows'
	target: undefined, // one of 'dist-playstore', 'dist-appstore', 'dist-adhoc', null/undefined
	Ti: {
		version: undefined, // string, SDK version
		App: {
			id: undefined, // string, application id from tiapp.xml
			name: undefined, // string, application name from tiapp.xml
			version: undefined, // string, application version from tiapp.xml
		}
		Platform: {
			osname: undefined, // one of 'android', 'ipad', 'iphone', 'windowsphone', 'windowsstore'
		}
	}
};
```

## Special "defines"
It can:
- replace special `OS_*` references with boolean values
  - `OS_IOS` - `true` iff `pluginOptions.platform === 'ios'`
  - `OS_ANDROID` - `true` iff `pluginOptions.platform === 'android'`
  - `OS_WINDOWS` - `true` iff `pluginOptions.platform === 'windows'`
  - Useful for `if`/`else` guards for platform specific code. Once booleans are inlined the false blocks can be removed.
- replace special `ENV_*` references with boolean values
  - `ENV_DEV` and `ENV_DEVELOPMENT` - `true` iff `pluginOptions.deploytype === 'development'` (typically simulator builds)
  - `ENV_TEST` - `true` iff `pluginOptions.deploytype === 'test'` (typically device builds)
  - `ENV_PROD` and `ENV_PRODUCTION` - `true` iff `pluginOptions.deploytype === 'production'` (typically app store/ad hoc builds)
- replace special `DIST_*` references with boolean values
  - `DIST_ADHOC` - `true` iff `pluginOptions.target === 'dist-adhoc'`
  - `DIST_STORE` - `true` iff `pluginOptions.target === 'dist-appstore' || pluginOptions.target === 'dist-playstore'`

## OS "sniffing" via Ti.Platform.osname
- replace typical "sniff" expressions for iOS/Windows using `Ti.Platform.osname` with static boolean values
i.e.
```javascript
if (Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad') {
	Ti.API.info('on ios!');
}
if (Ti.Platform.osname === 'windowsstore' || Ti.Platform.osname === 'windowsphone') {
	Ti.API.info('on windows!');
}
```

