const babel = require('@babel/core');
const { constants: CONST, tiapp, utils: U } = require('alloy-utils');
const fs = require('fs-extra');
const path = require('path');

const CompilerFactory = require('./factory');
const CompilationMeta = require('./meta');
const { configureBabelPlugins } = require('./utils');
const styler = require('../styler');

/**
 * @typedef {Object} AlloyConfig
 * @property {stirng} platform Target build platform
 * @property {string} deploytype Deployment type (development, test or production)
 * @property {string=} file File to compile
 */

/**
 * @typedef {Object} CompileConfig
 * @property {AlloyConfig} alloyConfig
 * @property {Object} dir
 * @property {Object} buildLog
 * @property {string} [theme=undefined]
 * @property {boolean} [sourcemap=true]
 * @property {boolean} [autoStyle=false]
 */

/**
 * @typedef {Object} CompilerOptions
 * @property {CompileConfig} compileConfig Compile config from compilerUtils
 * @property {fs} fs Compiler file system to use
 * @property {boolean} [webpack=false] Whether or not the compiler is used withing Webpack
 */

/**
 * Alloy compiler facade.
 */
class AlloyCompiler {
	/**
	 * Constructs a new alloy compiler.
	 *
	 * @param {CompilerOptions} options Compiler options.
	 */
	constructor(options) {
		const { compileConfig } = options;
		if (!options.fs) {
			options.fs = require('fs');
		}

		const compilationMeta = new CompilationMeta(options);
		this.compilationMeta = compilationMeta;
		this.config = compileConfig;
		this.factory = new CompilerFactory({ ...options, compilationMeta });

		// This needs to be initialized before any compile command
		tiapp.init(path.join(compileConfig.dir.project, 'tiapp.xml'));
		// validate the current Titanium SDK version, exit on failure
		tiapp.validateSdkVersion();

		// make sure `build/alloy` exists
		fs.ensureDirSync(path.join(compileConfig.dir.project, CONST.DIR.BUILD));

		// Load global styles
		styler.setPlatform(compileConfig.alloyConfig.platform);
		const theme = compileConfig.theme;
		styler.loadGlobalStyles(compileConfig.dir.home, theme ? { theme } : {});
	}

	compileComponent(options) {
		const compiler = this.factory.createCompiler('component');
		const result = compiler.compile(options);
		if (this.compilationMeta.isWebpack) {
			return result;
		}

		const babelOptions = {
			babelrc: false,
			retainLines: true,
			plugins: configureBabelPlugins(this.config),
			inputSourceMap: result.map
		};
		try {
			result.code = babel.transformSync(result.code, babelOptions).code;
		} catch (e) {
			U.die('Error transforming JS file', e);
		}

		return result;
	}

	compileModel(options) {
		const compiler = this.factory.createCompiler('model');
		return compiler.compile(options);
	}

	compileStyle(options) {
		const compiler = this.factory.createCompiler('style');
		return compiler.compile(options);
	}

	purgeStyleCache(componentPath) {
		this.factory.createCompiler('style').purgeStyleCache(componentPath);
	}
}

module.exports = AlloyCompiler;
