const { constants: CONST, logger } = require('alloy-utils');
const _ = require('lodash');
const path = require('path');
const { SourceMapGenerator } = require('source-map');

const BaseCompiler = require('./base');
const CU = require('../compilerUtils');
const styler = require('../styler');

class ComponentCompiler extends BaseCompiler {
	constructor(options) {
		super(options);

		this.viewCompiler = options.factory.createCompiler('view');
	}

	compile(options) {
		if (!options.file) {
			throw new Error('Missing "file" option.');
		}

		const componentPath = options.file;
		const meta = this.resolveComponentMeta(componentPath);
		const template = this.createTemplateObject(meta);
		const files = meta.files;
		let dependencies = [];

		// reset the bindings map
		this.resetState(meta);

		let hasView = false;
		let viewContent = options.viewContent;
		if (!viewContent) {
			try {
				viewContent = this.fs.readFileSync(files.VIEW, 'utf-8');
				hasView = true;
			} catch (e) {
				if (e.code !== 'ENOENT') {
					throw e;
				}
			}
		} else {
			hasView = true;
		}
		if (hasView) {
			const {
				preCode,
				viewCode,
				postCode,
				dependencies: viewDependencies
			} = this.viewCompiler.compile({
				file: files.VIEW,
				content: viewContent
			});
			template.preCode = preCode;
			template.viewCode = viewCode;
			template.postCode = postCode;
			dependencies = dependencies.concat(viewDependencies);
		}

		// process the controller code
		let controllerContent = options.controllerContent;
		if (!controllerContent) {
			try {
				controllerContent = this.fs.readFileSync(files.CONTROLLER, 'utf-8');
			} catch (e) {
				if (e.code !== 'ENOENT') {
					throw e;
				}
			}
		}
		logger.info('  controller: "'
			+ path.relative(path.join(meta.basePath, CONST.DIR.CONTROLLER), files.CONTROLLER) + '"');
		const cCode = CU.loadController(files.CONTROLLER, controllerContent);
		let controllerCode = '';
		template.parentController = (cCode.parentControllerName !== '')
			? cCode.parentControllerName
			: CU[CONST.DOCROOT_BASECONTROLLER_PROPERTY] || '\'BaseController\'';
		controllerCode += cCode.controller;
		template.preCode += cCode.pre;
		template.ES6Mod += cCode.es6mods;

		// create generated controller module code for this view/controller or widget
		const templateName = this.compilationMeta.isWebpack ? 'component.es6.js' : 'component.js';
		let codeTemplate = _.template(this.fs.readFileSync(path.join(this.config.dir.template, templateName), 'utf8'))(template);

		let map;
		if (options.inputSourceMap) {
			map = new SourceMapGenerator.fromSourceMap(options.inputSourceMap);
		} else {
			map = new SourceMapGenerator({
				file: `${meta.manifest ? meta.manifest.id + '/' : ''}controllers/${meta.componentIdentifier}.js`,
			});
		}
		let markerLineNumber = codeTemplate.split('\n').findIndex(line => line.includes('__MAPMARKER_CONTROLLER_CODE__'));
		let generatedLineNumber = markerLineNumber + 1;
		let paddedControllerCode = '';
		const controllerCodeLines = controllerCode.split('\n');
		for (let i = 0; i < controllerCodeLines.length; i++) {
			const line = controllerCodeLines[i];
			map.addMapping({
				generated: {
					line: generatedLineNumber++,
					column: 1
				},
				original: {
					line: i + 1,
					column: 0
				},
				source: files.CONTROLLER
			});
			paddedControllerCode += `${line}${i < controllerCodeLines.length - 1 ? '\n\t' : ''}`;
		}
		map.setSourceContent(files.CONTROLLER, controllerCode);
		let code = codeTemplate.replace('__MAPMARKER_CONTROLLER_CODE__', () => paddedControllerCode);
		code = code.replace(/^\t\n/gm, '\n');

		return {
			code,
			map: map.toJSON(),
			dependencies
		};
	}

	createTemplateObject(componentMeta) {
		const {
			manifest,
			componentName: viewName,
			subPath: dirname
		} = componentMeta;
		return {
			viewCode: '',
			modelVariable: CONST.BIND_MODEL_VAR,
			parentVariable: CONST.PARENT_SYMBOL_VAR,
			itemTemplateVariable: CONST.ITEM_TEMPLATE_VAR,
			controllerPath: (dirname ? path.join(dirname, viewName) : viewName).replace(/\\/g, '/'),
			preCode: '',
			postCode: '',
			Widget: !manifest ? '' : 'const ' + CONST.WIDGET_OBJECT
				+ ` = new (require('/alloy/widget'))('${manifest.id}');this.__widgetId='`
				+ manifest.id + '\';',
			WPATH: !manifest ? '' : _.template(this.fs.readFileSync(path.join(this.config.dir.template, 'wpath.js'), 'utf8'))({ WIDGETID: manifest.id }),
			ES6Mod: ''
		};
	}

	resetState(meta) {
		const { manifest, componentName } = meta;
		styler.bindingsMap = {};
		CU.destroyCode = '';
		CU.postCode = '';
		CU[CONST.AUTOSTYLE_PROPERTY] = this.config[CONST.AUTOSTYLE_PROPERTY];
		CU.currentManifest = manifest;
		CU.currentDefaultId = componentName;
	}
}

module.exports = ComponentCompiler;
