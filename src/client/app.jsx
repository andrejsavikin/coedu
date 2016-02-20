import React from 'react';
import ReactDOM from 'react-dom';

class MainView extends React.Component {
	render() {
		return (
			<h1>Hello, Rista!</h1>
		);
	}
}

ReactDOM.render(
	<MainView />,
	document.getElementById('app')
);