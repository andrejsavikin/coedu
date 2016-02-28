const GitHubApi = require('github');

const github = new GitHubApi({
    version: "3.0.0",
    debug: true,
    protocol: "https",
    timeout: 5000,
    headers: {
        "user-agent": "coedu-app"
    }
});

module.exports = github;