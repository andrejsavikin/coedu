import React from 'react';
import api from '../github';


export default class SingleRepo extends React.Component {

	state = {
		repo: null,
		loaded: false
	}

	goBack() {
		location.href = "#/repos";
	}

	componentWillMount() {

		if( !this.repoData.owner ) {
			api.repos.get({user: this.props.params.user, repo: this.props.params.repo}, (err, repo) => {

				if(err) throw err;

				let fullRepo = Object.assign(repo, JSON.parse( localStorage.getItem("repo__" + this.repoName()) ) );

				localStorage.setItem("repo__" + this.repoName(), JSON.stringify( fullRepo ));

				console.log(repo);
				this.setState({
					repo,
					loaded: true
				})
			});

		}else {
			console.log("Data cached!", this.repoData());
		}
		
	}

	repoName = () => this.props.params.user + "/" + this.props.params.repo;

	repoData = () => {
		let data = localStorage.getItem( "repo__" + this.repoName() );

		if(data) return JSON.parse(data);
	}

	render() {

		return (
			<div className="SingleRepo View">
				<h1> SingleRepo </h1>
				<h3> {this.props.params.user}/{this.props.params.repo} </h3>
				<p onClick={this.goBack}>back</p>
			</div>
		);
	}
}
