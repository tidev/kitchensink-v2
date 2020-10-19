/* eslint-disable quote-props */
module.exports = {
	'extends': './index.js',
	'globals': {
		'alert': false,
		'console': false,
		'decodeURIComponent': false,
		'encodeURIComponent': false,
		'L': false,
		'require': false,
		'Ti': false,
		'Titanium': false,
		'clearTimeout': false,
		'clearInterval': false,
		'setTimeout': false,
		'setInterval': false,
		'exports': false,
		'module': false
	},
	'rules': {
		'no-alert': 'off'
	}
};
