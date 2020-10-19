/* eslint-disable quote-props */
var verifyPeer = require('./verify-peer-dependency');
verifyPeer('eslint-plugin-react');
verifyPeer('eslint-plugin-jsx-a11y');

module.exports = {
	plugins: [
		'jsx-a11y',
		'react'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	settings: {
		'propWrapperFunctions': [
			'forbidExtraProps',
			'exact',
			'Object.freeze'
		]
	},
	rules: {
		// jsx a11y rules
		'jsx-a11y/anchor-has-content': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'jsx-a11y/aria-role': [ 'error', { ignoreNonDom: false } ],
		'jsx-a11y/aria-props': 'error',
		'jsx-a11y/aria-proptypes': 'error',
		'jsx-a11y/aria-unsupported-elements': 'error',
		'jsx-a11y/alt-text': [ 'error', {
			elements: [ 'img', 'object', 'area', 'input[type=\'image\']' ],
			img: [],
			object: [],
			area: [],
			'input[type=\'image\']': []
		} ],
		'jsx-a11y/img-redundant-alt': 'error',
		'jsx-a11y/label-has-for': [
			'error', {
				components: [ 'label' ],
				required: {
					every: [ 'id' ]
				}
			}
		],
		'jsx-a11y/mouse-events-have-key-events': 'error',
		'jsx-a11y/no-access-key': 'error',
		'jsx-a11y/no-onchange': 'off',
		'jsx-a11y/interactive-supports-focus': 'error',
		'jsx-a11y/role-has-required-aria-props': 'error',
		'jsx-a11y/role-supports-aria-props': 'error',
		'jsx-a11y/tabindex-no-positive': 'error',
		'jsx-a11y/heading-has-content': [ 'error', { components: [ '' ] } ],
		'jsx-a11y/html-has-lang': 'error',
		'jsx-a11y/lang': 'error',
		'jsx-a11y/no-distracting-elements': [ 'error', {
			elements: [ 'marquee', 'blink' ]
		} ],
		'jsx-a11y/scope': 'error',
		'jsx-a11y/click-events-have-key-events': 'error',
		'jsx-a11y/no-noninteractive-element-interactions': [ 'error', {
			handlers: [
				'onClick',
				'onMouseDown',
				'onMouseUp',
				'onKeyPress',
				'onKeyDown',
				'onKeyUp'
			]
		} ],
		'jsx-a11y/accessible-emoji': 'error',
		'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
		'jsx-a11y/iframe-has-title': 'error',
		'jsx-a11y/no-autofocus': [ 'error', { ignoreNonDOM: true } ],
		'jsx-a11y/no-redundant-roles': 'error',
		'jsx-a11y/media-has-caption': [ 'error', {
			audio: [],
			video: [],
			track: []
		} ],
		'jsx-a11y/no-interactive-element-to-noninteractive-role': [ 'error', {
			tr: [ 'none', 'presentation' ]
		} ],
		'jsx-a11y/no-noninteractive-element-to-interactive-role': [ 'error', {
			ul: [ 'listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid' ],
			ol: [ 'listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid' ],
			li: [ 'menuitem', 'option', 'row', 'tab', 'treeitem' ],
			table: [ 'grid' ],
			td: [ 'gridcell' ]
		} ],
		'jsx-a11y/no-noninteractive-tabindex': [ 'error', {
			tags: [],
			roles: [ 'tabpanel' ]
		} ],
		'jsx-a11y/anchor-is-valid': [ 'error', {
			components: [ 'Link' ],
			specialLink: [ 'to' ],
			aspects: [ 'noHref', 'invalidHref', 'preferButton' ]
		} ],
		// react rules
		'react/forbid-prop-types': 'off',
		'react/jsx-indent-props': [ 'warn', 'tab' ],
		'react/jsx-indent': [ 'warn', 'tab' ],
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
		'react/no-array-index-key': 'off',
		'react/no-find-dom-node': 'off',
		'react/no-multi-comp': 'off',
		'react/no-unused-prop-types': 'off',
		'react/prefer-stateless-function': 'off',
		'react/prop-types': 'off',
		'react/require-default-props': 'off',
		'react/sort-comp': 'off',
		'jsx-quotes': [ 'error', 'prefer-double' ],
		'react/display-name': [ 'off', { ignoreTranspilerName: false } ],
		'react/jsx-boolean-value': [ 'error', 'never', { always: [] } ],
		'react/jsx-closing-bracket-location': [ 'error', 'line-aligned' ],
		'react/jsx-closing-tag-location': 'error',
		'react/jsx-curly-spacing': [ 'error', 'never', { allowMultiline: true } ],
		'react/jsx-handler-names': [ 'off', {
			eventHandlerPrefix: 'handle',
			eventHandlerPropPrefix: 'on'
		} ],
		'react/jsx-key': 'off',
		'react/jsx-max-props-per-line': [ 'error', { maximum: 1, when: 'multiline' } ],
		'react/jsx-no-bind': [ 'error', {
			ignoreRefs: true,
			allowArrowFunctions: true,
			allowBind: false
		} ],
		'react/jsx-no-duplicate-props': [ 'error', { ignoreCase: true } ],
		'react/jsx-no-literals': [ 'off', { noStrings: true } ],
		'react/jsx-no-undef': 'error',
		'react/jsx-pascal-case': [ 'error', {
			allowAllCaps: true,
			ignore: []
		} ],
		'react/sort-prop-types': [ 'off', {
			ignoreCase: true,
			callbacksLast: false,
			requiredFirst: false
		} ],
		'react/jsx-sort-prop-types': 'off',
		'react/jsx-sort-props': [ 'off', {
			ignoreCase: true,
			callbacksLast: false,
			shorthandFirst: false,
			shorthandLast: false,
			noSortAlphabetically: false,
			reservedFirst: true
		} ],
		'react/no-danger': 'warn',
		'react/no-deprecated': [ 'error' ],
		'react/no-did-mount-set-state': 'off',
		'react/no-did-update-set-state': 'error',
		'react/no-will-update-set-state': 'error',
		'react/no-direct-mutation-state': 'off',
		'react/no-is-mounted': 'error',
		'react/no-set-state': 'off',
		'react/no-string-refs': 'error',
		'react/no-unknown-property': 'error',
		'react/prefer-es6-class': [ 'error', 'always' ],
		'react/react-in-jsx-scope': 'error',
		'react/require-render-return': 'error',
		'react/self-closing-comp': 'error',
		'react/jsx-wrap-multilines': [ 'error', {
			declaration: true,
			assignment: true,
			return: true,
			arrow: true
		} ],
		'react/jsx-first-prop-new-line': [ 'error', 'multiline-multiprop' ],
		'react/jsx-equals-spacing': [ 'error', 'never' ],
		'react/jsx-no-target-blank': 'error',
		'react/jsx-filename-extension': [ 'error', { extensions: [ '.jsx' ] } ],
		'react/jsx-no-comment-textnodes': 'error',
		'react/no-render-return-value': 'error',
		'react/require-optimization': [ 'off', { allowDecorators: [] } ],
		'react/forbid-component-props': [ 'off', { forbid: [] } ],
		'react/forbid-elements': [ 'off', { forbid: [] } ],
		'react/no-danger-with-children': 'error',
		'react/style-prop-object': 'error',
		'react/no-unescaped-entities': 'error',
		'react/no-children-prop': 'error',
		'react/jsx-tag-spacing': [ 'error', {
			closingSlash: 'never',
			beforeSelfClosing: 'always',
			afterOpening: 'never'
		} ],
		'react/jsx-space-before-closing': [ 'off', 'always' ],
		'react/forbid-foreign-prop-types': 'off',
		'react/void-dom-elements-no-children': 'error',
		'react/default-props-match-prop-types': [ 'error', { allowRequiredDefaults: false } ],
		'react/no-redundant-should-component-update': 'error',
		'react/no-unused-state': 'error',
		'react/boolean-prop-naming': [ 'off', {
			propTypeNames: [ 'bool', 'mutuallyExclusiveTrueProps' ],
			rule: '^(is|has)[A-Z]([A-Za-z0-9]?)+'
		} ],
		'react/no-typos': 'error',
		'react/jsx-curly-brace-presence': [ 'error', { props: 'never', children: 'never' } ],
	}
};
