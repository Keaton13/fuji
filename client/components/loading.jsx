import React from 'react';

class Loading extends React.Component {
    constructor() {
        super();
        console.log("test")
    }
    render() {
        return (
            <div className="container h-100">
                <div className="row h-75">
                        <div className="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <h1 className="text-center fuji-Font mb-0 fujiLoading">fuji</h1>
                        </div>
                </div>
                <div>

                </div>
            </div>
        )
    }
}

export default Loading