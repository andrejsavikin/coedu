import React from 'react';
import ReactDOM from 'react-dom';

import Username from './components/username.jsx';

class MainView extends React.Component {
	render() {
		return (
			<div><Username name="Rista" /></div>
		);
	}
}

ReactDOM.render(
	<MainView />,
	document.getElementById('app')
);