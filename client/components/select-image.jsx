import React from 'react';
import Header from './header';

class selectImage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Header />
        <div className='container'>
          <form>
            <div className='form-group align-center'>
              <input
                type='file'
                className='form-control-file'
                id='exampleFormControlFile1'
              ></input>
            </div>
            <div className='form-group text-center'>
              <button
                name='button'
                type='button'
                className='btn btn-dark align-center w-75'
                onClick={this.signInData}
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
