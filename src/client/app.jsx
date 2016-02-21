import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link ,hashHistory } from 'react-router';

import Login from './components/Login.jsx';
import ReposList from './components/ReposList.jsx';

class MainView extends React.Component {
	render() {
		return (
			<h1>Hello, Rista!</h1>
		);
	}
}

render((
	<Router history={hashHistory}>
		<Route path="/" component={Login}/>
		<Route path="/repos" component={ReposList}/>
	</Router>
	),
	document.getElementById('app')
);