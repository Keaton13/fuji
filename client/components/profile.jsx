import React from 'react';
import Header from './header';
import Finger from '../../uploads/ffd5099927a09666c86e5df34e31f562.jpg';
import Finger2 from '../../uploads/296591c6a4b6e22cc2d6c4c1b3a8d4fc.jpg';
import Finger3 from '../../uploads/users/ca8.png';
import Finger4 from '../../uploads/thumb-1920-434541.jpg';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      profileData: null
    };
    // const user = this.props.userInfo.params;
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    // const user = this.props.userInfo;
    const userId = this.props.userInfo.params.user_id;
    this.grabProfileData(userId);
    this.setState({
      userData: this.props.userInfo.params
    });
  }

  grabProfileData(userId) {
    fetch(`http://localhost:3000/api/profileData/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          profileData: json
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  setView() {
    this.props.setView('home');
  }

  render() {
    const user = this.props.userInfo.params;
    const profileData = this.state.profileData;
    if (user !== null && profileData !== null) {
      const url = `/images/uploads/users/${profileData.profilepicurl}`;
      return (
        <div>
          <Header />
          <div className='contianer borderLineBot'>
            <div className='row h-100'>
              <div className='col-4 pr-0'>
                <img src={url} className='mw-100 ml-1 mr-1'></img>
              </div>
              <div className='col-8 text-center pl-0'>
                <div className='row ml-2'>
                  <div className='col'>
                    <h6 className='mb-1'>{user.Name}</h6>
                    <h6>{'@' + user.username}</h6>
                  </div>
                  <div className='col'>
                    <h6 className='mb-1'>{profileData.numberofposts}</h6>
                    <h6>Replys</h6>
                  </div>
                  <div className='col'>
                    <h6 className='mb-1'>{profileData.saved}</h6>
                    <h6>Posts</h6>
                  </div>
                </div>
                <div className='row ml-2'>
                  <p className='ml-3'>{profileData.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row mt-4'>
              <div className='col-3 pr-0'>
                <button
                  name='button'
                  type='button'
                  className='btn btn-outline-secondary align-center w-75'
                  onClick={this.setView}
                >
                    Back
                </button>
              </div>
              <div className='col-9 pl-0'>
                <button
                  name='button'
                  type='button'
                  className='btn btn-outline-primary align-center w-75'
                  onClick={this.signInData}
                >
                    Follow!
                </button>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row mt-4'>
              <div className='col'>
                <img src={Finger} className='mw-100 mb-2'></img>
                <img src={Finger2} className='mw-100 mb-2'></img>
                <img src={Finger3} className='mw-100 mb-2'></img>
                <img src={Finger4} className='mw-100 mb-2'></img>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
            Loading....
        </div>
      );
    }

  }
}

export default Profile;
