const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
const querystring = window.require('querystring');
const https = window.require("https");

export default function getGithubAuthToken(callback) {
	// GitHub Applications Credentials
	let options = {
		client_id: '7204f9c1af40d9fe3b36',
		client_secret: 'f7356157292ef88d24e3c464bd66056a300d06a4',
		scopes: ['user', 'repo'] // Scopes limit access for OAuth tokens.
	};

	// Create
	let authWindow = new BrowserWindow({ width: 800, height: 600, show: false, 'node-integration': false });
	let githubUrl = 'https://github.com/login/oauth/authorize?';
	let authUrl = githubUrl + 'client_id=' + options.client_id + '&scope=' + options.scopes;
	authWindow.loadURL(authUrl);
	authWindow.show();

	authWindow.webContents.on('did-get-redirect-request', function(event, oldUrl, newUrl) {
		let raw_code = /code=([^&]*)/.exec(newUrl) || null,
		code = (raw_code && raw_code.length > 1) ? raw_code[1] : null,
		error = /\?error=(.+)$/.exec(newUrl);
		
		if (code || error) {
			// Close the browser if code found or error
			authWindow.close();
		}
		
		// If there is a code in the callback, proceed to get token from github
		if (code) {
			let postData = querystring.stringify({
				"client_id" : options.client_id,
				"client_secret" : options.client_secret,
				"code" : code
			});
			
			let post = {
				host: "github.com",
				path: "/login/oauth/access_token",
				method: "POST",
				headers: 
				{ 
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': postData.length,
					"Accept": "application/json"
				}
			};
			
			let req = https.request(post, function(response){
				let result = '';

				response.on('data', function(data) {
					result = result + data;
				});

				response.on('end', function () {
					let json = JSON.parse(result.toString());
					callback(null, json.access_token);
					if (response && response.ok) {
						// Success - Received Token.
						// Store it in localStorage maybe?
						callback(null, response.body.access_token);
					}
				});

				response.on('error', function (err) {
					callback(err, null);
				});
			});
			
			req.write(postData);
			req.end();
		} else if (error) {
			alert("Oops! Something went wrong and we couldn't log you in using Github. Please try again.");
		}
	});

	// Reset the authWindow on close
	authWindow.on('close', function() {
		authWindow = null;
	}, false);
};