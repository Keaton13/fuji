import React from 'react';
import Header from './header';
import Footer from './footer';
import Switch from 'react-switch';
import PostSlider from './postSlider';

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
  }

  componentDidMount() {
    this.grabUserPosts();
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

  handleImageClick(url, postId) {
    if (url) {
      try {
        this.props.saveSelectedPicture(url, postId);
        this.props.setView('introspect');
      } catch (err) {
        console.err(err);
      }
    }

  }

  async grabUserPosts() {
    await fetch('http://localhost:3000/api/grabUserFeed', {
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
        for (let i = 0; i < json.data.length; i++) {
          const postId = json.data[i].postId;
          commentIds.push(postId);
        }
        this.setState({
          posts: {
            data: json.data
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

  async grabPostComments() {
    const commentsFromServer = [];
    for (let i = 0; i < this.state.commentIdArray.ids.length; i++) {
      const commentId = this.state.commentIdArray.ids[i] + '';
      await fetch(`http://localhost:3000/api/grabPostComments/${commentId}`, {
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
              <div className='mh-65 pre-scrollable'>
                <PostSlider posts={this.state.posts.data} handleImageClick={this.handleImageClick}comments={this.state.commentArray.comments}/>
              </div>
            </div>
          </div>
          <Footer setView={this.props.setView} saveSelectedData={this.props.saveSelectedData}/>
        </div>
      );
    } else {
      return <div>Loading....</div>;
    }
  }
}

export default PostHome;
