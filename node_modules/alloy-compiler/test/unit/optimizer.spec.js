const _ = require('lodash');
const babylon = require('@babel/parser');
const babel = require('@babel/core');
const { platforms } = require('alloy-utils');
const { sourceMapper } = require('../../lib');

const availablePlatforms = _.omit(platforms, [ 'constants' ]);

const tests = [
	// make sure we didn't break normal conditionals and assigments
	[ 'var test = {\n  a: 0,\n  b:0,\n  c:  0};\ntest.b = 1', 'var test = {\n  a: 0,\n  b: 0,\n  c: 0 };\ntest.b = 1;' ],
	[ 'var a = Ti.Platform.name', 'var a = "<%= name %>";' ],
	[ 'var a = Titanium.Platform.name', 'var a = "<%= name %>";' ],
	[ 'var a = Ti.Platform.name=="<%= name %>" ? 1 : 0', 'var a = "<%= name %>" == "<%= name %>" ? 1 : 0;' ],
	[ 'var a = Ti.Platform.name=="<%= name %>",\nb', 'var a = "<%= name %>" == "<%= name %>",\nb;' ],
	[ 'var a = Ti.Platform.name=="<%= name %>",\nb,\nc = 2', 'var a = "<%= name %>" == "<%= name %>",\nb,\nc = 2;' ],
	[ 'var a = Ti.Platform.name=="<%= name %>"', 'var a = "<%= name %>" == "<%= name %>";' ],
	[ 'var a,\nb = Ti.Platform.name=="<%= name %>",\nc = 2;', 'var a,\nb = "<%= name %>" == "<%= name %>",\nc = 2;' ],
	[ 'var a = "<%= name %>"==Ti.Platform.name ? 1 : 0', 'var a = "<%= name %>" == "<%= name %>" ? 1 : 0;' ],
	[ 'var a = "<%= name %>"==Ti.Platform.name,\nb', 'var a = "<%= name %>" == "<%= name %>",\nb;' ],
	[ 'var a = "<%= name %>"==Ti.Platform.name,\nb,\nc = 2', 'var a = "<%= name %>" == "<%= name %>",\nb,\nc = 2;' ],
	[ 'var a = "<%= name %>"==Ti.Platform.name', 'var a = "<%= name %>" == "<%= name %>";' ],
	[ 'var a,\nb = "<%= name %>"==Ti.Platform.name,\nc = 2;', 'var a,\nb = "<%= name %>" == "<%= name %>",\nc = 2;' ],
	[ 'var a = "1"', 'var a = "1";' ],
	[ 'var a = true', 'var a = true;' ],
	[ 'var a = 1', 'var a = 1;' ],
	[ 'var a', 'var a;' ],
	[ 'var a = {}', 'var a = {};' ],
	[ 'var a = new Object', 'var a = new Object();' ],
	[ 'var a = new Object()', 'var a = new Object();' ],
	[ 'var a = Ti.Platform.name', 'var a = "<%= name %>";' ],
	[ 'var a = Ti.Platform.osname', 'var a = "android";', [ 'android' ] ],
	[ 'var a = Ti.Platform.osname', 'var a = "mobileweb";', [ 'mobileweb' ] ],
	[ 'var a = Ti.Platform.osname', 'var a = "blackberry";', [ 'blackberry' ] ],
	[ 'var a,\nb = 1,\nc = 2;', 'var a,\nb = 1,\nc = 2;' ],
	[ 'var a = 1;', 'var a = 1;' ],
	[ 'var a =+1;', 'var a = +1;' ],
	[ 'var a =1+1;', 'var a = 1 + 1;' ],
	[ 'var a = 1.0;', 'var a = 1.0;' ],
	[ 'var a = 1.02;', 'var a = 1.02;' ],
	[ 'var a = -1.02;', 'var a = -1.02;' ],
	[ 'var a = false', 'var a = false;' ],
	[ 'var a = true ? 1 : 0;', 'var a = true ? 1 : 0;' ],
	[ 'var num = isNaN(amount) || amount === \'\' || amount === null ? 0.00 : amount;', 'var num = isNaN(amount) || amount === \'\' || amount === null ? 0.00 : amount;' ],

	// TODO: Revisit all "var a,a=2;" expecteds once ALOY-540 is resolved

	// make sure we didn't break normal if conditions
	[ 'if (true) {\n  var a = 1;\n} else {\n  var a = 2;\n}', 'if (true) {\n  var a = 1;\n} else {\n  var a = 2;\n}' ],

	// check platform conditionals (if/else)
	[ 'if (Titanium.Platform.name === \'<%= name %>\') {\n  var a = 1;\n} else {\n  var a = 2;\n}', 'if ("<%= name %>" === \'<%= name %>\') {\n  var a = 1;\n} else {\n  var a = 2;\n}' ],
	[ 'if (Titanium.Platform.name !== \'<%= name %>\') {\n  var a = 1;\n} else {\n  var a = 2;\n}', 'if ("<%= name %>" !== \'<%= name %>\') {\n  var a = 1;\n} else {\n  var a = 2;\n}' ],
	[ 'if (Titanium.Platform[\'name\'] == \'<%= name %>\') {\n  var a = 1;\n} else {\n  var a = 2;\n}', 'if ("<%= name %>" == \'<%= name %>\') {\n  var a = 1;\n} else {\n  var a = 2;\n}' ],
	[ 'if (Titanium.Platform.name !== \'<%= name %>\') {\n  var a = 1;\n} else {\n  var a = 2;\n}', 'if ("<%= name %>" !== \'<%= name %>\') {\n  var a = 1;\n} else {\n  var a = 2;\n}' ],
	[ 'if (Titanium.Platform[\'name\'] !== \'<%= name %>\') {\n  var a = 1;\n} else {\n  var a = 2;\n}', 'if ("<%= name %>" !== \'<%= name %>\') {\n  var a = 1;\n} else {\n  var a = 2;\n}' ],

	// check platform conditional assignments
	[ 'var platform = Ti.Platform[\'name\'] === \'<%= name %>\'', 'var platform = "<%= name %>" === \'<%= name %>\';' ],
	[ 'var platform = Ti.Platform["name"] === \'<%= name %>\'', 'var platform = "<%= name %>" === \'<%= name %>\';' ],
	[ 'var platform = Ti.Platform.name === \'<%= name %>\'', 'var platform = "<%= name %>" === \'<%= name %>\';' ],
	[ 'var platform = (Ti.Platform.name === \'<%= name %>\') ? 1 : 0', 'var platform = "<%= name %>" === \'<%= name %>\' ? 1 : 0;' ],
	[ 'var platform = (Ti.Platform.name === \'<%= name %>\') ? true : false', 'var platform = "<%= name %>" === \'<%= name %>\' ? true : false;' ],

	// check identities
	[ 'var a = Ti.Platform.name === Titanium.Platform.name', 'var a = "<%= name %>" === "<%= name %>";' ],

	// shouldn't attempt to process anything other than strings
	[ 'if (Ti.Platform.name === couldBeAnything()) {\n  var a = 1;\n} else {\n  var a = 2;\n}', 'if ("<%= name %>" === couldBeAnything()) {\n  var a = 1;\n} else {\n  var a = 2;\n}' ],
	[ 'if (Ti.Platform.name === some.Other.Value) {\n  var a = 1;\n} else {\n  var a = 2;\n}', 'if ("<%= name %>" === some.Other.Value) {\n  var a = 1;\n} else {\n  var a = 2;\n}' ],
	[ 'if (Ti.Platform.name !== aVariable) {\n  var a = 1;\n} else {\n  var a = 2;\n}', 'if ("<%= name %>" !== aVariable) {\n  var a = 1;\n} else {\n  var a = 2;\n}' ],

	// properly handles conditionals without curly braces
	[ 'if (Ti.Platform.name === \'<%= name %>\') var a = 1; else var a = 2;', 'if ("<%= name %>" === \'<%= name %>\') var a = 1;else var a = 2;' ],
	[ 'if (Ti.Platform.name !== \'<%= name %>\') var a = 1; else var a = 2;', 'if ("<%= name %>" !== \'<%= name %>\') var a = 1;else var a = 2;' ],
	[ 'if (\'<%= name %>\' === Ti.Platform.name) var a = 1; else var a = 2;', 'if (\'<%= name %>\' === "<%= name %>") var a = 1;else var a = 2;' ],
	[ 'if (\'<%= name %>\' !== Ti.Platform.name) var a = 1; else var a = 2;', 'if (\'<%= name %>\' !== "<%= name %>") var a = 1;else var a = 2;' ],

	// works if Ti.Platform.* is on the left or right hand side
	[ 'if (\'<%= name %>\' === Ti.Platform.name) {\n  var a = 1;\n} else {\n  a = 2;\n}', 'if (\'<%= name %>\' === "<%= name %>") {\n  var a = 1;\n} else {\n  a = 2;\n}' ],

	[ 'var a = OS_IOS', 'var a = true;', [ 'ios' ] ],
	[ 'var a = OS_ANDROID', 'var a = true;', [ 'android' ] ]
];

// The alloy optimizer test suite
describe('optimizer.js', () => {
	tests.forEach((test, index) => {
		describe('test #' + (index + 1), () => {
			_.each(availablePlatforms, (platformObj, platform) => {
				describe('[' + platform + ']', () => {
					let ast;
					let code;
					const testContent = _.template(test[0])(platforms[platform]);
					const prefix = pad(platform);

					it(`${prefix}${testContent.blue}`, () => {
						expect.assertions(1);
						expect(true).toBe(true);
					});

					it(prefix + 'parses AST with babylon', () => {
						expect.assertions(1);
						function parseFunction() {
							ast = babylon.parse(testContent);
						}
						expect(parseFunction).not.toThrow();
					});

					it(prefix + 'optimizes code via Babel and our custom plugins', () => {
						expect.assertions(1);
						// execute the squeeze to remove dead code, always performed
						// as the last step of JS file processing. The unit testing here
						// uses the same settings as the Alloy compile process.
						function squeezeFunction() {
							const options = _.extend(_.clone(sourceMapper.OPTIONS_OUTPUT), {
								plugins: [ [ './packages/alloy-compiler/lib/ast/optimizer-plugin', { platform: platform } ] ]
							});
							const result = babel.transformFromAstSync(ast, null, options);
							ast = result.ast;
							code = result.code.replace(/\s*$/, '');
						}
						expect(squeezeFunction).not.toThrow();
					});

					it(prefix + 'generated code matches expected code', () => {
						expect.assertions(1);
						const passFor = test[2];
						const expected = _.template(test[1])(platforms[platform]);
						// eslint-disable-next-line jest/no-if
						if (!passFor || _.includes(passFor, platform)) {
							expect(code).toBe(expected);
						} else {
							expect(code).not.toBe(expected);
						}
					});
				});
			});
		});
	});
});

// helper functions

function pad(string) {
	let ret = '';
	for (var i = 0; i < 10 - string.length; i++) {
		ret += ' ';
	}
	return ret;
}
