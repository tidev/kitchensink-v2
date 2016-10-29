
/**
 * The scoped constructor of the controller.
 * @param args {Object} The arguments passed to initialize the controller.
 **/
(function constructor(args) {
    
})(arguments[0] || {});

function changeToCenterAlignment() {
    $.myLabel.setTextAlign("center");
}

function changeToRightAlignment() {
    $.myLabel.setTextAlign("right");
}

function changeToJustifyAlignment() {
    $.myLabel.setTextAlign(3); // or "justify" in Titanium 6.1.0 and later (TIMOB-3408)
}

function changeColor() {
    $.myLabel.setColor("red"); // or: "#ff0", "#ff0000", rgba('255, 0,0 , 1.0')
}
