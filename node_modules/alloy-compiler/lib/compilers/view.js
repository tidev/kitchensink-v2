const { constants: CONST, logger, utils: U } = require('alloy-utils');
const _ = require('lodash');
const path = require('path');

const BaseCompiler = require('./base');
const CU = require('../compilerUtils');
const styler = require('../styler');

class ViewCompiler extends BaseCompiler {
	compile(options) {
		if (!options.file) {
			throw new Error('Missing "file" option.');
		}

		let viewCode = '';
		let preCode = '';
		const meta = this.resolveComponentMeta(options.file);
		const {
			componentName: viewName,
			basePath,
			subPath: dirname,
			manifest,
			files
		} = meta;
		const { styles, files: styleFiles } = this.loadStyles(meta);
		const state = { parent: {}, styles };

		// Load view from file into an XML document root node
		logger.info('  view:       "'
			+ path.relative(path.join(basePath, CONST.DIR.VIEW), files.VIEW) + '"');
		const docRoot = U.XML.getAlloyFromFile(files.VIEW);

		// see if autoStyle is enabled for the view
		if (docRoot.hasAttribute(CONST.AUTOSTYLE_PROPERTY)) {
			CU[CONST.AUTOSTYLE_PROPERTY] = docRoot.getAttribute(CONST.AUTOSTYLE_PROPERTY) === 'true';
		}

		// see if module attribute has been set on the docRoot (<Alloy>) tag for the view
		if (docRoot.hasAttribute(CONST.DOCROOT_MODULE_PROPERTY)) {
			CU[CONST.DOCROOT_MODULE_PROPERTY] = docRoot.getAttribute(CONST.DOCROOT_MODULE_PROPERTY);
		} else {
			CU[CONST.DOCROOT_MODULE_PROPERTY] = null;
		}

		// see if baseController attribute has been set on the docRoot (<Alloy>) tag for the view
		if (docRoot.hasAttribute(CONST.DOCROOT_BASECONTROLLER_PROPERTY)) {
			CU[CONST.DOCROOT_BASECONTROLLER_PROPERTY] = '"' + docRoot.getAttribute(CONST.DOCROOT_BASECONTROLLER_PROPERTY) + '"';
		} else {
			CU[CONST.DOCROOT_BASECONTROLLER_PROPERTY] = null;
		}

		// make sure we have a Window, TabGroup, or SplitWindow
		let rootChildren = U.XML.getElementsFromNodes(docRoot.childNodes);
		if (viewName === 'index' && !dirname) {
			const valid = [
				'Ti.UI.Window',
				'Ti.UI.iOS.SplitWindow',
				'Ti.UI.TabGroup',
				'Ti.UI.iOS.NavigationWindow',
				'Ti.UI.NavigationWindow'
			].concat(CONST.MODEL_ELEMENTS);
			rootChildren.forEach(node => {
				let found = true;
				const args = CU.getParserArgs(node, {}, { doSetId: false });

				if (args.fullname === 'Alloy.Require') {
					const inspect = CU.inspectRequireNode(node);
					for (let j = 0; j < inspect.names.length; j++) {
						if (!_.includes(valid, inspect.names[j])) {
							found = false;
							break;
						}
					}
				} else {
					found = _.includes(valid, args.fullname);
				}

				if (!found) {
					throw new Error('Compile failed. index.xml must have a top-level container element. '
						+ 'Valid elements: [' + valid.join(',') + ']'
					);
				}
			});
		}

		preCode = this.processModels(docRoot, state);

		// rebuild the children list since model elements have been removed
		rootChildren = U.XML.getElementsFromNodes(docRoot.childNodes);

		// process the UI nodes
		rootChildren.forEach(node => {
			// should we use the default id?
			const defaultId = CU.isNodeForCurrentPlatform(node) ? viewName : undefined;

			// generate the code for this node
			viewCode += CU.generateNode(node, {
				parent: {},
				styles: state.styles,
				widgetId: manifest ? manifest.id : undefined,
				parentFormFactor: node.hasAttribute('formFactor') ? node.getAttribute('formFactor') : undefined
			}, defaultId, true);
		});

		// for each model variable in the bindings map...
		_.each(styler.bindingsMap, (mapping, modelVar) => {

			// open the model binding handler
			var handlerVar = CU.generateUniqueId();
			viewCode += 'var ' + handlerVar + ' = function() {';

			_.each(mapping.models, modelVar => {
				viewCode += modelVar + '.__transform = _.isFunction(' + modelVar + '.transform) ? ' + modelVar + '.transform() : ' + modelVar + '.toJSON();';
			});

			CU.destroyCode += `${modelVar} && ${state.parentFormFactor ? 'is' + U.ucfirst(state.parentFormFactor) : ''}
				${modelVar}.off('${CONST.MODEL_BINDING_EVENTS}', ${handlerVar});`;

			// for each specific conditional within the bindings map....
			_.each(_.groupBy(mapping.bindings, b => b.condition), (bindings, condition) => {
				var bCode = '';

				// for each binding belonging to this model/conditional pair...
				_.each(bindings, binding => {
					bCode += '$.' + binding.id + '.' + binding.prop + ' = ' + binding.val + ';';
				});

				// if this is a legit conditional, wrap the binding code in it
				if (typeof condition !== 'undefined' && condition !== 'undefined') {
					bCode = 'if(' + condition + '){' + bCode + '}';
				}
				viewCode += bCode;
			});
			viewCode += '};';
			viewCode += modelVar + `.on('${CONST.MODEL_BINDING_EVENTS}', ${handlerVar});`;
		});

		// add destroy() function to view for cleaning up bindings
		viewCode += 'exports.destroy = function () {' + CU.destroyCode + '};';

		// add dataFunction of original name (if data-binding with form factor has been used)
		if (!_.isEmpty(CU.dataFunctionNames)) {
			_.each(Object.keys(CU.dataFunctionNames), funcName => {
				viewCode += 'function ' + funcName + '() { ';
				_.each(CU.dataFunctionNames[funcName], formFactor => {
					viewCode += '	if(Alloy.is' + U.ucfirst(formFactor) + ') { ' + funcName + U.ucfirst(formFactor) + '(); } ';
				});
				viewCode += '}';
			});
		}

		// add any postCode after the controller code
		const postCode = CU.postCode;

		return {
			preCode,
			viewCode,
			postCode,
			dependencies: [
				files.VIEW,
				...styleFiles
			]
		};
	}

	processModels(docRoot, state) {
		let code = '';
		const rootChildren = U.XML.getElementsFromNodes(docRoot.childNodes);
		// process any model/collection nodes
		rootChildren.forEach(node => {
			const fullname = CU.getNodeFullname(node);
			const isModelElement = _.includes(CONST.MODEL_ELEMENTS, fullname);

			if (isModelElement) {
				const vCode = CU.generateNode(node, state, undefined, false, true);
				code += vCode.pre;

				// remove the model/collection nodes when done
				docRoot.removeChild(node);
			}
		});

		return code;
	}
}

module.exports = ViewCompiler;
