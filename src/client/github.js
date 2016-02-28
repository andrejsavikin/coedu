const GitHubApi = window.require("github");

const github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    timeout: 5000,
    headers: {
        "user-agent": "coedu-app"
    }
});

export default github;