/* eslint-disable quote-props */
module.exports = {
	'env': {
		'node': true
	},
	'parserOptions': {
		'ecmaVersion': 9
	},
	'plugins': [
		'node'
	],
	'extends': './index.js',
	'rules': {
		'node/no-deprecated-api': 'warn',
		'node/no-unpublished-bin': 'warn',
		'node/no-unsupported-features/es-builtins': 'warn', // TODO: Error in 5.0.0
		'node/no-unsupported-features/es-syntax': 'warn', // TODO: Error in 5.0.0
		'node/no-unsupported-features/node-builtins': 'warn', // TODO: Error in 5.0.0
		'node/prefer-global/buffer': 'warn',
		'node/prefer-global/console': 'warn',
		'node/prefer-global/process': 'warn',
		'node/prefer-global/text-decoder': 'warn',
		'node/prefer-global/text-encoder': 'warn',
		'node/prefer-global/url-search-params': 'warn',
		'node/prefer-global/url': 'warn',
		'node/process-exit-as-throw': 'warn'
	}
};
