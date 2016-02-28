import React from 'react';
import github from '../github.js';

import Repo from './Repo.jsx';

export default class ReposList extends React.Component {

 	state = {
		repos: []
	}

	componentWillMount() {
		github.repos.getAll({sort: "updated", type: "owner"}, (err, repos) => {

			if(err) throw err;

			console.log(repos);
			this.setState({
				repos
			})
		});
	}

	render() {
		return (
			<div className="ReposList">
			{
				this.state.repos.sort( function(a, b) {
					if( a.path && b.path )
						return 0;
					if( a.path )
						return -1;
					if( b.path )
						return 1;
					}).map( repo => (
						<Repo key={repo.id} repo={repo} />
					))
			}
			</div>
	);
  }
}
