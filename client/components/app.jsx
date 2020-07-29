import React from 'react';
import SignUp from './sign-up';
import SignIn from './sign-in';
import SelectImage from './select-image';
import Home from './home';
import Profile from './profile';
import SignUp2 from './sign-up2';
import Footer from './footer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      isLoggedIn: false,
      view: {
        name: 'sign-in',
        params: {}
      },
      userParams: {
        userName: null,
        userId: null
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

  setView(name, params, userId, userName) {
    if (params == null) {
      this.setState({
        isLoggedIn: true,
        view: {
          name: name
        },
        userParams: {
          userName: userName,
          userId: userId
        }
      });
    } else if (params == null && userId == null && userName == null) {
      this.setState({
        isLoggedIn: true,
        view: {
          name: name
        }
      });
    } else {
      this.setState({
        isLoggedIn: true,
        view: {
          name: name,
          params: params
        },
        userParams: {
          userName: this.state.userParams.userName
        }
      });
    }
  }

  render() {
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
      } else if (this.state.view.name === 'profile') {
        view = <Profile setView={this.setView} userInfo={this.state.view}/>;
      } else if (this.state.view.name === 'sign-up2') {
        view = <SignUp2 setView={this.setView} userParams={this.state.userParams}/>;
      } else if (this.state.view.name === 'select-image') {
        view = <SelectImage setView={this.setView}/>;
      } else {
        view = <Footer setView={this.setView}/>;

      }

      return (
        <div>
          { view }
        </div>
      );
    }
  }
}
