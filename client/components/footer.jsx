import React from 'react';
import profileImage from '../../server/public/images/0c3b3adb1a7530892e55ef36d3be6cb8.png';
import homeImage from '../../server/public/images/home-icon-png-home-house-icon-image-202-home-png-home-png-512_512.png';
import createImage from '../../server/public/images/create-new--v2.png';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetView = this.handleSetView.bind(this);
    this.resetSelectedUserParams = this.resetSelectedUserParams.bind(this);
  }

  handleSetView(page) {
    this.props.setView(page);
  }

  resetSelectedUserParams() {
    this.props.saveSelectedData({});
    this.handleSetView('profile');
  }

  render() {
    return (
      <div className='container fixed-bottom footerAlignment'>
        <div className='row'>
          <div className='col text-center'>
            <img src={createImage} className="w-35 mb-2" onClick={() => this.handleSetView('select-image')}></img>
          </div>
          <div className='col text-center'>
            <img src={homeImage} className="w-35 mb-2" onClick={() => this.handleSetView('postHome')}></img>
          </div>
          <div className='col text-center'>
            <img src={profileImage} className="w-35 mb-2" onClick={() => this.resetSelectedUserParams()}></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
