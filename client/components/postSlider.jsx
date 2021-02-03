import React from 'react';
import Slider from 'react-slick';

class PostSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    window.dispatchEvent(new Event('resize'));
  }

  render() {
    const posts = this.props.posts;
    const comments = this.props.comments;
    const settings = {
      adaptiveHeight: true,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        {posts.map(post => {
          return (
            <Slider {...settings} className={'your-slider-wrapper'} key={post.postId} style={{ width: window.innerWidth }}>
              <div>
                <img
                  src={
                    'https://dev.fuji.social/images/uploads/' +
                            post.pictureUrl
                  }
                  key={post.postId}
                  className='mw-100 minWidth100 mb-1'
                  onClick={() => { this.props.handleImageClick(post.pictureUrl, post.postId); }}
                ></img>
              </div>
              {comments.map(comment => {
                if (comment.postId === post.postId) {
                  return (
                    <div key={comment.commentId}>
                      <img
                        src={comment.commentPicUrl}
                        key={post.postId}
                        className='mb-1'
                      ></img>
                    </div>
                  );
                }
              })}
            </Slider>
          );
        })}
      </div>
    );
  }
}

export default PostSlider;
