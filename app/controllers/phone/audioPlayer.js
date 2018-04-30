/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	// TODO: Migrate from https://github.com/appcelerator/KitchenSink/blob/stable/Resources/ui/common/phone/audio_player.js
}());




function handleOpen(){
  $.player.start();
}

function handleClose(){
    if ($.player.playing || $.player.paused) {
      $.player.stop();
    }
}

function audioProgression(e){
  console.log(e);
}
