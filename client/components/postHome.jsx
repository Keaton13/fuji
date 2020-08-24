import React from 'react';
import Header from './header';
import Footer from './footer';
import user from '../../server/public/images/search.png';
import Switch from 'react-switch';

class PostHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {
        data: null
      },
      checked: false,
      buttonText: 'Explore Mode'
    };
    this.handleChange = this.handleChange.bind(this);
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

  grabUserPosts() {
    fetch('http://localhost:3000/api/grabUserFeed', {
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
            data: json.data
          }
        });
        return json;
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const posts = this.state.posts.data;
    if (this.state.posts.data !== null) {
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
                  <Switch onChange={this.handleChange} checked={this.state.checked}/>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col mh-65 pre-scrollable'>
                {posts.map(post => {
                  return (
                    <img
                      src={
                        'http://localhost:3000/images/uploads/' +
                        post.pictureUrl
                      }
                      key={post.postId}
                      className='mw-100 mb-1'
                    ></img>
                  );
                })}
              </div>
            </div>
          </div>
          <Footer setView={this.props.setView}/>
        </div>
      );
    } else {
      return <div>Loading....</div>;
    }
  }
}

export default PostHome;
