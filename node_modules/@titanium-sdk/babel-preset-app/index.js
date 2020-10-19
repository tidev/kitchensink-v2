module.exports = (context, options = {}) => {
	const {
		// @babel/preset-env options
		env = {},
		// babel-plugin-transform-titanium
		titanium = {},
		// our custom options
		polyfills: userPolyfills
	} = options;

	const {
		targets,
		spec,
		loose,
		modules,
		debug,
		include,
		exclude,
		// TODO: default to `usage` once TIMOB-27629 is resolved
		useBuiltIns = false,
		// TODO: default to `3` once TIMOB-27629 is resolved
		corejs = undefined,
		forceAllTransforms,
		configPath,
		ignoreBrowserslistConfig,
		shippedProposals,
	} = env;

	const {
		deploytype,
		platform,
		target,
		Ti
	} = titanium;

	// Compute a list of default polyfills to include. Babel ignores node_modules
	// by default, so when useBuiltIns: 'usage' is set we don't have have a chance
	// to track usage in third-party dependencies. We provide a list with defaults
	// but users can set their own using the `polyfills` option.
	// TODO: Implement this when we actually support useBuiltIns: 'usage'
	let polyfills;
	if (useBuiltIns === 'usage') {

	} else {
		polyfills = [];
	}

	const presets = [];
	const presetEnvOptions = {
		targets,
		spec,
		loose,
		modules,
		debug,
		include,
		exclude,
		useBuiltIns,
		corejs,
		forceAllTransforms,
		configPath,
		ignoreBrowserslistConfig,
		shippedProposals
	};
	presets.push([ '@babel/preset-env', presetEnvOptions ]);

	const plugins = [];
	plugins.push(
		[
			'@babel/plugin-transform-runtime', {
				corejs: false,
				helpers: useBuiltIns === 'usage',
				regenerator: useBuiltIns !== 'usage'
			}
		],
		[
			'babel-plugin-transform-titanium', {
				deploytype,
				platform,
				target,
				Ti
			}
		]
	);

	return {
		sourceType: 'unambiguous',
		overrides: [
			{
				exclude: [
					// JS files under the Titanium common folder are already transpiled
					/common[/\\]Resources[/\\](android|ios)[/\\].*\.js/
				],
				presets,
				plugins
			}
		]
	};
};
