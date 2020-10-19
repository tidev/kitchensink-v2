/* eslint indent: ["error", "tab", { "MemberExpression": "off" }] */

const CopyPlugin = require('copy-webpack-plugin');
const fs = require('fs');
const path = require('path');
const {
	ContextReplacementPlugin,
	DefinePlugin,
	ExternalsPlugin,
	NormalModuleReplacementPlugin,
	WatchIgnorePlugin
} = require('webpack');

module.exports = function (api, options) {
	const projectDir = api.getCwd();
	const appDir = path.join(projectDir, 'app');
	const alloyRoot = path.dirname(api.resolvePeer('alloy'));
	const { createCompileConfig, createCompiler } = api.requirePeer('alloy-compiler');
	const { build } = options;
	const alloyConfig = {
		platform: build.platform,
		deploytype: build.deployType
	};
	const compileConfig = createCompileConfig({ projectDir, alloyConfig });
	// write build log to cache config generation on restarts, it's not used
	// anywhere else in webpack so we can write it right away
	compileConfig.buildLog.write();
	const alloyCompiler = createCompiler({ compileConfig, webpack: true });
	const backboneVersion = compileConfig.backbone ? compileConfig.backbone : '0.9.2';

	options.transpileDependencies.push('alloy');
	alloyCompiler.compilationMeta.widgets.forEach((widget, widgetPath) => {
		if (/node_modules/.test(widgetPath)) {
			const widgetNodeModuleName = widgetPath.substr(widgetPath
				.lastIndexOf('node_modules') + 13)
				.replace(/\/\\/g, '');
			options.transpileDependencies.push(widgetNodeModuleName);
		}
	});

	const theme = compileConfig.theme;
	const watchFiles = [
		path.join(appDir, 'config.json'),
		path.join(appDir, 'styles', 'app.tss')
	];
	if (theme) {
		watchFiles.push(path.join(appDir, 'themes', theme, 'config.json'));
	}
	api.watch(watchFiles);

	const alloyCacheIdentifiers = {
		alloy: api.requirePeer('alloy/package.json').version,
		'alloy-compiler': api.requirePeer('alloy-compiler/package.json').version
	};
	const cacheIdentifiers = {
		...alloyCacheIdentifiers
	};
	const configFiles = [ ...watchFiles ];

	api.chainWebpack(config => {
		config.resolveLoader.modules.add(path.join(__dirname, 'node_modules'));

		// entry -------------------------------------------------------------------

		config
			.entry('main')
				.clear()
				.add('./app/alloy.js')
				.end();

		// resolve -----------------------------------------------------------------

		const alloyAliases = {
			alloy$: path.join(alloyRoot, 'template', 'lib', 'alloy.js'),
			'alloy/backbone$': path.join(alloyRoot, 'lib', 'alloy', 'backbone', backboneVersion, 'backbone.js'),
			'alloy/constants$': path.join(path.dirname(require.resolve('alloy-utils')), 'constants.js'),
			'alloy/controllers/BaseController$': path.join(alloyRoot, 'lib', 'alloy', 'controllers', 'BaseController.js'),
			'alloy/controllers': api.resolve('app', 'controllers'),
			'alloy/models': api.resolve('app', 'models'),
			'alloy/styles': api.resolve('app', 'styles'),
			'alloy/widgets': api.resolve('app', 'widgets'),
			'alloy/CFG': api.resolve('Resources', 'alloy', 'CFG'),
			'alloy/animation': path.join(alloyRoot, 'builtins', 'animation.js'),
			'alloy/dialogs': path.join(alloyRoot, 'builtins', 'dialogs.js'),
			'alloy/measurement': path.join(alloyRoot, 'builtins', 'measurement.js'),
			'alloy/moment': path.join(alloyRoot, 'builtins', 'moment'),
			'alloy/sha1': path.join(alloyRoot, 'builtins', 'sha1.js'),
			'alloy/social': path.join(alloyRoot, 'builtins', 'social.js'),
			'alloy/string': path.join(alloyRoot, 'builtins', 'string.js'),
			alloy: path.join(alloyRoot, 'lib', 'alloy')
		};
		config.resolve
			.alias
				.set('@', api.resolve('app/lib'))
				.set('@@', api.resolve('app'))
				.merge(alloyAliases)
				.merge(Object.keys(alloyAliases).reduce((acc, alias) => {
					acc[`/${alias}`] = alloyAliases[alias];
					return acc;
				}, {}))
				.end()
			.extensions
				.merge([ '.xml', '.tss' ])
				.end()
			.modules
				.add(api.resolve('app', 'lib'))
				.add(api.resolve('app', 'vendor'));

		// module rules ------------------------------------------------------------

		const jsRule = config.module.rule('js');
		jsRule.use('alloy-loader')
			.loader('alloy-loader')
			.options({
				compiler: alloyCompiler
			});

		if (!api.hasPlugin('babel')) {
			// if babel plugin is not present, add our own cache-loader
			const cacheConfig = api.generateCacheConfig('alloy-loader', cacheIdentifiers, configFiles);
			jsRule.use('cache-loader')
				.before('alloy-loader')
				.loader('cache-loader')
				.options(cacheConfig);
		}

		config.module
			.rule('tss')
				.test(/\.tss$/)
				.use('tss-loader')
					.loader(require.resolve('alloy-loader/lib/loaders/styleLoader'))
					.options({
						compiler: alloyCompiler
					});

		config.module
			.rule('backbone')
				.test(/backbone\.js$/)
				.use('imports-loader')
					.loader('imports-loader?define=>false');

		// plugins -----------------------------------------------------------------

		config.plugin('alloy-loader')
			.use(require.resolve('alloy-loader/lib/plugin'), [
				{
					compiler: alloyCompiler
				}
			]);

		const copyThemeOptions = [];
		if (theme) {
			const themeRoot = path.posix.join(
				appDir, 'themes', theme
			);
			// copy app/theme/<theme>/platform/<platform>
			const themePlatformPath = path.posix.join(
				themeRoot, 'platform', build.platform
			);
			if (fs.existsSync(themePlatformPath)) {
				copyThemeOptions.push({
					from: themePlatformPath,
					to: `../platform/${build.platform}`
				});
			}
			// copy app/theme/<theme>/assets
			const themeAssetsPath = path.posix.join(themeRoot, 'assets');
			if (fs.existsSync(themeAssetsPath)) {
				copyThemeOptions.push({
					from: themeAssetsPath,
					to: '.'
				});
			}
		}
		if (copyThemeOptions.length > 0) {
			config.plugin('copy-theme-files')
				.use(CopyPlugin, [ copyThemeOptions ]);
		}

		const platformPath = api.resolve('app', 'platform', build.platform);
		if (fs.existsSync(platformPath)) {
			config.plugin('copy-platform')
				.use(CopyPlugin, [
					[
						// copy app/platform/<platform>
						{ from: `app/platform/${build.platform}`, to: `../platform/${build.platform}` }
					]
				]);
		}

		const platformExclude = {
			android: 'ios',
			ios: 'android'
		};
		config.plugin('copy-assets')
			.use(CopyPlugin, [
				[
					// copy app/assets
					{
						from: 'app/assets',
						to: '.',
						ignore: [ `${platformExclude[build.platform]}/**/*` ]
					}
				]
			]);

		const copyWidgetAssetsOptions = [];
		alloyCompiler.compilationMeta.widgets.forEach(widget => {
			const widgetAssetPath = path.posix.join(widget.dir, 'assets');
			if (fs.existsSync(widgetAssetPath)) {
				copyWidgetAssetsOptions.push({
					from: path.join(widget.dir, 'assets'),
					to: `./${widget.manifest.id}/`,
					ignore: [ `${platformExclude[build.platform]}/**/*` ]
				});
			}
		});
		config.plugin('copy-widget-assets')
			.use(CopyPlugin, [ copyWidgetAssetsOptions ]);

		config.plugin('backbone-externals')
			.use(ExternalsPlugin, [
				'commonjs',
				[ 'jquery', 'file', 'system' ]
			]);
		config.plugin('clean')
			.tap(args => {
				const options = args[0] || {};
				options.dry = false;
				options.cleanOnceBeforeBuildPatterns = [
					...(options.cleanOnceBeforeBuildPatterns || [ '**/*' ]),
					'../platform',
					'../i18n',
					'!alloy',
					'!alloy/CFG.js'
				];
				options.dangerouslyAllowCleanPatternsOutsideProject = true;
				args[0] = options;
				return args;
			});
		config.plugin('watch-ignore')
			.use(WatchIgnorePlugin, [
				[
					/alloy[/\\]CFG.js/,
					/styles[/\\]app.tss/
				]
			]);

		const defines = {
			ALLOY_VERSION: `'${api.requirePeer('alloy/package.json').version}'`,
			ENV_DEV: build.deployType === 'development',
			ENV_DEVELOPMENT: build.deployType === 'development',
			ENV_TEST: build.deployType === 'test',
			ENV_PROD: build.deployType === 'production',
			ENV_PRODUCTION: build.deployType === 'production',
			OS_ANDROID: build.platform === 'android',
			OS_IOS: build.platform === 'ios',
			// mobile web is dead, Alloy just still doesn't know it yet.
			OS_MOBILEWEB: false,
			DIST_ADHOC: build.target === 'dist-adhoc',
			DIST_STORE: [ 'dist-appstore', 'dist-playstore' ].includes(build.target),
		};
		defines['Ti.Platform.name'] = JSON.stringify(build.platform);
		defines['Titanium.Platform.name'] = JSON.stringify(build.platform);
		if (build.platform === 'ios' && build.ios.deviceFamily !== 'universal') {
			defines['Ti.Platform.osname'] = JSON.stringify(build.ios.deviceFamily);
			defines['Titanium.Platform.osname'] = JSON.stringify(build.ios.deviceFamily);
		} else if (build.platform === 'android') {
			defines['Ti.Platform.osname'] = JSON.stringify(build.platform);
			defines['Titanium.Platform.osname'] = JSON.stringify(build.platform);
		}
		config.plugin('alloy-defines')
			.use(DefinePlugin, [ defines ]);

		config.plugin('widget-alias')
			.use(NormalModuleReplacementPlugin, [
				/@widget/,
				resource => {
					const widgetDirMatch = resource.context.match(/.*widgets[/\\][^/\\]+[/\\]/);
					if (!widgetDirMatch) {
						return;
					}
					const widgetDir = widgetDirMatch[0];
					resource.request = `${widgetDir}${resource.request.replace('@widget/', 'lib/')}`;
				}
			]);
		config.plugin('bootstrap-files')
			.tap(args => {
				args[1] = 'app/lib';
				return args;
			});

		let supportedLocales = [];
		const i18nDir = path.join(appDir, 'i18n');
		if (fs.existsSync(i18nDir)) {
			supportedLocales = fs.readdirSync(i18nDir);
		}
		config.plugin('moment-locales')
			.use(ContextReplacementPlugin, [
				/moment[/\\]lang/,
				supportedLocales.length > 0
					// matches only locales we want to bundle
					// eslint-disable-next-line security/detect-non-literal-regexp
					? new RegExp(`[/\\\\](${supportedLocales.join('|')})\\.js`)
					// doesn’t match anything – see https://stackoverflow.com/a/2930280/1192426
					: /\b\B/
			]);
	}, { after: 'built-in:config/app' });

	if (api.hasPlugin('babel')) {
		// update cache-loader and set order for alloy-loader
		const { generateCacheIdentifiers, loadBabelConfig } = api.requirePeer('@titanium-sdk/webpack-plugin-babel/utils');
		const { options: babelOptions } = loadBabelConfig(api, options);
		const babelCacheIdentifiers = generateCacheIdentifiers(babelOptions);
		Object.assign(cacheIdentifiers, babelCacheIdentifiers);
		configFiles.push('babel.config.js');
		api.chainWebpack(config => {
			config.module.rule('js')
				.use('alloy-loader')
					.after('babel-loader')
					.end()
				.use('cache-loader')
					.tap(() => api.generateCacheConfig('alloy-babel-loader', cacheIdentifiers, configFiles));
		}, {
			name: `${api.id}/babel`,
			after: '@titanium-sdk/webpack-plugin-babel'
		});
	}

	if (api.hasPlugin('typescript')) {
		// add alloy-loader to ts rule
		const { cacheIdentifiers: tsCacheIdentifiers } = api.requirePeer('@titanium-sdk/webpack-plugin-typescript/utils');
		api.chainWebpack(config => {
			const tsRule = config.module.rule('ts')
				.use('alloy-loader')
					.loader('alloy-loader')
					.options({ compiler: alloyCompiler })
					.end()
				.use('cache-loader')
					.tap(() => api.generateCacheConfig(
						'alloy-ts-loader',
						{
							...cacheIdentifiers,
							tsCacheIdentifiers
						},
						[ 'tsconfig.json', ...configFiles ]
					))
					.end();
			if (api.hasPlugin('babel')) {
				tsRule.use('alloy-loader').after('babel-loader');
			} else {
				tsRule.use('alloy-loader').before('ts-loader');
			}
		}, {
			name: `${api.id}/typescript`,
			after: '@titanium-sdk/webpack-plugin-typescript'
		});
	}
};
