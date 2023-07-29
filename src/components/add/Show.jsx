import React from 'react';
import './show.css';

const Show = (props) => {
  return (
    <div className="show1">
      <div className="modal1">
        <span className="close" onClick={() => {props.setOpen(false)}}>
          X
        </span>
        <h1>Show</h1>
        {Object.entries(props.rowData).map(([key, value]) => (
          <div key={key}>
            <strong>{key}: </strong> {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Show;
