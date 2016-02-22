import React from 'react';
import auth from '../auth.jsx';
import GithubButton from './GithubButton.jsx';

export default class Login extends React.Component {

	handleClick() {
		// Refactor
		auth.login((response) => location.href="#/repos" );
	}

	render() {
		return (
			<div className="Login View">
				<img className="OctocatImage" src={"./images/octobiwan.jpg"} />
				<GithubButton cta="Sign In" clickMethod={this.handleClick}/>
			</div>
		);
	}
}
