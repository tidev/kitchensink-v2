const { utils: { XML } } = require('alloy-utils');
const globby = require('globby');
const path = require('path');
const { RawSource } = require('webpack-sources');

const i18nFilePattern = /app[/\\]i18n[/\\].*\.xml$/;

/**
 * @typedef I18nSource
 * @property {string} path Path to the i18n folder.
 * @property {boolean} override Whether or not keys found under this folder should override existing ones.
 */

/**
 * @typedef I18nMergeResult
 * @property {Map<string, string>} content Map of found .xml files and merged content.
 * @property {Array<string>} files List of .xml files processed during merge.
 * @property {Array<Error>} errors List of errors encountered while processing the .xml files
 * @property {Array<string>} warnings List of warnings emitted while processing the .xml files
 */

/**
 * Plugin to merge i18n files.
 *
 * Collects all available `i18n` directories from app, theme and widgets and
 * merges the containing xml files. After emitting the merged files the
 * `i18n` directories will be watched for changes to run the merge again.
 */
class I18nPlugin {
	constructor(options) {
		this.alloyCompiler = options.compiler;
	}

	apply(compiler) {
		const i18nSources = this.getI18nSourceLocations();
		const currentAssets = new Map();
		let fileDependencies = [];
		let firstCompilation = true;
		let i18nFileChanged = false;

		compiler.hooks.watchRun.tap('AlloyI18nPlugin', () => {
			compiler.removedFiles.forEach(filePathAndName => {
				if (i18nFilePattern.test(filePathAndName)) {
					currentAssets.delete(filePathAndName);
				}
			});
		});
		compiler.hooks.invalid.tap('AlloyI18nPlugin', filePathAndName => {
			firstCompilation = false;
			if (i18nFilePattern.test(filePathAndName)) {
				i18nFileChanged = true;
			}
		});
		compiler.hooks.compilation.tap('AlloyI18nPlugin', compilation => {
			const outputPath = compilation.getPath(compiler.outputPath);
			compilation.hooks.additionalAssets.tap('AlloyI18nPlugin', () => {
				const emitAsset = (targetFile, asset) => {
					if (typeof compilation.emitAsset === 'function') {
						compilation.emitAsset(targetFile, asset);
					} else {
						compilation.assets[targetFile] = asset;
					}
				};

				if (!firstCompilation && !i18nFileChanged) {
					// if no i18n files where changed in subsequent compilations,
					// just add back the current assets
					currentAssets.forEach(
						(asset, filePathAndName) => emitAsset(
							path.relative(outputPath, filePathAndName), asset
						)
					);
					return;
				}

				currentAssets.clear();
				const { files, content, errors, warnings } = this.mergeI18n(i18nSources);
				fileDependencies = files;
				if (errors.length > 0) {
					compilation.errors.push(...errors);
					return;
				}
				if (warnings.length > 0) {
					compilation.warnings.push(...warnings);
				}
				content.forEach((xmlContent, identifier) => {
					const targetFile = path.join('..', 'i18n', identifier);
					const targetPath = compiler.outputFileSystem.join(
						outputPath,
						targetFile
					);
					const asset = new RawSource(xmlContent);
					emitAsset(targetFile, asset);
					currentAssets.set(targetPath, asset);
				});
			});
		});

		compiler.hooks.afterEmit.tap('AlloyI18nPlugin', compilation => {
			const addDependencies = (target, deps) => {
				if ('addAll' in target) {
					target.addAll(deps);
				} else {
					for (const dep of deps) {
						target.add(dep);
					}
				}
			};
			// watch directories for newly added files
			addDependencies(compilation.contextDependencies, i18nSources.map(s => s.path));
			// watch existing files for changes
			addDependencies(compilation.fileDependencies, fileDependencies);
		});

		compiler.hooks.done.tap('AlloyI18nPlugin', () => {
			i18nFileChanged = false;
		});
	}

	getI18nSourceLocations() {
		const { config }  = this.alloyCompiler;
		const i18nSources = [
			{ path: path.posix.join(config.dir.home, 'i18n') }
		];
		if (config.theme) {
			i18nSources.push({
				path: path.posix.join(config.dir.home, 'themes', config.theme, 'i18n'),
				override: true
			});
		}
		this.alloyCompiler.compilationMeta.widgets.forEach(w => {
			const widgetI18nFolder = path.posix.join(w.dir, 'i18n');
			i18nSources.push({ path: widgetI18nFolder });
		});

		return i18nSources;
	}

	mergeI18n(i18nSources) {
		const errors = [];
		const warnings = [];
		const files = [];
		const mergedContent = new Map();
		const localizations = new Map();
		for (const folder of i18nSources) {
			const src = folder.path;

			const xmlFiles = globby.sync(path.posix.join(src, '**', '*.xml'));
			for (const xmlFile of xmlFiles) {
				try {
					files.push(xmlFile);
					const identifier = path.relative(src, xmlFile);

					if (!localizations.has(identifier)) {
						const xml = XML.parseFromFile(xmlFile);
						const doc = xml.documentElement;
						if (!doc) {
							throw new Error('No document element found');
						}
						const keys = new Map();
						doc.getElementsByTagName('string', node => {
							const name = node.getAttribute('name');
							keys.set(name, node);
						});
						localizations.set(identifier, { xml, doc, keys });
						continue;
					}

					const l11n = localizations.get(identifier);
					const sourceXml = XML.parseFromFile(xmlFile);
					const xmlDoc = sourceXml.documentElement;
					if (!xmlDoc) {
						throw new Error('No document element found');
					}
					xmlDoc.getElementsByTagName('string', node => {
						const name = node.getAttribute('name');
						const { xml, doc, keys } = l11n;
						if (!keys.has(name)) {
							doc.appendChild(xml.createTextNode('\t'));
							doc.appendChild(node);
							doc.appendChild(xml.createTextNode('\n'));
							keys.set(name, node);
						} else if (folder.overrde) {
							doc.replaceChild(node, keys.get(name));
							keys.set(name, node);
						}
					});
				} catch (e) {
					e.message = `Failed to parse "${xmlFile}": ${e.message}`;
					errors.push(e);
				}
			}
		}

		localizations.forEach(({ doc }, identifier) => {
			mergedContent.set(identifier, XML.toString(doc));
		});

		return { files, content: mergedContent, errors, warnings };
	}
}

module.exports = I18nPlugin;
