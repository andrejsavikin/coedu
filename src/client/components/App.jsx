import React from 'react';
import Footer from './Footer.jsx';

export default class App extends React.Component {
	state = {
		user: {
			fullName: "Nikola Ristić",
			username: "rista404",
			team: "III/7",
			organization: "ETŠ Nikola Tesla"
		}
	}

	render() {
		return (
			<div className="App View">
				{ this.props.children }
				<Footer user={this.state.user} />
			</div>
		);
	}
}
