import React from 'react';
import Header from './header';

class selectImage extends React.Component {
  constructor() {
    super();
    this.state = {
      file: null
    };
    this.sendFile = this.sendFile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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
        this.props.setView('home');
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
          <div className='row'>
            <img src={this.state.file} className="img-fluid"></img>
          </div>

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
    );
  }
}

export default selectImage;
