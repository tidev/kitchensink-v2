const asyncLib = require('neo-async');
const path = require('path');
const ContextElementDependency = require('webpack/lib/dependencies/ContextElementDependency');

class WidgetsPlugin {
	constructor(options) {
		this.alloyCompiler = options.compiler;
	}

	apply(compiler) {
		const widgets = this.alloyCompiler.compilationMeta.widgets;
		if (widgets.size === 0) {
			return;
		}

		compiler.hooks.contextModuleFactory.tap('AlloyWidgetsPlugin', cmf => {
			cmf.hooks.afterResolve.tap('AlloyWidgetsPlugin', result => {
				if (!/alloy[/\\]widgets/.test(result.request)) {
					return;
				}
				result.resolveDependencies = (fs, options, callback) => {
					let resource = options.resource;
					let resourceQuery = options.resourceQuery;
					let regExp = options.regExp;
					let include = /(controllers|styles)[/\\]/;
					const addDirectory = (directory, callback) => {
						fs.readdir(directory, (err, files) => {
							if (err) {
								return callback(err);
							}

							files = cmf.hooks.contextModuleFiles.call(files);
							if (!files || files.length === 0) {
								return callback(null, []);
							}

							asyncLib.map(
								files.filter(p => p.indexOf('.') !== 0),
								(entry, callback) => {
									const subResource = path.join(directory, entry);
									if (directory.endsWith('widgets') && !widgets.has(subResource)) {
										return callback();
									}

									fs.stat(subResource, (err, stat) => {
										if (err) {
											if (err.code === 'ENOENT') {
												// ENOENT is ok here because the file may have been deleted between
												// the readdir and stat calls.
												return callback();
											} else {
												return callback(err);
											}
										}

										if (stat.isDirectory()) {
											addDirectory.call(null, subResource, callback);
										} else if (stat.isFile() && subResource.match(include)) {
											let request;
											if (/node_modules/.test(subResource)) {
												request = subResource.substr(subResource.lastIndexOf('node_modules') + 13);
											} else {
												request = `.${subResource.substr(resource.length).replace(/\\/g, '/')}`;
											}
											const obj = {
												context: resource,
												request
											};
											if (/node_modules/.test(subResource)) {
												obj.request = subResource.substr(subResource.lastIndexOf('node_modules') + 13);
												obj.isNpmWidget = true;
											}
											cmf.hooks.alternatives.callAsync(
												[ obj ],
												(err, alternatives) => {
													if (err) {
														return callback(err);
													}
													alternatives = alternatives
														.filter(obj => (obj.isNpmWidget ? true : regExp.test(obj.request)))
														.map(obj => {
															const userRequest = obj.isNpmWidget
																? obj.request.replace(/^alloy-widget-/, './')
																: obj.request;
															const dep = new ContextElementDependency(
																obj.request + resourceQuery,
																userRequest
															);
															dep.optional = true;
															return dep;
														});
													callback(null, alternatives);
												}
											);
										} else {
											callback();
										}
									});
								},
								(err, result) => {
									if (err) {
										return callback(err);
									}

									if (!result) {
										return callback(null, []);
									}

									const dependencies = [];
									for (const item of result) {
										if (item) {
											dependencies.push(...item);
										}
									}
									callback(null, dependencies);
								}
							);
						});
					};

					const tasks = [];
					tasks.push(done => addDirectory(resource, done));
					widgets.forEach((widget, widgetPath) => {
						if (/node_modules/.test(widgetPath)) {
							tasks.push(done => addDirectory(widgetPath, done));
						}
					});
					asyncLib.series(tasks, (err, result) => {
						if (err) {
							return callback(err);
						}

						const dependencies = [];
						for (const item of result) {
							if (item) {
								dependencies.push(...item);
							}
						}
						callback(null, dependencies);
					});
				};
			});
		});
	}
}

module.exports = WidgetsPlugin;
