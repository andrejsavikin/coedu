/* global local */

// import Git from 'nodegit';
const Git = window.require('git-cli');
import auth from './auth.jsx';

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


	Git.Repository.clone(url, path, cloneOptions)
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

// SHOULD BE REWRITEN
export function addAndCommit(repo, path, message) {

	let index;
	let oid;
	return repo.index()
		.then(indexResult => {
			index = indexResult;
		})
		.then(() => index.addAll())
		.then(() => index.write())
		.then(() => index.writeTree())
		.then(oidResult => {
			oid = oidResult;
	  		return Git.Reference.nameToId(repo, "HEAD");
		})
		.then(head => repo.getCommit(head))
		.then(parent => {
			const user = auth.getUser();
			let author = Git.Signature.now(user.name, user.email)

			return repo.createCommit("HEAD", author, author, message, oid, [parent]);
		});
}
