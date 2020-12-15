import React from 'react'
import AvatarEditor from 'react-avatar-editor'

export class AvatarEditorPopup extends React.Component {
    constructor(props){
        super(props);
        this.setEditorRef = this.setEditorRef.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }

    setEditorRef(editor){
        this.editor = editor
    }

    handleImage(){
        let img = this.editor.getImageScaledToCanvas().toDataURL();
        this.props.handleImageSave(img)
    }

    render() {
        const url =
        window.location.origin +
        '/images/uploads/users/' +
        this.props.profileData.profilepicurl;
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content modalContentCustom">
                        <div className="modal-header text-center m-auto w-75 pb-1 pt-1 modalNoBorder">
                            <h5 className="modal-title w-50 mt-1 modalHeader MgL-23" id="exampleModalLongTitle">Crop</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body text-center padding-0">
                            <AvatarEditor image={url} ref={this.setEditorRef} borderRadius={100} color={[115, 115, 115, 1]} style={{ borderRadius: ".75rem", width: "164px", height: "164px" }} />

                        </div>
                        <div className="modal-footer modalNoBorder m-auto modalFooter pt-0">
                            <button
                                type="button"
                                className="btn btn-secondary modalButton"
                                onClick={this.handleImage}
                            >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AvatarEditorPopup
