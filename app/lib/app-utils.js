export function isiOSVersionOrGreater(version) {
	return (
		['iphone', 'ipad'].includes(Ti.Platform.osname) &&
		parseInt(Ti.Platform.version.split('.')[0]) >= version
	);
};