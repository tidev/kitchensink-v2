import Identity from 'ti.identity';

var authPhrase = "";

if (!Identity.isSupported()) {
  alert('Biometric authentication is not supported on this device \nor\nno identities are enrolled!');
  $.authenticate.enabled = false;
}

Identity.AUTHENTICATION_POLICY_PASSCODE;

if (OS_IOS) {
  if (Identity.biometryType == Identity.BIOMETRY_TYPE_FACE_ID) {
    authPhrase = 'Face ID';
  } else if (Identity.biometryType == Identity.BIOMETRY_TYPE_TOUCH_ID) {
    authPhrase = 'Touch ID';
  } else {
    authPhrase = '(None available)';
  }
  $.authenticate.title = "Authenticate with: " + authPhrase;
}

if (OS_ANDROID) {
  authPhrase = 'Fingerprint';
  $.authenticate.title = "Tap here to authenticate";
}

function validateAndroid() {
  let reason = "Confirm fingerprint to authenticate";
  let title = "Identity";
  $.androidFingerprint.setReason(reason);
  $.androidFingerprint.setTitle(title);
  Identity.authenticate({
    reason: reason,
    fallbackTitle: "",
    callback: function(e) {
      if(e.success) {
        $.androidFingerprint.success();
      } else {
        $.androidFingerprint.failure(e.error);
      }
    }
  });
  $.androidFingerprint.show(function() {
    Identity.invalidate();
  });
}

function validate() {
  Identity.authenticate({
    reason: 'Please authenticate to access content',
    fallbackTitle: 'Use passcode instead',
    cancelTitle: 'Cancel',
    callback: function(e) {
        Identity.invalidate();
        if (!e.success) {
          alert(e.error);
        } else {
        setTimeout(function() {
          alert('Successfully authenticated!');
        }, 1000);
      }
    }
  }
)};
