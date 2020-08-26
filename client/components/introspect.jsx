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
  }

  componentDidMount() {
    this.setState({
      img: {
        url: this.props.selectedPicture.url
      }
    });
  }

  render() {
    return (
      <div>
        <div className='container vh-100'>
          <Header />
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
