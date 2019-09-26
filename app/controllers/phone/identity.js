import Identity from 'ti.identity';

let authPhrase = 'Fingerprint';

if (!Identity.isSupported()) {
  alert('Authentication is not supported. Available biometrics: ' + authPhrase);
  $.authenticate.enabled = false;
  return;
}

if (OS_IOS) {
  if (Identity.biometryType == Identity.BIOMETRY_TYPE_FACE_ID) {
    authPhrase = 'Face ID';
  } else if (Identity.biometryType == Identity.BIOMETRY_TYPE_TOUCH_ID) {
    authPhrase = 'Touch ID';
  } else {
    authPhrase = '(None available)';
  }
}

Identity.AUTHENTICATION_POLICY_PASSCODE;

$.authenticate.title = "Authenticate with: " + authPhrase;

function validate(){
  Identity.authenticate({
    reason: 'Please authenticate to access content',
    fallbackTitle: 'Use passcode instead',
    cancelTitle: 'Cancel',
    callback: function(e) {
        Identity.invalidate();
        if (!e.success) {
          alert(e.error);
          switch(e.code) {
            case Identity.ERROR_AUTHENTICATION_FAILED: Ti.API.info('Error code is Identity.ERROR_AUTHENTICATION_FAILED'); break;
            case Identity.ERROR_USER_CANCEL: Ti.API.info('Error code is Identity.ERROR_USER_CANCEL'); break;
            case Identity.ERROR_USER_FALLBACK: Ti.API.info('Error code is Identity.ERROR_USER_FALLBACK'); break;
            case Identity.ERROR_SYSTEM_CANCEL: Ti.API.info('Error code is Identity.ERROR_SYSTEM_CANCEL'); break;
            case Identity.ERROR_PASSCODE_NOT_SET: Ti.API.info('Error code is Identity.ERROR_PASSCODE_NOT_SET'); break;
            case Identity.ERROR_TOUCH_ID_NOT_AVAILABLE: Ti.API.info('Error code is Identity.ERROR_TOUCH_ID_NOT_AVAILABLE'); break;
            case Identity.ERROR_TOUCH_ID_NOT_ENROLLED: Ti.API.info('Error code is Identity.ERROR_TOUCH_ID_NOT_ENROLLED'); break;
            case Identity.ERROR_TOUCH_ID_NOT_ENROLLED: Ti.API.info('Error code is Identity.ERROR_TOUCH_ID_NOT_ENROLLED'); break;
            case Identity.ERROR_APP_CANCELLED: Ti.API.info('Error code is Identity.ERROR_APP_CANCELLED'); break;
            case Identity.ERROR_INVALID_CONTEXT: Ti.API.info('Error code is Identity.ERROR_INVALID_CONTEXT'); break;
            case Identity.ERROR_TOUCH_ID_LOCKOUT: Ti.API.info('Error code is Identity.ERROR_TOUCH_ID_LOCKOUT'); break;
            default: Ti.API.info('Error code is unknown'); break;
          }
        } else {
        setTimeout(function() {
          alert('Successfully authenticated!');
        }, 1000);
      }
    }
  }
)};