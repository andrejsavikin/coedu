import React from 'react';
import { Link } from 'react-router';

export default class Footer extends React.Component {
render() {
	let user = {
		fullName: "Nikola Ristić",
		username: "rista404",
		team: "III/12",
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
