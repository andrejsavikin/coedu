const GitHubApi = window.require("github");

const github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    // debug: true,
    host: "api.github.com", // should be api.github.com for GitHub
    protocol: "https",
    Promise: Promise,
    timeout: 5000,
    headers: {
        "user-agent": "coedu-app"
    }
});

export default github;