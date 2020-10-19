var _ = require('lodash');

const { constants: CONST, platforms } = require('alloy-utils');

// Walk tree transformer changing (Ti|Titanium).Platform.(osname|name)
// into static strings where possible. This will allow the following
// compression step to reduce the code further.
module.exports = function (_ref) {
	var types = _ref.types;

	var isTiPlatform = types.buildMatchMemberExpression('Ti.Platform');
	var isTitaniumPlatform = types.buildMatchMemberExpression('Titanium.Platform');

	return {
		pre: function () {
			var config = this.opts || {};
			config.deploytype = config.deploytype || 'development';

			// create list of platform and deploy type defines
			var defines = {};
			_.each(CONST.DEPLOY_TYPES, function (d) {
				defines[d.key] = config.deploytype === d.value;
			});
			_.each(CONST.DIST_TYPES, function (d) {
				defines[d.key] = _.includes(d.value, config.target);
			});
			_.each(CONST.PLATFORMS, function (p) {
				defines['OS_' + p.toUpperCase()] = config.platform === p;
			});
			this.defines = defines;

			// make sure the platform require includes
			var platformName = config.platform.toLowerCase();

			if (!platforms[platformName]) {
				this.platform = { name: undefined, osname: undefined };
			} else {
				// create, transform, and validate the platform object
				this.platform = platforms[platformName];
				if (!_.isString(this.platform.name)) {
					this.platform.name = undefined;
				}
				if (!_.isString(this.platform.osname)) {
					this.platform.osname = undefined;
				}
			}
		},
		visitor: {
			MemberExpression: function (path) {
				// console.log(JSON.stringify(path.node));
				var name = '';
				if (types.isStringLiteral(path.node.property)) {
					name = path.node.property.value;
				} else if (types.isIdentifier(path.node.property)) {
					name = path.node.property.name;
				} else {
					return;
				}

				if ((name === 'name' || name === 'osname') && this.platform[name]) {
					if (isTiPlatform(path.node.object) || isTitaniumPlatform(path.node.object)) {
						path.replaceWith(types.stringLiteral(this.platform[name]));
					}
				}
			},
			Identifier: function (path) {
				if (Object.prototype.hasOwnProperty.call(this.defines, (path.node.name))
					&& (path.parent.type !== 'VariableDeclarator' || path.node.name !== path.parent.id.name)) {
					path.replaceWith(types.booleanLiteral(this.defines[path.node.name]));
				}
			}
		}
	};
};
