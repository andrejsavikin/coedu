import React from 'react';

import View from './View.jsx';
import ReposList from './ReposList.jsx';

export default class ReposView extends React.Component {
	render() {
		return (
			<View>
				<ReposList />
			</View>
		);
	}
}
