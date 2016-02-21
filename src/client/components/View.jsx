import React from 'react';
import Footer from './Footer.jsx';

export default class View extends React.Component {
	render() {
		return (
			<div className="View">
				{ this.props.children }
				<Footer />
			</div>
		);
	}
}
