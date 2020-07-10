import React from 'react';
import SignUp from './sign-up';
import SignIn from './sign-in';
// import SelectImage from './select-image';
import Home from './home';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      isLoggedIn: false,
      view: {
        name: 'home',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  render() {
    // console.log(this.state);
    if (this.state.isLoading) {
      return <h1>Testing Connections...</h1>;
    } else {
      let view;
      if (this.state.view.name === 'sign-up') {
        view = <SignUp setView={this.setView}/>;
      } else if (this.state.view.name === 'sign-in') {
        view = <SignIn setView={this.setView}/>;
      } else if (this.state.view.name === 'home') {
        view = <Home setView={this.setView}/>;
      }
      return (
        <div>
          { view }
        </div>
      );
    }
  }
}
