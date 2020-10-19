const { constants: CONST, utils: U } = require('alloy-utils');
const path = require('path');

const CU = require('../compilerUtils');

/** @typedef {import("./alloy").CompilerOptions} CompilerOptions */

/**
 * @typedef {Object} WidgetMeta
 * @property {string} dir
 */

/**
 * @typedef {Object} ModelMeta
 * @property {string} name
 * @property {string} collectionPath
 * @property {WidgetMeta} widget
 */

/**
 * Container for metadata used by the compilers during the compilation
 * process.
 *
 * Provides info about available widgets, models, other project related
 * metadata and the current environemnt.
 */
class CompilationMeta {
	/**
	 * Constructs a compilation metadata container.
	 *
	 * @param {CompilerOptions} options Compiler options
	 */
	constructor(options) {
		const { compileConfig, fs } = options;
		/**
		 * Project directory.
		 *
		 * @type {string}
		 */
		this.projectDir = compileConfig.dir.project;

		/**
		 * Alloy app folder path.
		 *
		 * @type {string}
		 */
		this.appDir = compileConfig.dir.home;

		/**
		 * Compiler filesystem
		 *
		 * @type {Object}
		 */
		this.fs = fs;

		/**
		 * Whether the current compilation is run within webpack or not
		 *
		 * @type {boolean}
		 */
		this.isWebpack = options.webpack || false;

		/** @type {Map<string, WidgetMeta>} */
		this.widgets = new Map();

		/** @type {Map<string, ModelMeta>} */
		this.models = new Map();

		this.findWidgetsAndModels();
	}

	/**
	 * Search the project for widgets and models. This info is queried often
	 * during compilation so we store here in a central place.
	 */
	findWidgetsAndModels() {
		this.widgets = this.findAllWidgets();
		this.models = this.findAllModels();
		this.models.forEach(m => {
			CU.models.push(m.name);
		});
	}

	/**
	 * Finds all available widgets.
	 *
	 * @return {Map<string, Object>}
	 */
	findAllWidgets() {
		const widgetDirs = U.getWidgetDirectories(this.appDir);
		const widgets = new Map();
		widgetDirs.forEach(widget => widgets.set(widget.dir, widget));
		return widgets;
	}

	/**
	 * Finds all available models.
	 *
	 * @return {Map<string, ModelMeta>}
	 */
	findAllModels() {
		const widgetDirs = U.getWidgetDirectories(this.appDir);
		widgetDirs.push({ dir: path.join(this.projectDir, CONST.ALLOY_DIR) });

		const models = new Map();
		widgetDirs.forEach(collection => {
			const widget = this.widgets.get(collection.dir);
			const modelDir = path.join(collection.dir, CONST.DIR.MODEL);
			try {
				this.fs.readdirSync(modelDir).forEach(file => {
					var fullpath = path.join(modelDir, file);
					var basename = path.basename(fullpath, '.' + CONST.FILE_EXT.MODEL);
					models.set(fullpath, {
						name: basename,
						collectionPath: collection.dir,
						widget
					});
				});
			} catch (e) {
				if (e.code !== 'ENOENT') {
					throw e;
				}
			}
		});

		return models;
	}
}

module.exports = CompilationMeta;
