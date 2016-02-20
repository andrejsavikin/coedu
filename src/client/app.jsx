import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link ,hashHistory } from 'react-router';

import Login from './components/Login.jsx'

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
	</Router>
	),
	document.getElementById('app')
);