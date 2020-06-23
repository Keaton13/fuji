import React from 'react';
import Header from './header';
import Finger from '../../server/public/images/unnamed.png';
class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div>
        <Header/>
        <div className='container'>
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Name</label>
              <input type="password" className="form-control" id="exampleInputName1" placeholder="Name"></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
              <small id="emailHelp" className="form-text text-muted">We will never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputUsername1">Username</label>
              <input type="password" className="form-control" id="exampleInputUsername1" placeholder="Username"></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
            </div>
            <div className="form-group row ml-1">
              <label htmlFor="exampleInputDate1">Date</label>
              <input className="form-control" type="date" value="2011-08-19" id="example-date-input"></input>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-dark align-center w-75">Sent it!</button>
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
