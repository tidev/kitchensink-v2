import { logger } from 'logger';

var normalizedCenterX;
var normalizedCenterY;
var colors;
var Gradient;
var gradientTypes;
var selectedGradient;

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
  normalizedCenterX = 0.5;
  normalizedCenterY = 0.5;
  colors = [ 'red', 'blue' ];
  Gradient = { RADIAL: 0, LINEAR: 1 };
  gradientTypes = [ 'radial', 'linear' ];
  selectedGradient = Gradient.RADIAL;
})();

function updateGradient() {
	var size = $.gradientView.rect;
	var minDimension = Math.min(size.width, size.height);
	var centerPoint = {
		x: size.width * normalizedCenterX,
		y: size.height * normalizedCenterY,
	};
	
  var startRadius = (minDimension / 2) * ($.startRadiusSlider.value / 100);
  var endRadius = (minDimension / 2) * ($.endRadiusSlider.value / 100);
  
  var gradient = {
		type: gradientTypes[selectedGradient]
	};
  
  // Linear gradients support colors with offsets and start-point / end-point
  // Radial gradients support raw colors, start-radius / end-radius and backfill-start / backfill-end
  // Read more: http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.View-property-backgroundGradient
  if (selectedGradient == Gradient.LINEAR) {
    var startPoint = { x: precisionRound($.startRadiusSlider.value , -1) + '%', y: '50%' };
    var endPoint = { x: precisionRound($.endRadiusSlider.value, -1) + '%', y: '50%' };

    gradient.colors = [{ color: colors[0], offset: 0.0 }, { color: colors[1], offset: 1.0 }];
    gradient.startPoint = startPoint;
    gradient.endPoint = endPoint;

    logger.log('Linear gradient updated: ' + JSON.stringify(centerPoint) + ', start-point: ' + JSON.stringify(startPoint) + ', end-point: ' + JSON.stringify(endPoint));
  } else {
    gradient.startPoint = centerPoint;
    gradient.endPoint = centerPoint;
    gradient.startRadius = startRadius;
    gradient.endRadius = endRadius;
    gradient.backfillStart = $.startFillSwitch.value;
    gradient.backfillEnd = $.endFillSwitch.value;
    gradient.colors = colors;

    logger.log('Radial gradient updated: ' + JSON.stringify(centerPoint) + ', start-radius: ' + startRadius + ', end-radius: ' + endRadius);
  }
  
  $.gradientView.backgroundGradient = gradient;  
}

function handleTouchMove(e) {
  var size = $.gradientView.rect;

  if (OS_ANDROID && Ti.UI.defaultunit !== 'px') {
    e.x /= Ti.Platform.displayCaps.logicalDensityFactor;
    e.y /= Ti.Platform.displayCaps.logicalDensityFactor;
  }

  normalizedCenterX = (size.width > 0) ? (e.x / size.width) : 0.5;
  normalizedCenterY = (size.height > 0) ? (e.y / size.height) : 0.5;

  updateGradient();
}

function pickRandomColor() {
  colors = [generateRandomColor(), generateRandomColor()];
  updateGradient();
}

// CREDITS: https://stackoverflow.com/a/1484514/5537752
function generateRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

function handleGradientType(e) {
  var isLinear = e.index == Gradient.LINEAR;
  selectedGradient = e.index;
  
  $.startFillSwitch.enabled = !isLinear;
  $.endFillSwitch.enabled = !isLinear;
  $.startRadiusLabel.text = isLinear ? 'Start Point:' : 'Start Radius:'
  $.endRadiusLabel.text = isLinear ? 'End Point' : 'End Radius';
  
  updateGradient();
}

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
