const { getOptions } = require('loader-utils');

module.exports = function modelLoader(content) {
	const { compiler } = getOptions(this);
	const { code, dependencies } = compiler.compileModel({
		file: this.resourcePath,
		content,
		es6: true
	});
	for (const dep of dependencies) {
		this.addDependency(dep);
	}

	return [ code ];
};
