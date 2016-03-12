import React from 'react';
import auth from '../auth.jsx';
import git from '../git';

import Footer from './Footer.jsx';

export default class App extends React.Component {
	state = {
		loggedIn: auth.loggedIn(),
		user: auth.getUser()
	}

	constructor() {
		super();
	}

	updateAuth(loggedIn, user) {
		this.setState({
			loggedIn,
			user
		});
	}

	componentWillMount() {
		auth.onChange = this.updateAuth.bind(this);
	}

	render() {
		return (
			<div className="App View">
				{ this.props.children }
				<Footer user={this.state.user} loggedIn={this.state.loggedIn} />
			</div>
		);
	}
}
