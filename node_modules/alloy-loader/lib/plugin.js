const I18nPlugin = require('./plugins/I18nPlugin');
const WidgetsPlugin = require('./plugins/WidgetsPlugin');

/**
 * Alloy loader plugin
 *
 * This plugin does the following:
 *
 * - Override the `resolveDependencies` function of `/alloy/widgets/` context
 *   require to scan all possible widgets paths.
 * - Process all available `i18n` directories and add merged .xml files
 *   as additional assets.
 */
class AlloyLoaderPlugin {
	constructor(options) {
		this.options = options;
		this.alloyCompiler = options.compiler;

		this.i18nPlugin = new I18nPlugin(options);
		this.widgetsPlugin = new WidgetsPlugin(options);
	}

	apply(compiler) {
		compiler.hooks.compilation.tap(
			'AlloyLoaderPlugin',
			(compilation, { normalModuleFactory }) => {
				normalModuleFactory.hooks.module.tap('AlloyLoaderPlugin', module => {
					if (module.nameForCondition().endsWith('app/alloy.js')) {
						/*
						TODO: Create controller code for views that don't have a matching controller
						const componentPath = './controllers/phone/videoPlayer';
						module.dependencies.push(new CommonJsRequireDependency(`${componentPath}`, null));
						*/
					}
				});
			}
		);
		compiler.hooks.invalid.tap('AlloyLoaderPlugin', fileName => {
			if (!fileName.endsWith('.tss')) {
				return;
			}

			if ('purgeStyleCache' in this.alloyCompiler) {
				this.alloyCompiler.purgeStyleCache(fileName);
			}
		});

		this.i18nPlugin.apply(compiler);
		this.widgetsPlugin.apply(compiler);
	}
}

module.exports = AlloyLoaderPlugin;
