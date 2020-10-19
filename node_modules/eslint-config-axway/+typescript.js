const path = require('path');
const verifyPeer = require('./verify-peer-dependency');
verifyPeer('@typescript-eslint/parser');
verifyPeer('@typescript-eslint/eslint-plugin');

const tsConfig = path.join(process.cwd(), 'tsconfig.json');

module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: tsConfig
	},
	plugins: [ '@typescript-eslint' ],
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	rules: {
		indent: 'off',
		'@typescript-eslint/indent': [ 'error', 'tab', { SwitchCase: 1 } ],
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': 'error',
		'no-unused-expressions': 'off',
		'@typescript-eslint/no-unused-expressions': 'warn'
	}
};
