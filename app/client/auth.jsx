import getGithubAuthToken from './getGithubAuthToken.js';
import api from './github.js';

// For accessing the __dirname global var
const { remote, shell } = window.require('electron');

function getUserHome() {
	return remote.process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

// path for the cloning
const reposPath =  window.require('path').join(getUserHome(), "coedu");

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
			api.users.get({}, (err, user) => {
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

		remote.getCurrentWindow().webContents.session.clearStorageData({
			storages: ["cookies"]
		}, function(){
			// callback function
		});

		shell.moveItemToTrash(reposPath);

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