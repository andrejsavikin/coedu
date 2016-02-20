import React from 'react';

export default class GithubButton extends React.Component {
  static propTypes = {
    cta: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a className="GithubButton" href={"#"}>
       <img className="GithubButton__Icon" src={"images/github-white.svg"} />
       <span className="GithubButton__Text">{this.props.cta}</span>
      </a>
    );
  }
}
