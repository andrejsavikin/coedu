import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import auth from './auth.jsx';

import App from './components/App.jsx';
import Login from './components/Login.jsx';
import ReposList from './components/ReposList.jsx';

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Login}/>
			<Route path="/repos" component={ReposList} />
		</Route>
	</Router>
	),
	document.getElementById('app')
);