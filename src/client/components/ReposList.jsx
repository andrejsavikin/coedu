import React from 'react';
import Repo from './Repo.jsx';

export default class ReposList extends React.Component {
 constructor() {
	super();
	this.state = {
		data: [
			{id: 0, name: "Cactomain", url: "https://github.com/vanjek/cactomain", path: "~/coedu/learning-git/"},
			{id: 1, name: "Learning Git", url: "https://github.com/vanjek/learning"},
			{id: 2, name: "Coedu Electron App", url: "https://github.com/rista404/coedu", path: "~/coedu/core/"},
			{id: 3, name: "teslabg/maturski", url: "https://github.com/teslabg/maturski"},
		]
	}
  }

  render() {
	return (
	  <div className="ReposList">
	  	{
	  		this.state.data.sort( function(a, b) {
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
  		{this.props.children}
	  </div>
	);
  }
}
