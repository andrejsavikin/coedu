import React from 'react';
import { Link } from 'react-router';

// For accessing the __dirname global var
const { remote } = window.require('electron');

import { cloneRepo } from '../git.jsx';

export default class Repo extends React.Component {
	static propTypes = {
		repo: React.PropTypes.object,
	};

	state = {
		isCloned: false,
		path: null,
		cloning: false
	}

	constructor(props) {
		super(props);
	}

	repoName = () => this.props.repo.owner.login + "/" + this.props.repo.name;

	repoData = () => {
		let data = localStorage.getItem( "repo__" + this.repoName() );

		if(data) return JSON.parse(data);
	}

	cloneRepo = () => {

		// Cancel if already cloned
		if(this.state.isCloned || this.repoData()) return;

		this.setState({
			cloning: true
		});

		// path for the cloning
		const repoPath =  window.require('path').join(remote.getGlobal("__dirname"), "../repos", this.repoName() );

		// Clone repo
		cloneRepo(this.props.repo.html_url, repoPath, (err, res) => {
			if(err) {
				console.error(err);
				return;
			}

			console.log(res);

			this.setState({
				isCloned: true,
				path: res.path,
			});

			localStorage.setItem("repo__" + this.repoName(), JSON.stringify( {directory_path: res.path} ));
		});

		
	}

	render() {
		let repo = this.props.repo,
			isCloned = this.state.isCloned,
			cloning = this.state.cloning,
			path = this.state.path;

		
		if(this.repoData()) {
			isCloned = true;
			path = this.state.path || this.repoData().path;
		}

		let repoMeta = path || (cloning ? "cloning..." : "clone repository →");
		let repoName = this.repoName().toString();

		console.log("ime", repoName);

		return (
			<div className={"Repo " + (isCloned ? 'Repo--isCloned' : '')}>
				{isCloned ? 
					<h2 className="Repo__Name"> <Link to={"/repo/" + repoName}> {repoName} </Link> </h2>
				: 
					<h2 className="Repo__Name">{repoName}</h2>
				}
				<small className="Repo__Meta" onClick={this.cloneRepo} > {repoMeta} </small>
			</div>
		);
	}
}
