import React from 'react';
import Header from './header';
import Footer from './footer';
// import { url } from 'inspector';

class Introspect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: {
        url: null,
        postId: null
      },
      dimensions: {
        height: null
      },
      userName: {
        user: null
      },
      profilePic: {
        image: null
      }
    };
    console.log(this.props)
    this.setView = this.setView.bind(this);
    this.imgLoad = this.imgLoad.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.grabUserInfo = this.grabUserInfo.bind(this);
    this.grabProfileData = this.grabProfileData.bind(this);
  }

  componentDidMount() {
    this.setState({
      img: {
        url: this.props.selectedPicture.url,
        postId: this.props.selectedPicture.postId
      }
    });
    this.grabUserInfo(this.props.selectedPicture.post.userId)
  }

  grabUserInfo(userId) {
    fetch(`https://dev.fuji.social/api/grabUserInfo/${userId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      return res.json();
    }).then(json => {
      console.log(json);
      let username = json.data.userName;
      console.log(username)
      this.setState({
        userName: {
          user: json.data.userName
        }
      });
      return json;
    }).then(data => {
      this.grabProfileData(userId)
      return data
    }).catch(err => {
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
          this.setState({
            profilePic: {
              image: json.data.profilepicurl
            }
          });
          console.log(json)
      })
      .catch(err => {
        console.error(err);
      });
  }

  setView(text) {
    if (text === 'canvas') {
      this.props.setView('canvas');
    } else {
      if (this.props.previousView === 'profile') {
        this.props.setView('profile');
      } else if (this.props.previousView === 'home') {
        this.props.setView('home');
      } else {
        this.props.setView('postHome');
      }
    }
  }

  imgLoad({ target: img }) {
    this.setState({
      dimensions: { height: img.offsetHeight }
    });
  }

  handleViewChange() {
    this.props.saveSelectedPictureHeight(this.state.dimensions.height);
    this.setView('canvas');
  }

  render() {
    return (
      <div>
        <div className='container vh-100'>
          {/* <Header /> */}
          <div className="row">
            <div className="col-6 float-left">
            <img className="profileImageIntrospect float-left" src={this.state.profilePic.image}></img>
              <h5 className="float-left">{'@' + this.state.userName.user}</h5>
            </div>
            <div className="col-6 float-right">
              <button type="button" class="close" aria-label="Close" onClick={this.setView}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* <button
              name='button'
              type='button'
              className='btn btn-outline-primary align-center w-100'
              onClick={this.setView}
            >
              Back
            </button> */}
          </div>
          <div className='row h-75 align-items-center text-center'>
            <img
              src={'https://dev.fuji.social/images/uploads/' + this.state.img.url}
              className='img-fluid'
              onLoad={this.imgLoad}
            ></img>
          </div>
          <div className="row">
            <div className="col text-center">
              <button className="btn btn-outline-primary" onClick={this.handleViewChange}>Comment</button>
            </div>
          </div>
          {/* <Footer setView={this.props.setView} /> */}
        </div>
      </div>
    );
  }
}

export default Introspect;
