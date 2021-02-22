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
import Canvas from './canvas';

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
      previousView: null,
      selectedUserParams: {
        data: {}
      },
      userParams: {
        userName: null,
        user_id: null
      },
      selectedPicture: {
        url: null,
        postId: null,
        post: null
      },
      selectedPictureHeight: {
        height: null
      },
      followers: {
        data: null
      }
    };
    this.setView = this.setView.bind(this);
    this.saveUserData = this.saveUserData.bind(this);
    this.saveSelectedData = this.saveSelectedData.bind(this);
    this.saveSelectedPicture = this.saveSelectedPicture.bind(this);
    this.saveSelectedPictureHeight = this.saveSelectedPictureHeight.bind(this);
    this.saveUsersFollowers = this.saveUsersFollowers.bind(this);
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
      },
      previousView: this.state.view.name
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

  saveSelectedPicture(url, postId, post) {
    this.setState({
      selectedPicture: {
        url: url,
        postId: postId,
        post: post
      }
    });
  }

  saveSelectedPictureHeight(height) {
    this.setState({
      selectedPictureHeight: {
        height: height
      }
    });
  }

  saveUsersFollowers(data) {
    this.setState({
      followers: {
        users: data
      }
    });
  }

  render() {
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
        view = <Profile setView={this.setView} userParams={this.state.userParams} saveUsersFollowers={this.saveUsersFollowers} saveSelectedPicture={this.saveSelectedPicture} selectedUserParams={this.state.selectedUserParams} saveSelectedData={this.saveSelectedData} previousView={this.state.previousView} followers={this.state.followers}/>;
      } else if (this.state.view.name === 'sign-up2') {
        view = <SignUp2 setView={this.setView} userParams={this.state.userParams}/>;
      } else if (this.state.view.name === 'select-image') {
        view = <SelectImage setView={this.setView} userParams={this.state.userParams} previousView={this.state.previousView} saveSelectedData={this.saveSelectedData}/>;
      } else if (this.state.view.name === 'postHome') {
        view = <PostHome setView={this.setView} saveSelectedPicture={this.saveSelectedPicture} saveSelectedData={this.saveSelectedData} saveUsersFollowers={this.saveUsersFollowers}/>;
      } else if (this.state.view.name === 'introspect') {
        view = <Introspect saveSelectedPictureHeight={this.saveSelectedPictureHeight} setView={this.setView} selectedPicture={this.state.selectedPicture} previousView={this.state.previousView}/>;
      } else if (this.state.view.name === 'canvas') {
        view = <Canvas userParams={this.state.userParams} setView={this.setView} selectedPicture={this.state.selectedPicture} selectedPictureHeight={this.state.selectedPictureHeight}/>;
      } else {
        view = <Footer setView={this.setView} saveSelectedData={this.saveSelectedData}/>;

      }

      return (
        <div className="h-100">
          { view }
        </div>
      );
    }
  }
}
