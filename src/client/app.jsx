import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router';

import LoginView from './components/LoginView.jsx';
import ReposView from './components/ReposView.jsx';

render((
	<Router history={hashHistory}>
		<Route path="/" component={LoginView}/>
		<Route path="/repos" component={ReposView} />
	</Router>
	),
	document.getElementById('app')
);