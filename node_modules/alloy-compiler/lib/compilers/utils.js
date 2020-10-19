function configureBabelPlugins(compileConfig) {
	return [
		[ require('../ast/builtins-plugin'), compileConfig ],
		[ require('../ast/optimizer-plugin'), compileConfig.alloyConfig ],
	];
}

module.exports = {
	configureBabelPlugins
};
