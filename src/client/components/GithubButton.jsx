import React from 'react';
import { Link } from 'react-router';
import auth from '../auth.jsx';


export default class GithubButton extends React.Component {
	static propTypes = {
		cta: React.PropTypes.string,
	};

	handleClick() {
		console.log("Clicked!");
		// Refactor
		auth.login((response) => location.href="#/repos" );
	}

	render() {
		return (
			<div className="GithubButton" onClick={this.handleClick}>
				<img className="GithubButton__Icon" src={"images/github-white.svg"} />
				<span className="GithubButton__Text">{this.props.cta}</span>
			</div>
		);
	}
}
