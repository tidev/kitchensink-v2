// eslint-disable: quotes
// eslint-disable: max-len

const { setupCompilerFactory, resolveComponentPath } = require('./utils');

const factory = setupCompilerFactory();

describe('style compiler', () => {
	it('should compile style correctly', () => {
		expect.assertions(1);
		const compiler = factory.createCompiler('style');
		const { code } = compiler.compile({
			file: resolveComponentPath('styles', 'index.tss')
		});
		expect(code).toMatchInlineSnapshot(
			'"module.exports = [{\\"isApi\\":true,\\"priority\\":1000.0002,\\"key\\":\\"Label\\",\\"style\\":{color:\\"#000\\",font:{fontSize:\\"18dp\\",fontWeight:\\"bold\\",},height:Ti.UI.SIZE,width:Ti.UI.SIZE,}},{\\"isId\\":true,\\"priority\\":100000.0001,\\"key\\":\\"index\\",\\"style\\":{backgroundColor:\\"#fff\\",fullscreen:false,exitOnClose:true,}}];"'
		);
	});
});
