import React from 'react';
import { Link } from 'react-router';

export default class Repo extends React.Component {
	static propTypes = {
		repo: React.PropTypes.object,
	};

	render() {
		let repo = this.props.repo;
		let isCloned = repo.path ? 'Repo--isCloned': '';

		return (
			<div className={"Repo " + isCloned}>
				<h2 className="Repo__Name"> {repo.owner.login}/{repo.name} </h2>
				<small className="Repo__Meta"> {repo.path || "clone repository →"} </small>
			</div>
		);
	}
}
