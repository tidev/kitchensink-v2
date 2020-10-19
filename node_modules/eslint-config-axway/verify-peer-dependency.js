var packageJSON = require('./package.json');
var semver = require('semver');
var path = require('path');
var findRoot = require('find-root');

function error(err, shouldThrow) {
	if (shouldThrow) {
		throw new Error(err);
	} else {
		console.error(err);
		process.exit(1);
	}
}

/**
 * Verifies that a dependency specified in optionalPeerDependencies is actually installed.
 * Rather than running at install time, this is meant to happen at runtime.
 * @param {string} dependency - name of dependency to verify
 * @param {boolean} shouldThrow - if true, the function will throw rather than exiting the process
 * @returns {void}
 */
module.exports = function verifyPeerDependency(dependency, shouldThrow) {
	var range = packageJSON.optionalPeerDependencies[dependency];
	if (!range) {
		return error(packageJSON.name + ' does not specify ' + dependency + ' as an optionalPeerDependency.', shouldThrow);
	}
	// Try to verify that the dependency is installed.
	var dependencyPath;
	var paths = module.paths.slice();
	var p = process.cwd();
	var cur, last;
	try {
		// we need to be a bit more aggressive finding dependencies
		while (p !== last) {
			cur = path.join(p, 'node_modules');
			if (paths.indexOf(cur) === -1) {
				paths.push(cur);
			}
			last = p;
			p = path.dirname(p);
		}

		// this only works in Node 8.9+
		dependencyPath = require.resolve(dependency, { paths: paths });
	} catch (e) {
		return error(packageJSON.name + ' requires a peer of ' + dependency + '@' + range + ' but none was installed.', shouldThrow);
	}
	// Find the closest package.json so that we can get the installed version of the dependency
	var root = findRoot(dependencyPath);

	if (root === dependencyPath) {
		// For whatever reason we couldn't find the package.json of the dependency
		return error('Cannot verify that ' + dependency + '@' + range + ' satisfies specified version', shouldThrow);
	}
	// eslint-disable-next-line security/detect-non-literal-require
	var dependencyPackage = require(path.join(root, 'package.json'));

	// Check dependency version satisfies the required range
	if (!semver.satisfies(dependencyPackage.version, range)) {
		return error(packageJSON.name + ' requires a peer of ' + dependency + '@' + range + ' but none was installed.', shouldThrow);
	}
};
