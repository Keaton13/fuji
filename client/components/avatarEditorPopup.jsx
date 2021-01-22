import React from 'react';
import AvatarEditor from 'react-avatar-editor';

export class AvatarEditorPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: {
        pic: null,
        file: null
      }
    };

    this.setEditorRef = this.setEditorRef.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleImageInput = this.handleImageInput.bind(this);
    this.clearAvatarEditorFileState = this.clearAvatarEditorFileState.bind(this);
  }

  componentDidMount() {
    this.setState({
      profilePic: {
        pic: this.props.profilePic
      }
    });
  }

  setEditorRef(editor) {
    this.editor = editor;
  }

  clearAvatarEditorFileState() {
    this.setState = ({
      profilePic: {
        pic: this.props.profilePic,
        file: null
      }
    });
    this.forceUpdate();
  }

  handleImage() {
    const img = this.editor.getImageScaledToCanvas().toDataURL();
    this.setState({
      profilePic: {
        pic: null,
        file: null
      }
    });
    this.props.handleImageSave(img);
    // onClick={(e) => this.myInput.click()}
  }

  handleImageInput(e) {
    const imageFile = document.querySelector('input[type="file"]').files[0];
    this.setState({
      profilePic: {
        pic: imageFile.name,
        file: URL.createObjectURL(e.target.files[0])
      }
    });
  }

  render() {
    let url = null;
    // if(this.props.profilePic !== "" && this.props.profilePic !== null){
    //     url = this.props.profilePic

    // if(this.props.profilePic.length < 50){
    //     url =
    //     window.location.origin +
    //     'http://localhost:3000/images/uploads/users/' +
    //     this.props.profilePic;
    // } else {
    //     url = this.props.profilePic
    // }
    // } else {
    if (this.state.profilePic.file) {
      url = this.state.profilePic.file;
    }
    // }
    return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content modalContentCustom">
            <div className="modal-header text-center m-auto w-75 pb-1 pt-1 modalNoBorder">
              <h5 className="modal-title w-50 mt-1 modalHeader MgL-23" id="exampleModalLongTitle">Crop</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.clearAvatarEditorFileState}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center padding-0">
              {url !== null
                ? <AvatarEditor
                  image={url} ref={this.setEditorRef}
                  borderRadius={100} color={[115, 115, 115, 1]}
                  style={{ borderRadius: '.75rem', width: '164px', height: '164px' }}
                  onClick={this.clearAvatarEditorFileState}
                />
                : <div className="col">
                  <input
                    id="myInput"
                    type="file"
                    onChange={this.handleImageInput}
                    ref={ref => this.myInput = ref}
                    style={{ display: 'none' }}
                  />
                  <h1
                    className="mt-4 mb-5"
                    onClick={e => this.myInput.click()}
                  >+</h1>
                </div>
              }

            </div>
            <div className="modal-footer modalNoBorder m-auto modalFooter pt-0" data-dismiss="modal" aria-label="Close">
              <button
                type="button"
                className="btn btn-secondary modalButton"
                onClick={this.handleImage}
              >Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AvatarEditorPopup;
