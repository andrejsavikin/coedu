import React from 'react';
import { Link } from 'react-router';

export default class Footer extends React.Component {
render() {
    return (
      <footer>
      	<Link to={`/`}>
      	  <img className="logout" src={"images/logout.svg"} />
      	</Link>
      </footer>
    );
  }
}
