const { logger } = require('alloy-utils');
const path = require('path');

const BuildLog = require('./build-log');
const utils = require('./compilerUtils');
const sourceMapper = require('./sourceMapper');
const AlloyCompiler = require('./compilers/alloy');
const { configureBabelPlugins } = require('./compilers/utils');

/** @typedef {import("./compilers/alloy")} AlloyCompiler  */
/** @typedef {import("./compilers/alloy").AlloyConfig} AlloyConfig  */
/** @typedef {import("./compilers/alloy").CompileConfig} CompileConfig  */

/**
 * @typedef CreateCompileConfigOptions
 * @property {string} projectDir Alloy project root
 * @property {AlloyConfig} alloyConfig Alloy compile options
 * @property {BuildLog} [buildLog] Project build log
 * @property {number} [logLevel=0]
 */

/**
 * @typedef CreateCompilerOptions
 * @property {CompileConfig|CreateCompileConfigOptions} compileConfig Compile config to use
 * @property {boolean} [webpack=false] Whether or not to create a Webpack compatible compiler
 */

/**
 * Creates a new compile config object.
 *
 * @param {CreateCompileConfigOptions} options Options to create the compile config
 * @return {CompileConfig}
 */
function createCompileConfig(options) {
	const { projectDir } = options;
	const appDir = path.join(projectDir, 'app');
	logger.logLevel = options.logLevel || logger.ERROR;
	const buildLog = options.buildLog || new BuildLog(projectDir);
	const alloyConfig = options.alloyConfig;
	return utils.createCompileConfig(appDir, projectDir, alloyConfig, buildLog);
}

/**
 * Creates a new compiler instance.
 *
 * @param {CreateCompilerOptions} options Compiler creates options
 * @return {AlloyCompiler}
 */
function createCompiler(options) {
	if (!options.compileConfig) {
		throw new TypeError(`Missing "compileConfig" option. Either pass a config
object returned from "createCompileConfig" or pass options directly via this
property to create a new compile config object.`);
	}
	let compileConfig = options.compileConfig;
	if (typeof compileConfig.dir === 'undefined') {
		// If `compileConfig.dir` is undefined we got the raw options and neeed to
		// create the config object from that.
		compileConfig = createCompileConfig(compileConfig);
	}
	delete options.compileConfig;
	const mergedOptions = {
		...options,
		compileConfig
	};
	return new AlloyCompiler(mergedOptions);
}

module.exports = {
	BuildLog,
	configureBabelPlugins,
	createCompileConfig,
	createCompiler,
	sourceMapper,
	utils
};
