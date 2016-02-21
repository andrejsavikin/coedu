import React from 'react';
import { Link } from 'react-router';

export default class Repo extends React.Component {
  static propTypes = {
    repo: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
  	let repo = this.props.repo;
  	let url = repo.path ? repo.path : "clone repository →";
  	let isCloned = repo.path ? 'Repo--isCloned': '';
    return (
      <div className={"Repo " + isCloned}>
      	<h2 className="Repo__Name"> {repo.name} </h2>
      	<small className="Repo__Meta"> {url} </small>
      </div>
    );
  }
}
