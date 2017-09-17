var log = require('log');

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {

})();

function openComponent(e) {
  var action = e.itemId;

  switch (action) {
    case 'showCameraPhoto': showCamera([Ti.Media.MEDIA_TYPE_PHOTO]);
    break;
    case 'showCameraVideo': showCamera([Ti.Media.MEDIA_TYPE_VIDEO]);
    break;
    case 'showCameraPhotoVideo': showCamera([Ti.Media.MEDIA_TYPE_PHOTO, Ti.Media.MEDIA_TYPE_VIDEO]);
    break;
    case 'saveToGallery': saveToGallery();
    break;
    case 'openFromGallery': openFromGallery();
    break;
    default: log.args('Ti.Media', 'Unknown action selected: ' + action);
  }

  if (OS_IOS) {
      e.source.deselectItem(e.sectionIndex, e.itemIndex);
  }
}

function showCamera(mediaTypes) {
  require("/permissions").checkCameraPermission(function() {
      Ti.Media.showCamera({
        mediaTypes: mediaTypes,
        success: function(e) {
          log.args('Ti.Media', 'Image taken successfully!');
          processImage(e.media);
        },
        error: function(e) {
          log.args('Ti.Media', 'Error showing camera: ' + e.error);
        },
        cancel: function(e) {
          log.args('Ti.Media', 'Camera was cancelled');
        }
    });
  });
}

function processImage(image) {
  var imageView = Ti.UI.createImageView({
    image: image,
    opacity: 0
  });

  var label = Ti.UI.createLabel({
    text: 'Tap to close'
  });

  imageView.addEventListener('click', function(e) {
    imageView.animate({
      opacity: 0
    }, function() {
      $.window.remove(imageView);
  });

  if (OS_IOS) {
      imageView.add(label);
  }
  $.window.add(imageView);

  imageView.animate({
    opacity: 1
  });
}

function saveToGallery() {
  // Create a 400x400px rounded square
  var view = Ti.UI.createView({
    backgroundColor: 'red',
    width: 400,
    height: 400,
    borderRadius: 200
  });

  // Convert the view to an image-blog and save it to your Gallery
  Ti.Media.saveToPhotoGallery(view.toImage(), {
    success: function(e) {
      log.args('Ti.Media', 'Image saved to photo-gallery successfully!');
    },
    error: function(e) {
      log.args('Ti.Media', 'Error saving image to photo-gallery: ' + e.error);
    }
  });
}

function openFromGallery() {
  require("/permissions").checkCameraPermission(function() {
      Ti.Media.openPhotoGallery({
        success: function(e) {
          log.args('Ti.Media', 'Image open successfully!');
          processImage(e.media);
        },
        error: function(e) {
          log.args('Ti.Media', 'Error opening image: ' + e.error);
        },
        cancel: function(e) {
          log.args('Ti.Media', 'Opening photo-gallery was cancelled');
        }
      });
  });
}
