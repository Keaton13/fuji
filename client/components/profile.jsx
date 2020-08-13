import React from 'react';
import Header from './header';
import Finger from '../../server/public/images/uploads/users/ffd5099927a09666c86e5df34e31f562.jpg';
// import Finger2 from '../../server/public/images/uploads/users/296591c6a4b6e22cc2d6c4c1b3a8d4fc.jpg';
import Finger3 from '../../server/public/images/uploads/users/ca8.png';
// import Finger4 from '../../server/public/images/uploads/users/thumb-1920-434541.jpg';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      profileData: {
        data: null
      },
      user: {
        name: null,
        userName: null
      }
    };
    // const user = this.props.userInfo.params;
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    if (this.props.selectedUserParams.data.user_id) {
      const userId = this.props.selectedUserParams.data.user_id;
      this.grabProfileData(userId);
    } else {
      const userId = this.props.userParams.user_id;
      this.grabProfileData(userId);
    }
  }

  grabUserInfo(userId) {
    fetch(`http://localhost:3000/api/grabUserInfo/${userId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          user: {
            username: json.data.userName,
            name: json.data.name
          }
        });
        return json;
      })
      .catch(err => {
        console.error(err);
      });
  }

  grabProfileData(userId) {
    fetch(`http://localhost:3000/api/profileData/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (this.props.selectedUserParams.data.user_id) {
          this.setState({
            profileData: {
              data: json
            },
            user: {
              name: this.props.selectedUserParams.data.Name,
              username: this.props.selectedUserParams.data.username
            }
          });
        } else {
          try {
            this.setState({
              profileData: {
                data: json
              }
            });
            this.grabUserInfo(userId);
          } catch (err) {
            console.error(err);
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  setView() {
    this.props.saveSelectedData({});
    this.props.setView('home');
  }

  render() {

    const user = this.state.user;
    const profileData = this.state.profileData.data;
    if (profileData !== null && user.name !== null) {
      const url =
        window.location.origin +
        '/images/uploads/users/' +
        profileData.profilepicurl;
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
                    <h6 className='mb-1'>{user.name}</h6>
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
                {/* <img src={Finger2} className='mw-100 mb-2'></img> */}
                <img src={Finger3} className='mw-100 mb-2'></img>
                {/* <img src={Finger4} className='mw-100 mb-2'></img> */}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading....</div>;
    }
  }
}

export default Profile;
