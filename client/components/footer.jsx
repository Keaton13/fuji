import React from 'react';
import user from '../../server/public/images/0c3b3adb1a7530892e55ef36d3be6cb8.png';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.handleSetView = this.handleSetView.bind(this);
  }

  handleSetView(page) {
    this.props.setView(page);
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col text-center'>
            <img src={user} className="w-50" onClick={() => this.handleSetView('select-image')}></img>
          </div>
          <div className='col text-center'>
            <img src={user} className="w-50" onClick={() => this.handleSetView('home')}></img>
          </div>
          <div className='col text-center'>
            <img src={user} className="w-50" onClick={() => this.handleSetView}></img>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
