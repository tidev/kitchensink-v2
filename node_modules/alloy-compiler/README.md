# alloy-compiler

> Compiler for Alloy components

This packages contains the standalone [Alloy](https://github.com/appcelerator/alloy) compiler. In most cases you should be using it in Webpack powered Alloy projects, you will only need it separately if you are writing build tools with very specific needs.

## Installation

```bash
npm i alloy-compiler
```

## Usage

```js
const { createCompiler, createCompileConfig } = require('alloy-compiler');
```

## API

### createCompiler(options)

Creates a new Alloy compiler instance.

### Example

```js
const { createCompiler } = require('alloy-compiler');
const compiler = createCompiler({
  compileConfig: {
    projectDir: '/path/to/my/project',
    alloyConfig: {
      platform: 'ios',
      deploytype: 'development'
    }
  },
  webpack: true
});
```

#### Options

Expects an `options` object with the following properties:

- `compileConfig`
  - Type: `object`

  Configuration that will be passed to the Alloy compiler.

  You can either pass an object returned by [`createCompileConfig`](#createCompileConfig) or directly pass the same options accepted by that function. The config object will then be created from the passed options.

- `webpack`
  - Type: `boolean`
  - Default: `false`

  Whether or not to create a special compiler instance that creates optimized output Webpack.

### createCompileConfig(options)

Creates a new Alloy compile configuration based on the passed options.

#### Example

```js
const { createCompileConfig } = require('alloy-compiler');
const compileConfig = createCompileConfig({
  projectDir: '/path/to/my/project',
  alloyConfig: {
    platform: 'ios',
    deploytype: 'development'
  }
});
```

#### Parameters

Expects an `options` object with the following properties:

- `projectDir`
  - Type: `string`

  Path to the root directory of the Alloy project.

- `alloyConfig`
  - Type: `object`

  Alloy configuration. Expects an `object` with the following structure:

    ```js
    {
      platform: string // 'ios' or 'android'
      deploytype: string // 'development', 'test' or 'production'
    }
    ```

- `logLevel`
  - Type: `number`
  - Default: [logger.ERROR](../alloy-utils/lib/logger.js#L8)

  Log level for the internal logger.

- `buildLog`
  - Type: [`BuildLog`](./lib/build-log.js)
  - Default: `BuildLog` for the specified `projectDir`

### compiler.compileComponent(options)

Compiles the controller and view of an Alloy component.

Returns a result object with the following structure:

```js
{
  code: string,
  map: object, // Source map
  dependencies: array // List of dependencies used during compilation like view and style file
}
```

#### Example

```js
const { createCompiler } = require('alloy-compiler');
const compiler = createCompiler({
  compileConfig: {
    projectDir: '/path/to/my/project',
    alloyConfig: {
      platform: 'ios',
      deploytype: 'development'
    }
  }
});
const result = compiler.compileComponent({
  file: '/path/to/my/project/app/controllers/index.js'
});
```

#### Parameters

Expects an `options` object with the following properties:

- `file`
  - Type: `string`

  Full path to the controller or view file that should be compiled. The compiler will automatically look for all possible associated files of the component (controller/view/style) and process them.

- `content`
  - Type: `string`

  Content of `file`, if already known. The compiler will automatically read the `file`'s content if this is omitted.

- `inputSourceMap`
  - Type: `object`

  Input source map. The compiler will create a new source map if this is omitted.
