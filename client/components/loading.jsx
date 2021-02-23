import React from 'react';

class Loading extends React.Component {
    constructor() {
        super();
        console.log("test")
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    <h1 className="text-center fuji-Font float-left mt-2 ml-2">fuji</h1>
                </div>
            </div>
        )
    }
}

export default Loading