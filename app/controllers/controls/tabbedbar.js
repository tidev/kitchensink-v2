import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function tabbedBarSelectedIndex(e) {
  const message = `Ti.UI.iOS.TabbedBar changed to index: ${e.index}`;
  
  alert(message);
	logger.log(message);
}
