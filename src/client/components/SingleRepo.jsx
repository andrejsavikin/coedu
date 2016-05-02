import React from 'react';
import api from '../github';
const Git = window.require('nodegit');


export default class SingleRepo extends React.Component {

	state = {
		repo: null,
		loaded: false,
		lastCommit: "",
		isDirty: false,
		hasStaged: false,
		hasCommits: false
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

		this.getRepo(() => {
			this.getLastCommit();
			this.getStatus();
		});
	}

	repoName = () => this.props.params.user + "/" + this.props.params.repo;

	repo = null

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

	render() {

		return (
			<div className="SingleRepo View">
				{this.state.loaded ? (
					<div>
						<h2 className="SingleRepo__name"> {this.state.repo.full_name} </h2>
						
						<section className="SingleRepo__meta">
							<span className="SingleRepo__path"> {this.state.repo.directory_path} </span>
							<span className="SingleRepo__helpers">
								{this.state.repo.private ? <img className="SingleRepo__private-icon" src="images/octicon.svg" /> : ""}
								<a className="SingleRepo__external-link" href={this.state.repo.html_url}><img src={"images/planet.svg"} /></a>
							</span>
						</section>

						<section className="SingleRepo__last-commit">
							<p><span className="SingleRepo__last-commit-text">Last commit:</span> { this.state.lastCommit }</p>
						</section>

						<section className="SingleRepo__actions">
							<div className={"SingleRepo__action " + (this.state.isDirty ? "active" : "")}>
								<img src="images/add-icon.svg" />
								<pre>git add .</pre>
							</div>
							<div className={"SingleRepo__action " + (this.state.hasStaged ? "active" : "")}>
								<img src="images/commit-icon.svg" />
								<pre>git commit</pre>
							</div>
							<div className={"SingleRepo__action " + (this.state.hasCommits ? "active" : "")}>
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
