import React from 'react';
import GithubButton from './GithubButton.jsx';

export default class Login extends React.Component {
	render() {
		return (
			<div className="Login View">
				<img className="OctocatImage" src={"./images/octobiwan.jpg"} />
				<GithubButton cta="Sign In" />
			</div>
		);
	}
}
