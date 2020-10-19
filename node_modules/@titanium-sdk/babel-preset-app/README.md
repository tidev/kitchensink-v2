# @titanium-sdk/babel-preset-app

This is the default Babel preset used in Titanium app projects that have Webpack enabled.

> ℹ️ Note: The Titanium CLI will automatically configure this preset based on your current build command. If you want to also include this preset in your third-party libraries you need to configure it yourself.

## Included in this Preset

### [@babel/preset-env](https://new.babeljs.io/docs/en/next/babel-preset-env.html)

`preset-env` automatically determines the transforms and polyfills to apply based on your current build target.

### [@babel/plugin-transform-runtime](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime)

`transform-runtime` avoids inlining helpers in every file. This is enabled for helpers only, since polyfills are handled by `babel-preset-env`.

### [babel-plugin-transform-titanium](https://github.com/appcelerator/babel-plugin-transform-titanium)

`babel-plugin-transform-titanium` optimizes your Titanium SDK applications by inlining various static values. Once inlined, other babel plugins may perform additional optimizations to help strip away "dead code".

## Options

### `env`

All options from [@babel/preset-env](https://babeljs.io/docs/en/next/babel-preset-env.html) are supported under the `env` key.

### `titanium`

All options from [babel-plugin-transform-titanium](https://github.com/appcelerator/babel-plugin-transform-titanium) are supported under the `titanium` key.

## Default configuration

This preset will be automatically configured when used in Titanium app projects. The default options are:

- `env`
  - `useBuiltIns: false`: Disabled for now because the Titanium core runtime already bundles all neccessary polyfills. See [TIMOB-27629](https://jira.appcelerator.org/browse/TIMOB-27629) for a planned improvement of this option.
  - `targets`: Will be set depending on the platform you build for. On Android this is the V8 version Titanium was build for. On iOS this is either the configured `<min-ios-ver>` of your project, or the default minimum supported iOS version of the SDK you are building with.

- `titanium`
  - `deploytype`: The deployment type of the issued build command.
  - `platform`: The platform you are building for.
  - `target`: The deployment target you are building for.
  - `Ti`: Will be populated with values from the SDK you are building with.

## Contributions

Open source contributions are greatly appreciated! If you have a bugfix, improvement or new feature, please create
[an issue](https://github.com/appcelerator/babel-preset-app/issues/new) first and submit a [pull request](https://github.com/appcelerator/babel-preset-app/pulls/new) against master.

## Getting Help

If you have questions about the Titanium Babel preset, feel free to reach out on Stackoverflow or the
`#helpme` channel on [TiSlack](http://tislack.org). In case you find a bug related to this library, create a [new issue](https://github.com/appcelerator/babel-preset-app/issues/new)
or open a [new JIRA ticket](https://jira.appcelerator.org).

## License

Apache License, Version 2.0
