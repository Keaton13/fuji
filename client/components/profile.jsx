import React from 'react';
import AvatarEditorPopup from './avatarEditorPopup';

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
      },
      posts: {
        urls: null
      },
      display: {
        current: 'show'
      },
      preview: {
        pic: null
      },
      profilepicurl: {
        pic: null
      },
      following: {
        status: false
      }
    };
    // const user = this.props.userInfo.params;
    this.setView = this.setView.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.grabProfileData = this.grabProfileData.bind(this);
    this.grabUserPosts = this.grabUserPosts.bind(this);
    this.grabUserInfo = this.grabUserInfo.bind(this);
    this.grabUsersFollowers = this.grabUsersFollowers.bind(this);
    this.setProfilePicture = this.setProfilePicture.bind(this);
    this.followUser = this.followUser.bind(this);
    this.followUserCheck = this.followUserCheck.bind(this);
    this.unfollowUser = this.unfollowUser.bind(this);
    this.updateUserStats = this.updateUserStats.bind(this);
    // this.showSVGDisplay = this.showSVGDisplay.bind(this);
    // this.handleImageSave = this.handleImageSave.bind(this);
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

  handleImageClick(url) {
    if (url) {
      try {
        this.props.saveSelectedPicture(url);
        this.props.setView('introspect');
      } catch (err) {
        console.err(err);
      }
    }
  }

  followUser() {
    const user = {
      user: this.props.selectedUserParams.data.user_id
    };
    fetch('https://dev.fuji.social/api/insertFollowers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.name === 'error') {
          return json;
        } else {
          this.updateUserStats();
          return json;
        }

      })
      .catch(err => {
        console.error(err);
      });
  }

  unfollowUser() {
    const user = {
      user: this.props.selectedUserParams.data.user_id
    };
    fetch('https://dev.fuji.social/api/unfollowUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.name === 'error') {
          return json;
        } else {
          this.updateUserStats('remove');
          return json;
        }

      })
      .catch(err => {
        console.error(err);
      });
  }

  updateUserStats(param) {
    if (param === 'remove') {
      fetch('https://dev.fuji.social/api/updateUserStatsHomiesRemove',
        {
          method: 'GET'
        })
        .then(res => {
          return res.json();
        })
        .then(json => {
          this.grabUsersFollowers();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      fetch('https://dev.fuji.social/api/updateUserStatsHomies',
        {
          method: 'GET'
        })
        .then(res => {
          return res.json();
        })
        .then(json => {
          this.grabUsersFollowers();
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  grabUsersFollowers() {
    fetch('https://dev.fuji.social/api/grabUserFollowers', {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.props.saveUsersFollowers(json.data);
        if (this.state.following.status === false) {
          this.setState({
            following: {
              status: true
            }
          });
        } else {
          this.setState({
            following: {
              status: false
            }
          });
        }

        return json;
      })
      .catch(err => {
        console.error(err);
      });
  }

  grabUserInfo(userId) {
    fetch(`https://dev.fuji.social/api/grabUserInfo/${userId}`, {
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
    fetch(`https://dev.fuji.social/api/profileData/${userId}`, {
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
              data: json.data
            },
            user: {
              name: this.props.selectedUserParams.data.Name,
              username: this.props.selectedUserParams.data.username
            },
            profilepicurl: {
              pic: json.data.profilepicurl
            }
          });
          this.grabUserPosts(userId);
        } else {
          try {
            if (json.data.profilepicurl) {
              this.setState({
                profileData: {
                  data: json.data
                },
                profilepicurl: {
                  pic: json.data.profilepicurl
                }
              });
              this.grabUserPosts(userId);
              this.grabUserInfo(userId);
            } else {
              this.setState({
                profileData: {
                  data: json.data
                }
              });
              this.grabUserPosts(userId);
              this.grabUserInfo(userId);
            }
          } catch (err) {
            console.error(err);
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  grabUserPosts(userId) {
    fetch(`https://dev.fuji.social/api/grabUserPosts/${userId}`, {
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
          posts: {
            urls: json.data
          }
        });
        this.followUserCheck();
        return json;
      })
      .catch(err => {
        console.error(err);
      });
  }

  followUserCheck() {
    for (let i = 0; i < this.props.followers.users.length; i++) {
      if (this.props.followers.users[i].user_id_2 === this.props.selectedUserParams.data.user_id) {
        this.setState({
          following: {
            status: true
          }
        });
      }
    }
  }

  setProfilePicture(dataUrl) {
    const data = {
      pic: dataUrl
    };

    fetch('https://dev.fuji.social/api/setProfilePicture',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res => {
        this.setState({
          profilepicurl: {
            pic: dataUrl
          }
        });
        return res;
      })
      .catch(err => {
        console.error(err);
      });
  }

  setView() {
    this.props.saveSelectedData({});
    if (this.props.previousView === 'profile') {
      this.props.setView('profile');
    } else if (this.props.previousView === 'home') {
      this.props.setView('home');
    } else {
      this.props.setView('postHome');
    }
  }

  showSVGDisplay() {
    this.setState({
      display: {
        current: 'show'
      }
    });
  }

  changeSVGDisplay = () => {
    this.setState({
      display: {
        current: 'hidden'
      }
    });
  }

  handleImageSave = img => {
    this.setState({
      preview: {
        pic: img
      }
    });
    this.setProfilePicture(img);
  }

  // handleImageSave(img) {
  //   console.log(img)
  //   this.setState = ({
  //     preview: {
  //       pic: img
  //     }
  //  }, () => {
  //    this.forceUpdate();
  //  })
  // }

  setEditorRef(editor) {
    this.editor = editor;
  }

  render() {
    const user = this.state.user;
    const profileData = this.state.profileData.data;
    const posts = this.state.posts.urls;
    let button = null;
    let customClass = null;
    let profileImage;
    console.log(posts)
    if (this.state.display.current === 'hidden') {
      customClass = 'animation2';
    } else {
      customClass = 'animation';
    }
    if (this.props.selectedUserParams.data.user_id) {
      profileImage = this.state.profilepicurl.pic ? <img className="profileImage" src={this.state.profilepicurl.pic} /> : <div className="mt-5">+</div>;
    } else {
      profileImage = this.state.profilepicurl.pic ? <img className="profileImage" data-toggle="modal" data-target="#exampleModal" src={this.state.profilepicurl.pic} /> : <div data-toggle="modal" data-target="#exampleModal" className="mt-5">+</div>;
    }
    if (this.state.following.status === true) {
      button = <button
        name='button'
        type='button'
        className='align-center widthProfileButton buttonBorderRadiusFollowing buttonFontFollowing'
        onClick={this.unfollowUser}
      >
        Following
      </button>;
    } else {
      button = <button
        name='button'
        type='button'
        className='align-center widthProfileButton buttonBorderRadius buttonFont'
        onClick={this.followUser}
      >
        Follow!
      </button>;
    }
    if (profileData !== null && user.name !== null && posts !== null) {
      return (
        <div>
          <div>
            <svg className={'profileFeedPosition ' + customClass} xmlns="http://www.w3.org/2000/svg" width="375" height="322">
              <defs>
                <linearGradient x2='0%' y2='100%' id='bgGradient' >
                  <stop offset='0%' stopColor='#FFFFFF' />
                  <stop offset='25%' stopColor='#FFFFFF' />
                  <stop offset='100%' stopColor='#FFFFFF00' />
                </linearGradient>
              </defs>
              <g>
                <path opacity="1" fill="#FFFFFF" d="M0 0h375v209.712c0 23.625-7.706 46.606-21.949 65.455-38.718 51.241-111.676 61.326-162.843 22.509l-25.903-19.651a45.321 45.321 0 00-51.524-2.255l-10.151 6.386C64.793 305.959 14.65 288.352 0 246.119V0z">
                </path>
              </g>
            </svg>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-4">
                <button className="btn btn-outline-secondary float-left mt-3"
                  onClick={this.setView}
                >back</button>
              </div>
              <div className="col-8">
                <h1 className="text-center fuji-Font float-left mt-2 ml-2">fuji</h1>
              </div>
            </div>
          </div>
          <div className='contianer overflow-hidden'>
            <div className="row">
              <div className="col-6 pr-0">
                <div className="col circleBase type2 text-center padding-0 float-left MgL-1">
                  {profileImage}
                </div>
              </div>
              <div className="col-6">
                <div className="row Mg3">
                  <h6 className='mb-1 float-left width100 profileText'>{user.name}</h6>
                  <h6 className="width100 font-sizeData">{'@' + user.username}</h6>
                </div>
                <div className="row mt-1 mr-1 float-right">
                  {button}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6 Mg4">
                <div className='col-sm width25 float-right padding-0 text-center font-sizeStats'>
                  <h6 className='mb-1 font-sizeNumber'>{profileData.homies}</h6>
                  <p className="font-sizeStats">homies</p>
                </div>
                <div className='col-sm width25 float-right padding-0 text-center font-sizeStats mr-2'>
                  <h6 className='mb-1 font-sizeNumber'>{profileData.postTotal}</h6>
                  <p className="font-sizeStats">photos</p>
                </div>
                <div className='col-sm width25 float-right padding-0 text-center font-sizeStats mr-2'>
                  <h6 className='mb-1 font-sizeNumber'>{profileData.commentTotal}</h6>
                  <p className="font-sizeStats">comments</p>
                </div>
              </div>
              <div className="col-6">
                {/* <button
                  name='button'
                  type='button'
                  className='align-center ml-3 widthProfileButton buttonBorderRadius buttonFont'
                  onClick={this.setView}
                >
                  Message
                </button> */}
              </div>
            </div>
            <div className='row'>
              <div className="pre-scrollable mh-prescroll w-100" onTouchStart={this.changeSVGDisplay}>
                {posts.length > 0 ? posts.map(post => {
                  return (
                    <img
                      src={
                        'https://dev.fuji.social/images/uploads/' +
                        post.pictureUrl
                      }
                      key={post.postId}
                      className='mw-100 mb-1'
                      onClick={() => { this.handleImageClick(post.pictureUrl); }}
                    ></img>
                  );
                }) : <div className="container mt-5">
                  <div className="row">
                    <div className="col text-center">
                      <h1>Make a post!</h1>
                    </div>
                  </div>
                  {/* <div className="row">
                    <div className="col text-center">
                      <h3>I</h3>
                    </div>
                  </div> */}
                </div>
                }
              </div>
            </div>
          </div>
          <div className="row">
            <AvatarEditorPopup handleImageSave={this.handleImageSave} object={this} profileData={this.state.profileData.data} profilePic={this.state.profilepicurl.pic} />
          </div>
          {/* <button
            name='button'
            type='button'
            className={'align-center widthProfileButton buttonBorderRadius buttonFont blockButtonPosition ' + customClass}
            onClick={this.setView}
          >
            Block
          </button> */}
        </div>
      );
    } else {
      return <div>Loading....</div>;
    }
  }
}

export default Profile;
