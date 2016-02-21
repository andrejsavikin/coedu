const Auth = {

	login(cb) {
		// If user is logged in
		if( localStorage.user ) {
			if(cb) cb(true);
			this.onChange(true, JSON.parse(localStorage.getItem("user")));
			console.log("Already logged in.");
			return;
		}

		let user = {
			fullName: "Nikola Ristić",
			username: "rista404",
			team: "III/7",
			organization: "ETŠ Nikola Tesla",
			token: "1023812937128471359238401293"
		};

		// Pretend sucessfull login
		localStorage.setItem("user", JSON.stringify( user ));
		console.log("Logged in!");
		if (cb) cb(true);
		this.onChange(true, JSON.parse(localStorage.getItem("user")));
	},

	logout(cb) {
		delete localStorage.user;
		if (cb) cb();
		this.onChange(false);
	},

	getToken() {
		if(!localStorage.user) return undefined;

		return JSON.parse(localStorage.getItem("user")).token;
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

}

module.exports = Auth;