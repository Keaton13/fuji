import React from 'react';
import Image from '../../server/public/images/aada14b71630f9ba7c956b01398c3a1a.png';
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <img src={Image} className="width100"></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
