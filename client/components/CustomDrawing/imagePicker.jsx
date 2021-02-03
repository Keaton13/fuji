import { json } from 'body-parser';
import React from 'react';
import Slider from 'react-slick';

class ImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {
        urls: json.data
      }
    };
    this.grabUserPosts = this.grabUserPosts.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    this.grabUserPosts();
  }

  grabUserPosts() {
    const userId = this.props.userParams.user_id;
    fetch(`https://dev.fuji.social/api/grabUserPosts/${userId}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      return res.json();
    }).then(json => {
      this.setState({
        posts: {
          urls: json.data
        }
      });
      return json;
    }).catch(err => {
      console.error(err);
    });
  }

  onLoad(post) {
    this.props.saveImgSize({ width: post.target.clientWidth, height: post.target.clientHeight });
  }

  render() {
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    const posts = this.state.posts.urls;
    if (this.state.posts.urls !== undefined) {
      return (
        <div className='container'>
          <Slider {...settings} className={'your-slider-wrapper'}>
            {posts.map(post => {
              return (
                <div className="col" key={post.postId}>
                  <img
                    className="mw-imagePicker, mh-imagePicker margin-auto"
                    src={'https://dev.fuji.social/images/uploads/' +
                                            post.pictureUrl}
                    draggable="true"
                    onDragStart={e => {
                      this.props.dragUrl.current = e.target.src;
                    }}
                    onTouchStart={e => {
                      this.props.dragUrl.current = e.target.src;
                      this.props.setImageClick(0);
                    }}
                    onLoad={post => {
                      post.preventDefault();
                      this.onLoad(post);
                    }}
                  ></img>
                </div>

              );
            })}
          </Slider>
        </div>
      );
    } else {
      return (
        <div>
                    Hmmmmmm
        </div>
      );
    }

  }
}

export default ImagePicker;
