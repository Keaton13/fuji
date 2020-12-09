import React from 'react';

const TextInput = props => {
  return (
    <div className="input-group mb-3">
      <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" value={props.currentText} onChange={e => {
        props.setCurrentText(e.target.value);
      }}></input>
      <div className="input-group-prepend">
        <button className="btn btn-outline-secondary" type="button" onClick={e => {
          props.saveText(props.currentText);
        }}>Save</button>
      </div>
    </div>
  );
};

export default TextInput;
