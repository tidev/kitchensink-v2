# @titanium-sdk/webpack-plugin-babel

> Babel plugin for Appcd Webpack

## Installation

To install this plugin in an existing project, run the following command in your project root:

```sh
npm i -D @titanium-sdk/webpack-plugin-babel
```

## Configuration

When installing this plugin into an existing project, create a `babel.config.js` to configure babel. For Titanium apps the [`@titanium-sdk/babel-preset-app`](https://github.com/appcelerator/babel-preset-app) is recommended (and is already included in this plugin), but you can use any other Babel presets or plugins.

```js
module.exports = {
  presets: [
    '@titanium-sdk/app'
  ]
};
```

New Titanium projects created with one of the Webpack project templates will already include this file.

> 💡 **TIP:** In case you want to use another preset, we highly recommend to include [babel-plugin-transform-titanium](https://github.com/appcelerator/babel-plugin-transform-titanium) to inline various static values, which help to strip away dead code.

## Webpack configuration

This plugin will add/modify the following Webpack options:

### Rules

- `rule('js')`
- `rule('js').use('cache-loader')`
- `rule('js').use('babel-loader')`
