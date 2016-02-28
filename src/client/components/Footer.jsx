import React from 'react';
import { Link } from 'react-router';
import auth from '../auth.jsx';

export default class Footer extends React.Component {
	static propTypes = {
		user: React.PropTypes.object,
		loggedIn: React.PropTypes.bool
	};

	handleLogout() {
		auth.logout();
	}

	render() {
		let user = this.props.user;
		if(this.props.loggedIn)
			return (
				<footer>
					<Link to={`/`}>
						<img onClick={this.handleLogout} className="logout" src={"images/logout.svg"} />
					</Link>
					<span className="user-info">{ user.name } ¬ { user.login }</span>
				</footer>
			);
		else
			return (
				<footer>
				</footer>
			);
	}
}
