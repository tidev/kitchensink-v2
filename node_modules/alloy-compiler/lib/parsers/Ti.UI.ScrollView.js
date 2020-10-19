var _ = require('lodash'),
	styler = require('../styler'),
	U = require('alloy-utils').utils,
	CU = require('../compilerUtils');

exports.parse = function (node, state) {
	return require('./base').parse(node, state, parse);
};

function parse(node, state) {
	var children = U.XML.getElementsFromNodes(node.childNodes),
		code = '',
		extras = [],
		proxyProperties = {};

	_.each(children, function (child) {
		if (child.nodeName === 'RefreshControl') {
			code += CU.generateNodeExtended(child, state, {
				parent: { },
				post: function (node, state) {
					proxyProperties.refreshControl = state.parent.symbol;
				}
			});
			child.nodeType = null;
		}
	});

	// add all proxy properties at creation time
	_.each(proxyProperties, function (v, k) {
		extras.push([ k, v ]);
	});

	// if we got any extras, add them to the state
	if (extras.length) {
		state.extraStyle = styler.createVariableStyle(extras);
	}

	const scrollViewState = require('./default').parse(node, state);
	scrollViewState.code = code + scrollViewState.code;

	return scrollViewState;
}
