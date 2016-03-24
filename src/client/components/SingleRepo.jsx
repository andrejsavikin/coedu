import React from 'react';


export default class SingleRepo extends React.Component {

	goBack() {
		location.href = "#/repos";
	}

	render() {

		console.log(this.props);

		return (
			<div className="SingleRepo View">
				<h1> SingleRepo </h1>
				<h3> {this.props.params.user}/{this.props.params.repo} </h3>
				<p onClick={this.goBack}>back</p>
			</div>
		);
	}
}
