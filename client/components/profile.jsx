import React from 'react';
import Footer from './footer';
import AvatarEditor from 'react-avatar-editor';
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
      preview: null
    }
    // const user = this.props.userInfo.params;
    this.setView = this.setView.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.grabProfileData = this.grabProfileData.bind(this);
    this.grabUserPosts = this.grabUserPosts.bind(this);
    this.grabUserInfo = this.grabUserInfo.bind(this);
    this.showSVGDisplay = this.showSVGDisplay.bind(this);
    this.handleImageSave = this.handleImageSave.bind(this);
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
              data: json.data
            },
            user: {
              name: this.props.selectedUserParams.data.Name,
              username: this.props.selectedUserParams.data.username
            }
          });
          this.grabUserPosts(userId);
        } else {
          try {
            this.setState({
              profileData: {
                data: json.data
              }
            });
            this.grabUserPosts(userId);
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

  grabUserPosts(userId) {
    fetch(`http://localhost:3000/api/grabUserPosts/${userId}`, {
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
        return json;
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

  changeSVGDisplay() {
    this.setState({
      display: {
        current: 'hidden'
      }
    });
  }


  handleImageSave(img) {
    this.setState = ({
      preview: {
        img
      }
    })
  }

  setEditorRef(editor){
    this.editor = editor
  }

  render() {
    console.log(this.state.preview)
    const user = this.state.user;
    const profileData = this.state.profileData.data;
    const posts = this.state.posts.urls;
    let customClass = null;
    if (this.state.display.current === 'hidden') {
      customClass = 'animation2';
    } else {
      customClass = 'animation';
    }
    if (profileData !== null && user.name !== null && posts !== null) {
      const url =
        window.location.origin +
        '/images/uploads/users/' +
        profileData.profilepicurl;
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
          <h1 className="text-center fuji-Font">fuji</h1>
          <div className='contianer overflow-hidden'>
            <div className="row">
              <div className="col-6 pr-0">
                <div className="col circleBase type2 text-center float-left MgL-1" data-toggle="modal" data-target="#exampleModal">
                  {/* <h2 className="Mg2" style={{ color: '#CDCDCD' }}>+</h2> */}
                  {!!this.state.preview && <img src={this.state.preview.img} />}
                </div>
              </div>
              <div className="col-6">
                <div className="row Mg3">
                  <h6 className='mb-1 float-left width100 profileText'>{user.name}</h6>
                  <h6 className="width100 font-sizeData">{'@' + user.username}</h6>
                </div>
                <div className="row mt-1 mr-1 float-right">
                  <button
                    name='button'
                    type='button'
                    className='align-center widthProfileButton buttonBorderRadius buttonFont'
                    onClick={this.signInData}
                  >
                    Follow!
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6 Mg4">
                <div className='col-sm width25 float-right padding-0 text-center font-sizeStats'>
                  <h6 className='mb-1 font-sizeNumber'>{profileData.numberofposts}</h6>
                  <p className="font-sizeStats">homies</p>
                </div>
                <div className='col-sm width25 float-right padding-0 text-center font-sizeStats mr-2'>
                  <h6 className='mb-1 font-sizeNumber'>{profileData.saved}</h6>
                  <p className="font-sizeStats">photos</p>
                </div>
                <div className='col-sm width25 float-right padding-0 text-center font-sizeStats mr-2'>
                  <h6 className='mb-1 font-sizeNumber'>{profileData.saved}</h6>
                  <p className="font-sizeStats">comments</p>
                </div>
              </div>
              <div className="col-6">
                <button
                  name='button'
                  type='button'
                  className='align-center ml-3 widthProfileButton buttonBorderRadius buttonFont'
                  onClick={this.setView}
                >
                  Message
                </button>
              </div>
            </div>
            <div className='row' onTouchStart={this.changeSVGDisplay.bind(this)}>
              <div className="pre-scrollable mh-prescroll">
                {posts.map(post => {
                  return (
                    <img
                      src={
                        'http://localhost:3000/images/uploads/' +
                        post.pictureUrl
                      }
                      key={post.postId}
                      className='mw-100 mb-1'
                      onClick={() => { this.handleImageClick(post.pictureUrl); }}
                    ></img>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="row">
            <AvatarEditorPopup handleImageSave={this.handleImageSave} profileData={this.state.profileData.data}/>
          </div>
          <button
            name='button'
            type='button'
            className={'align-center widthProfileButton buttonBorderRadius buttonFont blockButtonPosition ' + customClass}
            onClick={this.setView}
          >
            Block
          </button>
          <Footer setView={this.props.setView} />
        </div>
      );
    } else {
      return <div>Loading....</div>;
    }
  }
}

export default Profile;
