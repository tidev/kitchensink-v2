module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		appcJs: {
			src: [
				'app/'
			]
		}
	});
	grunt.loadNpmTasks('grunt-appc-js');

	// linting: run eslint against js, standard appc checks, check ios/android format via clang, run doc validation script
	grunt.registerTask('lint', [ 'appcJs' ]);

	// Tasks for formatting the source code according to our clang/eslint rules
	grunt.registerTask('format:js', [ 'appcJs:src:lint:fix' ]);

	// By default, run linting
	grunt.registerTask('default', [ 'lint' ]);
};
