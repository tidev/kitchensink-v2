const { getOptions } = require('loader-utils');

module.exports = function styleLoader(content) {
	this.cacheable();

	const { compiler } = getOptions(this);
	const { code, dependencies } = compiler.compileStyle({
		source: content,
		file: this.resourcePath
	});
	for (const dep of dependencies) {
		this.addDependency(dep);
	}

	return code;
};
