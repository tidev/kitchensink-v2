const fs = require('fs');
const path = require('path');

const CompilerFactory = require('../../lib/compilers/factory');
const CompilationMeta = require('../../lib/compilers/meta');
const { createCompileConfig, createCompiler } = require('../../lib');
const { logger } = require('alloy-utils');

logger.logLevel = logger.ERROR;

function setupCompilerFactory(options) {
	const compileConfig = createCompileConfig(Object.assign({}, {
		projectDir: path.join(__dirname, 'fixtures', 'test-app'),
		alloyConfig: {
			platform: 'ios'
		}
	}, options));
	return new CompilerFactory({
		compileConfig,
		compilationMeta: new CompilationMeta({ compileConfig, fs }),
		fs
	});
}

function setupCompiler(options) {
	return createCompiler(Object.assign({}, {
		compileConfig: {
			projectDir: path.join(__dirname, 'fixtures', 'test-app'),
			alloyConfig: {
				platform: 'ios'
			}
		}
	}, options));
}

function resolveComponentPath(type, filename) {
	return path.join(__dirname, 'fixtures', 'test-app', 'app', type, filename);
}

module.exports = {
	setupCompiler,
	setupCompilerFactory,
	resolveComponentPath
};
