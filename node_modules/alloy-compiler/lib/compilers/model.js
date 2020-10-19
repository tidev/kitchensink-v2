const { constants: CONST, logger } = require('alloy-utils');
const _ = require('lodash');
const path = require('path');

const BaseCompiler = require('./base');

class ModelCompiler extends BaseCompiler {
	constructor(options) {
		super(options);

		this.models = options.compilationMeta.models;
	}

	compile(options) {
		const templateName = this.compilationMeta.isWebpack ? 'model.es6.js' : 'model.js';
		const modelTemplateFile = path.join(this.config.dir.template, templateName);
		const modelMeta = this.findModel(options.file);
		const isWidget = !!modelMeta.widget;
		const manifest = isWidget ? modelMeta.widget.manifest : undefined;
		const baseDir = isWidget ? modelMeta.widget.dir : this.appDir;
		const pathPrefix = isWidget ? 'widgets/' + manifest.id + '/' : '';

		logger.info('[' + pathPrefix + 'models/' + path.basename(options.file) + '] model processing...');

		const fullPath = options.file;
		const content = options.content || this.fs.readFileSync(fullPath, 'utf-8');
		const basename = path.basename(fullPath, '.' + CONST.FILE_EXT.MODEL);
		const migrationDir = path.join(baseDir, CONST.DIR.MIGRATION);
		const { migrations, files: dependencies } = this.findModelMigrations(basename, migrationDir);
		// generate model code based on model.js template and migrations
		const code = _.template(this.fs.readFileSync(modelTemplateFile, 'utf8'))({
			basename,
			modelJs: content,
			migrations
		});

		return {
			code,
			dependencies
		};
	}

	findModel(modelPath) {
		for (const fullPath of this.models.keys()) {
			if (fullPath === modelPath) {
				return this.models.get(fullPath);
			}
		}

		return null;
	}

	findModelMigrations(name, migrationsDir) {
		const migrations = [];
		let files = [];
		try {
			files = this.fs.readdirSync(migrationsDir);
		} catch (e) {
			if (e.code === 'ENOENT') {
				return {
					migrations,
					files
				};
			}

			throw e;
		}
		const part = '_' + name + '.' + CONST.FILE_EXT.MIGRATION;
		// look for our model
		files = _.reject(files, f => f.indexOf(part) === -1);
		// sort them in the oldest order first
		files = files.sort((a, b) => {
			var x = a.substring(0, a.length - part.length - 1);
			var y = b.substring(0, b.length - part.length - 1);
			if (x < y) {
				return -1;
			}
			if (x > y) {
				return 1;
			}
			return 0;
		});
		_.each(files, f => {
			const mf = path.join(migrationsDir, f);
			const m = this.fs.readFileSync(mf, 'utf8');
			const code = `(function(migration){
migration.name = '${name}';
migration.id = '${f.substring(0, f.length - part.length).replace(/_/g, '')}';
${m}
})`;
			migrations.push(code);
		});
		logger.info('Found ' + migrations.length + ' migrations for model: ' + name);

		return { migrations, files };
	}
}

module.exports = ModelCompiler;
