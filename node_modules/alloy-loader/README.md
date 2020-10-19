# alloy-loader

Webpack loader for [Alloy](https://github.com/appcelerator/alloy) components.

> ⚠️ Note: This loader is meant to be used exclusively in projects powered by [appcd-plugin-webpack](https://github.com/appcelerator/appcd-plugin-webpack) and does not consider external usages.

Instead of using this loader directly you probably want to install [@titanium-sdk/webpack-plugin-alloy](https://github.com/appcelerator/webpack-plugin-alloy#readme), which will automatically configure this loader and everything else required to enable Webpack in your Alloy project.

## Installation

```sh
npm i alloy-loader
```

## Options

- `compiler`
  - Type: `AlloyCompiler`

  Alloy [compiler](https://github.com/appcelerator/alloy-devkit/tree/master/packages/alloy-compiler#readme) used to compile controller/view/style files of alloy components.

## Development

Make sure to prune to production dependencies when you link this package, for example to test it in [`@titanium-sdk/webpack-plugin-alloy`](https://github.com/appcelerator/webpack-plugin-alloy). The plugin contained in this loader will create instances of [`ContextElementDependency`](https://github.com/webpack/webpack/blob/master/lib/dependencies/ContextElementDependency.js) and adds them to the Webpack compilation. It is important that these are required from the same Webpack module that actually runs the compilation, or else you'll see cryptic errors about callbacks that were called twice.
