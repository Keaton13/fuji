import React from 'react';
import Header from './header';
import Footer from './footer';
import Switch from 'react-switch';
import PostSlider from './postSlider';
import Loading from './loading';

class PostHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {
        data: null
      },
      commentIdArray: {
        ids: null
      },
      commentArray: {
        comments: null
      },
      checked: false,
      buttonText: 'Explore Mode'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.grabUserPosts = this.grabUserPosts.bind(this);
    this.grabPostComments = this.grabPostComments.bind(this);
    this.setCommentState = this.setCommentState.bind(this);
    this.grabUsersFollowers = this.grabUsersFollowers.bind(this);
  }

  componentDidMount() {
    this.grabUsersFollowers();
  }

  handleChange(checked) {
    if (checked === true) {
      this.setState({
        checked: checked,
        buttonText: 'Explore Mode'
      });
      setTimeout(() => {
        this.props.setView('home');
      }, 500);
    } else {
      this.setState({
        checked: checked,
        buttonText: 'Home'
      });
      setTimeout(() => {
        this.props.setView('postHome');
      }, 500);
    }
    // this.props.setView('home')
  }

  handleImageClick(url, postId, post) {
    if (url) {
      try {
        this.props.saveSelectedPicture(url, postId, post);
        this.props.setView('introspect');
      } catch (err) {
        console.err(err);
      }
    }

  }

  async grabUserPosts(data) {
    await fetch('https://dev.fuji.social/api/grabUserFeed', {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        const commentIds = [];
        const userPosts = [];
        for (let i = 0; i < json.data.length; i++) {
          const userId = json.data[i].userId;
          const postId = json.data[i].postId;
          for (let v = 0; v < data.length; v++) {
            if (userId === data[v].user_id_2) {
              commentIds.push(postId);
              userPosts.push(json.data[i]);
            }
          }
        }
        this.setState({
          posts: {
            data: userPosts
          },
          commentIdArray: {
            ids: commentIds
          }
        });
        this.grabPostComments();
        return json;
      })
      .catch(err => {
        console.error(err);
      });
  }

  setCommentState(data) {
    this.setState({
      commentArray: {
        comments: data
      }
    });
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
        this.grabUserPosts(json.data);
        return json;
      })
      .catch(err => {
        console.error(err);
      });
  }

  async grabPostComments() {
    const commentsFromServer = [];
    for (let i = 0; i < this.state.commentIdArray.ids.length; i++) {
      const commentId = this.state.commentIdArray.ids[i] + '';
      await fetch(`https://dev.fuji.social/api/grabPostComments/${commentId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          return res.json();
        })
        .then(json => {
          if (json.data.length >= 1) {
            for (let i = 0; i < json.data.length; i++) {
              commentsFromServer.push(json.data[i]);
            }
          }
          return json;
        })
        .catch(err => {
          console.error(err);
        });
    }
    if (commentsFromServer !== []) {
      this.setCommentState(commentsFromServer);
    }
  }

  render() {
    console.log(this.state);
    if (this.state.posts.data !== null && this.state.commentArray.comments !== null) {
      return (
        <div>
          <Header />
          <div className='container'>
            <div className='row mb-2'>
              <div className='col-8'>
                <div className='input-group mt-3'>
                  <div className='input-group-prepend'></div>
                  <input
                    type='search'
                    className='form-control rounded-pill w-75'
                    aria-label='Search....'
                    placeholder='Search'
                    aria-describedby='inputGroup-sizing-default'
                    onChange={this.onSearchChange}
                  ></input>
                </div>
              </div>
              <div className='col-4'>
                <div className='text-center'>
                  <h6>Explore</h6>
                  <Switch onChange={this.handleChange} checked={this.state.checked} />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='mh-65'>
                {this.state.posts.data.length > 0 ? <PostSlider posts={this.state.posts.data} handleImageClick={this.handleImageClick}comments={this.state.commentArray.comments}/> : <div className="col Mg2"><h1>Tell your friends to make a post!</h1></div>}
              </div>
            </div>
          </div>
          <Footer setView={this.props.setView} saveSelectedData={this.props.saveSelectedData}/>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

export default PostHome;
