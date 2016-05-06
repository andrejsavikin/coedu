import React from 'react';
import api from '../github.js';

import Repo from './Repo.jsx';

export default class ReposList extends React.Component {

 	state = {
		repos: [],
		loaded: false
	}

	componentWillMount() {
		this.fetchRepos();
	}

	fetchRepos = () => {
		this.setState({loaded: false});
		api.repos.getAll({sort: "updated", type: "owner"}, (err, repos) => {

			if(err) throw err;

			console.log(repos);
			this.setState({
				repos,
				loaded: true
			})
		});
	}

	render() {
		return (
			<div className="ReposList">
				<div onClick={this.fetchRepos} className="ReposList__refresh"><img src="images/refresh.svg" /> </div>
				<div className="Repos">
					{ this.state.loaded ?
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
					: <h1 className="loading">Loading...</h1>}
				</div>
			</div>
	);
  }
}
