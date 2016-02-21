import React from 'react';
import { Link } from 'react-router';

export default class Footer extends React.Component {
	static propTypes = {
		user: React.PropTypes.object,
	};

	render() {
		let user = this.props.user;
		if(user)
			return (
				<footer>
					<Link to={`/`}>
						<img className="logout" src={"images/logout.svg"} />
					</Link>
					<span className="user-info">{ user.fullName } ¬ { user.team } ¬ { user.organization }</span>
				</footer>
			);
		else
			return (
				<footer>
				</footer>
			);
	}
}
