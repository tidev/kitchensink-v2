# eslint-config-axway

Axway JavaScript coding standards shareable config for [eslint](http://eslint.org/).

* [Installation](#installation)
* [Usage Overview](#usage-overview)
* [Usage with npm Scripts](#usage-with-npm-scripts)
  * [Default Configurations](#default-configuration)
  * [Custom `.eslintrc` Configurations](#custom-eslintrc-configurations)
* [Usage with gulp](#usage-with-gulp)
  * [Default Configuration with Gulp](#default-configuration-with-gulp)
  * [Custom `.eslintrc` Configurations with Gulp](#custom-eslintrc-configurations-with-gulp)
  * [Custom eslint Configurations for Source and Tests](#custom-eslint-configurations-for-source-and-tests)
* [Usage with Titanium](#usage-with-titanium)
  * [Classic Titanium Apps](#classic-titanium-apps)
  * [Alloy Apps](#alloy-apps)
  * [Custom `.eslintrc` for Titanium Apps](#custom-eslintrc-for-titanium-apps)
  * [Running `eslint` for Titanium Apps](#running-eslint-for-titanium-apps)

## Installation

```
$ npm i --save-dev eslint eslint-config-axway
```

## Usage Overview

There are several ways to incorporate this eslint configuration into your project.

### Step 1

Determine which environment you wish to target. Choose __ONE__:

| Target Environment   | Description                                   |
| :------------------- | :-------------------------------------------- |
| `axway`              | General JavaScript (ES6, ES2016, and ES2017)  |
| `axway/env-browser`  | Web browser support (extends `axway`)         |
| `axway/env-node`     | Node.js support (extends `axway`)             |
| `axway/env-titanium` | Titanium and Alloy support (extends `axway`)  |

> NOTE: The default `axway` configuration automatically includes the
> [`eslint-plugin-import`](https://www.npmjs.com/package/eslint-plugin-import) and
> [`eslint-plugin-security`](https://www.npmjs.com/package/eslint-plugin-security) plugins. These
> help improve the quality of your JavaScript code.

### Step 2 (optional)

Select additional configurations. These require you to add dependencies to your project:
`npm i --save-dev <additional deps>`.

| Addon               | Description               | Additional Dependencies                                        |
| :------------------ | :------------------------ | :------------------------------------------------------------- |
| `axway/+babel`      | Support for future specs  | `babel-eslint`                                                 |
| `axway/+mocha`      | Mocha unit test rules     | `eslint-plugin-mocha`                                          |
| `axway/+react`      | React.js and .jsx support | `eslint-plugin-react` `eslint-plugin-jsx-a11y`                 |
| `axway/+chai`       | Chai support              | `eslint-plugin-chai-friendly`                                  |
| `axway/+typescript` | TypeScript support        | `@typescript-eslint/parser` `@typescript-eslint/eslint-plugin` |

> NOTE: You must use a `.eslintrc` file to specify multiple configurations. Set the
> [extends](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) property to
> an array containing the Target Environment and one or more addon configurations.

### Step 3

Determine how you are going to run `eslint`:

* [npm scripts](#usage-with-npm-scripts) ([docs](https://docs.npmjs.com/misc/scripts))
* [gulp.js](#usage-with-gulp) ([docs](https://gulpjs.com/))
* Manually run `eslint` like it's 1999

### Step 4 (optional)

It's recommended that your project have a `.eslintignore` file in the root of your project. Add all
directories and file patterns you wish to ignore. At the the very least, you should ignore the
`node_modules` directory:

```
# .eslintignore

node_modules
```

## Usage with npm Scripts

### Default Configuration

Select one of target environments: `axway`, `axway/env-node`, or `axway/env-browser`. Next add a
`lint` and `test` scripts to the `package.json`.

```json
{
	"scripts": {
		"lint": "eslint --config <target> src",
		"test": "eslint --config <target> test && mocha"
	}
}
```

Then run:

```bash
$ npm run lint
```

### Custom `.eslintrc` Configurations

A custom `.eslintrc` file is useful for using multiple conifgurations, defining global variables,
including additional plugins, and overriding rules.

#### Source Code Lint Configuration

Create a `.eslintrc` file in the root of your project and have it extend the `axway` configuration.

```js
{
	"extends": "axway",
	"globals": {
		// declare globals here...
	},
	"rules": {
		// project specific overrides...
	}
}
```

For Node.js projects that need Babel to parse bleeding edge JavaScript specs, use the `env-node`
with the `+babel` configuration:

```js
{
	"extends": [ "axway/env-node", "axway/+babel" ],
	"globals": {
		// declare globals here...
	},
	"rules": {
		// project specific overrides...
	}
}
```

```
$ npm i --save-dev babel-eslint
```

#### Unit Test Lint Configuration

You will probably also want a test-specific configuration. Create an `.eslintrc` file in your
`test` directory.

```js
{
	"extends": [ "axway/env-node", "axway/+mocha", "axway/+chai" ],
	"globals": {
		// declare globals here...
	},
	"rules": {
		// project specific overrides...
	}
}
```

```
$ npm i --save-dev eslint-plugin-mocha
```

#### npm Scripts Configuration

Your `package.json` NPM script can be simplified to:

```json
{
	"scripts": {
		"lint": "eslint src",
		"test": "eslint test && mocha"
	}
}
```

## Usage with Gulp

[gulp](https://gulpjs.com/) is a Node.js-based task runner. It needs to be installed globally.

```
$ [sudo] npm i -g gulp
```

Start by installing the required dev dependencies:

```
$ npm i --save-dev gulp-eslint eslint-config-axway
```

### Default Configuration with Gulp

In your `gulpfile.js`, add the following task and change as you see fit:

```js
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
	return gulp.src([
			'src/**/*.js',
			'test/**/test-*.js'
		])
		.pipe(eslint({
			configFile: require.resolve('eslint-config-axway')
		}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
```

### Custom `.eslintrc` Configurations with Gulp

Create the `.eslintrc` file in the root of your project as described above and add the following to
your `gulpfile.js`:

```js
const eslint = require('gulp-eslint');

gulp.task('lint', () => {
	return gulp.src([
			'src/**/*.js',
			'test/**/test-*.js'
		])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
```

### Custom `.eslintrc` with a `eslint-config-axway`

Due to the way eslint works, you cannot specify a `configFile` and an `.eslintrc` file, so you have
to do it the hard way.

```js
const eslint = require('gulp-eslint');
const fs = require('fs');
const path = require('path');

gulp.task('lint', () => {
	const baseConfig = require('eslint-config-axway');

	// check if the user has a custom .eslintrc in the root of the project
	let custom = path.join(process.cwd(), '.eslintrc');
	if (fs.existsSync(custom)) {
		(function merge(dest, src) {
			for (const key of Object.keys(src)) {
				if (src[key] && typeof src[key] === 'object' && !Array.isArray(src[key])) {
					if (!dest[key] || typeof dest[key] !== 'object' || Array.isArray(dest[key])) {
						dest[key] = {};
					}
					merge(dest[key], src[key]);
				} else {
					dest[key] = src[key];
				}
			}
		}(baseConfig, JSON.parse(fs.readFileSync(custom))));
	}

	return gulp.src([
			'src/**/*.js',
			'test/**/test-*.js'
		])
		.pipe(eslint({ baseConfig }))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
```

### Custom eslint Configurations for Source and Tests

Create an `.eslintrc` file in the root of your project to be used for your source code that extends
the `axway` configuration as described above.

```js
{
	"extends": "axway",
	"globals": {
		// declare globals here...
	},
	"rules": {
		// project specific overrides...
	}
}
```

Next create a second `.eslintrc` config file in your `test` directory.

```js
{
	"extends": [ "axway/env-node", "axway/+mocha" ],
	"globals": {
		// declare globals here...
	},
	"rules": {
		// project specific overrides...
	}
}
```

Finally split the `lint` task into `lint-src` and `lint-test` tasks:

```js
const eslint = require('gulp-eslint');

gulp.task('lint', [ 'lint-src', 'lint-test' ]);

gulp.task('lint-src', () => {
	return gulp.src('src/**/*.js')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('lint-test', () => {
	return gulp.src('test/**/test-*.js')
		.pipe(eslint({
			configFile: './test/.eslintrc'
		}))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});
```

## Usage with Titanium

For Titanium apps, you can use npm, gulp, or just manually invoke `eslint`. For this guide, we'll
cover using npm.

Start by creating a `package.json` manually or run:

```
$ npm init
```

Next install the dev dependencies:

```
$ npm install --save-dev eslint eslint-config-axway
```

### Classic Titanium Apps:

Create an .eslintrc file alongisde your `tiapp.xml` file.

```js
{
	"extends": [ "axway/env-titanium" ],
	"globals": {
		// declare globals here...
	},
	"rules": {
		// project specific overrides...
	}
}
```

Add the following `lint` script to the `package.json`:

```json
{
	"scripts": {
		"lint": "eslint Resources"
	}
}
```

### Alloy Apps:

Install eslint-plugin-alloy.

```
$ npm install --save-dev eslint-plugin-alloy
```

Create an .eslintrc file alongisde your `tiapp.xml` file
```js
{
	"extends": [ "axway/env-alloy" ],
	"globals": {
		// declare globals here...
	},
	"rules": {
		// project specific overrides...
	}
}
```

Add the following `lint` script to the `package.json`:

```json
{
	"scripts": {
		"lint": "eslint app"
	}
}
```

### Custom `.eslintrc` for Titanium Apps

Due to Alloy's code generation, you will most certainly need to create a custom `.eslintrc` to
declare all the global variables. Being by creating an `.eslintrc` file in the root of your project
and have it extend the `axway/env-titanium` configuration.

```js
{
	"extends": "axway/env-titanium",
	"globals": {
		// declare globals here...
	},
	"rules": {
		// project specific overrides...
	}
}
```

### Running `eslint` for Titanium Apps

You can simply run `eslint` by running:

```
$ npm run lint
```

## License

This project is open source and provided under the Apache Public License (version 2). Please make
sure you see the LICENSE file included in this distribution for more details on the license. Also,
please take notice of the privacy notice at the end of the file.

(C) Copyright 2017-2018, [Axway, Inc](http://www.axway.com) All Rights Reserved.
