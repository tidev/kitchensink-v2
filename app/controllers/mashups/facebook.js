import { logger } from 'logger';
import fb from 'facebook';

/**
 * The scoped constructor of the controller.
 **/
(function constructor() {
	if (OS_ANDROID) { // Required for Android
		fb.createActivityWorker({
			lifecycleContainer: $.fbWin
		});
	}

	setButtonState();

	// Listen for Login event
	fb.addEventListener('login', ({ success, cancelled, error }) => {
		if (success) {
			logger.log('Modules.Facebook', 'login');
		} else if (cancelled) {
			// user cancelled
			logger.log('Modules.Facebook', 'canceled');
		} else {
			logger.log('Modules.Facebook', error);
		}
		setButtonState();
	});

	// Listen for Logout event
	fb.addEventListener('logout', () => {
		setButtonState();
	});

	// Listen for share complete event
	fb.addEventListener('shareCompleted', ({ success }) => {
		if (success) {
			logger.log('Modules.Facebook', 'shareCompleted');
		} else {
			logger.log('Modules.Facebook', 'shareCompleted failed');
		}
	});

	// Set the button state
	function setButtonState() {
		$.fbLogin.visible = !fb.loggedIn;
		$.fbShare.visible = fb.loggedIn;
		$.fbLogout.visible = fb.loggedIn;

		if (fb.loggedIn) {
			getGraphPath();
			logger.log('Login', 'Logged in');
		} else {
			$.fbUserName.text = '';
			$.fbFriends.text = '';
			$.fbUserImage.image = null;
			logger.log('Logout', 'Logged out');
		}
	}

	// gets user profile information (name, picture, friends, posts)
	function getGraphPath() {
		fb.requestWithGraphPath('me', {
			fields: 'id,name,picture,friends,posts'
		}, 'GET', (e) => {
			if (e.success) {
				const respObj = JSON.parse(e.result);
				logger.log('Modules.Facebook.requestWithGraphPath', respObj);

				$.fbUserImage.image = respObj.picture.data.url;
				$.fbUserName.text = 'Welcome ' + respObj.name;
				$.fbFriends.text = 'Total Friends ' + respObj.friends.summary.total_count;
			} else if (e.error) {
				logger.log(e.error);
			} else {
				logger.log('Unknown response');
			}
		});
	}
}());

// Logs out the current user

function logout() {
	fb.logout();
}

// Logs out the current user

function login() {
	fb.permissions = ['user_photos', 'email', 'user_friends', 'public_profile', 'user_birthday', 'user_likes'];
	fb.initialize();

	if (!fb.loggedIn) {
		fb.authorize();
	}
}

// Shares a post

function share() {

	fb.presentShareDialog({
		link: 'https://tidev.io/'
	});
}
