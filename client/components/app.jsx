import React from 'react';
import SignUp from './sign-up';
import SignIn from './sign-in';
import SelectImage from './select-image';
import Home from './home';
import Profile from './profile';
import SignUp2 from './sign-up2';
import Footer from './footer';
import PostHome from './postHome';
import Introspect from './introspect';

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
      selectedUserParams: {
        data: {}
      },
      userParams: {
        userName: null,
        user_id: null
      },
      selectedPicture: {
        url: null
      }
    };
    this.setView = this.setView.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
    this.saveSelectedData = this.saveSelectedData.bind(this);
    this.saveSelectedPicture = this.saveSelectedPicture.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(view) {
    this.setState({
      view: {
        name: view
      }
    });
  }

  saveUserData(userName, userId) {
    this.setState({
      userParams: {
        userName: userName,
        user_id: userId
      }
    });
  }

  saveSelectedData(data) {
    this.setState({
      selectedUserParams: {
        data: data
      }
    });
  }

  saveSelectedPicture(url) {
    this.setState({
      selectedPicture: {
        url: url
      }
    });
  }

  render() {
    // console.log(this.state.selectedPicture);
    if (this.state.isLoading) {
      return <h1>Testing Connections...</h1>;
    } else {
      let view;
      if (this.state.view.name === 'sign-up') {
        view = <SignUp setView={this.setView} saveUserData={this.saveUserData}/>;
      } else if (this.state.view.name === 'sign-in') {
        view = <SignIn setView={this.setView} saveUserData={this.saveUserData}/>;
      } else if (this.state.view.name === 'home') {
        view = <Home setView={this.setView} userParams={this.state.userParams} saveSelectedData={this.saveSelectedData}/>;
      } else if (this.state.view.name === 'profile') {
        view = <Profile setView={this.setView} userParams={this.state.userParams} saveSelectedPicture={this.saveSelectedPicture} selectedUserParams={this.state.selectedUserParams} saveSelectedData={this.saveSelectedData}/>;
      } else if (this.state.view.name === 'sign-up2') {
        view = <SignUp2 setView={this.setView} userParams={this.state.userParams}/>;
      } else if (this.state.view.name === 'select-image') {
        view = <SelectImage setView={this.setView} userParams={this.state.userParams}/>;
      } else if (this.state.view.name === 'postHome') {
        view = <PostHome setView={this.setView} saveSelectedPicture={this.saveSelectedPicture}/>;
      } else if (this.state.view.name === 'introspect') {
        view = <Introspect setView={this.setView} selectedPicture={this.state.selectedPicture}/>;
      } else {
        view = <Footer setView={this.setView} />;

      }

      return (
        <div>
          { view }
        </div>
      );
    }
  }
}
