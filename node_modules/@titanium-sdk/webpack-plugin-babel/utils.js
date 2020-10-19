const babel = require('@babel/core');
const fs = require('fs');
const defaultsDeep = require('lodash.defaultsdeep');
const path = require('path');

const isWindows = process.platform === 'win32';

function generateTranspileDepRegex(transpileDependencies) {
	const deps = transpileDependencies.map(dep => {
		if (typeof dep === 'string') {
			const depPath = path.join('node_modules', dep, '/');
			return isWindows
				? depPath.replace(/\\/g, '\\\\') // double escape for windows style path
				: depPath;
		} else if (dep instanceof RegExp) {
			return dep.source;
		} else {
			throw new Error('Unsupported value in "transpileDependencies" option.');
		}
	});
	// eslint-disable-next-line security/detect-non-literal-regexp
	return deps.length ? new RegExp(deps.join('|')) : null;
}

/**
 * Automatically configures the @titanium-sdk/app preset if present
 * in the babel config.
 *
 * @param {Object} babelConfig Partial babel configuration
 * @param {Object} api Plugin API
 * @param {Object} options Build options
 */
function configureTitaniumAppPreset(babelConfig, api, options) {
	const { project, build } = options;
	const tiapp = project.tiapp;
	const appPresetIndex = babelConfig.options.presets.findIndex(presetConfig => {
		return presetConfig.file.request === '@titanium-sdk/app';
	});
	if (appPresetIndex === -1) {
		return;
	}

	const appPreset = babelConfig.options.presets[appPresetIndex];
	const presetOptions = appPreset.options || {};
	const readPkg = (platform = '') => {
		return JSON.parse(fs.readFileSync(path.join(build.sdk.path, platform, 'package.json'), 'utf-8'));
	};

	const envPresetOptions = presetOptions.env || {};
	const hasTargetsOption = !!envPresetOptions.targets;
	if (!hasTargetsOption) {
		const targets = {};
		if (build.platform === 'ios') {
			const pkg = readPkg('iphone');
			const defaultMinIosVersion = pkg.minIosVersion;
			targets.ios = tiapp.ios['min-ios-ver'] || defaultMinIosVersion;
		} else if (build.platform === 'android') {
			const pkg = readPkg('android');
			const v8Version = pkg.v8.version;
			const found = v8Version.match(/(\d+)\.(\d+)\.\d+\.\d+/);
			targets.chrome = parseInt(found[1] + found[2]);
		}
		envPresetOptions.targets = targets;
	}
	defaultsDeep(envPresetOptions, {
		useBuiltIns: false
	});
	presetOptions.env = envPresetOptions;

	const pkg = readPkg();
	const titaniumPluginOptions = presetOptions.titanium || {};
	defaultsDeep(titaniumPluginOptions, {
		deploytype: build.deployType,
		platform: build.platform,
		target: build.target,
		Ti: {
			version: pkg.version,
			buildHash: build.sdk.gitHash,
			buildDate: build.sdk.buildDate,
			App: {
				id: tiapp.id,
				guid: tiapp.guid,
				name: tiapp.name,
				description: tiapp.description,
				version: tiapp.version,
				publisher: tiapp.publisher,
				url: tiapp.url,
				deployType: build.deployType
			},
			Filesystem: {
				lineEnding: '\n',
				separator: '/',
			},
			Platform: generatePlatformInlines(options)
		}
	});
	presetOptions.titanium = titaniumPluginOptions;

	const newPresetConfig = babel.createConfigItem(
		[ '@titanium-sdk/app', presetOptions ],
		{ dirname: api.getCwd(), type: 'preset' }
	);
	babelConfig.options.presets.splice(appPresetIndex, 1, newPresetConfig);
}

function generatePlatformInlines(options) {
	const { build } = options;
	if (build.platform === 'ios')  {
		const platform = {
			runtime: 'javascriptcore',
			manufacturer: 'apple'
		};
		if (build.ios.deviceFamily !== 'universal') {
			platform.osname = build.ios.deviceFamily;
		}
		return platform;
	} else {
		return {
			name: 'android',
			osname: 'android',
			runtime: 'v8'
		};
	}
}

function loadBabelConfig(api, options) {
	const babelConfig = babel.loadPartialConfig({
		cwd: api.getCwd()
	});
	configureTitaniumAppPreset(babelConfig, api, options);
	return babelConfig;
}

function generateCacheIdentifiers(babelOptions) {
	return {
		'@babel/core': require('@babel/core/package.json').version,
		'babel-loader': require('babel-loader/package.json').version,
		'dynamic-babel-config': babelOptions
	};
}

module.exports = {
	generateCacheIdentifiers,
	generateTranspileDepRegex,
	loadBabelConfig
};
