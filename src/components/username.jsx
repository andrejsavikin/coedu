import React from 'react';

export default class Username extends React.Component {
	static propTypes = {
		name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<h1>Hello, {this.props.name}</h1>
		);
	}
}
