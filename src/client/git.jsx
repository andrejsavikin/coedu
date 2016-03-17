// import Git from 'nodegit';
const Git = window.require('nodegit');

export function cloneRepo(url, path, cb) {

	const GITHUB_TOKEN = window.localStorage.getItem("token");

	const cloneOptions = {};
	let repo;

	cloneOptions.fetchOpts = {
		callbacks: {
			certificateCheck() { return 1; },
			credentials() {
				return Git.Cred.userpassPlaintextNew(GITHUB_TOKEN, "x-oauth-basic");
			}
		}
	};


	Git.Clone(url, path, cloneOptions)
		.catch(function(err) {
			console.log(err);
			if (cb) cb(err, null);
			return Git.Repository.open(local);
		})
		.then(function(repository) {
			repo = repository;
			console.log(repository);
			if (cb) cb(null, {repository, path});
		});

	return repo;

}
