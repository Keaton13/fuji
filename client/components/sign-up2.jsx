import React from 'react';
import Header from './header';

class SignUp2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      description: null
    };
    this.sendFile = this.sendFile.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  onChange(e) {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    });
  }

  handleInputChange(e) {
    this.setState({ description: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(response => {
      // console.log(response.data);
    });
  }

  sendFile() {
    const formData = new FormData();
    const image = document.querySelector('input[type="file"]').files[0];
    formData.append('profile', image);
    fetch('http://localhost:3000/api/upload-profile', {
      mode: 'no-cors',
      method: 'POST',
      body: formData
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.message === 'File is uploaded') {
          this.sendData(json);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  sendData(data) {
    const userData = {
      userId: this.props.userParams.userId,
      description: this.state.description,
      profilepicurl: data.data.name,
      data: data
    };
    fetch('http://localhost:3000/api/upload-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.status === 200) {
          this.props.setView('sign-in');
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h6>Select Profile Picture</h6>
            </div>
            <img src={this.state.file} className='img-fluid'></img>
          </div>

          <form encType='multipart/form-data' action=''>
            <div className='form-group align-center mt-3'>
              <input
                name='profile'
                type='file'
                className='form-control-file btn btn-dark align-center'
                id='exampleFormControlFile1'
                onChange={this.onChange}
              ></input>
            </div>
            <div className='form-group'>
              <label htmlFor='exampleInputUsername1'>Profile Caption</label>
              <input
                name='Description'
                autoComplete='off'
                className='form-control'
                id='exampleInputUsername1'
                value={this.state.username}
                onChange={e => this.handleInputChange(e)}
                placeholder='Description'
              ></input>
            </div>
            <div className='form-group text-center'>
              <button
                className='btn btn-dark align-center w-75'
                type='button'
                value='upload'
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

export default SignUp2;
