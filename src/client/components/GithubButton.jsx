import React from 'react';
import { Link } from 'react-router';

export default class GithubButton extends React.Component {
  static propTypes = {
    cta: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
    	<Link to={`/repos`}>
	      <div className="GithubButton">
	       <img className="GithubButton__Icon" src={"images/github-white.svg"} />
	       <span className="GithubButton__Text">{this.props.cta}</span>
	      </div>
      	</Link>
    );
  }
}
