import getGithubAuthToken from './getGithubAuthToken.js';
import api from './github.js';
import rmdir from './utils/rmdir.js';

// For accessing the __dirname global var
const { remote } = window.require('electron');
const reposPath =  window.require('path').join(remote.getGlobal("__dirname"), "../repos");

const Auth = {

	login(cb) {
		// If user is logged in
		if( localStorage.user ) {
			if(cb) cb(true);
			this.onChange(true, JSON.parse(localStorage.getItem("user")));
			console.log("Already logged in.");
			return;
		}

		getGithubAuthToken((err, token) => {
			if(err) throw err;

			console.log(token);

			// Save token
			localStorage.setItem('token', token);

			// Auth with token
			this.auth();

			// Get user info
			api.user.get({}, (err, user) => {
				if(err) throw err;

				console.log(user);
				console.log("Logged in!");

				// Save user to session storage
				localStorage.setItem("user", JSON.stringify( user ));

				if (cb) cb(true);
				this.onChange(true, JSON.parse(localStorage.getItem("user")));

			});
		});
	},

	isAuthenticated: false,

	auth() {

		if(this.isAuthenticated) return;

		// Auth with token
		api.authenticate({
			type: "oauth",
			token: this.getToken()
		});

		this.isAuthenticated = true;
		console.log("Authenticated!");
	},

	logout(cb) {
		console.log("Logged out!");
		this.isAuthenticated = false;
		localStorage.clear();

		rmdir(reposPath);

		if (cb) cb();
		this.onChange(false);
	},

	getToken() {
		return localStorage.getItem('token');
	},

	getUser() {
		return JSON.parse(localStorage.getItem("user"));
	},

	loggedIn() {
		if( !localStorage.user ) return undefined;
		return !!localStorage.user;
	},

	onChange() {

	}

};

export default Auth;