const { getOptions } = require('loader-utils');

/**
 * Loader for Alloy controllers / views.
 *
 * @param {string} content Content from alloy loader.
 * @param {Object} inputSourceMap Input source-map.
 * @return {Array} Array containing content and optional source map.
 */
module.exports = function componentLoader(content, inputSourceMap) {
	const { compiler } = getOptions(this);
	const { code, map, dependencies } = compiler.compileComponent({
		file: this.resourcePath,
		// we currently only use controllers as entry points so it's safe to assume
		// `content` always contains the controller code
		controllerContent: content,
		inputSourceMap
	});
	for (const dep of dependencies) {
		this.addDependency(dep);
	}

	return [ code, map ];
};
