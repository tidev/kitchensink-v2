var log = require("log");

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    
})();

function openPhotoGallery() {
    
    Titanium.Media.openPhotoGallery({
        success : function(event) {
            // called when media returned from the camera
            Ti.API.debug('Our type was: ' + event.mediaType);
            if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                
                $.choosenImage.setImage(event.media);
                $.viewControls.setVisible(true);
                
            } else {
                alert("got the wrong type back =" + event.mediaType);
            }
        },
        cancel : function() {
            // called when user cancels 
        },
        error : function(error) {
            // called when there's an error
            var a = Titanium.UI.createAlertDialog({
                title : 'Gallery'
            });
            if (error.code == Titanium.Media.NO_CAMERA) {
                a.setMessage('Please run this test on device');
            } else {
                a.setMessage('Unexpected error: ' + error.code);
            }
            a.show(); 
        }
    });
}

function sizeChanged(e){
    $.choosenImage.width = Math.round(e.value*370);
}

function setOpacity(e){    
    $.choosenImage.opacity = e.value; 
}
