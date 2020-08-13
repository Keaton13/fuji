import React from 'react';
import Header from './header';
import Finger from '../../server/public/images/unnamed.png';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      Date: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.sendLoginData = this.sendLoginData.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  handleInputChange(e) {
    switch (e.target.name) {
      case 'name':
        this.setState({ name: e.target.value });
        break;

      case 'email':
        this.setState({ email: e.target.value });
        break;

      case 'username':
        this.setState({ username: e.target.value });
        break;

      case 'password':
        this.setState({ password: e.target.value });
        break;

      case 'date':
        this.setState({ date: e.target.value });
        break;
    }
  }

  handleViewChange(user) {
    this.props.saveUserData(user.userName, user.userId);
    this.props.setView('sign-up2');
  }

  sendLoginData() {
    const data = this.state;
    fetch('http://localhost:3000/api/sign-up',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.token) {
          this.handleViewChange(json);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <Header/>
        <div className='container'>
          <form>
            <div className="form-group">
              <label htmlFor="InputName1">Name</label>
              <input name="name" className="form-control" id="InputName1" value={this.state.name} onChange={e => this.handleInputChange(e)} placeholder="Name"></input>
            </div>
            <div className="form-group">
              <label htmlFor="InputEmail1">Email address</label>
              <input name="email" className="form-control" id="InputEmail1" value={this.state.email} onChange={e => this.handleInputChange(e)} aria-describedby="emailHelp" placeholder="Enter email"></input>
              <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputUsername1">Username</label>
              <input name="username" className="form-control" id="exampleInputUsername1" value={this.state.username} onChange={e => this.handleInputChange(e)} placeholder="Username"></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input name="password" type="password" className="form-control" id="exampleInputPassword1" value={this.state.password} onChange={e => this.handleInputChange(e)} placeholder="Password"></input>
            </div>
            <div className="text-center mt-4">
              <button name="button" type="button" className="btn btn-dark align-center w-75" onClick={this.sendLoginData}>Next</button>
            </div>
            <div className="text-center">
              <img src={Finger} className="w-25 finger"></img>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
