var fb = require('facebook');
import { log } from 'log';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
    if (OS_ANDROID) { // Required for Android
        fb.createActivityWorker({
            lifecycleContainer : $.fbWin
        });
    }

    setButtonState();

    // Listen for Login event
    fb.addEventListener('login', function(e) {
        if (e.success) {
            log.log('Modules.Facebook', 'login');
        } else if (e.cancelled) {
            // user cancelled
            log.log('Modules.Facebook', 'canceled');
        } else {
            log.log('Modules.Facebook', e.error);
        }
        setButtonState();
    });

    // Listen for Logout event
    fb.addEventListener('logout', function(e) {
        setButtonState();
    });

    // Listen for share complete event
    fb.addEventListener('shareCompleted', function(e) {
        if (e.success) {
            log.log('Modules.Facebook', 'shareCompleted');
        } else {
            log.log('Modules.Facebook', 'shareCompleted failed');
        }
    });

    // Set the button state
    function setButtonState() {
        $.fbLogin.setVisible(!fb.loggedIn);
        $.fbShare.setVisible(fb.loggedIn);
        $.fbLogout.setVisible(fb.loggedIn);

        if (fb.loggedIn) {
            getGraphPath();
            log.log('Login', 'Logged in');
        } else {
            $.fbUserName.text = '';
            $.fbFriends.text = '';
            $.fbUserImage.image = null;
            log.log('Logout', 'Logged out');
        }
    }

    // gets user profile information (name, picture, friends, posts)
    function getGraphPath() {
        fb.requestWithGraphPath('me', {
            fields: 'id,name,picture,friends,posts'
        }, 'GET', function(e) {
            if (e.success) {
                var respObj = JSON.parse(e.result);
                log.log('Modules.Facebook.requestWithGraphPath', respObj);

                $.fbUserImage.image = respObj.picture.data.url;
                $.fbUserName.text = 'Welcome ' + respObj.name;
                $.fbFriends.text = 'Total Friends ' + respObj.friends.summary.total_count;
            } else if (e.error) {
                log.log(e.error);
            } else {
                log.log('Unknown response');
            }
        });
    }
})();

// Logs out the current user
function logout() {
    fb.logout();
}

// Logs out the current user
function login() {
    fb.permissions = ['user_photos', 'email', 'user_friends', 'public_profile', 'user_birthday', 'user_relationships', 'user_likes'];
    fb.initialize();

    if (!fb.loggedIn) {
        fb.authorize();
    }
}

// Shares a post
function share() {

    fb.presentShareDialog({
        link : 'https://appcelerator.com/'
    });
}
