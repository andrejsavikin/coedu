const Auth = {

	login(cb) {
		// If user is logged in
		if( sessionStorage.user ) {
			if(cb) cb(true);
			this.onChange(true, JSON.parse(sessionStorage.getItem("user")));
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
		sessionStorage.setItem("user", JSON.stringify( user ));
		console.log("Logged in!");
		if (cb) cb(true);
		this.onChange(true, JSON.parse(sessionStorage.getItem("user")));
	},

	logout(cb) {
		delete sessionStorage.user;
		if (cb) cb();
		this.onChange(false);
	},

	getToken() {
		if(!sessionStorage.user) return undefined;

		return JSON.parse(sessionStorage.getItem("user")).token;
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

}

module.exports = Auth;