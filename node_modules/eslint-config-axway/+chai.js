'use strict';
/* eslint-disable quote-props */
var verifyPeer = require('./verify-peer-dependency');
verifyPeer('eslint-plugin-chai-friendly');

module.exports = {
	'plugins': [
		'chai-expect', // https://www.npmjs.com/package/eslint-plugin-chai-expect
		'chai-friendly' // https://www.npmjs.com/package/eslint-plugin-chai-friendly
	],
	'rules': {
		'no-unused-expressions': 'off',
		'chai-friendly/no-unused-expressions': [ 'error', { 'allowShortCircuit': true, 'allowTernary': true } ],

		// chai rules
		'chai-expect/missing-assertion': 'warn', // TODO: Bump to error in next major
		'chai-expect/terminating-properties': 'warn',
	}
};
