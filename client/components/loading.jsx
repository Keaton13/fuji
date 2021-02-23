import React from 'react';

class Loading extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>)
    }
}

export default Loading