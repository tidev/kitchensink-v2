import Identity from 'ti.identity';

var authPhrase = "";

if (!Identity.isSupported()) {
  alert('Biometric authentication is not supported on this device \nor\nno identities are enrolled!');
  $.authenticate.enabled = false;
}

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

function validate() {
if (OS_ANDROID) {
  let reason = "Confirm fingerprint to authenticate";
  let title = "Identity";
  $.androidFingerprint.setReason(reason);
  $.androidFingerprint.setTitle(title);
}
Identity.authenticate({
  reason: "Please authenticate to continue",
  fallbackTitle: "",
  callback: function(e) {
    if (OS_IOS) {
      Identity.invalidate();
      if (!e.success) {
        alert(e.error);
      } else {
        setTimeout(function() {
        alert('Successfully authenticated!');
        }, 1000);
      }
    } else if (OS_ANDROID) {
      if(e.success) {
        $.androidFingerprint.success();
      } else {
        $.androidFingerprint.failure(e.error);
      }
    }
  }
});
if (OS_ANDROID) {
  $.androidFingerprint.show(function() {Identity.invalidate();});
}
}