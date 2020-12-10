import React from 'react';
import Header from './header';
import Footer from './footer';

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
      }
    };
    this.setView = this.setView.bind(this);
    this.imgLoad = this.imgLoad.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      img: {
        url: this.props.selectedPicture.url,
        postId: this.props.selectedPicture.postId
      }
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
          <Header />
          <div className="row">
            <button
              name='button'
              type='button'
              className='btn btn-outline-primary align-center w-100'
              onClick={this.setView}
            >
              Back
            </button>
          </div>
          <div className='row h-75 align-items-center text-center'>
            <img
              src={'http://localhost:3000/images/uploads/' + this.state.img.url}
              className='img-fluid'
              onLoad={this.imgLoad}
            ></img>
            <div className="col">
              <button className="btn btn-outline-primary" onClick={this.handleViewChange}>Comment</button>
            </div>
          </div>
          <Footer setView={this.props.setView} />
        </div>
      </div>
    );
  }
}

export default Introspect;
