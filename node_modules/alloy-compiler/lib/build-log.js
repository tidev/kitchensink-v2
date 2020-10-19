const fs = require('fs-extra');
const path = require('path');
const CONST = require('alloy-utils').constants;
const logger = require('alloy-utils').Logger;

let dir, file, projectPath;

module.exports = class BuildLog {
	constructor(_projectPath) {
		// make/reference singleton instance
		if (BuildLog.instance) {
			return BuildLog.instance;
		}
		BuildLog.instance = this;

		// set "private" variables
		projectPath = _projectPath;
		dir = path.join(projectPath, CONST.DIR.BUILD);
		file = path.join(dir, 'build.json');

		// expose data object
		this.isNew = true;
		this.data = {};

		// make sure the alloy build folder exists
		fs.ensureDirSync(dir);

		// load it up
		this.read();
	}

	read() {
		if (!fs.existsSync(file)) {
			this.isNew = true;
			this.data = {};
		} else {
			this.isNew = false;
			try {
				this.data = JSON.parse(fs.readFileSync(file, 'utf8'));
			} catch (e) {
				logger.warn('Build log at "' + path.relative(projectPath, file)
					+ '" is corrupt, creating a new one...');
				this.data = {};
			}
		}
	}

	write() {
		try {
			fs.writeFileSync(file, JSON.stringify(this.data));
		} catch (e) {
			logger.warn('Unable to write build log to "' + path.relative(projectPath, file) + '"');
		}
	}
};
