import React from 'react';
import ReposList from './ReposList.jsx';
import Footer from './Footer.jsx';

export default class ReposView extends React.Component {
  render() {
    return (
      <div className="View">
      	<ReposList />
      	<Footer />
      </div>
    );
  }
}
