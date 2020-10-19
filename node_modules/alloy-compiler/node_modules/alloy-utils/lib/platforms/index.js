const platforms = {
	android: require('./android'),
	ios: require('./ios'),
	windows: require('./windows')
};

// iterate through supported platforms to create specific constants
const generatePlatformArray = key => {
	var ret = [];
	Object.keys(platforms).forEach(p => {
		ret.push(platforms[p][key]);
	});
	return ret;
};

module.exports = {
	...platforms,
	constants: {
		PLATFORMS: generatePlatformArray('platform'),
		PLATFORM_FOLDERS_ALLOY: generatePlatformArray('alloyFolder'),
		PLATFORM_FOLDERS: generatePlatformArray('titaniumFolder')
	}
};
