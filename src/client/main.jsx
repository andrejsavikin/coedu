// Core
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Utils
import auth from './auth.jsx';
import { requireAuth, isLoggedIn } from './routeHooks.jsx';

// Components
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import ReposList from './components/ReposList.jsx';

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Login} onEnter={isLoggedIn}/>
			<Route path="/repos" component={ReposList} onEnter={requireAuth}/>
		</Route>
	</Router>
	),
	document.getElementById('app')
);