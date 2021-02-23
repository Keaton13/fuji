import React from 'react';

class Loading extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>)
    }
}

export default Loading