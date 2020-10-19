'use strict';

const findUp = require('find-up');

const fs = require('fs');
const path = require('path');

const XmlDocument = require('xmldoc').XmlDocument;

const RESERVED_EVENT_REGEX =  /^on([A-Z].+)/;
const platforms = [ 'android', 'iphone', 'ipad', 'ios', 'windows' ];

function gatherEvents(filename) {
	const events = new Set();
	const files = getViewFile(filename);
	for (const file of files) {
		if (fs.existsSync(file)) {
			const viewFile = new XmlDocument(fs.readFileSync(file, 'utf8'));
			loopChildren(viewFile.children, events);
		}
	}
	return events;
}

function getViewFile(filename) {
	const controllersDir = findUp.sync('controllers', { cwd: path.dirname(filename) });
	const relativePath = path.relative(controllersDir, filename);
	const files = [];

	const appDir = path.dirname(controllersDir);
	const viewDir = path.join(appDir, 'views');
	for (const platform of platforms) {
		if (fs.existsSync(path.join(viewDir, platform))) {
			const f = path.join(viewDir, platform, relativePath).replace('.js', '.xml');
			files.push(f);
		}
	}
	files.push(path.join(viewDir, relativePath).replace('.js', '.xml'));
	return files;
}

function loopChildren(children, events) {
	for (const child of children) {
		if (child.attr) {
			findEventHandlers(child, events);
		}
		if (child.children) {
			loopChildren(child.children, events);
		}
	}
}

function findEventHandlers(child, events) {

	for (const attr in child.attr) {
		if (RESERVED_EVENT_REGEX.test(attr)) {
			events.add(child.attr[attr]);
		}
	}
}

module.exports = {
	gatherEvents
};
