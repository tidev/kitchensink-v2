import { logger } from 'logger';

function sayHello({ source }) {
	alert(`Hello from ${source.title}`);
	logger.log(`Ti.UI.Toolbar selected button with title: ${source.title}`);
}
