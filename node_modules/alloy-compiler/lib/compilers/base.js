const {
	constants: CONST,
	logger,
	platforms,
	tssGrammar,
	utils: U
} = require('alloy-utils');
const _ = require('lodash');
const path = require('path');

const optimizer = require('../optimizer');
const styler = require('../styler');

const componentRegex = /(?:[/\\]widgets[/\\][^/\\]+)?[/\\](controllers|views|styles)[/\\](.*)/;

const metaCache = new Map();
const styleCache = new Map();

/** @typedef {import("./meta")} CompilationMeta  */

/**
 * @typedef InternalCompilerOptions
 * @property {CompileConfig} compileConfig
 * @property {fs} fs
 * @property {webpack} webpack
 * @property {CompilationMeta} compilationMeta
 */

/**
 * @typedef CompileOptions
 * @property {string} file File to compile
 * @property {string=} content Content of the file
 * @property {Object=} inputSourceMap Input source map
 */

/**
 * Abstract base compiler for the specific compiler implementations.
 */
class BaseCompiler {
	/**
	 * Constructs a new compiler
	 *
	 * @param {InternalCompilerOptions} options Compiler options
	 */
	constructor(options) {
		this.config = options.compileConfig;
		this.projectDir = this.config.dir.project;
		this.appDir = this.config.dir.home;
		this.platform = this.config.alloyConfig.platform;
		this.titaniumFolder = platforms[this.platform].titaniumFolder;
		this.otherPlatforms = _.without(CONST.PLATFORM_FOLDERS, this.titaniumFolder);
		this.theme = this.config.theme;
		this.fs = options.fs;
		this.compilationMeta = options.compilationMeta;
	}

	resolveComponentMeta(componentPath) {
		const componentIdentifier = this.resolveComponentIdentifier(componentPath);
		const widget = this.findWidget(componentPath);
		const manifest = widget ? widget.manifest : null;
		const cacheIdentifier = `${manifest ? manifest.id : 'app'}/${componentIdentifier}`;
		if (metaCache.has(cacheIdentifier)) {
			return metaCache.get(cacheIdentifier);
		}

		const meta = {
			componentIdentifier,
			basePath: widget ? widget.dir : this.appDir,
			subPath: path.dirname(componentIdentifier),
			componentName: path.basename(componentIdentifier),
			widget,
			manifest,
			cacheIdentifier
		};
		const files = this.generatePossibleFilePaths(meta);
		meta.files = files;
		metaCache.set(cacheIdentifier, meta);

		return meta;
	}

	resolveComponentIdentifier(componentPath) {
		const match = componentPath.match(componentRegex);
		if (!match) {
			throw new Error(`Failed to resolve component identifier for "${componentPath}"`);
		}
		const relPath = match[2];
		return path.join(path.dirname(relPath), path.basename(relPath, path.extname(relPath)));
	}

	generatePossibleFilePaths(meta) {
		const {
			basePath: rootDir,
			componentName: viewName,
			subPath
		} = meta;
		const buildPlatform = this.platform;
		const files = {};
		const inputTypes = [ 'VIEW', 'STYLE', 'CONTROLLER' ];
		inputTypes.forEach(fileType => {
			// get the path values for the file
			const fileTypeRoot = path.join(rootDir, CONST.DIR[fileType]);
			const filename = viewName + '.' + CONST.FILE_EXT[fileType];
			const filepath = subPath ? path.join(subPath, filename) : filename;
			const baseFile = path.join(fileTypeRoot, filepath);

			// check for platform-specific versions of the file
			if (buildPlatform) {
				var platformSpecificFile = path.join(fileTypeRoot, buildPlatform, filepath);
				if (this.fs.existsSync(platformSpecificFile)) {
					if (fileType === 'STYLE') {
						files[fileType] = [
							{ file: baseFile },
							{ file: platformSpecificFile, platform: true }
						];
					} else {
						files[fileType] = platformSpecificFile;
					}
					return;
				}
			}
			files[fileType] = baseFile;
		});

		const outputTypes = [ 'COMPONENT', 'RUNTIME_STYLE' ];
		outputTypes.forEach(fileType => {
			const basePath = path.join(this.config.dir.resources, 'alloy', CONST.DIR[fileType]);
			files[fileType] = path.join(basePath, subPath, viewName + '.js');
		});

		return files;
	}

	findWidget(componentPath) {
		for (const widgetDir of this.compilationMeta.widgets.keys()) {
			if (componentPath.startsWith(widgetDir)) {
				return this.compilationMeta.widgets.get(widgetDir);
			}
		}
		return null;
	}

	/**
	 * Loads the styles object for the given component.
	 *
	 * @param {object} meta Component metadata
	 * @return {object} Object that contains styles and file dependencies
	 */
	loadStyles(meta) {
		const {
			cacheIdentifier,
			componentName: viewName,
			basePath: dir,
			subPath: dirname,
			manifest,
			files: componentFiles
		} = meta;

		if (styleCache.has(cacheIdentifier)) {
			return styleCache.get(cacheIdentifier);
		}

		const { config: compileConfig, theme } = this;
		const buildPlatform = compileConfig.alloyConfig.platform;
		let styles = styler.globalStyle || [];
		const files = [];
		let message = '';

		if (componentFiles.STYLE) {
			var styleFiles = Array.isArray(componentFiles.STYLE) ? componentFiles.STYLE : [ { file: componentFiles.STYLE } ];
			styleFiles.forEach(style => {
				message = '  style:      "'
					+ path.relative(path.join(dir, CONST.DIR.STYLE), style.file) + '"';
				styles = this.loadStyleFile(style.file, styles, {
					existingStyle: styles,
					platform: style.platform
				}, message);
				files.push(style.file);
			});
		}

		if (this.theme) {
			// if a theme is applied, override TSS definitions with those defined in the theme
			let themeStylesDir, theStyle, themeStylesFile, psThemeStylesFile;
			if (!manifest) {
				// theming a "normal" controller
				themeStylesDir = path.join(compileConfig.dir.themes, theme, 'styles');
				theStyle = dirname ? path.join(dirname, viewName + '.tss') : viewName + '.tss';
				themeStylesFile = path.join(themeStylesDir, theStyle);
				psThemeStylesFile = path.join(themeStylesDir, buildPlatform, theStyle);
			} else {
				// theming a widget
				themeStylesDir = path.join(compileConfig.dir.themes, theme, 'widgets', manifest.id, 'styles');
				theStyle = dirname ? path.join(dirname, viewName + '.tss') : viewName + '.tss';
				themeStylesFile = path.join(themeStylesDir, theStyle);
				psThemeStylesFile = path.join(themeStylesDir, buildPlatform, theStyle);
			}

			// load theme-specific styles, overriding default definitions
			message = '  theme:      "' + path.join(theme.toUpperCase(), theStyle) + '"';
			styles = this.loadStyleFile(themeStylesFile, styles, {
				existingStyle: styles,
				theme: true
			}, message);
			files.push(themeStylesFile);

			// load theme- and platform-specific styles, overriding default definitions
			message = '  theme:      "'
				+ path.join(theme.toUpperCase(), buildPlatform, theStyle) + '"';
			styles = this.loadStyleFile(psThemeStylesFile, styles, {
				existingStyle: styles,
				platform: true,
				theme: true
			}, message);
			files.push(psThemeStylesFile);
		}

		const styleMeta = {
			styles,
			files
		};
		styleCache.set(cacheIdentifier, styleMeta);

		return styleMeta;
	}

	loadStyleFile(tssFilePath, existingStyle, sortOptions, message) {
		try {
			const styleContent = this.fs.readFileSync(tssFilePath);
			logger.info(message);
			const json = this.parseStyle(styleContent, tssFilePath);
			return styler.sortStyles(json, sortOptions);
		} catch (e) {
			if (e.code !== 'ENOENT') {
				throw e;
			}

			return existingStyle;
		}
	}

	parseStyle(content, tssFile) {
		const originalContents = content;
		let addedBraces = false;

		// skip if the file is empty
		if (/^\s*$/gi.test(content)) {
			return {};
		}

		// Add enclosing curly braces, if necessary
		if (!/^\s*\{[\s\S]+\}\s*$/gi.test(content)) {
			content = '{\n' + content + '\n}';
			addedBraces = true;
		}
		// [ALOY-793] double-escape '\' in tss
		content = content.replace(/(\s)(\\+)(\s)/g, '$1$2$2$3');

		try {
			const json = tssGrammar.parse(content);
			optimizer.optimizeStyle(json);
			return json;
		} catch (e) {
			// If we added braces to the contents then the actual line number
			// on the original contents is one less than the error reports
			if (addedBraces) {
				e.line--;
			}
			U.dieWithCodeFrame(
				'Error processing style "' + tssFile + '"',
				{ line: e.line, column: e.column },
				originalContents,
				/Expected bare word, comment, end of line, string or whitespace but ".+?" found\./.test(e.message)
					? 'Do you have an extra comma in your style definition?'
					: ''
			);
		}

		return {};
	}

	/**
	 * Purges the style cache for a given component.
	 *
	 * @param {string} componentPath Path of component to purge style cache for
	 */
	purgeStyleCache(componentPath) {
		try {
			const meta = this.resolveComponentMeta(componentPath);
			styleCache.delete(meta.cacheIdentifier);
		} catch (e) {
			// silently ignore possible component lookup errors
		}
	}
}

module.exports = BaseCompiler;
