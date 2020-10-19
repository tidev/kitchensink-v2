'use strict';
/* eslint-disable quote-props */
var verifyPeer = require('./verify-peer-dependency');
verifyPeer('babel-eslint');

module.exports = {
	'parser': 'babel-eslint',
	'parserOptions': {
		'ecmaVersion': 2018
	}
};
