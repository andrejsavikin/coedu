import React from 'react';
import { Link } from 'react-router';


export default class GithubButton extends React.Component {
	static propTypes = {
		cta: React.PropTypes.string
	};

	render() {
		return (
			<div className="GithubButton" onClick={this.props.clickMethod}>
				<img className="GithubButton__Icon" src={"images/github-white.svg"} />
				<span className="GithubButton__Text">{this.props.cta}</span>
			</div>
		);
	}
}
