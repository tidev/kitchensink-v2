'use strict';
/* eslint-disable quote-props */

/**
 * eslint's plugin loader does not allow absolute paths for plugins, only plugin names, so we need
 * to inject this module's node_modules directory into Node's module system.
 */
injectPluginSearchPath();

module.exports = {
	'env': {
		'es6': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:security/recommended'
	],
	'parserOptions': {
		'ecmaVersion': 2017,
		'sourceType': 'module'
	},
	'plugins': [
		'import',      // https://www.npmjs.com/package/eslint-plugin-import
		'promise',     // https://www.npmjs.com/package/eslint-plugin-promise
		'security'     // https://www.npmjs.com/package/eslint-plugin-security
	],
	'settings': {
		'import/resolver': {
			'node': {
				'extensions': [ '.js', '.json' ]
			}
		},
		'import/extensions': [
			'.js',
			'.jsx',
		],
	},
	'rules': {
		// eslint recommended overrides
		'accessor-pairs':                'error',
		'array-bracket-spacing':         [ 'warn', 'always' ],
		'array-callback-return':         'error',
		'arrow-parens':                  'off',
		'arrow-spacing':                 [ 'error', { 'after': true, 'before': true } ],
		'block-scoped-var':              'error',
		'block-spacing':                 'error',
		'brace-style':                   [ 'error', '1tbs', { 'allowSingleLine': true } ],
		'camelcase':                     [ 'off', { 'properties': 'never' } ],
		'comma-dangle':                  [ 'error', 'only-multiline' ],
		'comma-spacing':                 [ 'error', { 'after': true, 'before': false } ],
		'comma-style':                   [ 'error', 'last' ],
		'computed-property-spacing':     [ 'error', 'never' ],
		'curly':                         [ 'error', 'all' ],
		'dot-location':                  [ 'error', 'property' ],
		'dot-notation':                  [ 'off', { 'allowKeywords': true } ],
		'eol-last':                      'error',
		'eqeqeq':                        'error',
		'func-style':                    [ 'error', 'declaration', { 'allowArrowFunctions': true } ],
		'generator-star-spacing':        'error',
		'id-match':                      'error',
		'indent':                        [ 'error', 'tab', { 'SwitchCase': 1 } ],
		'jsx-quotes':                    'error',
		'key-spacing':                   [ 'error', { 'beforeColon': false, 'mode': 'minimum' } ],
		'keyword-spacing':               [ 'error', { 'overrides': {} } ],
		'linebreak-style':               [ 'error', 'unix' ],
		'lines-around-comment':          [ 'error', { 'beforeBlockComment': false } ],
		'max-depth':                     [ 'warn', 5 ],
		'max-len':                       [ 'error', 200, { 'ignoreStrings': true, 'ignoreTemplateLiterals': true, 'ignoreTrailingComments': true } ],
		'max-nested-callbacks':          'error',
		'max-statements-per-line':       'error',
		'new-parens':                    'error',
		'no-alert':                      'error',
		'no-array-constructor':          'error',
		'no-case-declarations':          'off',
		'no-catch-shadow':               'error',
		'no-cond-assign':                'off',
		'no-confusing-arrow':            'error',
		'no-console':                    'off',
		'no-constant-condition':         'off',
		'no-debugger':                   'warn',
		'no-div-regex':                  'error',
		'no-duplicate-imports':          'error',
		'no-empty':                      'warn',
		'no-eq-null':                    'error',
		'no-eval':                       'error',
		'no-extra-bind':                 'error',
		'no-extra-label':                'error',
		'no-fallthrough':                'off',
		'no-floating-decimal':           'error',
		'no-global-assign':              'error',
		'no-implicit-globals':           'error',
		'no-implied-eval':               'error',
		'no-inner-declarations':         'off',
		'no-iterator':                   'error',
		'no-label-var':                  'error',
		'no-labels':                     'error',
		'no-lone-blocks':                'error',
		'no-lonely-if':                  'error',
		'no-loop-func':                  'error',
		'no-multi-str':                  'error',
		'no-multiple-empty-lines':       [ 'error', { 'max': 1, 'maxBOF': 0 } ],
		'no-new-func':                   'error',
		'no-new-object':                 'error',
		'no-new-require':                'error',
		'no-new-wrappers':               'error',
		'no-path-concat':                'error',
		'no-proto':                      'error',
		'no-restricted-globals':         'error',
		'no-restricted-imports':         'error',
		'no-restricted-modules':         'error',
		'no-restricted-syntax':          'error',
		'no-script-url':                 'error',
		'no-self-compare':               'error',
		'no-sequences':                  'error',
		'no-shadow-restricted-names':    'error',
		'no-spaced-func':                'error',
		'no-template-curly-in-string':   'error',
		'no-throw-literal':              'error',
		'no-trailing-spaces':            'error',
		'no-undef-init':                 'error',
		'no-unmodified-loop-condition':  'error',
		'no-unneeded-ternary':           'error',
		'no-unused-expressions':         [ 'warn', { 'allowShortCircuit': true, 'allowTernary': true } ],
		'no-unused-vars':                [ 'warn', { 'argsIgnorePattern': '^_.+' } ],
		'no-useless-concat':             'error',
		'no-useless-constructor':        'error',
		'no-void':                       'error',
		'no-whitespace-before-property': 'error',
		'no-with':                       'error',
		'object-curly-spacing':          [ 'error', 'always' ],
		'one-var-declaration-per-line':  'error',
		'operator-assignment':           [ 'error', 'always' ],
		'operator-linebreak':            [ 'warn', 'before' ],
		'prefer-reflect':                [ 'off', { 'exceptions': [ 'call' ] } ],
		'quotes':                        [ 'error', 'single' ],
		'quote-props':                   [ 'error', 'as-needed' ],
		'semi':                          [ 'error', 'always' ],
		'semi-spacing':                  'error',
		'space-before-blocks':           [ 'error', 'always' ],
		'space-before-function-paren':   [ 'error', { 'anonymous': 'always', 'named': 'ignore', 'asyncArrow': 'always' } ],
		'space-in-parens':               [ 'error', 'never' ],
		'space-infix-ops':               'error',
		'space-unary-ops':               [ 'error', { 'nonwords': false, 'overrides': {} } ],
		'spaced-comment':                'error',
		'template-curly-spacing':        'error',
		'valid-jsdoc':                   [ 'warn', { 'requireReturn': false, 'requireReturnDescription': false } ],
		'vars-on-top':                   'off',
		'wrap-iife':                     'error',
		'yield-star-spacing':            'error',
		'yoda':                          'error',

		// import rules

		// Static analysis:
		'import/no-unresolved': 'off',
		'import/named': 'error',
		'import/default': 'off',
		'import/namespace': 'off',

		// Helpful warnings:
		'import/export': 'error',
		'import/no-named-as-default-member': 'error',
		'import/no-deprecated': 'off',
		'import/no-mutable-exports': 'warn',

		// Style guide:
		'import/first': 'off',
		'import/imports-first': 'off',
		'import/no-duplicates': 'error',
		'import/no-namespace': 'off',
		'import/order': [ 'off', {
			groups: [ 'builtin', 'external', 'internal', 'parent', 'sibling', 'index' ],
			'newlines-between': 'never',
		} ],
		'import/no-restricted-paths': 'off',
		'import/max-dependencies': [ 'off', { max: 10 } ],
		'import/no-absolute-path': 'error',
		'import/no-internal-modules': [ 'off', {
			allow: [],
		} ],
		'import/unambiguous': 'off',
		'import/no-unassigned-import': 'off',
		'import/no-named-default': 'error',
		'import/no-anonymous-default-export': [ 'off', {
			allowArray: false,
			allowArrowFunction: false,
			allowAnonymousClass: false,
			allowAnonymousFunction: false,
			allowLiteral: false,
			allowObject: false,
		} ],
		'import/exports-last': 'off',

		// security rules
		'security/detect-non-literal-fs-filename': 'off',
		'security/detect-object-injection':        'off',
		'security/detect-unsafe-regex':            'off',

		// promise rules
		'promise/always-return': 'warn', // TODO: Bump to error in next major
		'promise/avoid-new': 'off',
		'promise/catch-or-return': 'warn', // TODO: Bump to error in next major
		'promise/no-callback-in-promise': 'warn',
		'promise/no-native': 'off',
		'promise/no-nesting': 'warn',
		'promise/no-new-statics': 'warn', // TODO: Bump to error in next major
		'promise/no-promise-in-callback': 'warn',
		'promise/no-return-in-finally': 'warn',
		'promise/no-return-wrap': 'warn', // TODO: Bump to error in next major
		'promise/param-names': 'warn', // TODO: Bump to error in next major
		'promise/valid-params': 'warn'
	}
};

function injectPluginSearchPath() {
	var Module = require('module').Module;
	var origFindPath = Module._findPath;
	var path = require('path');
	var localPaths = [
		path.join(__dirname, 'node_modules'),
		path.resolve(__dirname, '..', 'node_modules')
	];

	Module._findPath = function (request, paths, isMain) {
		return origFindPath.call(this, request, paths.concat(localPaths), isMain);
	};
}
