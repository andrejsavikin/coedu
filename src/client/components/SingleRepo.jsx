import React from 'react';
import api from '../github';
import auth from '../auth.jsx';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
import { addAndCommit } from '../git.jsx';
const Git = window.require('nodegit');


export default class SingleRepo extends React.Component {

	state = {
		repo: null,
		loaded: false,
		lastCommit: "",
		isDirty: false
	}

	// Refactor
	goBack() {
		location.href = "#/repos";
	}


	componentWillMount() {

		if( !this.repoData.owner ) {
			api.repos.get({user: this.props.params.user, repo: this.props.params.repo}, (err, repo) => {

				if(err) throw err;

				let fullRepo = Object.assign(repo, JSON.parse( localStorage.getItem("repo__" + this.repoName()) ) );

				localStorage.setItem("repo__" + this.repoName(), JSON.stringify( fullRepo ));

				console.log(repo);
				this.setState({
					repo,
					loaded: true
				})
			});

		}else {
			console.log("Data cached!", this.repoData());
		}

		this.init();
	}

	repoName = () => this.props.params.user + "/" + this.props.params.repo;

	init = () => {
		this.getRepo(() => {
			this.getLastCommit();
			this.getStatus();
			
			// let commit;
			// let upstream;
			// Git.Reference.lookup(this.repo, "refs/remotes/origin/master")
			// 	.done(reference => upstream = reference.target())
			// 	.done(() => {
			// 		commit = this.repo().getHeadCommit();
			// 		console.log(upstream, commit);
			// 	})
			// 	.done(result => {
			// 		Git.Graph.aheadBehind(this.repo, commit , upstream).done(result => console.log(result));
			// 	});
				
		});
	}

	repo = null

	getRemote = (cb) => {
		this.repo.getRemote("origin").then(remote => {
			cb(remote);
		})
	}

	pushToRemote = () => {
		this.getRemote(remote => {
			remote.push(["refs/heads/master:refs/heads/master"], {
		        callbacks: {
		          credentials(url, userName) { return Git.Cred.userpassPlaintextNew(auth.getToken(), "x-oauth-basic"); }
		        }
		      }).then(message => console.log(message))
				.then(() => {
					this.modifyHasCommits(false, () => this.init());

				});
		})
	}

	getRepo = (cb) => {
		Git.Repository.open(this.repoData().directory_path).then(repository => {
			this.repo = repository;
			if(cb) cb();
		});
	}

	repoData = () => {
		let data = localStorage.getItem( "repo__" + this.repoName() );

		if(data) return JSON.parse(data);
	}

	getLastCommit = () => {
		this.repo.getHeadCommit().then(commit => {
			this.setState( {lastCommit: commit.message()} );
		});
	}

	getStatus = () => {
		this.repo.getStatus().then(status => {
			if(status.length) {
				this.setState({isDirty: true});
			}
		});
	}

	modifyHasCommits = (bool, cb) => {
		let updatedData = JSON.stringify(Object.assign(this.repoData(), {hasCommits: bool}));
		localStorage.setItem( "repo__" + this.repoName(), updatedData );
		if(cb) cb();
	}

	handleAddAndCommit = () => {
		if(this.state.isDirty) {
			addAndCommit(this.repo, this.repoData().directory_path, "Jos fali za poruku")
				.then(commitId => {
					this.modifyHasCommits(true, () => this.init());
					this.setState({isDirty: false});
				}).catch(error => console.error(error));
		}
	}

	openPublicRepo = () => {
		let repoWindow = new BrowserWindow({ width: 1024, height: 768, show: false, 'node-integration': false });
		repoWindow.loadURL(this.state.repo.html_url);
		repoWindow.show();
		// Reset the authWindow on close
		repoWindow.on('close', function() {
			repoWindow = null;
		}, false);
	}

	render() {

		return (
			<div className="SingleRepo View">
				{this.state.loaded ? (
					<div>
						<img onClick={this.init} className="SingleRepo__refresh" src="images/refresh.svg" />
						<h2 className="SingleRepo__name"> {this.state.repo.full_name} </h2>
						
						<section className="SingleRepo__meta">
							<span className="SingleRepo__path"> {this.state.repo.directory_path} </span>
							<span className="SingleRepo__helpers">
								{this.state.repo.private ? <img className="SingleRepo__private-icon" src="images/octicon.svg" /> : ""}
								<a className="SingleRepo__external-link" onClick={this.openPublicRepo}><img src={"images/planet.svg"} /></a>
							</span>
						</section>

						<section className="SingleRepo__last-commit">
							<p><span className="SingleRepo__last-commit-text">Last commit:</span> { this.state.lastCommit }</p>
						</section>

						<section className="SingleRepo__actions">
							{/*<div className={"SingleRepo__action " + (this.state.isDirty ? "active" : "")}>
								<img src="images/add-icon.svg" />
								<pre>git add .</pre>
							</div>*/}
							<div onClick={this.handleAddAndCommit} className={"SingleRepo__action " + (this.state.isDirty ? "active" : "")}>
								<img src="images/add-icon.svg" />
								<pre>git commit</pre>
							</div>
							<div onClick={this.pushToRemote} className={"SingleRepo__action " + (this.repoData().hasCommits ? "active" : "")}>
								<img src="images/push-icon.svg" />
								<pre>git push</pre>
							</div>
						</section>

						<p onClick={this.goBack}>back</p>
					</div>
				) : <h3> Loading.. </h3> }
				
			</div>
		);
	}
}
