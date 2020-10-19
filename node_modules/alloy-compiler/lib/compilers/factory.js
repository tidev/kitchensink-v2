const ComponentCompiler = require('./component');
const ModelCompiler = require('./model');
const TssCompiler = require('./tss');
const ViewCompiler = require('./view');

/** @typedef {import("./alloy").CompileConfig} CompileConfig */
/** @typedef {import("./meta")} CompilationMeta */

/**
 * @typedef CompilerFactoryOptions
 * @property {CompileConfig} compileConfig Alloy compile config
 * @property {CompilationMeta} compilationMeta Metadata of the current compilation
 * @property {Object} fs Compiler filesystem
 */

/**
 * Compiler factory for the specific individual parts of Alloy components.
 */
class CompilerFactory {
	/**
	 * Constructs a new compiler factory.
	 *
	 * @param {CompilerFactoryOptions} options Options passed to the created compilers
	 */
	constructor(options) {
		this.options = options;
		const compilerClasses = new Map();
		compilerClasses.set('component', ComponentCompiler);
		compilerClasses.set('model', ModelCompiler);
		compilerClasses.set('style', TssCompiler);
		compilerClasses.set('view', ViewCompiler);
		this.compilerClasses = compilerClasses;
		this.compilers = new Map();
	}

	createCompiler(type) {
		if (this.compilers.has(type)) {
			return this.compilers.get(type);
		}

		const compilerClass = this.compilerClasses.get(type);
		const compiler = new compilerClass({
			...this.options,
			factory: this
		});
		this.compilers.set(type, compiler);

		return compiler;
	}
}

module.exports = CompilerFactory;
