# @titanium-sdk/webpack-plugin-alloy

> Titanium Alloy Plugin for Appcd Webpack

## Installation

To install this plugin in an existing project, run the following command in your project root:

```sh
npm i -D @titanium-sdk/webpack-plugin-alloy alloy alloy-compiler @titanium-sdk/webpack-plugin-babel
```

> 💡 **NOTE:** The `alloy-loader` used to compile Alloy components with Webpack emits ES6 code only. This code needs to be transpiled which is why `@titanium-sdk/webpack-plugin-babel` is a peer dependency and you must install it as well when enabling Webpack in your Alloy project.

Be sure to follow the migration steps below and the general [migration guideline](https://github.com/appcelerator/appcd-plugin-webpack/blob/develop/migration.md) when enabling Webpack in an existing Titanium Alloy project. Also take a look at the [configuration](https://github.com/appcelerator/webpack-plugin-babel#configuration) of the Babel plugin.

## Caching

Output of this loader is cached using [cache-loader](https://github.com/webpack-contrib/cache-loader). The cache is stored under `<project>/node_modules/.cache/alloy-loader`. If you also use the Babel or TypeScript plugin the cache identifier is `alloy-babel-loader` or `alloy-ts-loader`, respectively.

## Migration

### Remove old Alloy plugin

Since Webpack now compiles your Alloy app the default Alloy plugin is not required anymore. You can safely delete `plugins/ti.alloy` and remove it from the `plugins` section of your `tiapp.xml`.

### Create required folders

Webpack requires that your project includes certain Alloy sub-folders, even if they are empty. This is due to the way Webpack resolves dynamic requires and it needs to scan folders like `app/controllers` or `app/widgets`. Make sure your project contains the following files and folders and create them if neccessary:

```txt
app/
├── assets/
├── controllers/
├── lib/
├── models/
├── styles/
├── views/
├── widgets/
├── alloy.js
└── config.json
```

> 💡 **TIP:** Add a `.gitkeep` file in any empty directories you created to make sure they will be added to Git.

### assets/lib/vendor folders

When you are migrating from an Alloy app without Webpack, you are probably used to the fact all content from the following directories is copied to your app:

- `app/assets`
- `app/lib`
- `app/vendor`

This is only true for `app/assets` by default when you are using Webpack. All files from this directory will be copied directly into your app _as-is_. Source files in `app/lib` and `app/vendor` **need** to be `require`/`import`'ed to be bundled by Webpack so they are included in your app.

Usage of the `app/vendor` directory is discuraged with Webpack. It is recommended to install all your third-party libraries as Node modules and let Webpack process them from there.

### Code changes

In addition to the changes described in the [general guidelines](https://github.com/appcelerator/appcd-plugin-webpack/blob/develop/migration.md), there are a couple of Alloy specific changes that your need to apply to your project.

#### Require files in assets/lib/vendor

With Webpack requires are resolved at build time on your local machine, not at runtime from the root directory of your final app bundle. This may break some of your existing require statement since they rely on files being merged into the `Resources` dir by Alloy to be valid. Some of these requires in your app may need to be rewritten to accomodate this change.

##### Aliases

There are two aliases defined in the Webpack configuration for Alloy that will help you to easily adopt to the changed behavior.

- `@` -> `app/lib`

  Example: `@/utils` would resolve to `app/lib/utils.js`
- `@@` -> `app`

  Example: `@@/vendor/some-lib` would resolve to `app/vendor/some-lib.js`

##### Absolute requires

To require `app/lib/auth.js` the following statements are valid in a plain Alloy app:

```js
// without webpack
require('/auth');
require('auth');
```

Only `require('auth')` will work out of the box when the Webpack build is used, though. So you either have to drop the leading slash to make a [module require](https://github.com/appcelerator/appcd-plugin-webpack/blob/develop/migration.md#module-paths) or use the `@` [alias](#aliases) shown above.

```js
// with webpack
require('@/auth');
require('auth');
```

> 💡 **TIP:** It is recommended to use the `@` alias instead of relying on the non-spec compliant module resolution that Titanium supports. That way it is more obvious where the file actually comes from. You can also [define your own aliases](https://github.com/appcelerator/appcd-plugin-webpack/blob/develop/migration.md#add-alias).

##### Relative requires

Another example are relative requires in `app/alloy.js`. Again, these are resolved at build time so they need to be slightly changed. Let's assume `app/alloy.js` contains the following require to the file `app/lib/cache.js`:

```js
// without webpack
const cache = require('./cache');
```

When resolved locally on your machine the require would resolve to `app/cache.js` which doesn't exist. Let's use the `@` alias again to refer to the correct file:

```js
// with weback
const cache = require('@/cache');
```

#### Prefer `alloy` to require Alloy

Use a module style require when requiring Alloy related files, e.g. controllers, internals or built-ins.

```js
const animation = require('alloy/animation');
```

For Backwards compatibility the absolute `/alloy` require is supported as well, but using a module style require is strongly recommened.

#### Replace `WPATH` with `@widget`

Requires in widgets need to use `@widget` instead of `WPATH`

```js
// without webpack
require(WPATH('utils'))

// with webpack
require('@widget/utils')
```

#### Use ES6 `export` in Models

Models **need** to use ES6 `export`. To migrate, symply change `exports.definition =` to `export const definition =`.

```js
// without webpack
exports.definition = {
  config: {
    // ...
  }
}

// with webpack
export const definition = {
  config: {
    // ...
  }
}
```

### Notes

A few use cases from the original Alloy build are not supported yet when using Webpack. There are also some gotchas when you are coming from a legacy Alloy project that you need to be aware of when migrating your Alloy app to Webpack.

- Place **all** your JS source code that needs to be bundled by Webpack in `app/lib`. Remember that Webpack will only bundle your JS files when your actually `require`/ `import` them. They will **not** automatically be copied into the app.
- Only the `app/assets` folder will be copied to your app directly. The same applies to widget's `assets` directory.
- JavaScript files in `app/assets` will be copied as-is and will not be transpiled via Babel. Keep this in mind when you are trying to use them in a WebView, for example.
- Source files in `app/lib` and `app/vendor` **need** to be `require`/`import`'ed to be bundled by Webpack so they are included in your app.
- Usage of the `app/vendor` directory is discuraged with Webpack. Consider NPM packages to use third-party dependencies with Webpack, or move existing source code to `app/lib` if you can't rely on NPM packages for a specific dependency.

### Known limitations

- No support for Alloy JS makefiles (JMK).
- No support for `DefaultIcon.png` from themes.
- Views always need to have a matching file in `controllers`. The controller file can be empty, but it needs to be there for Webpack to properly discover the component.

## Webpack configuration

This plugin will add/modify the following Webpack options:

### Resolve

- Aliases
  - `@`: `app/lib`
  - `@@`: `app`
- Extensions: `xml`, `tss`
- Modules: `app/lib`, `app/vendor`

### Rules

- `rule('js')`
- `rule('js').use('cache-loader')`
- `rule('js').use('alloy-loader')`
- `rule('ts').use('alloy-loader')` (when used alongside `@titanium-sdk/webpack-plugin-typescript`)

### Plugins

- `plugin('alloy-loader')`: plugin from [`alloy-loader`](https://github.com/appcelerator/alloy-loader/blob/develop/lib/plugin.js)
- `plugin('copy-theme-files')`: copy files from theme's `assets` and `platform` if a theme is configured
- `plugin('copy-platform')`: copy files from `app/platform/<platform>` into `platform/<platform>`
- `plugin('copy-assets')`: copy files from `app/assets` into `Resources`
- `plugin('copy-widget-assets')`: copy files from `app/widget/<widget>/assets` into `Resources/<widget>`
- `plugin('backbone-externals)`: mark unused backbone dependencies as external modules to prevent bundling
- `plugin('watch-ignore)`: ignore watching of generated Alloy config files
- `plugin('alloy-defines)`: use `DefinePlugin` to replace a couple of constants in Alloy
- `plugin('widget-alias)`: rewrite requires from widgets that use `@widget` to point to a widget's `lib` folder.
- `plugin('bootstrap-files)`: modify bootstrap entry to search `app/lib` for `.bootstrap.js` files
- `plugin('moment-locales')`: filter moment.js locales based on languages in `app/i18n` folder
