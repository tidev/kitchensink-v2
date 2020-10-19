// eslint-disable: quotes
// eslint-disable: max-len

const fs = require('fs');

const { setupCompiler, resolveComponentPath } = require('./utils');

describe('webpack compiler', () => {
	it('should compile component correctly', () => {
		expect.assertions(1);
		const compiler = setupCompiler({ webpack: true });
		const controllerPath = resolveComponentPath('controllers', 'index.js');
		const result = compiler.compileComponent({
			file: controllerPath,
			content: fs.readFileSync(controllerPath, 'utf-8')
		});

		// eslint-disable-next-line jest/no-large-snapshots
		expect(result.code).toMatchInlineSnapshot(`
		"import Alloy from '/alloy';

		const Backbone = Alloy.Backbone;
		const _ = Alloy._;




		function __processArg(obj, key) {
			var arg = null;
			if (obj) {
				arg = obj[key] || null;
			}
			return arg;
		}

		export default function Controller() {

			require('/alloy/controllers/' + 'BaseController').apply(this, Array.prototype.slice.call(arguments));
			this.__controllerPath = 'index';
			this.args = arguments[0] || {};

			if (arguments[0]) {
				var __parentSymbol = __processArg(arguments[0], '__parentSymbol');
				var $model = __processArg(arguments[0], '$model');
				var __itemTemplate = __processArg(arguments[0], '__itemTemplate');
			}
			var $ = this;
			var exports = {};
			var __defers = {};

			// Generated code that must be executed before all UI and/or
			// controller code. One example is all model and collection
			// declarations from markup.


			// Generated UI code
			$.__views[\\"index\\"] = Ti.UI.createWindow(
		{backgroundColor:\\"#fff\\",fullscreen:false,exitOnClose:true,id:\\"index\\",}
		);
		$.__views[\\"index\\"] && $.addTopLevelView($.__views[\\"index\\"]);
		$.__views[\\"label\\"] = Ti.UI.createLabel(
		{color:\\"#000\\",font:{fontSize:\\"18dp\\",fontWeight:\\"bold\\",},height:Ti.UI.SIZE,width:Ti.UI.SIZE,text:'Hello, World!',id:\\"label\\",}
		);
		$.__views[\\"index\\"].add($.__views[\\"label\\"]);
		sayHello?$.addListener($.__views[\\"label\\"],'click',sayHello):__defers['$.__views[\\"label\\"]!click!sayHello']=true;exports.destroy = function () {};

			// make all IDed elements in $.__views available right on the $ in a
			// controller's internal code. Externally the IDed elements will
			// be accessed with getView().
			_.extend($, $.__views);

			// Controller code directly from the developer's controller file
			$.index.open();

			function sayHello() {
			  alert('Hello World$');
			}

			// Generated code that must be executed after all UI and
			// controller code. One example deferred event handlers whose
			// functions are not defined until after the controller code
			// is executed.
			__defers['$.__views[\\"label\\"]!click!sayHello'] && $.addListener($.__views[\\"label\\"],'click',sayHello);

			// Extend the $ instance with all functions and properties
			// defined on the exports object.
			_.extend($, exports);
		}
		"
	`);
	});
});
