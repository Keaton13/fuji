import React from 'react';
import Header from './header';
import Footer from './footer';

class Introspect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: {
        url: null
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    this.setState({
      img: {
        url: this.props.selectedPicture.url
      }
    });
  }

  setView() {
    if(this.props.previousView === 'profile') {
      this.props.setView('profile');
    } else if (this.props.previousView === 'home') {
      this.props.setView('home');
    } else {
      this.props.setView('postHome');
    }
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
          <div className='row h-75 align-items-center'>
            <img
              src={'http://localhost:3000/images/uploads/' + this.state.img.url}
              className='img-fluid'
            ></img>
          </div>
          <Footer setView={this.props.setView}/>
        </div>
      </div>
    );
  }
}

export default Introspect;
