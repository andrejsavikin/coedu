import React from 'react';
import Repo from './Repo.jsx';

export default class ReposList extends React.Component {
 constructor() {
	super();
	this.state = {
		data: [
			{key: 0, name: "Cactomain", url: "https://github.com/vanjek/cactomain", path: "~/coedu/learning-git/"},
			{key: 1, name: "Learning Git", url: "https://github.com/vanjek/learning"},
			{key: 2, name: "Coedu Electron App", url: "https://github.com/rista404/coedu", path: "~/coedu/core/"}
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
  			<Repo key={repo.key} repo={repo} />
  			))
  		}
  		{this.props.children}
	  </div>
	);
  }
}
