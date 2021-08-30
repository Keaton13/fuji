import React from 'react';
import Header from './header'
class MobileError extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="container m-auto">
                    <div className="row m-auto">
                        <div className="col m-auto">
                            <div class="modal-dialog modal-dialog-centered">
                                Please view app with a mobile device -_-
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MobileError;