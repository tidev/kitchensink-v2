'use strict';

exports.DEPLOY_TYPES = [
	{ key: 'ENV_DEV', value: 'development' },
	{ key: 'ENV_DEVELOPMENT', value: 'development' },
	{ key: 'ENV_TEST', value: 'test' },
	{ key: 'ENV_PROD', value: 'production' },
	{ key: 'ENV_PRODUCTION', value: 'production' }
];
exports.DIST_TYPES = [
	{ key: 'DIST_ADHOC', value: [ 'dist-adhoc' ] },
	{ key: 'DIST_STORE', value: [ 'dist-appstore', 'dist-playstore' ] }
];

exports.PLATFORMS = [ 'android', 'ios', 'windows' ];
