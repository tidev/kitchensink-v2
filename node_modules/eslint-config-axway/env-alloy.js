/* eslint-disable quote-props */
var verifyPeer = require('./verify-peer-dependency');
verifyPeer('eslint-plugin-alloy');

module.exports = {
	'extends': './env-titanium.js',
	'plugins': [
		'alloy'
	],
	'globals': {
		'$': false,
		'_': false,
		'Alloy': false,
		'OS_ANDROID': false,
		'OS_IOS': false,
		'OS_WINDOWS': false,
		'Backbone': false,
		'arguments': false
	},
	'rules': {
		'no-unused-vars': 'off',
		'alloy/no-unused-vars': 'error'
	}
};
