/* eslint-disable no-unreachable */

const path = require('path');
const { SourceMapGenerator } = require('source-map');

const componentLoader = require('./loaders/componentLoader');
const modelLoader = require('./loaders/modelLoader');

const entryRegex = /app[/\\]alloy\.(j|t)s$/;
const internalsRegex = /node_modules[/\\]alloy[/\\]/;
const componentRegex = /(?:[/\\]widgets[/\\][^/\\]+)?[/\\](?:controllers|views)[/\\](.*)/;
const modelRegex = /(?:[/\\]widgets[/\\][^/\\]+)?[/\\]models[/\\](.*)/;
const appControllerRequestPattern = '\'/alloy/controllers/\' \\+ ';
const widgetControllerRequestPattern = '\'/alloy/widgets/\'.*?\'/controllers/\' \\+ ';

module.exports = function (content, map) {
	const result = loader.call(this, content, map);
	this.callback(null, ...result);
	return;
};

/**
 * The main alloy loader which delegates to specific sub-loaders
 * based on the current resource path.
 *
 * @param {string} content Content from previous loader.
 * @return {Array} Array containing content and optional source map
 */
function loader(content) {
	this.cacheable();

	if (this.resourceQuery) {
		return [ content ];
	}

	if (internalsRegex.test(this.resourcePath)) {
		return internalsLoader.call(this, content);
	}
	if (componentRegex.test(this.resourcePath)) {
		return componentLoader.call(this, content);
	}
	if (modelRegex.test(this.resourcePath)) {
		return modelLoader.call(this, content);
	}
	if (entryRegex.test(this.resourcePath)) {
		return entryLoader.call(this, content);
	}

	return [ content ];
}

/**
 * Loader for `app/alloy.js` which will be used as the Webpack entry.
 *
 * @param {string} content Content from alloy loader.
 * @param {object} inputSourceMap Input source map.
 * @return {Array} Array containing modified content.
 */
function entryLoader(content, inputSourceMap) {
	const entry = `import Alloy from '/alloy';
global.Alloy = Alloy;
global._ = Alloy._;
global.Backbone = Alloy.Backbone;

${content}

Ti.UI.addEventListener('sessionbegin', function () {
	Alloy.createController('index');
});

if ((typeof Ti.UI.hasSession === 'undefined') || Ti.UI.hasSession) {
	Alloy.createController('index');
}`;

	let map;
	if (inputSourceMap) {
		map = SourceMapGenerator.fromSourceMap(inputSourceMap);
	} else {
		map = map = new SourceMapGenerator({
			file: 'alloy.js',
		});
	}
	const contentLines = content.split('\n');
	for (let i = 0; i < contentLines.length; i++) {
		map.addMapping({
			source: 'alloy.js',
			original: { line: i + 1, column: 0 },
			generated: { line: i + 6, column: 0 }
		});
	}
	map.setSourceContent('alloy.js', content);

	return [ entry, map.toJSON() ];
}

/**
 * Loader for internal Alloy files that need modifications to work properly
 * with Webpack.
 *
 * @param {string} content Content from alloy loader.
 * @return {Array} Array containing modified content.
 */
function internalsLoader(content) {
	if (this.resourcePath.endsWith(path.join('Alloy', 'template', 'lib', 'alloy.js'))) {
		content = patchRequires(content);
		// replace version template string with constant
		content = content.replace('\'<%= version %>\'', 'ALLOY_VERSION');
	} else if (this.resourcePath.endsWith(path.join('Alloy', 'lib', 'alloy', 'widget.js'))) {
		content = patchRequires(content);
	}

	return [ content ];
}

/**
 * Patches various `require` statements in the given content to be compatible
 * with Webpack.
 *
 * @param {string} content File content to modify
 * @return {string}
 */
function patchRequires(content) {
	// requires for controllers need to use `.default`
	content = requireDefaultExport(content, appControllerRequestPattern);
	content = requireDefaultExport(content, widgetControllerRequestPattern);
	// remove ucfirst in model/collection requires
	content = content.replace(/models\/'\s\+\sucfirst\(name\)/g, 'models/\' + name');

	return content;
}

/**
 * Modifies require statements to use `.default`.
 *
 * @param {string} content Content string to search in.
 * @param {string} requestFilter RegExp to filter for specific requires.
 * @return {string}
 */
function requireDefaultExport(content, requestFilter) {
	// eslint-disable-next-line security/detect-non-literal-regexp
	const searchPattern = new RegExp(`(require\\(${requestFilter})(\\(?name(?: \\|\\| DEFAULT_WIDGET\\))?)(\\))`, 'g');
	return content.replace(searchPattern, '$1$2.replace(/^\\.?\\//, \'\')$3.default');
}
