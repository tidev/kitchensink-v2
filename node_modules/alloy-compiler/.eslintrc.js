module.exports = {
	extends: '../../.eslintrc.js',
	overrides: [
		{
			files: [ 'test/**/*.js' ],
			extends: [ 'plugin:jest/recommended' ],
			globals: {
				'jest/globals': true
			}
		}
	]
};
