
/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function changeToCenterAlignment() {
    $.myLabel.setTextAlign('center');
}

function changeToLeftAlignment() {
    $.myLabel.setTextAlign('left');
}

function changeToRightAlignment() {
    $.myLabel.setTextAlign('right');
}

function changeToJustifyAlignment() {
    $.myLabel.setTextAlign(3); // or 'justify' in Titanium 6.1.0 and later (TIMOB-3408)
}

function changeColor() {
    $.myLabel.setColor('red'); // or: '#ff0', '#ff0000', rgba('255, 0,0 , 1.0')
}
