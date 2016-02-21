import React from 'react';
import { Link } from 'react-router';

export default class Footer extends React.Component {
	static propTypes = {
		user: React.PropTypes.object,
	};

	render() {
		let user = {
			fullName: "Nikola Ristić",
			username: "rista404",
			team: "III/7",
			organization: "ETŠ Nikola Tesla"
		};
		return (
			<footer>
				<Link to={`/`}>
					<img className="logout" src={"images/logout.svg"} />
				</Link>
				<span className="user-info">{ user.fullName } ¬ { user.team } ¬ { user.organization }</span>
			</footer>
		);
	}
}
