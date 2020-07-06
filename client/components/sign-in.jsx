import React from 'react';
import Header from './header';
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedInStatus: 'Not Logged In'
    };

    this.signInData = this.signInData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  handleBackButton() {
    this.props.setView('sign-up');
  }

  handleSignIn() {
    this.props.setView('home');
  }

  signInData() {
    const data = this.state;
    fetch('http://localhost:3000/api/sign-in',
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
        if (json.Token) {
          this.handleSignIn();
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <Header />,
        <div className='container'>
          <form>
            <div className='form-group'>
              <label htmlFor='exampleInputUsername1'>Username</label>
              <input
                name='username'
                className='form-control'
                id='exampleInputUsername1'
                value={this.state.username}
                onChange={e => this.handleInputChange(e)}
                placeholder='Username'
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='exampleInputPassword1'>Password</label>
              <input
                name='password'
                type='password'
                className='form-control'
                id='exampleInputPassword1'
                value={this.state.password}
                onChange={e => this.handleInputChange(e)}
                placeholder='Password'
              ></input>
            </div>
            <div className='text-center mt-4'>
              <button
                name='button'
                type='button'
                className='btn btn-dark align-center w-75'
                onClick={this.signInData}
              >
                Send it!
              </button>
            </div>
            <div className='text-center'>
              <img className='w-25 finger'></img>
            </div>
          </form>
        </div>
        <div className='container'>
          <div className='row h-100'>
            <div className='col center Mg1 borderLine'></div>
            <div className='col-4 center text-center'>
              <h3 className='Mg1'>OR!</h3>
            </div>
            <div className='col center Mg1 borderLine'></div>
          </div>
          <div className="row h-100">
            <h4 className="col center text-center">Dont have an account?</h4>
          </div>
          <div className="row h-100">
            <h4 className="col center text-center">Lets fix that...</h4>
          </div>
          <div className="row h-100">
            <h4 className="col center text-center">-_-</h4>
          </div>
          <div className="text-center mt-4">
            <button
              name='button'
              type='button'
              className='btn btn-outline-dark align-center w-75'
              onClick={this.handleBackButton}
            >
                Sign-Up
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
