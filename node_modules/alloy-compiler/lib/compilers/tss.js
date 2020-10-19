const { utils: U } = require('alloy-utils');
const _ = require('lodash');
const path = require('path');

const BaseCompiler = require('./base');
const styler = require('../styler');

class TssCompiler extends BaseCompiler {
	compile(options) {
		if (!options.file) {
			throw new Error('Missing "file" option.');
		}

		const meta = this.resolveComponentMeta(options.file);
		const { manifest } = meta;
		const buildPlatform = this.platform;
		const styleMeta = this.loadStyles(meta);
		const state = { styles: styleMeta.styles };

		const STYLE_PLACEHOLDER = '__STYLE_PLACEHOLDER__';
		// eslint-disable-next-line security/detect-non-literal-regexp
		const STYLE_REGEX = new RegExp('[\'"]' + STYLE_PLACEHOLDER + '[\'"]');
		const processedStyles = [];
		for (const s of state.styles) {
			const o = {};

			// make sure this style entry applies to the current platform
			if (s && s.queries && s.queries.platform
				&& !s.queries.platform.includes(buildPlatform)) {
				continue;
			}

			// get the runtime processed version of the JSON-safe style
			const processed = '{' + styler.processStyle(s.style, state) + '}';

			// create a temporary style object, sans style key
			for (const k of Object.keys(s)) {
				const v = s[k];
				if (k === 'queries') {
					const queriesMap = new Map();

					// optimize style conditionals for runtime
					for (const queryKey of Object.keys(v)) {
						const query = v[queryKey];
						if (queryKey === 'platform') {
							// do nothing, we don't need the platform key anymore
						} else if (queryKey === 'formFactor') {
							queriesMap.set(queryKey, 'is' + U.ucfirst(query));
						} else if (queryKey === 'if') {
							queriesMap.set(queryKey, query);
						} else {
							this.emitWarning(`Unknown device query "${queryKey}"`);
						}
					}

					// add the queries object, if not empty
					if (queriesMap.size > 0) {
						const queriesObj = {};
						queriesMap.forEach((v, k) => queriesObj[k] = v);
						o[k] = queriesObj;
					}
				} else if (k !== 'style') {
					o[k] = v;
				}
			}

			// Create a full processed style string by inserting the processed style
			// into the JSON stringifed temporary style object
			o.style = STYLE_PLACEHOLDER;
			processedStyles.push(JSON.stringify(o).replace(STYLE_REGEX, processed));
		}

		let styleCode = 'module.exports = [' + processedStyles.join(',') + '];';
		if (manifest) {
			styleCode += _.template(
				this.fs.readFileSync(path.join(this.config.dir.template, 'wpath.js'), 'utf8')
			)({ WIDGETID: manifest.id });
		}

		return {
			code: styleCode,
			dependencies: styleMeta.files
		};
	}
}

module.exports = TssCompiler;
