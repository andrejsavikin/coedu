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
		path: null
	}

	constructor(props) {
		super(props);
	}

	repoName = () => this.props.repo.owner.login + "/" + this.props.repo.name;

	cloneRepo = () => {

		if(this.state.isCloned) return;

		// path for the cloning
		const path =  window.require('path').join(remote.getGlobal("__dirname"), "../repos", this.repoName() );

		cloneRepo(this.props.repo.html_url, path, (err, res) => {
			if(err) {
				console.error(err);
				return;
			}

			console.log(res);

			this.setState({
				isCloned: true,
				path: res.path,
			});

			sessionStorage.setItem("repo__" + this.repoName(), JSON.stringify( {path: res.path} ));
		});

		
	}

	render() {
		let repo = this.props.repo,
			isCloned = this.state.isCloned,
			path = this.state.path;

		let repoData = sessionStorage.getItem("repo__" + this.repoName());
		console.log(this.repoName(), repoData);

		if(repoData) {
			isCloned = true;
			path = this.state.path || JSON.parse(repoData).path;
		}

		console.log(path);

		return (
			<div className={"Repo " + (isCloned ? 'Repo--isCloned' : '')}>
				<h2 className="Repo__Name"> {this.repoName()} </h2>
				<small className="Repo__Meta" onClick={this.cloneRepo} > {path || "clone repository →"} </small>
			</div>
		);
	}
}
