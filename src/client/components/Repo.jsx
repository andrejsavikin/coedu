import React from 'react';
import { Link } from 'react-router';

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

	cloneRepo = () => {

		if(this.state.isCloned) return;
		const path =  window.require('path').join("/Users/rista/repos/", this.props.repo.owner.login + ":" + this.props.repo.name);
		cloneRepo(this.props.repo.html_url, path);

		this.setState({
			isCloned: true,
			path
		})
	}

	render() {
		let repo = this.props.repo;
		let isCloned = this.state.isCloned ? 'Repo--isCloned': '';

		return (
			<div className={"Repo " + isCloned}>
				<h2 className="Repo__Name"> {repo.owner.login}/{repo.name} </h2>
				<small className="Repo__Meta" onClick={this.cloneRepo} > {this.state.path || "clone repository →"} </small>
			</div>
		);
	}
}
