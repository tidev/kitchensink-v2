'use strict';

var Module = require('module');
var path = require('path');
var root = require('global-modules');
var isWindows = require('is-windows');
var unique = require('array-unique');

/**
 * Returns an array of directories to use as a starting
 * point for our lookups.
 *
 * @param  {String} `cwd` Defaults to `process.cwd()`.
 * @return {Array} Array of directories
 */

module.exports = function paths(cwd) {
  var res = Module._nodeModulePaths(cwd || process.cwd());

  res.push(root);

  // fall back paths
  if (process.env.NODE_PATH) {
    var nodePaths = process.env.NODE_PATH.split(path.delimiter);
    res = res.concat(nodePaths.filter(Boolean));
  } else {
    if (isWindows()) {
      res.push(npm(path.join(process.env.APPDATA, 'npm')));
    } else {
      res.push(npm('/usr/lib'));
    }
  }

  var mainModule = process.mainModule;

  // run as a vscode plugin dependence
  if (!mainModule || process.versions.electron) {
    mainModule = module;
    do {
      mainModule = mainModule.parent;
    } while (mainModule.parent && /([\/\\])node_modules\1/.test(mainModule.filename));
  }

  res = res.concat(mainModule.paths);
  return unique(res);
};

function npm(dir) {
  return path.join(dir, 'node_modules');
}
