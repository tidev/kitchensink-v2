'use strict';

const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');
const noUnusedVarRule = new eslint.Linter().getRules().get('no-unused-vars');
const utils = require('../lib/utils');

const eventMap = new Map();
function isUsedInXMLView(problem, metadata) {
	let events = eventMap.get(metadata.filename);
	if (!events) {
		events = utils.gatherEvents(metadata.filename);
		eventMap.set(metadata.filename, events);
	}
	return events.has(problem.node.name);
}

module.exports = ruleComposer.filterReports(
	noUnusedVarRule,
	(problem, metadata) => !isUsedInXMLView(problem, metadata)
);
