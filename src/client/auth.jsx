import getGithubAuthToken from './getGithubAuthToken.js';
import api from './github.js';

const Auth = {

	login(cb) {
		// If user is logged in
		if( sessionStorage.user ) {
			if(cb) cb(true);
			this.onChange(true, JSON.parse(sessionStorage.getItem("user")));
			console.log("Already logged in.");
			return;
		}

		getGithubAuthToken((err, token) => {
			if(err) throw err;

			console.log(token);

			// Save token
			sessionStorage.setItem('token', token);

			// Auth with token
			api.authenticate({
			    type: "oauth",
			    token: token
			});

			// Get user info
			api.user.get({}, (err, user) => {
				if(err) throw err;

				console.log(user);
				console.log("Logged in!");

				// Save user to session storage
				sessionStorage.setItem("user", JSON.stringify( user ));

				if (cb) cb(true);
				this.onChange(true, JSON.parse(sessionStorage.getItem("user")));

			});
		});
	},

	logout(cb) {
		console.log("Logged out!");
		delete sessionStorage.user;
		if (cb) cb();
		this.onChange(false);
	},

	getToken() {
		return sessionStorage.setItem('token');
	},

	getUser() {
		return JSON.parse(sessionStorage.getItem("user"));
	},

	loggedIn() {
		if( !sessionStorage.user ) return undefined;
		return !!sessionStorage.user;
	},

	onChange() {

	}

};

export default Auth;