const React = require('React');
const ReactDOM = require('react-dom');

let MainView = React.createClass({
	displayName: 'MainView',

	render() {
		return (<h1>It fucking works</h1>);
	}
});

ReactDOM.render(
	<MainView />,
	document.getElementById('app')
);