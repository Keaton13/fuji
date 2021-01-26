import React from 'react';
import Header from './header';
import Footer from './footer';

class selectImage extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
    this.sendFile = this.sendFile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.setView = this.setView.bind(this);
    this.updateUserStats = this.updateUserStats.bind(this);
  }

  onChange(e) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(response => {
      // console.log(response.data);
    });
  }

  setView() {
    if (this.props.previousView === 'profile') {
      this.props.setView('profile');
    } else if (this.props.previousView === 'home') {
      this.props.setView('home');
    } else {
      this.props.setView('postHome');
    }
  }

  sendFile(file) {
    const formData = new FormData();
    const image = document.querySelector('input[type="file"]').files[0];
    formData.append('avatar', image);
    // console.log(formData);
    fetch('http://localhost:3000/api/upload-avatar',
      {
        mode: 'no-cors',
        method: 'POST',
        body: formData
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.updateUserStats();
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateUserStats() {
    fetch('http://localhost:3000/api/updateUserStats',
      {
        method: 'GET'
      })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.props.setView('postHome');
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    // console.log(this.state);
    return (
      <div>
        <Header />
        <div className='container'>
          <div className='row mb-3'>
            <button
              name='button'
              type='button'
              className='btn btn-outline-secondary align-center ml-3'
              onClick={this.setView}
            >
              Back
            </button>
          </div>
          <div className='row minHeight-selectImage'>
            <img src={this.state.file} className="img-fluid mh-selectImage"></img>
          </div>
          <div className="row">
            <div className="col">
              <form encType="multipart/form-data" action="">
                <div className='form-group align-center mt-3'>
                  <input
                    name='avatar'
                    type='file'
                    className='form-control-file btn btn-dark align-center'
                    id='exampleFormControlFile1'
                    onChange={this.onChange}
                  ></input>
                </div>
                <div className='form-group text-center'>
                  <button
                    className="btn btn-dark align-center w-75"
                    type="button"
                    value="upload"
                    onClick={this.sendFile}
                  >
                    Send it!
                  </button>
                </div>
              </form>
            </div>

          </div>

          <Footer setView={this.props.setView} saveSelectedData={this.props.saveSelectedData} />
        </div>
      </div>
    );
  }
}

export default selectImage;
