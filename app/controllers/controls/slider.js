import { logger } from 'logger';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

}());

function sliderValueChanged({ source, value }) {
	$.state.setText(`Current value: ${value.toFixed(2)} / ${source.max}`);
	logger.log(`Ti.UI.Slider value changed to ${value}`);
}
