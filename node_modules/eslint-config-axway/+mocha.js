/* eslint-disable quote-props */
var verifyPeer = require('./verify-peer-dependency');
verifyPeer('eslint-plugin-mocha');

module.exports = {
	'globals': {
		// mocha
		'after': false,
		'afterEach': false,
		'before': false,
		'beforeEach': false,
		'context': false,
		'describe': false,
		'it': false,
		'mocha': false,
		'run': false,
		'setup': false,
		'specify': false,
		'suite': false,
		'suiteSetup': false,
		'suiteTeardown': false,
		'teardown': false,
		'test': false,
		'xcontext': false,
		'xdescribe': false,
		'xit': false,
		'xspecify': false,

		// should
		'should': false,
		'Assertion': false,
		'PromisedAssertion': false,

		// chai
		'expect': false,

		// sinon
		'sinon': false,
		'spy': false,
		'stub': false
	},
	'plugins': [
		'mocha'
	],
	'rules': {
		// mocha rules
		'mocha/handle-done-callback': 'error',
		'mocha/no-exclusive-tests': 'warn',
		'mocha/no-identical-title': 'error',
		'mocha/no-skipped-tests': 'warn',
		'mocha/valid-test-description': 'off'
	}
};
