import React from 'react';
import MountianOutline from '../../server/public/images/mountains-outline-png-2.png';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="container">
        <div className="row h-50">
          <div className="col-4 center Mg1">
            <img src={MountianOutline} className="width100"></img>
          </div>
          <div className="col-4 center text-center">
            <h1>Fuji</h1>
          </div>
          <div className="col-4 center Mg1">
            <img src={MountianOutline} className="width100"></img>
          </div>
        </div>
        <div className="row h-100">
          <div className="col center Mg1 borderLine">
          </div>
          <div className="col-4 center text-center">
            <h6 className="Mg1">Sign-Up!</h6>
          </div>
          <div className="col center Mg1 borderLine">
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
